import { UserType } from "@/types/User";
import { useEffect, useState } from "react";

const AuthorizedUsersList = () => {
    const [userList, setUserList] = useState<UserType[]>([])
    useEffect(() => {
        setUserList([
            { pk_user: 0, permission: 0, username_discord: "test", username_minecraft: "test", garant: "Shinederu" }
        ])
    }, []);
    return (
        <>
            <div className="w-full bg-gradient-to-br from-orange-400 to-purple-500 p-6 rounded-2xl shadow-lg text-white">

                <h1 className="text-3xl font-bold text-center mb-4">Liste des joueurs</h1>
                <table className="rounded-lg w-full">
                    <tr className="bg-gray-500 text-white">
                        <th className="px-4 py-2 text-center">Minecraft</th>
                        <th className="px-4 py-2 text-center">Discord</th>
                        <th className="px-4 py-2 text-center">Garant</th>
                    </tr>
                    <tbody>
                        {userList.map((user, index) => (
                            <tr
                                key={index}
                                className="border-b hover:bg-blue-100 transition-colors hover:text-black"
                            >
                                <td className="px-4 py-2">{user.username_minecraft}</td>
                                <td className="px-4 py-2">{user.username_discord}</td>
                                <td className="px-4 py-2">{user.garant}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AuthorizedUsersList;
