import {defaultMultiplayerApiOrigin, defaultMultiplayerApiPort} from '@antha/multiplayer-core';
import {type MultiplayerServerCliConfig} from '@antha/multiplayer-server';
import {AnyOrigin} from '@rest-vir/api';

export default {
    backendOrigin: defaultMultiplayerApiOrigin,
    games: {
        byId: {
            'colcannon-fodder': AnyOrigin,
        },
    },
    host: '0.0.0.0',
    port: defaultMultiplayerApiPort,
} satisfies MultiplayerServerCliConfig;
