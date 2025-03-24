import { ImageUpscale } from 'lucide-react';
import React, { memo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DataFetchingError from '../common/DataFetchingError';
import InfoDisplayComponent from '../common/InfoDisplayComponent';
import ShimmerProfileDetails from '../shimmers/ShimmerProfileDetails';
import { fetchProviderService } from '@/utils/apis/adminProvider.api';
import { AdminProviderServiceProps } from '@/utils/interface/adminInterface';

const AdmiProviderService: React.FC<AdminProviderServiceProps> = memo(({ providerId, onError }) => {

    const [largeImg, setLargeImg] = useState<boolean>(false);
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["PService", providerId],
        queryFn: () => fetchProviderService(providerId),
    })

    console.log("data : ", data);

    if (isError) {
        onError(true);
        return (
            <DataFetchingError message={error.message} />
        )
    }

    if (isLoading) {
        return (
            <div className="w-full mx-auto mt-8 md:flex justify-start flex-grow bg">
                <ShimmerProfileDetails row={6} />
            </div>
        )
    }

    return (
        <div className="w-full mx-auto mt-8 py-6 rounded-lg">
            <table className="table-auto border-collapse border border-[var(--boxBorder)] w-full">
                <tbody>
                    <InfoDisplayComponent label="Service Category" value={data?.service?.serviceCategory} />
                    <InfoDisplayComponent label="Service Name" value={data?.service?.serviceName} />
                    <InfoDisplayComponent label="Service Description" value={data?.service?.serviceDescription} />
                    <InfoDisplayComponent label="Service Price" value={data?.service?.servicePrice} />
                    <InfoDisplayComponent label="Provider Adhaar" value={data?.service?.providerAdhaar} />
                    <InfoDisplayComponent label="Provider Experience" value={data?.service?.providerExperience} />
                </tbody>
            </table>
            <div className='my-6 space-y-2'>
                <div className='flex justify-start'>
                    <label className='text-[var(--infoDisplayLabel)]'>Provider Certificate</label>
                    <button className='mx-2 cursor-pointer' onClick={() => setLargeImg(!largeImg)}><ImageUpscale /></button>
                </div>
                <div className='my-2'>
                    <img className={`border border-[var(--boxBorder)] object-contain ${largeImg ? 'h-auto w-full' : 'h-52 w-72'}`} src={data?.service?.providerCertificateUrl || "/images/imagePlaceholder.png"} />
                </div>
            </div>
        </div>
    )
})

export default AdmiProviderService