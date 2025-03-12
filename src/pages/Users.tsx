import AuthorizedUsersList from "@/components/Lists/AuthorizedUsersList";
import BannedUsersList from "@/components/Lists/BannedUsersList";
import PendingUserList from "@/components/Lists/PendingUserList";

const Users = () => {
    return (
        <>
            <div className="grid grid-rows-2 gap-4">
                <div className="flex flex-row gap-4">
                    <div className="flex-1">
                        <PendingUserList />
                    </div>
                    <div className="flex-1">
                        <AuthorizedUsersList />
                    </div>
                </div>
                <div>
                    <BannedUsersList />
                </div>
            </div>
        </>
    );
}

export default Users;
