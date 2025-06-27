import CommonTable from "@/components/common/CommonTable";
import { adminFetchAllUsers } from "@/utils/apis/adminUser.api";
import { AdminUsersTableColumns } from "@/components/table/tableColumns/adminTableColumns";
import { AdminfetchAllUsersResponse } from "@/utils/interface/api/adminUserApiInterface";

const AdminUsersPage = () => {

  return (
    <CommonTable<AdminfetchAllUsersResponse, AdminfetchAllUsersResponse>
      fetchApiFunction={adminFetchAllUsers}
      queryKey="users"
      heading="Users"
      column={AdminUsersTableColumns}
      columnsCount={6}
    />
  );
};

export default AdminUsersPage
