import CommonTable from '../common/CommonTable';
import { providerFetchProviderSubscriptions } from '@/utils/apis/provider.api';
import { ProviderSubscriptionsTableColumns } from '../table/tableColumns/providerTableColumns';
import { ProviderSubscriptionsTableColumnsProps } from '@/utils/interface/tableColumnInterface';
import { ProviderFetchSubscriptionHistoryApiResponse } from '@/utils/interface/api/providerApiInterface';

const ProviderSubscriptionHistory = () => {
    return (
        <CommonTable<ProviderFetchSubscriptionHistoryApiResponse, ProviderSubscriptionsTableColumnsProps>
            fetchApiFunction={providerFetchProviderSubscriptions}
            queryKey='subscriptions'
            heading='Subscription History'
            headingClassName="mt-5"
            column={ProviderSubscriptionsTableColumns}
            columnsCount={5}
        />
    );
}

export default ProviderSubscriptionHistory