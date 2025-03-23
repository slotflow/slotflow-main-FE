import { Provider } from "./providerInterface";

// **** Admin Provider Api Interface **** \\

// Api Common Response
interface ApiCommonResponse {
    success: boolean;
    message: string;
}

// Admin fetch all providers api request payload type, used in adminProviderApi
export type FetchAllProvidersQuestPayload = Pick<Provider, "_id" | "username" | "email" | "isBlocked" | "isAdminVerified">

// Admin approve provider api request payload interface used in adminProviderApi
type ApproveProviderResponse = Pick<Provider, "_id" | "isAdminVerified">;
export interface AdminApproveProviderResponse extends ApiCommonResponse{
    updatedProvider: ApproveProviderResponse
}

// Admin approve aprovider api response interface used in adminProviderApi
export interface AdminApproveProviderRequestPayload {
    providerId: string;
}