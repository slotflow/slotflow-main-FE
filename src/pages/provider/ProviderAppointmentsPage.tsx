import CommonTable from '@/components/common/CommonTable';
import { providerFetchAppoinments } from '@/utils/apis/provider.api';
import { ProviderAppointmentsBookingTableColumns } from '@/components/table/providerTableColumns';
import { ProviderFetchAppointmentsResponseProps } from '@/utils/interface/api/providerApiInterface';
import { ProviderAppointmentsBookingTableColumnProps } from '@/utils/interface/tableColumnInterface';

const ProviderAppointmentsPage = () => {
  return (
    <CommonTable<ProviderFetchAppointmentsResponseProps, ProviderAppointmentsBookingTableColumnProps>
      fetchApiFunction={providerFetchAppoinments}
      queryKey='appointments'
      heading='Appointments'
      column={ProviderAppointmentsBookingTableColumns}
      columnsCount={6}
    />
  )
}

export default ProviderAppointmentsPage