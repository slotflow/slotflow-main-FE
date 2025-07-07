import CommonTable from '@/components/common/CommonTable';
import { providerFetchBookingAppoinments } from '@/utils/apis/provider.api';
import { ProviderAppointmentsBookingTableColumns } from '@/components/table/tableColumns/providerTableColumns';
import { FetchBookingsResponse } from '@/utils/interface/api/commonApiInterface';

const ProviderAppointmentsPage = () => {
  return (
    <CommonTable<FetchBookingsResponse>
      fetchApiFunction={providerFetchBookingAppoinments}
      queryKey='appointments'
      heading='Appointments'
      column={ProviderAppointmentsBookingTableColumns}
      columnsCount={6}
    />
  )
}

export default ProviderAppointmentsPage