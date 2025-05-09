import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import DataFetchingError from '../DataFetchingError';
import InfoDisplayComponent from '../InfoDisplayComponent';
import ProfileDetailsShimmer from '@/components/shimmers/ProfileDetailsShimmer';
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
    isUser?: boolean
    setShowAddAddressBtn?: (show: boolean) => void;
}

const UserOrProviderAddressDetails: React.FC<UserOrProviderAddressDetailsComponentProps> = ({
    userOrProviderId,
    fetchApiFunction,
    quryKey,
    isUser,
    setShowAddAddressBtn
}) => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchApiFunction(userOrProviderId),
        queryKey: [quryKey],
        staleTime: 1 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (isUser && !data) {
            setShowAddAddressBtn?.(true);
        } else {
            setShowAddAddressBtn?.(false);
        }
    }, [data, isUser, setShowAddAddressBtn]);

    if (isError) {
        return <DataFetchingError message={error?.message} />
    };

    if (isLoading) {
        return <ProfileDetailsShimmer row={9} className='mt-2' />
    };

    if (!data) {
        return <DataFetchingError message="No address found." />;
    };

    return (
        <div className="border-[var(--boxBorder)] border rounded-md overflow-hidden w-full mt-2">
            <table className="table-auto w-full">
                <tbody className="w-1/2">
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