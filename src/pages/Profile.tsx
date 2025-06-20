import MinecraftSkinCard from "@/components/cards/MInecraftSkinCard";
import MyProfileCard from "@/components/cards/MyProfileCard";
import { AuthContext } from "@/shared/context/AuthContext";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { useInterval } from "@/shared/hooks/useInterval";
import { MinecraftUserType, UserType } from "@/types/User";
import { useContext, useState } from "react";

const Profile = () => {

    const { sendRequest } = useHttpClient();
    const modalCtx = useContext(ModalContext);
    const authCtx = useContext(AuthContext);

    const [userDetails, setUserDetails] = useState<UserType>();
    const [listGarants, setListGarants] = useState<MinecraftUserType[]>();

    const sendGetProfile = async () => {
        await sendRequest({
            key: 121,
            url: import.meta.env.VITE_PLAY_API_URL + '/profil',
            method: 'GET',
            headers: { Authorization: authCtx.token },
            onSuccess: (data) => {
                setUserDetails(data.user);
                setListGarants(data.allowedGarant);
            },
            onError: (error) => {
                modalCtx.open(error, "error");
            },
        });
    };

    useInterval(() => {
        sendGetProfile();
    }, 5000);

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                <MinecraftSkinCard username={userDetails?.minecraft?.pseudo + ""} />
                <div className="col-span-2">
                    <MyProfileCard userDetails={userDetails} garantList={listGarants} refreshProfile={sendGetProfile} />
                </div>
            </div >
        </>
    );
};

export default Profile;