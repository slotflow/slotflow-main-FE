import { serviceColumns } from '@/components/table/columns'
import { DataTable } from '@/components/table/data-table'

const Services = () => {
    const services = [
        {_id : 1, name : "Doctor", isBlocked: false},
        {_id : 2, name : "Advocate", isBlocked: true},
        {_id : 3, name : "Astrologer", isBlocked: false},
        {_id : 4, name : "Real Estate Brocker", isBlocked: true},
        {_id : 5, name : "Reviewer", isBlocked: true},
    ]
  return (
    <>
    <h2 className="text-xl font-bold mb-4">Service Providers</h2>
    <DataTable columns={serviceColumns} data={services} />
    </>
  )
}

export default Services