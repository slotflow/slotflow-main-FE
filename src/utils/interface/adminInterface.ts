import { Provider } from "./providerInterface";

// **** Admin Provider Interfaces used in compoenents / admin **** \\



// Admin fetch provider subscriptions component interface
export type AdminFetchProviderSubscriptions = Pick<Provider, "_id">;

// Admin fetch provider payments component interface
export type AdminFetchProviderPayments = Pick<Provider, "_id">;



// **** Admin Provider action Interface **** \\
// Approve provider
export interface ProviderCommonProps {
    providerId: string;
}

// Change block status
export interface ChangeProviderBlockStatusProps extends ProviderCommonProps{
    providerId: string;
    status: boolean;
}



// **** Admin service action interface **** \\
// Change service block status interface
export interface ChangeServiceBlockStatusProps {
    serviceId: string,
    status: boolean,
}



// **** Admin User action interface **** \\
// Change user block status interface
export interface ChangeUserStatusProps {
    userId: string;
    status: boolean;
}



// Admin Provider trust tag change action button interface
export interface ChangeProviderTrustTagProps {
    providerId: string,
    trustedBySlotflow: boolean,
}