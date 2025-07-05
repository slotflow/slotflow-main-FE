import CommonTable from "@/components/common/CommonTable";
import { adminFetchAllProviders } from "@/utils/apis/adminProvider.api";
import { AdminProvidersTableColumns } from "@/components/table/tableColumns/adminTableColumns";
import { AdminFetchAllProvidersResponse } from "@/utils/interface/api/adminProviderApiInterface";

const AdminServiceProvidersPage = () => {

  return (
    <CommonTable<AdminFetchAllProvidersResponse>
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
