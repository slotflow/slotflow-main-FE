import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateUserProfileImageApiResponse, UserFetchProviderAvailabilityApiResponse, UserFetchProviderServiceApiResponse } from "../api/userApiInterface";
import { ProviderFetchServiceAvailabilityApiResponse, ProviderFetchServiceDetailsApiResponse, ProviderUpdateProfileImageApiResponse } from "../api/providerApiInterface";
import { Provider } from "../entityInterface/providerInterface";
import { AdminFetchProviderAvailabilityApiResponse, AdminFetchProviderServiceApiResponse } from "../api/adminProviderApiInterface";

// **** Common component interfaces used in components / common folder **** \\

// profile head compoenent props interface
export interface ProfileHeaderComponentProps {
    updation: boolean;
    updateProfileImageApiFunction?: ReturnType<typeof createAsyncThunk<
        ProviderUpdateProfileImageApiResponse | UpdateUserProfileImageApiResponse,
        FormData
    >>;
    profileImage?: string;
}


// Provider service availabilit component props interface
type FetchApiFunctionUserOrAdminRequestPayloadProps = {
    providerId: Provider["_id"]
    date: Date
}
export type ProviderApiFunctionForPSAcomponent = (date: Date) => Promise<ProviderFetchServiceAvailabilityApiResponse>;
export type UserOrAdminApiFunctionForPSAcomponent = (payload: FetchApiFunctionUserOrAdminRequestPayloadProps) => Promise<UserFetchProviderAvailabilityApiResponse | AdminFetchProviderAvailabilityApiResponse>;
type FetchApiFunction = ProviderApiFunctionForPSAcomponent | UserOrAdminApiFunctionForPSAcomponent;
export interface ProviderServiceAvailabilityComponentProps {
    providerId?: string
    fetchApiFuntion: FetchApiFunction;
    queryKey: string;
    role?: string;
}


// Provider Service details showing component props interface
export interface ProviderServiceDetailsComponentProps {
    providerId?: Provider["_id"];
    fetchApiFunction: (providerId?: Provider["_id"]) => Promise<
        AdminFetchProviderServiceApiResponse |
        ProviderFetchServiceDetailsApiResponse |
        UserFetchProviderServiceApiResponse
    >;
    queryKey: string;
    isUser?: boolean;
    shimmerRow?: number;
}