import CommonTable from "@/components/common/CommonTable";
import { fetchProviders } from "@/utils/apis/adminProvider.api";
import { AdminProvidersTableColumns } from "@/components/table/adminTableColumns";
import { AdminProvidersTableColumnsProps } from "@/utils/interface/tableColumnInterface";
import { AdminFetchAllProvidersResponseProps } from "@/utils/interface/api/adminProviderApiInterface";

const AdminServiceProviders = () => {

  return (
    <CommonTable<AdminFetchAllProvidersResponseProps, AdminProvidersTableColumnsProps>
      fetchApiFunction={fetchProviders} 
      queryKey="providers" 
      heading="Service Providers" 
      column={AdminProvidersTableColumns}
      columnsCount={6} 
    />
  );
  
};

export default AdminServiceProviders;
