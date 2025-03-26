export type MinecraftUserType = {
        id: number;
        pseudo: string;
        uuid: string;
        user: UserType;
        verifyBy: UserType | null;
        garant: MinecraftUserType | null;
        ban: boolean
}
export type UserType = {
        id: number;
        username: string;
        discordId: string;
        avatar: string;
        securityRank: SecurityRankType | null;
        minecraft: MinecraftUserType | null;
};

export type SecurityRankType = {
        rolename: string;
        role: string[]
}

export type BanType = {
        id: number;
        minecraft: MinecraftUserType;
        reason: string;
        createdAt: string;
}