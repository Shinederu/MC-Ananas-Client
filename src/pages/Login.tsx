import Title from "@/components/decoration/Title";

const Login = () => {
    return (
        <>
            <div className="mb-8 flex flex-col gap-5">
                <Title title="Prépare-toi à l'aventure :" size={1} />
                <p>
                    Bienvenue, Héros ou Héroïne du Pixel ! 🌟
                    Tu viens d’atteindre le portail sacré de gestion des serveurs Minecraft.
                </p>
                <p>
                    En franchissant cette étape, tu pourras débloquer l’accès aux royaumes disponibles, 
                    récupérer les artefacts (mods) nécessaires, et forger ton destin sur nos mondes !
                </p>
                <p>
                    Es-tu prêt·e à entrer dans la légende ?
                </p>
                <a
                    className="px-4 py-2 text-white bg-gradient-to-r from-purple-700 to-pink-500 rounded-xl hover:brightness-110 transition-all mt-8 shadow-lg"
                    href={import.meta.env.VITE_PLAY_API_URL + "/login"}
                >
                    ⚔️ Se connecter ou s’inscrire
                </a>
            </div>
        </>
    );
};

export default Login;
