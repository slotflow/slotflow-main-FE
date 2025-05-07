import CommonTable from '@/components/common/CommonTable';
import { fetchServices } from '@/utils/apis/adminService.api';
import ServiceAddingForm from '@/components/form/AdminForms/ServiceForm';
import { AdminAppServicesTableColumns } from '@/components/table/adminTableColumns';
import { AdminFetchAllServices } from '@/utils/interface/api/adminServiceApiInterface';
import { AdminAppServicesTableColumnsProps } from '@/utils/interface/tableColumnInterface';

const AdminServicesPage = () => {

  return (
    <>
      <div className='flex'>
        <div className='w-8/12'>
          <CommonTable<AdminFetchAllServices, AdminAppServicesTableColumnsProps>
            fetchApiFunction={fetchServices}
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