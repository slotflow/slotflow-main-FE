import { Provider } from "../entityInterface/providerInterface";
import { FetchPaymentsResponse } from "../api/commonApiInterface";
import { ApiPaginatedResponse, FetchFunctionParams } from "../commonInterface";

// admin fetch provider payments compoenent props interface
export interface AdminFetchProviderPaymentsComponentProps {
    id: string;
    fethFunction: (params: FetchFunctionParams) => Promise<ApiPaginatedResponse<FetchPaymentsResponse>>;
}

// admin fetch provider subscriptions component props interface
export interface AdminFetchProviderSubscriptionsComponentProps {
    providerId: Provider["_id"];
}