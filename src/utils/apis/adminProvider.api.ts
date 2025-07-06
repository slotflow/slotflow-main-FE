import axiosInstance from "@/lib/axios";
import {
    AdminApproveProviderResponse,
    AdminFetchAllProvidersResponse,
    AdminFetchProviderAddressResponse,
    AdminFetchProviderServiceResponse,
    AdminChangeProviderTrustTagRequest,
    AdminChangeProviderTrustTagResponse,
    AdminChangeProviderBlockStatusRequest,
    AdminFetchProviderAvailabilityRequest,
    AdminFetchProviderAvailabilityResponse,
    AdminChangeProviderBlockStatusResponse,
    AdminFetchProviderProfileDetailsResponse,
} from "../interface/api/adminProviderApiInterface";
import { buildQueryParams, parseNewCommonResponse } from "../helper";
import { Provider } from "../interface/entityInterface/providerInterface";
import { FetchFunctionParams, ApiPaginatedResponse } from "../interface/commonInterface";
import { FetchPaymentsResponse, FetchProviderSubscriptionsResponse } from "../interface/api/commonApiInterface";

export const adminFetchAllProviders = async (params?: FetchFunctionParams): Promise<ApiPaginatedResponse<AdminFetchAllProvidersResponse>> => {
    const query = buildQueryParams(params);
    const response = await axiosInstance.get(`/admin/providers${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<AdminFetchAllProvidersResponse>(response.data);
};

export const adminApproveProvider = async (data : {providerId : Provider["_id"]}): Promise<ApiPaginatedResponse<AdminApproveProviderResponse>> => {
    const response = await axiosInstance.patch(`/admin/approveProvider`, {data});
    return response.data;
}

export const adminChangeProviderBlockStatus = async (data: AdminChangeProviderBlockStatusRequest): Promise<ApiPaginatedResponse<AdminChangeProviderBlockStatusResponse>> => {
    const response = await axiosInstance.patch(`/admin/changeProviderBlockStatus`, data);
    return response.data;
}

export const adminChangeProviderTrustTag = async (data: AdminChangeProviderTrustTagRequest): Promise<ApiPaginatedResponse<AdminChangeProviderTrustTagResponse>> => {
    const response = await axiosInstance.patch(`/admin/changeProvidertrustedTag`, data);
    return response.data;
}

export const adminFetchProviderProfileDetails = async (providerId: Provider["_id"]): Promise<AdminFetchProviderProfileDetailsResponse> => {
    const response = await axiosInstance.get(`/admin/fetchProviderDetails/${providerId}`);
    return response.data.data;
}

export const adminFetchProviderAddress = async (providerId: Provider["_id"]): Promise<AdminFetchProviderAddressResponse> => {
    const response = await axiosInstance.get(`/admin/fetchProviderAddress/${providerId}`);
    return response.data.data;
}

export const adminFetchProviderService = async (providerId: Provider["_id"]): Promise<AdminFetchProviderServiceResponse> => {
    const response = await axiosInstance.get(`/admin/fetchProviderService/${providerId}`);
    return response.data.data;
}

export const adminFetchProviderServiceAvailability = async ({date, providerId}: AdminFetchProviderAvailabilityRequest): Promise<AdminFetchProviderAvailabilityResponse> => {
    const response = await axiosInstance.get(`/admin/fetchProviderServiceAvailability/${providerId}`, {
        params : {
            date : date.toISOString()
        }
    });
    return response.data.data;
}

export const adminFetchProviderSubscriptions = async (params: FetchFunctionParams<Provider["_id"]>) : Promise<ApiPaginatedResponse<FetchProviderSubscriptionsResponse>> => {
    const { id, pagination } = params;
    const query = buildQueryParams({ pagination });
    const response = await axiosInstance.get(`/admin/fetchProviderSubscriptions/${id}${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchProviderSubscriptionsResponse>(response.data);
}

export const adminFetchProviderPayments = async (params: FetchFunctionParams<Provider["_id"]>): Promise<ApiPaginatedResponse<FetchPaymentsResponse>> => {
    const { id, pagination } = params;
    const query = buildQueryParams({ pagination });
    const response = await axiosInstance.get(`/admin/fetchProviderPayments/${id}${query ? `?${query}` : ''}`);
    return parseNewCommonResponse<FetchPaymentsResponse>(response.data);
}

