import CommonTable from '@/components/common/CommonTable';
import { providerFetchProviderPayments } from '@/utils/apis/provider.api';
import { FetchPaymentsResponse } from '@/utils/interface/api/commonApiInterface';
import { PaymentsTableColumn } from '@/components/table/tableColumns/PaymentsTableColumn';

const ProviderPaymentsPage = () => {

  const column = PaymentsTableColumn();

  return (
    <CommonTable<FetchPaymentsResponse>
      fetchApiFunction={providerFetchProviderPayments}
      queryKey='payments'
      heading='Payments'
      column={column}
      columnsCount={7}
    />
  )
}

export default ProviderPaymentsPage