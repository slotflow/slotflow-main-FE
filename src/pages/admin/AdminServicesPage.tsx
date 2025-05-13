import CommonTable from '@/components/common/CommonTable';
import { adminFetchAllServices } from '@/utils/apis/adminService.api';
import ServiceAddingForm from '@/components/form/AdminForms/ServiceForm';
import { AdminAppServicesTableColumnsProps } from '@/utils/interface/tableColumnInterface';
import { AdminAppServicesTableColumns } from '@/components/table/tableColumns/adminTableColumns';
import { AdminFetchAllServicesApiResponse } from '@/utils/interface/api/adminServiceApiInterface';

const AdminServicesPage = () => {

  return (
    <>
      <div className='flex'>
        <div className='w-8/12'>
          <CommonTable<AdminFetchAllServicesApiResponse, AdminAppServicesTableColumnsProps>
            fetchApiFunction={adminFetchAllServices}
            queryKey="fetchServices"
            heading="Services"
            column={AdminAppServicesTableColumns}
            columnsCount={4}
          />
        </div>
        <div className='w-4/12 mx-2 mt-12'>
          <ServiceAddingForm />
        </div>
      </div>
    </>
  )
}

export default AdminServicesPage