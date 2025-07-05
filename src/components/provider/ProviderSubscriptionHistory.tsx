import CommonTable from '../common/CommonTable';
import { providerFetchProviderSubscriptions } from '@/utils/apis/provider.api';
import { FetchProviderSubscriptionsResponse } from '@/utils/interface/api/commonApiInterface';
import { ProvidersSubscriptionsTableColumns } from '../table/tableColumns/commonTableColumns';

const ProviderSubscriptionHistory = () => {
    return (
        <CommonTable<FetchProviderSubscriptionsResponse>
            fetchApiFunction={providerFetchProviderSubscriptions}
            queryKey='subscriptions'
            heading='Subscription History'
            headingClassName="mt-5"
            column={ProvidersSubscriptionsTableColumns}
            columnsCount={5}
        />
    );
}

export default ProviderSubscriptionHistory