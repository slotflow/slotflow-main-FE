import ProfileHead from '@/components/common/profile/ProfileHead';
import ProviderServiceDetails from '@/components/common/profile/ProviderServiceDetails';
import { providerFetchProviderServiceDetails, providerUpdateProviderProfileImage } from '@/utils/apis/provider.api';

const ProviderServicePage = () => {

  return (
    <div className="min-h-full p-2 flex flex-col">
      <ProfileHead updateProfileImageApiFunction={providerUpdateProviderProfileImage} updation={true} />
      <ProviderServiceDetails fetchApiFunction={providerFetchProviderServiceDetails} queryKey="providerService" />
    </div>
  )
  
}

export default ProviderServicePage