
const BannedUsersList = () => {

    /*
    const [userList, setUserList] = useState<UserType[]>([])


    useEffect(() => {
        setUserList([
            { pk_user: 0, permission: 0, username_discord: "test", username_minecraft: "test", garant: "Shinederu", ban_reason: "Connard" },
            { pk_user: 1, permission: 0, username_discord: "tes", username_minecraft: "te", garant: "aas", ban_reason: "J'l'aime po" }

        ])
    }, []);

    const unban = (pk_user: number) => {
        const confirmDelete = confirm("Êtes-vous sûr de vouloir le débannir ce connard ? (pk " + { pk_user } + ")");
        if (confirmDelete) {
            alert("Compte débanni... eh merde....");
        }
    }

    return (
        <>
            <div className="w-full bg-gradient-to-br from-green-600 to-cyan-400 p-6 rounded-2xl shadow-lg text-white">
                <h1 className="text-3xl font-bold text-center mb-4">Joueurs bannis</h1>
                <p>Certains utilisateurs n'ont pas été très appréciable sur le serveur et se sont retrouvé avec leurs comptes définitivement bannis. Il se peut que la personnes qui se soit également portée garante pour eux aie également subis une "pénalité" en fonction de la gravité des actes effectués.</p>
                <table className="rounded-lg w-full mt-4">
                    <tbody>
                        <tr className="bg-gray-500 text-white">
                            <th className="px-4 py-2 text-center">Minecraft</th>
                            <th className="px-4 py-2 text-center">Discord</th>
                            <th className="px-4 py-2 text-center">Raison</th>
                            <th className="px-4 py-2 text-center">Action</th>
                        </tr>
                        {userList.length === 0 ?

                            <tr>
                                <td colSpan={4} className="text-center py-4">
                                    <p className="justify-center">Aucune personne bannie...</p>
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
                                    <td className="px-4 py-2"> {user.ban_reason}</td>
                                    <td><button className="b-2 border px-2 font-bold bg-red-600 hover:scale-125 transition" onClick={() => unban(user.pk_user)}>Débannir</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
    */
}

export default BannedUsersList;
