import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import DataFetchingError from '../DataFetchingError';
import InfoDisplayComponent from '../InfoDisplayComponent';
import ShimmerProfileDetails from '@/components/shimmers/ShimmerProfileDetails';
import { ProviderFetchAddressResponseProps } from '@/utils/interface/api/providerApiInterface';
import { AdminFetchProviderAddressResponseProps } from '@/utils/interface/api/adminProviderApiInterface';
import { UserFetchProviderAddressResponseProps, UserFetchUserAddressResponse } from '@/utils/interface/api/userApiInterface';

interface UserOrProviderAddressDetailsComponentProps {
    userOrProviderId?: string;
    fetchApiFunction: (userOrProviderId?: string) => Promise<
        AdminFetchProviderAddressResponseProps |
        ProviderFetchAddressResponseProps |
        UserFetchUserAddressResponse |
        UserFetchProviderAddressResponseProps
    >;
    quryKey: string;
    addressUserType: "user" | "provider";
    authUserType: "admin" | "user" | "provider";
    setShowAddAddressBtn?: (show: boolean) => void;
}

const UserOrProviderAddressDetails: React.FC<UserOrProviderAddressDetailsComponentProps> = ({
    userOrProviderId,
    fetchApiFunction,
    quryKey,
    authUserType,
    addressUserType,
    setShowAddAddressBtn
}) => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchApiFunction(userOrProviderId),
        queryKey: [quryKey],
        staleTime: 1 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (authUserType === "user" && addressUserType === "user" && !data) {
            setShowAddAddressBtn?.(true);
        } else {
            setShowAddAddressBtn?.(false);
        }
    }, [data, authUserType, addressUserType]);

    if (isError) {
        return (
            <DataFetchingError message={error?.message} />
        )
    };

    if (isLoading) {
        return (
            <div className="w-full mx-auto md:flex justify-start flex-grow bg">
                <ShimmerProfileDetails row={9} />
            </div>
        )
    };

    if (!data) {
        return <DataFetchingError message="No address found." />;
    };

    return (
        <div className="w-full mx-auto py-6 rounded-lg">
            <table className="table-auto border-collapse border border-[var(--boxBorder)] w-full">
                <tbody>
                    <>
                        <InfoDisplayComponent label="Address Line" value={data?.addressLine} />
                        <InfoDisplayComponent label="Place" value={data?.place} />
                        <InfoDisplayComponent label="City" value={data?.city} />
                        <InfoDisplayComponent label="Phone" value={data?.phone} />
                        <InfoDisplayComponent label="State" value={data?.state} />
                        <InfoDisplayComponent label="Pincode" value={data?.pincode} />
                        <InfoDisplayComponent label="Distrcit" value={data?.district} />
                        <InfoDisplayComponent label="Google Map Link" value={data?.googleMapLink} link={true} />
                        <InfoDisplayComponent label="Country" value={data?.country} />
                    </>
                </tbody>
            </table>
        </div>
    )
};

export default UserOrProviderAddressDetails