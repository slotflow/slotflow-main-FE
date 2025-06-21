import ProfileHead from "@/components/common/profile/ProfileHead";
import ProviderServiceAvailability from "@/components/common/profile/ProviderServiceAvailability";
import { providerFetchProviderServiceAvailability, providerUpdateProviderProfileImage } from "@/utils/apis/provider.api";

const ProviderAvailabilityPage = () => {

    return (
        <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
            <ProfileHead updateProfileImageApiFunction={providerUpdateProviderProfileImage} updation={true} />
            <ProviderServiceAvailability fetchApiFuntion={providerFetchProviderServiceAvailability} queryKey="serviceAvailability" role="Provider" />
        </div>
    )
    
}

export default ProviderAvailabilityPage;