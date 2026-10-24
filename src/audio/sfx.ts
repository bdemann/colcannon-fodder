import {sfxConfig} from '../config/game-config.js';
import {getVolumes} from './volume-settings.js';

export enum Sfx {
    Chop = 'chop',
    Boil = 'boil',
    Squish = 'squish',
    ServePerfect = 'serve-perfect',
    ServeBad = 'serve-bad',
    ServeRaw = 'serve-raw',
    Build = 'build',
    Squawk = 'squawk',
}

/** Smallest gain an exponential ramp can reach (it cannot reach 0). */
const silentGain = 0.001;

type Audio = {context: AudioContext; master: GainNode};

let context: AudioContext | undefined;
let masterGain: GainNode | undefined;
let muted = false;

/** Lazily creates the audio context so importing this file has no side effects. */
function getAudio(): Audio | undefined {
    if (typeof AudioContext === 'undefined') {
        return undefined;
    }
    if (!context || !masterGain) {
        context = new AudioContext();
        masterGain = context.createGain();
        masterGain.gain.value = sfxConfig.volume;
        masterGain.connect(context.destination);
    }
    masterGain.gain.value = muted ? 0 : getVolumes().effects * sfxConfig.volume;
    if (context.state === 'suspended') {
        void context.resume().catch(() => {});
    }
    return {
        context,
        master: masterGain,
    };
}

export function isMuted(): boolean {
    return muted;
}

export function setMuted(value: boolean): void {
    muted = value;
}

type ToneParams = {
    type: OscillatorType;
    startHz: number;
    endHz?: number;
    startSec: number;
    durationSec: number;
    startGain: number;
    lowpassHz?: number;
};

function playTone(audio: Audio, params: ToneParams) {
    const {context, master} = audio;
    const start = context.currentTime + params.startSec;
    const end = start + params.durationSec;
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = params.type;
    oscillator.frequency.setValueAtTime(params.startHz, start);
    if (params.endHz != undefined) {
        oscillator.frequency.exponentialRampToValueAtTime(params.endHz, end);
    }
    gain.gain.setValueAtTime(params.startGain, start);
    gain.gain.exponentialRampToValueAtTime(silentGain, end);

    oscillator.connect(gain);
    if (params.lowpassHz == undefined) {
        gain.connect(master);
    } else {
        const filter = context.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = params.lowpassHz;
        gain.connect(filter);
        filter.connect(master);
    }
    oscillator.start(start);
    oscillator.stop(end);
}

function playChop(audio: Audio) {
    const {context, master} = audio;
    const durationSec = 0.04;
    const frameCount = Math.ceil(context.sampleRate * durationSec);
    const buffer = context.createBuffer(1, frameCount, context.sampleRate);
    const data = buffer.getChannelData(0);
    const randomValues = crypto.getRandomValues(new Uint16Array(frameCount));
    for (let index = 0; index < frameCount; index++) {
        data[index] = (randomValues[index] ?? 0) / 32_768 - 1;
    }

    const source = context.createBufferSource();
    source.buffer = buffer;
    const filter = context.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3000;
    const gain = context.createGain();
    const start = context.currentTime;
    gain.gain.setValueAtTime(1, start);
    gain.gain.exponentialRampToValueAtTime(silentGain, start + durationSec);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    source.start(start);
    source.stop(start + durationSec);
}

const tonesBySfx: Record<Exclude<Sfx, Sfx.Chop>, ReadonlyArray<ToneParams>> = {
    [Sfx.Boil]: [
        {
            type: 'sine',
            startHz: 300,
            endHz: 700,
            startSec: 0,
            durationSec: 0.12,
            startGain: 0.6,
        },
    ],
    [Sfx.Squish]: [
        {
            type: 'sawtooth',
            startHz: 180,
            endHz: 70,
            startSec: 0,
            durationSec: 0.16,
            startGain: 0.8,
            lowpassHz: 900,
        },
    ],
    [Sfx.ServePerfect]: [
        {
            type: 'sine',
            startHz: 660,
            startSec: 0,
            durationSec: 0.09,
            startGain: 0.7,
        },
        {
            type: 'sine',
            startHz: 880,
            startSec: 0.09,
            durationSec: 0.09,
            startGain: 0.7,
        },
    ],
    [Sfx.ServeBad]: [
        {
            type: 'square',
            startHz: 220,
            startSec: 0,
            durationSec: 0.15,
            startGain: 0.4,
        },
    ],
    [Sfx.ServeRaw]: [
        {
            type: 'sawtooth',
            startHz: 140,
            endHz: 90,
            startSec: 0,
            durationSec: 0.25,
            startGain: 0.6,
        },
    ],
    [Sfx.Squawk]: [
        {
            type: 'square',
            startHz: 900,
            endHz: 600,
            startSec: 0,
            durationSec: 0.12,
            startGain: 0.4,
        },
    ],
    [Sfx.Build]: [
        {
            type: 'triangle',
            startHz: 520,
            startSec: 0,
            durationSec: 0.08,
            startGain: 0.6,
        },
    ],
};

/**
 * Plays a synthesized sound effect. Call only from presentation code (render, HUD, UI mods), never
 * from command handlers or entity `update`.
 */
export function playSfx(sfx: Sfx): void {
    if (muted) {
        return;
    }
    const audio = getAudio();
    if (!audio) {
        return;
    } else if (sfx === Sfx.Chop) {
        playChop(audio);
        return;
    }
    tonesBySfx[sfx].forEach((tone) => {
        playTone(audio, tone);
    });
}
