import { Provider } from "../entityInterface/providerInterface";

// admin fetch provider payments compoenent props interface
export interface AdminFetchProviderPaymentsComponentProps {
    providerId : Provider["_id"];
}

// admin fetch provider subscriptions component props interface
export interface AdminFetchProviderSubscriptionsComponentProps {
    providerId: Provider["_id"];
}