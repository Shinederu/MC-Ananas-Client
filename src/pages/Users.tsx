import AuthorizedUsersList from "@/components/Lists/AuthorizedUsersList";
import BannedUsersList from "@/components/Lists/BannedUsersList";
import CurrentChildList from "@/components/Lists/CurrentChildList";
import PendingUserList from "@/components/Lists/PendingUserList";
import { AuthContext } from "@/shared/context/AuthContext";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { useInterval } from "@/shared/hooks/useInterval";
import { BanType, MinecraftUserType, UserType } from "@/types/User";
import { useContext, useState } from "react";

const Users = () => {

    const modalCtx = useContext(ModalContext);
    const authCtx = useContext(AuthContext);
    const { sendRequest } = useHttpClient();

    const [childsResquest, setChildsResquest] = useState<UserType[]>([]);
    const [currentChild, setCurrentChild] = useState<MinecraftUserType[]>([]);
    const [allowedUsers, setAllowedUsers] = useState<MinecraftUserType[]>([]);
    const [bannedUsers, setBannedUsers] = useState<BanType[]>([]);

    const sendGetUsersLists = async () => {
        await sendRequest({
            key: 130,
            url: import.meta.env.VITE_PLAY_API_URL + '/users/',
            method: 'GET',
            headers: { Authorization: authCtx.token },
            onSuccess: (data) => {
                if (data) {
                    setChildsResquest(data?.userGarant);
                    setCurrentChild(data?.children)
                    setAllowedUsers(data?.minecrafts);
                    setBannedUsers(data?.bans);
                }
            },
            onError: (error) => {
                modalCtx.open(error, "error");
            },
        });
    };

    useInterval(() => {
        sendGetUsersLists();
    }, 5000);

    return (
        <>
            <div className="grid grid-cols-2 w-full h-full p-4 gap-4 items-stretch">
                <div className="flex flex-col gap-4 w-full h-full">
                    <PendingUserList userList={childsResquest} refreshList={sendGetUsersLists} />
                    <CurrentChildList userList={currentChild} refreshList={sendGetUsersLists} />
                </div>
                <div className="flex flex-col gap-4 w-full h-full">
                    <AuthorizedUsersList userList={allowedUsers} refreshList={sendGetUsersLists} />
                </div>
            </div>
            {(authCtx.role === "ROLE_FRIEND" || authCtx.role === "ROLE_ADMIN") && (
                <BannedUsersList banList={bannedUsers} refreshList={sendGetUsersLists} />
            )}
        </>
    );
}




export default Users;
