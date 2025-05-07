import ProfileHead from '@/components/common/profile/ProfileHead';
import ProviderServiceDetails from '@/components/common/profile/ProviderServiceDetails';
import { fetchProviderServiceDetails, updateProviderProfileImage } from '@/utils/apis/provider.api';

const ProviderService = () => {

  return (
    <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
      <ProfileHead updateProfileImageApiFunction={updateProviderProfileImage} updation={true} />
      <ProviderServiceDetails fetchApiFunction={fetchProviderServiceDetails} queryKey="providerService" />
    </div>
  )
  
}

export default ProviderService