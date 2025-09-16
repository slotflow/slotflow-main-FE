import CommonTable from '@/components/common/CommonTable';
import { providerFetchBookingAppoinments } from '@/utils/apis/provider.api';
import { FetchBookingsResponse } from '@/utils/interface/api/commonApiInterface';
import { useProviderAppointmentActions } from '@/utils/hooks/providerHooks/useProviderAppointmentActions';
import { ProviderAppointmentsBookingTableColumns } from '@/components/table/tableColumns/ProviderAppointmentsTableColumn';

const ProviderAppointmentsPage = () => {

  const {
    handleChangeAppointmentStatus,
    handleProviderJoinCall,
    handleNavigateToAppointmentDetailPage
  } = useProviderAppointmentActions();
  
  const columns = ProviderAppointmentsBookingTableColumns(
    handleChangeAppointmentStatus,
    handleProviderJoinCall,
    handleNavigateToAppointmentDetailPage
  );

  return (
    <CommonTable<FetchBookingsResponse>
      fetchApiFunction={providerFetchBookingAppoinments}
      queryKey='appointments'
      heading='Appointments'
      column={columns}
      columnsCount={6}
    />
  )
}

export default ProviderAppointmentsPage