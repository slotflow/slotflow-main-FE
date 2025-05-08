import CommonTable from '@/components/common/CommonTable';
import { fetchProviderPayments } from '@/utils/apis/provider.api';
import { ProviderPaymentsTableColumns } from '@/components/table/providerTableColumns';
import { ProviderPaymentsTableColumnsProps } from '@/utils/interface/tableColumnInterface';
import { ProviderFetchPaymentsResponseProps } from '@/utils/interface/api/providerApiInterface';

const ProviderPaymentsPage = () => {

  return (
    <CommonTable<ProviderFetchPaymentsResponseProps, ProviderPaymentsTableColumnsProps>
      fetchApiFunction={fetchProviderPayments}
      queryKey='payments'
      heading='Payments'
      column={ProviderPaymentsTableColumns}
      columnsCount={7}
    />
  )
}

export default ProviderPaymentsPage