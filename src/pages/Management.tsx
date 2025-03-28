import EditModpackInfosCard from "@/components/cards/EditModpackInfosCard";
import ManageMinecraftAccounts from "@/components/Lists/ManageMinecraftAccounts";

const Management = () => {
    return (
        <>


            <div className="grid grid-cols-2 w-full h-full p-4 gap-4 items-stretch">
                <div className="flex flex-col gap-4 w-full h-full">
                    <EditModpackInfosCard />
                </div>
                <div className="flex flex-col gap-4 w-full h-full">
                    <ManageMinecraftAccounts />
                </div>
            </div>

        </>
    );
};

export default Management;
