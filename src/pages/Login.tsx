import Title from "@/components/decoration/Title";

const Login = () => {
    return (
        <>
            {/* Main Content */}
            <section className=" mb-8 flex flex-col gap-5">
                <Title title="Avant de commencer:" size={1} />
                <p> Salutation Joueur/Joueuse ! Tu te trouves a présent sur le site de gestion pour les serveurs Minecraft. </p>
                <p> Ici, tu pourras obtenir l'autorisation d'accès aux différents serveurs et récupérer les mods nécessaires pour s'y connecter. </p>
                <a className="px-4 py-2 text-white bg-purple-700 rounded hover:bg-purple-500 transition mt-8" href={import.meta.env.VITE_PLAY_API_URL + "/login"}>Se connecter/S'inscrire</a>
            </section>
        </>
    );
};

export default Login;
