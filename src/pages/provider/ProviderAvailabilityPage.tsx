import ProfileHead from "@/components/common/profile/ProfileHead";
import { providerFetchProviderServiceAvailability } from "@/utils/apis/provider.api";
import ProviderServiceAvailability from "@/components/common/profile/ProviderServiceAvailability";

const ProviderAvailabilityPage = () => {

    return (
        <div className="min-h-full p-2 flex flex-col">
            <ProfileHead updation={false} showDetails />
            <ProviderServiceAvailability fetchApiFuntion={providerFetchProviderServiceAvailability} queryKey="serviceAvailability" role="Provider" />
        </div>
    )
    
}

export default ProviderAvailabilityPage;