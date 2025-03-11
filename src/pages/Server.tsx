import ModpackInfoCard from "@/components/cards/ModpackInfoCard";
import ServerInfoCard from "@/components/cards/ServerInfoCard";



const Server = () => {
    return (
        <div className="min-h-[80vh] grid grid-cols-4 gap-4">
            {/* Gauche */}
            <div className="flex flex-col gap-4">
                <div className="flex-1">
                    <ServerInfoCard />
                </div>
                <div className="flex-1">
                    <ModpackInfoCard />
                </div>
            </div>

            {/* Droite */}
            <div className="col-span-3">
                <div className="bg-gray-300 rounded-2xl shadow-lg p-4 h-full">
                  <iframe src="https://bluemap.play.shinederu.lol" className="w-full h-full rounded-2xl shadow-lg" title="BlueMap"/>
                </div>
            </div>
        </div>
    );
};

export default Server;
