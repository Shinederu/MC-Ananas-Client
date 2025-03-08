export type ServerInfoType = {
    online: boolean;
    motd: [string, string];
    players: [number, number];
    version: string;
    icon: string;
};