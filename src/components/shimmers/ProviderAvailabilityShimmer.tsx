import ProfileDetailsShimmer from "./ProfileDetailsShimmer";
import { ProviderAvailabilityShimmerProps } from "@/utils/interface/componentInterface/shimmerInterface";

const ProviderAvailabilityShimmer: React.FC<ProviderAvailabilityShimmerProps> = ({ slotCount}) => {
    return (
        <div className="w-full mx-auto md:flex justify-between flex-grow space-x-2">
            <div className="w-3/12 border-r border-[var(--boxBorder)] shimmer h-72"></div>
            <div className="w-9/12">
                <ProfileDetailsShimmer row={5} />
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-2">
                    {Array.from({ length: slotCount }).map((_, index) => (
                        <div key={index} className="border rounded-md h-8 w-full shimmer"></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProviderAvailabilityShimmer