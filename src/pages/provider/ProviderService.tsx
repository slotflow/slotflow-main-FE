import { useState } from 'react';
import { ImageUpscale } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import DataFetchingError from '@/components/common/DataFetchingError';
import { fetchProviderServiceDetails } from '@/utils/apis/provider.api';
import InfoDisplayComponent from '@/components/common/InfoDisplayComponent'
import ProviderProfileHead from '@/components/provider/ProviderProfileHead';
import ShimmerProfileDetails from '@/components/shimmers/ShimmerProfileDetails';

const ProviderService = () => {

  const [largeImg, setLargeImg] = useState<boolean>(false);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ProviderService"],
    queryFn: () => fetchProviderServiceDetails(),
  });

  return (

    <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
      <ProviderProfileHead />
      <div className="w-full mx-auto py-6 rounded-lg flex-grow">
        {isError ? (
          <DataFetchingError message={error.message} />
        ) : isLoading ? (
          <ShimmerProfileDetails row={7} />
        ) : data ? (
          <table className="table-auto w-full">
            <tbody>
              <InfoDisplayComponent label="Service Category" value={data?.serviceCategory.serviceName} />
              <InfoDisplayComponent label="Service Name" value={data?.serviceName} />
              <InfoDisplayComponent label="Service Description" value={data?.serviceDescription} />
              <InfoDisplayComponent label="Service Price" value={data?.servicePrice} />
              <InfoDisplayComponent label="Provider Adhaar" value={data?.providerAdhaar} />
              <InfoDisplayComponent label="Provider Experience" value={data?.providerExperience} />
            </tbody>
          </table>
        ) : (
          <DataFetchingError message="No service found." />
        )}
      </div>
      {data && (
        <div className='my-6 space-y-2'>
          <div className='flex justify-start'>
            <label className='text-[var(--infoDisplayLabel)]'>Provider Certificate</label>
            <button className='mx-2 cursor-pointer' onClick={() => setLargeImg(!largeImg)}><ImageUpscale /></button>
          </div>
          <div className='my-2'>
            <img className={`border border-[var(--boxBorder)] object-contain ${largeImg ? 'h-auto w-full' : 'h-52 w-72'}`} src={data?.providerCertificateUrl || "/images/imagePlaceholder.png"} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProviderService