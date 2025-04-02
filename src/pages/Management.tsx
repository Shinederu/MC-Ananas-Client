import EditModpackInfosCard from "@/components/cards/EditModpackInfosCard";
import MinecraftGarantTreeCard from "@/components/cards/GarantTreeCard";
import MinecraftServerControlsCard from "@/components/cards/MinecraftServerControlsCard";
import ManageMinecraftAccountsList from "@/components/Lists/ManageMinecraftAccountsList";

const Management = () => {
    return (
        <>
            <div className="flex w-full h-full p-4 gap-4">
                <EditModpackInfosCard />
                <ManageMinecraftAccountsList />
                <MinecraftServerControlsCard />
            </div>
            <div className="flex w-full h-full p-4 gap-4">
                <MinecraftGarantTreeCard />
            </div>

            
        </>
    );
};

export default Management;
