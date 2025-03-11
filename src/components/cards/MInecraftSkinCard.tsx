type MinecraftSkinCardType = {
    username: string
}


const MinecraftSkinCard = (props: MinecraftSkinCardType) => {

    return (
        <>
            <div className="h-full bg-gradient-to-br from-blue-600 to-fuchsia-500 p-6 rounded-2xl shadow-lg text-white flex flex-col content-center">
                <h2 className="text-3xl font-bold w-full border-b-2 border-white pb-3">Vitrine de skin</h2>
                <img
                    src={`https://minotar.net/armor/bust/${props.username}.png`}
                    alt="Impossible de charger l'aperçu du skin... Vérifier votre pseudo"
                    className="m-4"
                />
            </div>
        </>
    );

}

export default MinecraftSkinCard