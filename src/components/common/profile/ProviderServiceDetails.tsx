import { ImageUpscale } from 'lucide-react';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DataFetchingError from '../DataFetchingError';
import InfoDisplayComponent from '../InfoDisplayComponent';
import ShimmerProfileDetails from '../../shimmers/ShimmerProfileDetails';
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
    authUserType: "admin" | "user" | "provider"
}

const ProviderServiceDetails: React.FC<ProviderServiceDetailsComponentProps> = ({
    providerId,
    fetchApiFunction,
    queryKey,
    authUserType,
}) => {

    const [largeImg, setLargeImg] = useState<boolean>(false);

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchApiFunction(providerId && providerId),
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
                <ShimmerProfileDetails row={6} />
            </div>
        )
    }

    if (!data) {
        return <DataFetchingError message="No service found." />;
    }

    let serviceData: AdminFetchProviderServiceResponseProps | ProviderFetchServiceDetailsResponseProps | null = null;
    if (authUserType !== "user") {
        serviceData = data as (AdminFetchProviderServiceResponseProps | ProviderFetchServiceDetailsResponseProps);
    }

    return (
        <div className="w-full mx-auto py-6 rounded-lg">
            <table className="table-auto border-collapse border border-[var(--boxBorder)] w-full">
                <tbody>
                    <>
                        <InfoDisplayComponent label="Service Category" value={data?.serviceCategory.serviceName} />
                        <InfoDisplayComponent label="Service Name" value={data?.serviceName} />
                        <InfoDisplayComponent label="Service Description" value={data?.serviceDescription} />
                        <InfoDisplayComponent label="Service Price" value={data?.servicePrice} isPrice={true} />
                        {authUserType !== "user" && (
                        <InfoDisplayComponent label="Provider Adhaar" value={serviceData?.providerAdhaar} />
                        )}
                        <InfoDisplayComponent label="Provider Experience" value={data?.providerExperience} />
                    </>
                </tbody>
            </table>
            {(authUserType === "admin" || authUserType === "provider") && (
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