import ProfileHead from '@/components/common/profile/ProfileHead';
import { providerFetchProviderServiceDetails } from '@/utils/apis/provider.api';
import ProviderServiceDetails from '@/components/common/profile/ProviderServiceDetails';

const ProviderServicePage = () => {

  return (
    <div className="min-h-full p-2 flex flex-col">
      <ProfileHead updation={false} showDetails />
      <ProviderServiceDetails fetchApiFunction={providerFetchProviderServiceDetails} queryKey="providerService" />
    </div>
  )
  
}

export default ProviderServicePage