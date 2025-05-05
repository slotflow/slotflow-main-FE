import ProviderServiceAvailability from "@/components/common/profile/ProviderServiceAvailability";
import ProviderProfileHead from "@/components/provider/ProviderProfileHead";
import { fetchProviderServiceAvailability } from "@/utils/apis/provider.api";

const ProviderAvailability = () => {

    return (
        <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
            <ProviderProfileHead />
            <ProviderServiceAvailability fetchApiFuntion={fetchProviderServiceAvailability} userType="provider" queryKey="serviceAvailability"/>
        </div>
    )
}

export default ProviderAvailability;