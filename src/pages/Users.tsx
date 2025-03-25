import AuthorizedUsersList from "@/components/Lists/AuthorizedUsersList";
import BannedUsersList from "@/components/Lists/BannedUsersList";
import PendingUserList from "@/components/Lists/PendingUserList";
import { AuthContext } from "@/shared/context/AuthContext";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { UserType } from "@/types/User";
import { useContext, useEffect, useState } from "react";


const Users = () => {

    const modalCtx = useContext(ModalContext);
    const authCtx = useContext(AuthContext);
    const { sendRequest } = useHttpClient();


    const [allowUsers, setAllowUsers] = useState<UserType[]>([]);
    const [bannedUsers, setBannedUsers] = useState<UserType[]>([]);
    const [myGarantedUsers, setMyGarantedUsers] = useState<UserType[]>([]);

    const getUsersLists = async () => {
        try {
            await sendRequest({
                key: 20,
                url: import.meta.env.VITE_PLAY_API_URL + '/users/',
                method: 'GET',
                headers: { Authorization: authCtx.token },
                onSuccess: (data) => {
                    if (data) {
                        setAllowUsers(data?.minecrafts);
                        setBannedUsers(data?.bans);
                        setMyGarantedUsers(data?.userGarant);
                    }
                },
                onError: (error) => {
                    modalCtx.setMessage(error);
                    modalCtx.setType("error");
                    modalCtx.setIsOpen(true);
                },
            });
        } catch (error) {
            console.error("Erreur lors de la vérification de la connexion :", error);
        }
    };

    useEffect(() => {
        getUsersLists();
    }, []);

    return (
        <>
            <div className="grid grid-rows-2 gap-4">
                <div className="flex flex-row gap-4">
                    <div className="flex-1">
                        <PendingUserList userList={myGarantedUsers} refreshList={getUsersLists} />
                    </div>

                    <div className="flex-1">
                        <AuthorizedUsersList userList={allowUsers} refreshList={getUsersLists} />
                    </div>
                </div>
                {authCtx.role == "ROLE_FRIEND" || authCtx.role == "ROLE_ADMIN" ?
                    <>
                        <div>
                            <BannedUsersList userList={bannedUsers} refreshList={getUsersLists} />
                        </div>
                    </>
                    :
                    <>
                    </>
                }

            </div>
        </>
    );
}




export default Users;
