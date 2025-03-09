import { FolderArchive } from "lucide-react";

const ModpackInfoCard = () => {



    const openToDownload = () => {
        window.open('https://shinederu.lol', '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="h-full bg-gradient-to-br from-red-400 to-purple-500 p-6 rounded-2xl shadow-lg text-white ">
            <h1 className="text-3xl font-bold">Modpack</h1>
            <div className="mt-4 flex justify-center">
            </div>

            <p className="text-md">Mise à jour le: <span className="font-medium">xx.xx.xxxx à xx:xx</span></p>
            <p className="text-md">Version: <span className="font-medium">Forge x.xx.x-xxxxxxxx</span></p>

            <button
                onClick={openToDownload}
                className="mt-4 bg-white text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 mx-auto transition-all duration-300 hover:bg-gray-200"
            >
                Télécharger le modpack
                <FolderArchive className="w-5 h-5" />
            </button>
        </div>
    );
}

export default ModpackInfoCard;
