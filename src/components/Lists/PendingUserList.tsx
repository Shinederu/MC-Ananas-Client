import { UserType } from "@/types/User";
import { useEffect, useState } from "react";

const PendingUserList = () => {
    const [userList, setUserList] = useState<UserType[]>([])


    useEffect(() => {
        setUserList([
            { pk_user: 0, permission: 0, username_discord: "test", username_minecraft: "test", garant: "Shinederu", ban_reason: "" },
            { pk_user: 1, permission: 0, username_discord: "tes", username_minecraft: "te", garant: "aas", ban_reason: "" }

        ])
    }, []);

    const accepting = (pk_user: number) => {

        alert("Vous vous porter désormais garant pour le joueurs identifié " + pk_user);

    }

    const decline = (pk_user: number) => {

        alert("Vous avez refuser de vous porter garant pour le joueurs identifié " + pk_user);

    }


    return (
        <>
            <div className="w-full bg-gradient-to-br from-blue-600 to-fuchsia-500 p-6 rounded-2xl shadow-lg text-white">
                <h1 className="text-3xl font-bold text-center mb-4">Invitez vos amis !</h1>
                <p>Vous pouvez inviter d'autres joueurs de confiance a rejoindre le serveur et vous porter garant pour eux.</p>
                <p className="bg-red-800 m-2 border-white border-2 font-semibold p-2">En cliquant sur "<u>oui</u>" pour les utilisateurs ci-dessous, vous vous portez garant(e) et accepter le risque d'être sanctionné(e) si votre invité(e) porte préjudice au serveur ou à ces membres.</p>

                <table className="rounded-lg w-full">
                    <tbody>
                        <tr className="bg-gray-500 text-white">
                            <th className="px-4 py-2 text-center">Minecraft</th>
                            <th className="px-4 py-2 text-center">Discord</th>
                            <th className="px-4 py-2 text-center">Accepter ?</th>
                        </tr>
                        {userList.length === 0 ?

                            <tr>
                                <td colSpan={3} className="text-center py-4">
                                    <p className="justify-center">Aucune demande en attente</p>
                                </td>
                            </tr>

                            :
                            userList.map((user) => (
                                <tr
                                    key={user.pk_user}
                                    className="border-b transition-colors"
                                >
                                    <td className="px-4 py-2">{user.username_minecraft}</td>
                                    <td className="px-4 py-2">{user.username_discord}</td>
                                    <td className="flex justify-center px-4 py-2 gap-2">
                                        <button className="b-2 border px-2 font-bold bg-lime-600 hover:scale-125 transition" onClick={() => accepting(user.pk_user)}>Oui</button>/<button className="b-2 border px-2 font-bold bg-red-600 hover:scale-125 transition" onClick={() => decline(user.pk_user)}>Non</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default PendingUserList;
