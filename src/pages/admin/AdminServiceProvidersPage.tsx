import CommonTable from "@/components/common/CommonTable";
import { adminFetchAllProviders } from "@/utils/apis/adminProvider.api";
import { useAdminProviderActions } from "@/utils/hooks/adminHooks/useAdminProviderActions";
import { AdminFetchAllProvidersResponse } from "@/utils/interface/api/adminProviderApiInterface";
import { AdminProvidersTableColumns } from "@/components/table/tableColumns/AdminProvidersTableColumn";

const AdminServiceProvidersPage = () => {

  const {
    handleAdminApproveProvider,
    hanldeAdminChangeProviderBlockStatus,
    handleGetProviderDetailPage,
    hanldeAdminChangeProviderSlotflowTrustTag
  } = useAdminProviderActions();

  const columns = AdminProvidersTableColumns(
    handleAdminApproveProvider,
    hanldeAdminChangeProviderBlockStatus,
    handleGetProviderDetailPage,
    hanldeAdminChangeProviderSlotflowTrustTag
  )

  return (
    <CommonTable<AdminFetchAllProvidersResponse>
      fetchApiFunction={adminFetchAllProviders}
      queryKey="providers"
      heading="Service Providers"
      column={columns}
      columnsCount={6}
    />
  );

};

export default AdminServiceProvidersPage;
