export type UserType = {
        id: number;
        username: string;
        discordId: string;
        avatar: string;
        minecraft: MinecraftUserType | null;
        securityRank: SecurityRankType | null;
};

export type MinecraftUserType = {
        id: number;
        pseudo: string;
        uuid: string;
        garant: MinecraftUserType | null;
        ban: boolean;
}

export type SecurityRankType = {
        rolename: string;
        role: string[]
}