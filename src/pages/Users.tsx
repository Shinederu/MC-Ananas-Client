import AuthorizedUsersList from "@/components/Lists/AuthorizedUsersList";
import PendingUserList from "@/components/Lists/PendingUserList";

const Users = () => {
    return (
        <>
            <div className="flex flex-row gap-4">
                <div className="flex-1">
                    <PendingUserList />
                </div>
                <div className="flex-1">
                    <AuthorizedUsersList />
                </div>
            </div>
        </>
    );
}

export default Users;
