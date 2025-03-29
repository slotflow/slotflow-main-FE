import { Provider } from "./providerInterface";
import { Address } from "./addressInterface";
import { ProviderService } from "./providerServiceInterface";

// **** Admin Provider Interfaces used in compoenents / admin **** \\
// AdminProviderServiceAvailability compoenent using for the custom props
type ProviderIdOnlyForProviderServiceAvailability = Pick<Provider, '_id'>;
export interface AdminProviderServiceAvailabilityProps extends ProviderIdOnlyForProviderServiceAvailability {
    onError: (hasError: boolean) => void;
}

// AdminProviderAddress component using for the custom props
type ProviderIdOnlyForProviderAddress = Pick<Address, 'userId'>;
export interface AdminProviderAddressProps extends ProviderIdOnlyForProviderAddress {
    onError: (hasError: boolean) => void;
}

// AdminProviderDetails component using for the custom props
type ProviderIdOnlyForProviderDetails = Pick<Provider, '_id'>;
export interface AdminProviderDetailsProps extends ProviderIdOnlyForProviderDetails {
    onError: (hasError: boolean) => void;
}

// AdminProviderService compoenent using for the custom props
type ProviderIdOnlyForProviderService = Pick<ProviderService, 'providerId'>;
export interface AdminProviderServiceProps extends ProviderIdOnlyForProviderService {
    onError: (hasError: boolean) => void;
}



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