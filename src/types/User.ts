export type UserType = {
        pk_user: number;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        is_active: boolean;
        created_at: string;
        permission: number;
};

export type ChangePasswordType = {
        currentPassword: string;
        newPassword: string;
        confirmNewPassword: string;        
};