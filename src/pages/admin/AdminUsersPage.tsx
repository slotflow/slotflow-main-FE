import CommonTable from "@/components/common/CommonTable";
import { adminFetchAllUsers } from "@/utils/apis/adminUser.api";
import { AdminUsersTableColumnsProps } from "@/utils/interface/tableColumnInterface";
import { AdminUsersTableColumns } from "@/components/table/tableColumns/adminTableColumns";
import { AdminfetchAllUsersApiResponse } from "@/utils/interface/api/adminUserApiInterface";

const AdminUsersPage = () => {

  return (
    <CommonTable<AdminfetchAllUsersApiResponse, AdminUsersTableColumnsProps>
      fetchApiFunction={adminFetchAllUsers}
      queryKey="users"
      heading="Users"
      column={AdminUsersTableColumns}
      columnsCount={6}
    />
  );
};

export default AdminUsersPage
