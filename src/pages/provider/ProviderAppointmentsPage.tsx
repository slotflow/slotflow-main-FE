import CommonTable from '@/components/common/CommonTable';
import { providerFetchBookingAppoinments } from '@/utils/apis/provider.api';
import { ProviderBookingAppointmentsTableColumnProps } from '@/utils/interface/tableColumnInterface';
import { ProviderFetchBookingAppointmentsApiResponse } from '@/utils/interface/api/providerApiInterface';
import { ProviderAppointmentsBookingTableColumns } from '@/components/table/tableColumns/providerTableColumns';

const ProviderAppointmentsPage = () => {
  return (
    <CommonTable<ProviderFetchBookingAppointmentsApiResponse, ProviderBookingAppointmentsTableColumnProps>
      fetchApiFunction={providerFetchBookingAppoinments}
      queryKey='appointments'
      heading='Appointments'
      column={ProviderAppointmentsBookingTableColumns}
      columnsCount={6}
    />
  )
}

export default ProviderAppointmentsPage