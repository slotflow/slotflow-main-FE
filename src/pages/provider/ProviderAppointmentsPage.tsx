import CommonTable from '@/components/common/CommonTable';
import { providerFetchBookingAppoinments } from '@/utils/apis/provider.api';
import { ProviderAppointmentsBookingTableColumns } from '@/components/table/providerTableColumns';
import { ProviderBookingAppointmentsTableColumnProps } from '@/utils/interface/tableColumnInterface';
import { ProviderFetchBookingAppointmentsResponseProps } from '@/utils/interface/api/providerApiInterface';

const ProviderAppointmentsPage = () => {
  return (
    <CommonTable<ProviderFetchBookingAppointmentsResponseProps, ProviderBookingAppointmentsTableColumnProps>
      fetchApiFunction={providerFetchBookingAppoinments}
      queryKey='appointments'
      heading='Appointments'
      column={ProviderAppointmentsBookingTableColumns}
      columnsCount={6}
    />
  )
}

export default ProviderAppointmentsPage