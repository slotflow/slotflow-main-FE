import CommonTable from "@/components/common/CommonTable";
import { adminFetchAllUsers } from "@/utils/apis/adminUser.api";
import { AdminfetchAllUsersResponse } from "@/utils/interface/api/adminUserApiInterface";
import { AdminUsersTableColumns } from "@/components/table/tableColumns/adminTableColumns";

const AdminUsersPage = () => {

  return (
    <CommonTable<AdminfetchAllUsersResponse>
      fetchApiFunction={adminFetchAllUsers}
      queryKey="users"
      heading="Users"
      column={AdminUsersTableColumns}
      columnsCount={6}
    />
  );
};

export default AdminUsersPage
