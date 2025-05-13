import CommonTable from '@/components/common/CommonTable';
import { providerFetchProviderPayments } from '@/utils/apis/provider.api';
import { ProviderPaymentsTableColumnsProps } from '@/utils/interface/tableColumnInterface';
import { ProviderFetchPaymentsApiResponse } from '@/utils/interface/api/providerApiInterface';
import { ProviderPaymentsTableColumns } from '@/components/table/tableColumns/providerTableColumns';

const ProviderPaymentsPage = () => {

  return (
    <CommonTable<ProviderFetchPaymentsApiResponse, ProviderPaymentsTableColumnsProps>
      fetchApiFunction={providerFetchProviderPayments}
      queryKey='payments'
      heading='Payments'
      column={ProviderPaymentsTableColumns}
      columnsCount={7}
    />
  )
}

export default ProviderPaymentsPage