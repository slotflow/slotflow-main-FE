import { axiosInstance } from "@/lib/axios";
import { buildQueryParams } from "../helper";
import { Review } from "../interface/entityInterface/reviewInterface";
import { FetchReviewsResponse } from "../interface/api/commonApiInterface";
import { ApiBaseResponse, ApiPaginatedResponse, FetchFunctionParams } from "../interface/commonInterface";

export const adminFetchAllReviews = async (payload: FetchFunctionParams): Promise<ApiPaginatedResponse<FetchReviewsResponse>> => {
    const { id } = payload;
    const refactoredQuery = buildQueryParams(payload);
    const response = await axiosInstance.get(`/admin/reviews/${id}${refactoredQuery ? `?${refactoredQuery}` : ''}`);
    return response.data;
}

export const adminChangeReviewBlockStatus = async (reviewId: Review["_id"]): Promise<ApiBaseResponse> => {
    const response = await axiosInstance.patch(`/admin/reviews/${reviewId}`);
    return response.data;
}