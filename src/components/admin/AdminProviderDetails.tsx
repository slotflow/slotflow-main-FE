import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import DataFetchingError from "../common/DataFetchingError";
import { copyToClipboard, formatDate } from "@/utils/helper";
import InfoDisplayComponent from "../common/InfoDisplayComponent";
import { fetchProviderDetails } from "@/utils/apis/adminProvider.api";
import ShimmerProfileDetails from "../shimmers/ShimmerProfileDetails";
import { AdminProviderDetailsProps } from "@/utils/interface/adminInterface";

const AdminProviderDetails: React.FC<AdminProviderDetailsProps> = memo(({ _id }) => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchProviderDetails(_id),
        queryKey: ["Provider", _id],
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })

    if (isError) {
        return (
            <DataFetchingError message={error.message} />
        )
    }

    if (isLoading) {
        return (
            <div className="w-full mx-auto md:flex justify-start flex-grow bg">
                <ShimmerProfileDetails row={7} />
            </div>
        )
    }

    if (!data) {
        return <DataFetchingError message="No details found." />;
    }

    return (
        <div className="w-full mx-auto py-6 rounded-lg">
            <table className="table-auto border-collapse border border-[var(--boxBorder)] w-full">
                <tbody>
                    <InfoDisplayComponent label="Username" value={data?.username} />
                    <InfoDisplayComponent label="Email" value={data?.email} copyToClipboard={copyToClipboard} />
                    <InfoDisplayComponent label="Phone Number" value={data?.phone || 'Not yet added'} copyToClipboard={copyToClipboard} />
                    <InfoDisplayComponent label="Joined On" value={data?.createdAt} formatDate={formatDate} />
                    <InfoDisplayComponent label="Email Verified" value={data?.isEmailVerified} isBoolean={true} />
                    <InfoDisplayComponent label="Account Blocked" value={data?.isBlocked} isBoolean={true} />
                    <InfoDisplayComponent label="Admin Verified" value={data?.isAdminVerified} isBoolean={true} />
                    <InfoDisplayComponent label="Slotflow Trsuted" value={data?.trustedBySlotflow} isBoolean={true} />
                </tbody>
            </table>
        </div>
    )
})

export default AdminProviderDetails