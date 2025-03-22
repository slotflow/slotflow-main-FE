import { Provider } from "@/utils/interface";
import { useQuery } from "@tanstack/react-query";
import DataFetchingError from "../common/DataFetchingError";
import { fetchProviderDetails } from "@/utils/apis/adminProvider.api";
import ShimmerProfileDetails from "../shimmers/ShimmerProfileDetails";
import { memo } from "react";
import InfoDisplayComponent from "./InfoDisplayComponent";
import { copyToClipboard, formatDate } from "@/utils/helper";

type ProviderIdOnly = Pick<Provider, '_id'>;
interface AdminProviderDetailsProps extends ProviderIdOnly {
    onError: (hasError: boolean) => void;
    providerData: number;
}

const AdminProviderFUllPageDynamicSection: React.FC<AdminProviderDetailsProps> = memo(({ _id, onError, providerData }) => {

    let queryFn: () => Promise<Provider>;

    switch (providerData) {
        case 0: // Details
            queryFn = () => fetchProviderDetails(_id);
            break;
        // case 1: // Address
        // queryFn = () => fetchProviderAddress(_id);
        // break;
        // case 2: // Service
        // queryFn = () => fetchProviderService(_id);
        // break;
        // case 3: // Availability
        // queryFn = () => fetchProviderAvailability(_id);
        // break;
        default:
            queryFn = () => fetchProviderDetails(_id);
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['provider', _id],
        queryFn: queryFn
    })

    console.log("Data : ", data);

    if (isError) {
        onError(true);
        return (
            <DataFetchingError message={error.message} />
        )
    }

    if (isLoading) {
        onError(false);
        return (
            <div className="w-full mx-auto mt-8 md:flex justify-center flex-grow">
                <ShimmerProfileDetails row={4} />
                <ShimmerProfileDetails row={3} />
            </div>
        )
    }

    return providerData === 0 && (
        <div className="w-full mx-auto mt-8 p-6 rounded-lg">
            <table className="table-auto border-collapse border border-[var(--boxBorder)] w-full">
                <tbody>
                    <InfoDisplayComponent
                        label="Username"
                        value={data?.username}
                    />
                    <InfoDisplayComponent
                        label="Email"
                        value={data?.email}
                        copyToClipboard={copyToClipboard}
                    />
                    <InfoDisplayComponent
                        label="Phone Number"
                        value={data?.phone || 'Not yet added'}
                        copyToClipboard={copyToClipboard}
                    />
                    <InfoDisplayComponent
                        label="Joined On"
                        value={data?.createdAt}
                        formatDate={formatDate}
                    />
                    <InfoDisplayComponent
                        label="Email Verification"
                        value={data?.isEmailVerified}
                        isBoolean={true}
                    />
                    <InfoDisplayComponent
                        label="Account Status"
                        value={data?.isBlocked}
                        isBoolean={true}
                    />
                    <InfoDisplayComponent
                        label="Admin Verification"
                        value={data?.isAdminVerified}
                        isBoolean={true}
                    />
                </tbody>
            </table>
        </div>
    )
})

export default AdminProviderFUllPageDynamicSection