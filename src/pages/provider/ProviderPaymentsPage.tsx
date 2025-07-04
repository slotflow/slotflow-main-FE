import CommonTable from '@/components/common/CommonTable';
import { PaymentsTableColumns } from '@/components/table/tableColumns/commonTableColumns';
import { providerFetchProviderPayments } from '@/utils/apis/provider.api';
import { FetchPaymentsResponse } from '@/utils/interface/api/commonApiInterface';

const ProviderPaymentsPage = () => {

  return (
    <CommonTable<FetchPaymentsResponse,FetchPaymentsResponse>
      fetchApiFunction={providerFetchProviderPayments}
      queryKey='payments'
      heading='Payments'
      column={PaymentsTableColumns}
      columnsCount={7}
    />
  )
}

export default ProviderPaymentsPage