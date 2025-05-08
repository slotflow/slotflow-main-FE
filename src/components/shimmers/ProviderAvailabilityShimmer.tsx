import ProfileDetailsShimmer from "./ProfileDetailsShimmer";
import { ProviderAvailabilityShimmerProps } from "@/utils/interface/componentInterface/shimmerInterface";

const ProviderAvailabilityShimmer: React.FC<ProviderAvailabilityShimmerProps> = ({ slotCount}) => {
    return (
        <div className="w-full mx-auto md:flex justify-between flex-grow space-x-1 mt-2">
            <div className="w-[21%] rounded-md shimmer h-72"></div>
            <div className="w-[79%]">
                <ProfileDetailsShimmer row={5} />
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {Array.from({ length: slotCount }).map((_, index) => (
                        <div key={index} className="rounded-md h-8 w-full shimmer"></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProviderAvailabilityShimmer