import CommonTable from '../common/CommonTable';
import { fetchProviderSubscriptions } from '@/utils/apis/provider.api';
import { ProviderSubscriptionsTableColumns } from '../table/providerTableColumns';
import { ProviderSubscriptionsTableColumnsProps } from '@/utils/interface/tableColumnInterface';
import { ProviderFetchSubscriptionHistoryResponseProps } from '@/utils/interface/api/providerApiInterface';

const SubscriptionHistory = () => {
    return (
        <CommonTable<ProviderFetchSubscriptionHistoryResponseProps, ProviderSubscriptionsTableColumnsProps>
            fetchApiFunction={fetchProviderSubscriptions}
            queryKey='subscriptions'
            heading='Subscription History'
            headingClassName="mt-5"
            column={ProviderSubscriptionsTableColumns}
            columnsCount={5}
        />
    );
}

export default SubscriptionHistory