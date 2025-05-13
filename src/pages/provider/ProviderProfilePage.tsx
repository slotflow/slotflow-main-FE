import ProfileHead from "@/components/common/profile/ProfileHead";
import UserOrProviderProfileDetails from "@/components/common/profile/UserOrProviderProfileDetails";
import { providerFetchProviderProfileDetails, providerUpdateProviderProfileImage } from "@/utils/apis/provider.api";

const ProviderProfilePage = () => {

  return (
    <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
      <ProfileHead updateProfileImageApiFunction={providerUpdateProviderProfileImage} updation={true} />
      <UserOrProviderProfileDetails fetchApiFunction={providerFetchProviderProfileDetails} queryKey="profileDetails" providerSelf shimmerRow={8} />
    </div>
  )
  
}

export default ProviderProfilePage