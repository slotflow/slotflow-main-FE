import CommonTable from "@/components/common/CommonTable";
import { adminFetchAllProviders } from "@/utils/apis/adminProvider.api";
import { AdminProvidersTableColumnsProps } from "@/utils/interface/tableColumnInterface";
import { AdminProvidersTableColumns } from "@/components/table/tableColumns/adminTableColumns";
import { AdminFetchAllProvidersApiResponse } from "@/utils/interface/api/adminProviderApiInterface";

const AdminServiceProvidersPage = () => {

  return (
    <CommonTable<AdminFetchAllProvidersApiResponse, AdminProvidersTableColumnsProps>
      fetchApiFunction={adminFetchAllProviders} 
      queryKey="providers" 
      heading="Service Providers" 
      headingClassName="mt-4"
      column={AdminProvidersTableColumns}
      columnsCount={6} 
    />
  );
  
};

export default AdminServiceProvidersPage;
