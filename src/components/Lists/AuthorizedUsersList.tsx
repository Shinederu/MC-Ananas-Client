import { UserType } from "@/types/User";

type AuthorizedUsersList = {
    userList: UserType[];
}
const AuthorizedUsersList = (props: AuthorizedUsersList) => {

    const ban = (pk_user: number) => {
        const confirmDelete = confirm("Êtes-vous sûr de vouloir le Bannir ce connard ? (pk " + { pk_user } + ")");
        if (confirmDelete) {
            alert("Compte banni !!!! Youpiiiie !!!!");
        }
    }

    const promote = (pk_user: number) => {
        const confirmDelete = confirm("Êtes-vous sûr de vouloir rendre amin ce joueur ? (pk " + { pk_user } + ")");
        if (confirmDelete) {
            alert("Un nouveau dieu est entré en scène !");
        }
    }

    return (
        <>
            <div className="h-full w-full bg-gradient-to-br from-red-400 to-purple-500 p-6 rounded-2xl shadow-lg text-white">

                <h1 className="text-3xl font-bold text-center mb-4">Liste des joueurs</h1>
                <p>Voici tous les joueurs que tu peux rencontrer sur le serveur ! Amusez-vous bien ! </p>

                <table className="rounded-lg w-full mt-4">
                    <tr className="bg-gray-500 text-white">
                        <th className="px-4 py-2 text-center">Minecraft</th>
                        <th className="px-4 py-2 text-center">Discord</th>
                        <th className="px-4 py-2 text-center">Garant</th>
                        <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                    <tbody>
                        {props.userList.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b hover:bg-blue-100 transition-colors hover:text-black"
                            >
                                <td className="px-4 py-2">{user.minecraft_username}</td>
                                <td className="px-4 py-2">{user.discord_username}</td>
                                <td className="px-4 py-2">{user.garant ?? ''}</td>
                                <td className="flex justify-center px-4 py-2 gap-2">
                                    <button className="b-2 border px-2 font-bold bg-red-600 hover:scale-125 transition" onClick={() => ban(user.id)}>Bannir</button>/<button className="b-2 border px-2 font-bold bg-sky-500 hover:scale-125 transition" onClick={() => promote(user.id)}>Promotion</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AuthorizedUsersList;
