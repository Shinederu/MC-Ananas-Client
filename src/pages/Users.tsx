import AuthorizedUsersList from "@/components/Lists/AuthorizedUsersList";
import BannedUsersList from "@/components/Lists/BannedUsersList";
import CurrentChildList from "@/components/Lists/CurrentChildList";
import PendingUserList from "@/components/Lists/PendingUserList";
import { AuthContext } from "@/shared/context/AuthContext";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { BanType, MinecraftUserType, UserType } from "@/types/User";
import { useContext, useEffect, useState } from "react";


const Users = () => {

    const modalCtx = useContext(ModalContext);
    const authCtx = useContext(AuthContext);
    const { sendRequest } = useHttpClient();

    const [childsResquest, setChildsResquest] = useState<UserType[]>([]);
    const [currentChild, setCurrentChild] = useState<UserType[]>([]);
    const [allowedUsers, setAllowedUsers] = useState<MinecraftUserType[]>([]);
    const [bannedUsers, setBannedUsers] = useState<BanType[]>([]);


    const getUsersLists = async () => {
        try {
            await sendRequest({
                key: 20,
                url: import.meta.env.VITE_PLAY_API_URL + '/users/',
                method: 'GET',
                headers: { Authorization: authCtx.token },
                onSuccess: (data) => {
                    if (data) {
                        setChildsResquest(data?.userGarant);
                        setCurrentChild(data?.childs)
                        setAllowedUsers(data?.minecrafts);
                        setBannedUsers(data?.bans);
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
        const interval = setInterval(() => {
            getUsersLists();
        }, 5000); //Temps en ms

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="grid grid-col-2 w-full h-full">
                <div className="flex flex-row gap-4 w-full h-full">
                    <PendingUserList userList={childsResquest} refreshList={getUsersLists} />
                    <CurrentChildList userList={currentChild} refreshList={getUsersLists} />
                </div>
                <div className="flex flex-row gap-4 w-full h-full">
                    <AuthorizedUsersList userList={allowedUsers} refreshList={getUsersLists} />
                </div>

            </div>
            {authCtx.role == "ROLE_FRIEND" || authCtx.role == "ROLE_ADMIN" ?
                <>
                    <div>
                        <BannedUsersList banList={bannedUsers} refreshList={getUsersLists} />
                    </div>
                </>
                :
                <>
                </>
            }
        </>
    );
}




export default Users;
