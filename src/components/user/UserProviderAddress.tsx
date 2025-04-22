import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DataFetchingError from '../common/DataFetchingError';
import { userFetchProviderAddress } from '@/utils/apis/user.api';
import InfoDisplayComponent from '../common/InfoDisplayComponent';
import ShimmerProfileDetails from '../shimmers/ShimmerProfileDetails';
import { UserProviderAddressProps } from '@/utils/interface/userInterface';

const UserProviderAddress : React.FC<UserProviderAddressProps> = ({ _id }) => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => userFetchProviderAddress(_id),
        queryKey: ["PAddress", _id]
    })
    
    if (isError) {
        return (
            <DataFetchingError message={error.message} />
        )
    }

    if (isLoading) {
        return (
            <div className="w-full mx-auto md:flex justify-start flex-grow bg">
                <ShimmerProfileDetails row={9} />
            </div>
        )
    }

    if (!data) {
        return <DataFetchingError message="No address found." />;
    }

    return (
        <div className="w-full mx-auto py-6 rounded-lg">
            <table className="table-auto border-collapse border border-[var(--boxBorder)] w-full">
                <tbody>
                    <InfoDisplayComponent label="Address Line" value={data?.addressLine} />
                    <InfoDisplayComponent label="Place" value={data?.place} />
                    <InfoDisplayComponent label="City" value={data?.city} />
                    <InfoDisplayComponent label="Phone" value={data?.phone} />
                    <InfoDisplayComponent label="State" value={data?.state} />
                    <InfoDisplayComponent label="Pincode" value={data?.pincode} />
                    <InfoDisplayComponent label="Distrcit" value={data?.district} />
                    <InfoDisplayComponent label="Google Map Link" value={data?.googleMapLink} link={true}/>
                    <InfoDisplayComponent label="Country" value={data?.country} />
                </tbody>
            </table>
        </div>
    )
}

export default UserProviderAddress