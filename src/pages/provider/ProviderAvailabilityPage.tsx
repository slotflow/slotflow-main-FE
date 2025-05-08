import ProfileHead from "@/components/common/profile/ProfileHead";
import ProviderServiceAvailability from "@/components/common/profile/ProviderServiceAvailability";
import { fetchProviderServiceAvailability, updateProviderProfileImage } from "@/utils/apis/provider.api";

const ProviderAvailabilityPage = () => {

    return (
        <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
            <ProfileHead updateProfileImageApiFunction={updateProviderProfileImage} updation={true} />
            <ProviderServiceAvailability fetchApiFuntion={fetchProviderServiceAvailability} queryKey="serviceAvailability" />
        </div>
    )
    
}

export default ProviderAvailabilityPage;