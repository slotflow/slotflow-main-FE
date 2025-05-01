import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DataFetchingError from '../common/DataFetchingError';
import { userFetchProviderService } from '@/utils/apis/user.api';
import InfoDisplayComponent from '../common/InfoDisplayComponent';
import ShimmerProfileDetails from '../shimmers/ShimmerProfileDetails';
import { UserProviderServiceProps } from '@/utils/interface/userInterface';

const UserProviderService: React.FC<UserProviderServiceProps> = ({ _id }) => {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["PService", _id],
        queryFn: () => userFetchProviderService(_id),
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
                <ShimmerProfileDetails row={6} />
            </div>
        )
    }

    if (!data) {
        return <DataFetchingError message="No service found." />;
    }

    return (
        <div className="w-full mx-auto py-6 rounded-lg">
            <table className="table-auto border-collapse border border-[var(--boxBorder)] w-full">
                <tbody>
                    <InfoDisplayComponent label="Service Category" value={data?.serviceCategory.serviceName} />
                    <InfoDisplayComponent label="Service Name" value={data?.serviceName} />
                    <InfoDisplayComponent label="Service Description" value={data?.serviceDescription} />
                    <InfoDisplayComponent label="Service Price" value={data?.servicePrice} isPrice={true} />
                    <InfoDisplayComponent label="Provider Experience" value={data?.providerExperience} />
                </tbody>
            </table>
        </div>
    )
}

export default UserProviderService