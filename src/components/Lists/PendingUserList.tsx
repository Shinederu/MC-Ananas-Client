import { UserType } from "@/types/User";
type PendingUserListProps = {
    userList: UserType[];
}
const PendingUserList = (props: PendingUserListProps) => {

    const accepting = (id: number) => {

        alert("Vous vous porter désormais garant pour le joueurs identifié " + id);

    }

    const decline = (id: number) => {

        alert("Vous avez refuser de vous porter garant pour le joueurs identifié " + id);

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
                        {props.userList.length === 0 ?

                            <tr>
                                <td colSpan={3} className="text-center py-4">
                                    <p className="justify-center">Aucune demande en attente</p>
                                </td>
                            </tr>

                            :
                            props.userList.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b transition-colors"
                                >
                                    <td className="px-4 py-2">{user.minecraft?.pseudo}</td>
                                    <td className="px-4 py-2">{user.username}</td>
                                    <td className="flex justify-center px-4 py-2 gap-2">
                                        <button className="b-2 border px-2 font-bold bg-lime-600 hover:scale-125 transition" onClick={() => accepting(user.id)}>Oui</button>/<button className="b-2 border px-2 font-bold bg-red-600 hover:scale-125 transition" onClick={() => decline(user.id)}>Non</button>
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
