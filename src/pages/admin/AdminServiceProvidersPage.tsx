import CommonTable from "@/components/common/CommonTable";
import { adminFetchAllProviders } from "@/utils/apis/adminProvider.api";
import { AdminFetchAllProviders } from "@/utils/interface/api/adminProviderApiInterface";
import { AdminProvidersTableColumns } from "@/components/table/tableColumns/adminTableColumns";

const AdminServiceProvidersPage = () => {

  return (
    <CommonTable<AdminFetchAllProviders, AdminFetchAllProviders>
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
