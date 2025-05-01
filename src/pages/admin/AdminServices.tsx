import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/table/data-table';
import ShimmerTable from '@/components/shimmers/ShimmerTable';
import { fetchServices } from '@/utils/apis/adminService.api';
import ShimmerTableTop from '@/components/shimmers/ShimmerTableTop';
import DataFetchingError from '@/components/common/DataFetchingError';
import ServiceAddingForm from '@/components/form/AdminForms/ServiceForm';
import { AdminAppServicesTableColumns } from '@/components/table/adminTableColumns';

const AdminServices = () => {

  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchServices,
    queryKey: ["services"],
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isError) return <DataFetchingError message={error.message} />

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Services</h2>
      <div className='flex'>
        <div className='w-8/12'>
          {isLoading ? (
            <>
              <ShimmerTableTop />
              <ShimmerTable />
            </>
          )
            : data ? (
              <DataTable columns={AdminAppServicesTableColumns} data={data} />
            ) : (
              <DataFetchingError message={"No data found"} />
            )}
        </div>
        <div className='w-4/12 mx-2'>
          <ServiceAddingForm />
        </div>
      </div>
    </>
  )
}

export default AdminServices