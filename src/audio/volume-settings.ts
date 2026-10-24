export type VolumeKind = 'music' | 'effects';

export type VolumeSettings = Record<VolumeKind, number>;

export const volumeStorageKey = 'colcannon-fodder-volume';

export const defaultVolumes: Readonly<VolumeSettings> = {
    music: 0.6,
    effects: 0.8,
};

function clampVolume(value: unknown, fallback: number): number {
    return typeof value === 'number' && Number.isFinite(value)
        ? Math.min(1, Math.max(0, value))
        : fallback;
}

/** Reads saved volumes. Any storage or parsing failure gives the defaults. */
export function loadVolumes(): VolumeSettings {
    try {
        const raw = globalThis.localStorage.getItem(volumeStorageKey);
        if (raw == undefined) {
            return {
                ...defaultVolumes,
            };
        }
        const parsed: Partial<Record<VolumeKind, unknown>> | null = JSON.parse(raw);
        return {
            music: clampVolume(parsed?.music, defaultVolumes.music),
            effects: clampVolume(parsed?.effects, defaultVolumes.effects),
        };
    } catch {
        return {
            ...defaultVolumes,
        };
    }
}

let volumes: VolumeSettings | undefined;

/** The current volumes (0 to 1), loaded from `localStorage` on first use. UI-only, not in RunState. */
export function getVolumes(): Readonly<VolumeSettings> {
    volumes ??= loadVolumes();
    return volumes;
}

/** Sets one volume (0 to 1) and saves it. Saving failures are ignored. */
export function setVolume(kind: VolumeKind, value: number): void {
    volumes = {
        ...getVolumes(),
        [kind]: clampVolume(value, defaultVolumes[kind]),
    };
    try {
        globalThis.localStorage.setItem(volumeStorageKey, JSON.stringify(volumes));
    } catch {
        // storage unavailable: the volume still applies for this session
    }
}
