import CommonTable from '@/components/common/CommonTable';
import { adminFetchAllServices } from '@/utils/apis/adminService.api';
import ServiceAddingForm from '@/components/form/AdminForms/ServiceForm';
import { useAdminServiceActions } from '@/utils/hooks/adminHooks/useAdminServiceActions';
import { AdminFetchAllServicesResponse } from '@/utils/interface/api/adminServiceApiInterface';
import { AdminAppServicesTableColumns } from '@/components/table/tableColumns/AdminAppServicesTableColumn';

const AdminServicesPage = () => {

  const {
    handleAdminChangeServiceStatus
  } = useAdminServiceActions();

  const column = AdminAppServicesTableColumns(
    handleAdminChangeServiceStatus
  )

  return (
    <>
      <div className='flex'>
        <div className='w-8/12'>
          <CommonTable<AdminFetchAllServicesResponse>
            fetchApiFunction={adminFetchAllServices}
            queryKey="appServices"
            heading="Services"
            column={column}
            columnsCount={4}
          />
        </div>
        <div className='w-4/12 mx-2 mt-14'>
          <ServiceAddingForm />
        </div>
      </div>
    </>
  )
}

export default AdminServicesPage