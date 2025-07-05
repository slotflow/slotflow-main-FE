import CommonTable from '@/components/common/CommonTable';
import { providerFetchProviderPayments } from '@/utils/apis/provider.api';
import { FetchPaymentsResponse } from '@/utils/interface/api/commonApiInterface';
import { PaymentsTableColumns } from '@/components/table/tableColumns/commonTableColumns';

const ProviderPaymentsPage = () => {

  return (
    <CommonTable<FetchPaymentsResponse>
      fetchApiFunction={providerFetchProviderPayments}
      queryKey='payments'
      heading='Payments'
      column={PaymentsTableColumns}
      columnsCount={7}
    />
  )
}

export default ProviderPaymentsPage