import ServiceAddingForm from '@/components/form/ServiceAddingForm'
import ShimmerTable from '@/components/shimmers/ShimmerTable'
import ShimmerTableTop from '@/components/shimmers/ShimmerTableTop'
import { serviceColumns } from '@/components/table/columns'
import { DataTable } from '@/components/table/data-table'
import { fetchServices } from '@/utils/apis/admin.api'
import { useQuery } from '@tanstack/react-query'

const Services = () => {

  const { data: services, isLoading, isError, error } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  console.log(services)

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