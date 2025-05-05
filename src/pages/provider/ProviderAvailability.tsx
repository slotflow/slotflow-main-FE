import ProviderProfileHead from "@/components/provider/ProviderProfileHead";
import { fetchProviderServiceAvailability } from "@/utils/apis/provider.api";
import ProviderServiceAvailability from "@/components/provider/ProviderServiceAvailability";

const ProviderAvailability = () => {

    return (
        <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
            <ProviderProfileHead />
            <ProviderServiceAvailability fetchApiFuntion={fetchProviderServiceAvailability} userType="provider"/>
        </div>
    )
}

export default ProviderAvailability;