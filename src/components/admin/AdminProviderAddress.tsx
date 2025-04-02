import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import DataFetchingError from '../common/DataFetchingError';
import InfoDisplayComponent from '../common/InfoDisplayComponent';
import { fetchProviderAddress } from '@/utils/apis/adminProvider.api';
import ShimmerProfileDetails from '../shimmers/ShimmerProfileDetails';
import { AdminProviderAddressProps } from '@/utils/interface/adminInterface';

const AdminProviderAddress: React.FC<AdminProviderAddressProps> = memo(({ userId }) => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchProviderAddress(userId),
        queryKey: ["PAddress", userId]
    })

    
    if (isError) {
        return (
            <DataFetchingError message={error.message} />
        )
    }

    if (isLoading) {
        return (
            <div className="w-full mx-auto mt-8 md:flex justify-start flex-grow bg">
                <ShimmerProfileDetails row={9} />
            </div>
        )
    }

    if (!data) {
        return <DataFetchingError message="No address found." />;
    }

    return (
        <div className="w-full mx-auto mt-8 py-6 rounded-lg">
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
})

export default AdminProviderAddress