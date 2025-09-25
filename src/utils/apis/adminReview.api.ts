import { axiosInstance } from "@/lib/axios";
import { Review } from "../interface/entityInterface/reviewInterface";

export const adminChangeReviewBlockStatus = async (reviewId: Review["_id"]): Promise<number> => {
    const response = await axiosInstance.patch(`/reviews/${reviewId}`);
    return response.status;
}