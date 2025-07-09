import { formatDate } from "@/utils/helper";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DataFetchingError from "@/components/common/DataFetchingError";
import InfoDisplayComponent from "@/components/common/InfoDisplayComponent";
import ProfileDetailsShimmer from "@/components/shimmers/ProfileDetailsShimmer";
import { adminFetchSubscriptionDetails } from "@/utils/apis/adminSubscription.api";

const AdminSubcriptionDetailedViewPage = () => {
    const { subscriptionId } = useParams<{ subscriptionId: string }>();

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => adminFetchSubscriptionDetails(subscriptionId!),
        queryKey: ["subcription"],
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    return (
        <div className="w-full mx-auto mt-0 md:flex justify-start flex-grow bg">
            {isError && error ? (
                <DataFetchingError message={(error as Error).message} />
            ) : isLoading ? (
                <ProfileDetailsShimmer row={14} />
            ) : data ? (
                <div className="w-full">
                    <h2 className="text-2xl font-bold mb-4">Subscription Details</h2>
                    <table className="table-auto border-collapse border border-[var(--boxBorder)] w-full">
                        <tbody>
                            <InfoDisplayComponent label="Subscription Status" value={data?.subscriptionStatus} />
                            <InfoDisplayComponent label="Subscribed on" value={data?.createdAt} formatDate={formatDate} />
                            <InfoDisplayComponent label="Subscription started on" value={data?.startDate} formatDate={formatDate} />
                            <InfoDisplayComponent label="Subscription expires on" value={data?.endDate} formatDate={formatDate} />
                            <InfoDisplayComponent label="Subscribed Plan Name" value={data?.subscriptionPlanId?.planName} />
                            <InfoDisplayComponent label="Subscribed Plan Price" value={data?.subscriptionPlanId?.price} isPrice={true} />
                            <InfoDisplayComponent label="Subscription Max Bookings" value={data?.subscriptionPlanId?.maxBookingPerMonth} />
                            <InfoDisplayComponent label="Subscription Ad Visibility" value={data?.subscriptionPlanId?.adVisibility} isBoolean={true} />
                            <InfoDisplayComponent label="Payment Gateway" value={data?.paymentId?.paymentGateway} />
                            <InfoDisplayComponent label="Payment Transaction Id" value={data?.paymentId?.transactionId} />
                            <InfoDisplayComponent label="Payment For" value={data?.paymentId?.paymentFor} />
                            <InfoDisplayComponent label="Payment Status" value={data?.paymentId?.paymentStatus} />
                            <InfoDisplayComponent label="Payment Method" value={data?.paymentId?.paymentMethod} />
                            <InfoDisplayComponent label="Payment Base Amount" value={data?.paymentId?.initialAmount} isPrice={true} />
                            <InfoDisplayComponent label="Payment Discount Amount" value={data?.paymentId?.discountAmount} isPrice={true} />
                            <InfoDisplayComponent label="Payment Total Amount" value={data?.paymentId?.totalAmount} isPrice={true} />
                        </tbody>
                    </table>
                </div>
            ) : (
                <DataFetchingError message="No date found" />
            )}
        </div>
    )
}

export default AdminSubcriptionDetailedViewPage