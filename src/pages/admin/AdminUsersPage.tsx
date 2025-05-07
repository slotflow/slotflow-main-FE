import { fetchUsers } from "@/utils/apis/adminUser.api";
import CommonTable from "@/components/common/CommonTable";
import { AdminUsersTableColumns } from "@/components/table/adminTableColumns";
import { AdminUsersTableColumnsProps } from "@/utils/interface/tableColumnInterface";
import { AdminfetchAllUsersResponseProps } from "@/utils/interface/api/adminUserApiInterface";

const AdminUsersPage = () => {

  return (
    <CommonTable<AdminfetchAllUsersResponseProps, AdminUsersTableColumnsProps>
      fetchApiFunction={fetchUsers}
      queryKey="users"
      heading="Users"
      column={AdminUsersTableColumns}
      columnsCount={6}
    />
  );
};

export default AdminUsersPage
