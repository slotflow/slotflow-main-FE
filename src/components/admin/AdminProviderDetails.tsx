import { memo } from "react";
import { Provider } from "@/utils/interface";
import { useQuery } from "@tanstack/react-query";
import InfoDisplayComponent from "./InfoDisplayComponent";
import DataFetchingError from "../common/DataFetchingError";
import { copyToClipboard, formatDate } from "@/utils/helper";
import { fetchProviderDetails } from "@/utils/apis/adminProvider.api";
import ShimmerProfileDetails from "../shimmers/ShimmerProfileDetails";

type ProviderIdOnly = Pick<Provider, '_id'>;
interface AdminProviderDetailsProps extends ProviderIdOnly {
    onError: (hasError: boolean) => void;
}

const AdminProviderDetails: React.FC<AdminProviderDetailsProps> = memo(({ _id, onError }) => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchProviderDetails(_id),
        queryKey: ["Provider", _id]
    })

    if (isError) {
        onError(true);
        return (
            <DataFetchingError message={error.message} />
        )
    }

    if (isLoading) {
        onError(false);
        return (
            <div className="w-full mx-auto mt-8 md:flex justify-start flex-grow bg">
                <ShimmerProfileDetails row={7} />
            </div>
        )
    }

    return (
        <div className="w-full mx-auto mt-8 p-6 rounded-lg">
            <table className="table-auto border-collapse border border-[var(--boxBorder)] w-full">
                <tbody>
                    <InfoDisplayComponent label="Username" value={data?.username} />
                    <InfoDisplayComponent label="Email" value={data?.email} copyToClipboard={copyToClipboard} />
                    <InfoDisplayComponent label="Phone Number" value={data?.phone || 'Not yet added'} copyToClipboard={copyToClipboard} />
                    <InfoDisplayComponent label="Joined On" value={data?.createdAt} formatDate={formatDate} />
                    <InfoDisplayComponent label="Email Verified" value={data?.isEmailVerified} isBoolean={true} />
                    <InfoDisplayComponent label="Account Blocked" value={data?.isBlocked} isBoolean={true} />
                    <InfoDisplayComponent label="Admin Verified" value={data?.isAdminVerified} isBoolean={true} />
                </tbody>
            </table>
        </div>
    )
})

export default AdminProviderDetails