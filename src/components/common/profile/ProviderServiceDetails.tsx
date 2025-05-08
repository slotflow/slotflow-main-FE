import React, { useState } from 'react';
import { ImageUpscale } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import DataFetchingError from '../DataFetchingError';
import InfoDisplayComponent from '../InfoDisplayComponent';
import ProfileDetailsShimmer from '../../shimmers/ProfileDetailsShimmer';
import { UserFetchProviderServiceResponseProps } from '@/utils/interface/api/userApiInterface';
import { ProviderFetchServiceDetailsResponseProps } from '@/utils/interface/api/providerApiInterface';
import { AdminFetchProviderServiceResponseProps } from '@/utils/interface/api/adminProviderApiInterface';

interface ProviderServiceDetailsComponentProps {
    providerId?: string;
    fetchApiFunction: (providerId?: string) => Promise<
        AdminFetchProviderServiceResponseProps |
        ProviderFetchServiceDetailsResponseProps |
        UserFetchProviderServiceResponseProps
    >;
    queryKey: string;
    isUser?: boolean;
    shimmerRow?: number;
}

const ProviderServiceDetails: React.FC<ProviderServiceDetailsComponentProps> = ({
    providerId,
    fetchApiFunction,
    queryKey,
    isUser,
    shimmerRow
}) => {

    const [largeImg, setLargeImg] = useState<boolean>(false);

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchApiFunction(providerId),
        queryKey: [queryKey],
        staleTime: 1 * 60 * 1000,
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
                <ProfileDetailsShimmer row={shimmerRow || 6} />
            </div>
        )
    }

    if (!data) {
        return <DataFetchingError message="No service found." />;
    }

    let serviceData: AdminFetchProviderServiceResponseProps | ProviderFetchServiceDetailsResponseProps | null = null;
    if (!isUser) {
        serviceData = data as (AdminFetchProviderServiceResponseProps | ProviderFetchServiceDetailsResponseProps);
    }

    return (
        <div className="border-[var(--boxBorder)] border rounded-md overflow-hidden w-full mt-2">
            <table className="table-auto w-full">
                <tbody className="w-1/2">
                    <>
                        <InfoDisplayComponent label="Service Category" value={data?.serviceCategory.serviceName} />
                        <InfoDisplayComponent label="Service Name" value={data?.serviceName} />
                        <InfoDisplayComponent label="Service Description" value={data?.serviceDescription} />
                        <InfoDisplayComponent label="Service Price" value={data?.servicePrice} isPrice={true} />
                        {!isUser && (
                        <InfoDisplayComponent label="Provider Adhaar" value={serviceData?.providerAdhaar} />
                        )}
                        <InfoDisplayComponent label="Provider Experience" value={data?.providerExperience} />
                    </>
                </tbody>
            </table>
            {!isUser && (
                <div className='my-6 space-y-2'>
                    <div className='flex justify-start'>
                        <label className='text-[var(--infoDisplayLabel)]'>Provider Certificate</label>
                        <button className='mx-2 cursor-pointer' onClick={() => setLargeImg(!largeImg)}><ImageUpscale /></button>
                    </div>
                    <div className='my-2'>
                        <img className={`border border-[var(--boxBorder)] object-contain ${largeImg ? 'h-auto w-full' : 'h-52 w-72'}`} src={serviceData?.providerCertificateUrl || "/images/imagePlaceholder.png"} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProviderServiceDetails