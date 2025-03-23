import { memo } from 'react'
import { Address } from '@/utils/interface';
import { useQuery } from '@tanstack/react-query';
import InfoDisplayComponent from './InfoDisplayComponent'
import DataFetchingError from '../common/DataFetchingError';
import { fetchProviderAddress } from '@/utils/apis/adminProvider.api';
import ShimmerProfileDetails from '../shimmers/ShimmerProfileDetails';

type ProviderIdOnly = Pick<Address, 'userId'>;
interface AdminProviderAddressProps extends ProviderIdOnly {
    onError: (hasError: boolean) => void;
}

const AdminProviderAddress: React.FC<AdminProviderAddressProps> = memo(({ userId, onError }) => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchProviderAddress(userId),
        queryKey: ["PAddress", userId]
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
                <ShimmerProfileDetails row={9} />
            </div>
        )
    }
    return (
        <div className="w-full mx-auto mt-8 p-6 rounded-lg">
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