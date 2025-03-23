import AuthorizedUsersList from "@/components/Lists/AuthorizedUsersList";
//import PendingUserList from "@/components/Lists/PendingUserList";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { useContext, useEffect, useState } from "react";


const Users = () => {

    const modalCtx = useContext(ModalContext);

    const { sendRequest } = useHttpClient();

    const [allowUsers, setAllowUsers] = useState<any>([]);
    //const [myGarantedUsers, setMyGarantedUsers] = useState<UserType[]>([]);


    useEffect(() => {
        const sendIsConnected = async () => {
            try {
                await sendRequest({
                    key: 20,
                    url: import.meta.env.VITE_PLAY_API_URL + '/users/',
                    method: 'GET',
                    onSuccess: (data) => {
                        if (data) {
                            setAllowUsers(data?.minecrafts);
                            console.log(allowUsers);
                            // setMyGarantedUsers(data?.user);
                        } else {
                            console.log("Aucune data...");
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
        sendIsConnected();
    }, []);

    return (
        <>
            <div className="grid grid-rows-2 gap-4">
                <div className="flex flex-row gap-4">
                    <div className="flex-1">
                        {/*<PendingUserList userList={myGarantedUsers} />*/}
                    </div>
                    <div className="flex-1">
                        <AuthorizedUsersList userList={allowUsers} />
                    </div>
                </div>
                <div>
                   {/* <BannedUsersList/>*/}
                </div>
            </div>
        </>
    );
}

export default Users;
