import { TimeRange } from "../commonInterface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Provider } from "../entityInterface/providerInterface";
import { AdminFetchProviderAvailabilityResponse, AdminFetchProviderServiceResponse } from "../api/adminProviderApiInterface";
import { UpdateUserProfileImageResponse, UserFetchProviderAvailabilityResponse, UserFetchProviderServiceResponse } from "../api/userApiInterface";
import { ProviderFetchServiceAvailabilityResponse, ProviderFetchServiceDetailsResponse, ProviderUpdateProfileImageResponse } from "../api/providerApiInterface";


// **** Common component interfaces **** \\
// **** Used in components / common **** \\
// **** Used in components / chart **** \\

// **** 1.  profile head compoenent props interface
export interface ProfileHeaderComponentProps {
    updation: boolean;
    updateProfileImageApiFunction?: ReturnType<typeof createAsyncThunk<
        ProviderUpdateProfileImageResponse | UpdateUserProfileImageResponse,
        FormData
    >>;
    profileImage?: string;
}


// **** 2.  Provider service availabilit component props interface
type FetchApiFunctionUserOrAdminRequestPayloadProps = {
    providerId: Provider["_id"]
    date: Date
}
export type ProviderApiFunctionForPSAcomponent = (date: Date) => Promise<ProviderFetchServiceAvailabilityResponse>;
export type UserOrAdminApiFunctionForPSAcomponent = (payload: FetchApiFunctionUserOrAdminRequestPayloadProps) => Promise<UserFetchProviderAvailabilityResponse | AdminFetchProviderAvailabilityResponse>;
type FetchApiFunction = ProviderApiFunctionForPSAcomponent | UserOrAdminApiFunctionForPSAcomponent;
export interface ProviderServiceAvailabilityComponentProps {
    providerId?: string
    fetchApiFuntion: FetchApiFunction;
    queryKey: string;
    role?: string;
}


// **** 3.  Provider Service details showing component props interface
export interface ProviderServiceDetailsComponentProps {
    providerId?: Provider["_id"];
    fetchApiFunction: (providerId?: Provider["_id"]) => Promise<
    AdminFetchProviderServiceResponse |
    ProviderFetchServiceDetailsResponse |
    UserFetchProviderServiceResponse
    >;
    queryKey: string;
    isUser?: boolean;
    shimmerRow?: number;
}





// **** 4.1 DateSelect component interface
export interface DateSelectInterface {
    onValueChange: (value: TimeRange) => void;
    value: string;
}

export interface ChartHeaderInterface {
    title: string;
    description?: string;
    onValueChange: (value: TimeRange) => void;
    value: string;
}