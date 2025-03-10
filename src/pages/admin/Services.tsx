import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/table/data-table';
import { serviceColumns } from '@/components/table/columns';
import ShimmerTable from '@/components/shimmers/ShimmerTable';
import { fetchServices } from '@/utils/apis/admin_service_api';
import ShimmerTableTop from '@/components/shimmers/ShimmerTableTop';
import ServiceAddingForm from '@/components/form/ServiceAddingForm';

const Services = () => {

  const { data: services, isLoading, isError, error } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });


  if (isError) return <div>Error {error.message}</div>

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Services</h2>
      <div className='flex h-screen'>
        <div className='w-8/12'>
        {isLoading ?
        <>
          <ShimmerTableTop />
          <ShimmerTable />
        </>
        :
          <DataTable columns={serviceColumns} data={services} />
        }
        </div>
        <div className='w-4/12 mx-2'>
          <ServiceAddingForm />
        </div>
      </div>
    </>
  )
}

export default Services