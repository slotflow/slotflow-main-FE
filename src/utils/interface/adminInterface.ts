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



// **** Admin Slice **** \\

// Admin Slice state interface used in adminSlice
export interface stateVariables {
    adminFormloading: boolean;
}