import EditModpackInfosCard from "@/components/cards/EditModpackInfosCard";
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
        </>
    );
};

export default Management;
