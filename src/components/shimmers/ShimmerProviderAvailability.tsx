import ShimmerProfileDetails from "./ShimmerProfileDetails";
import { ShimmerProviderAvailabilityProps } from "@/utils/interface/shimmerInterface";

const ShimmerProviderAvailability: React.FC<ShimmerProviderAvailabilityProps> = ({ slotCount}) => {
    return (
        <div className="w-full mx-auto md:flex justify-between flex-grow space-x-2">
            <div className="w-3/12 border-r border-[var(--boxBorder)] py-2 shimmer h-72"></div>
            <div className="flex-1">
                <ShimmerProfileDetails row={5} />
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-2 mt-4">
                    {Array.from({ length: slotCount }).map((_, index) => (
                        <div key={index} className="border rounded-md h-8 w-full shimmer"></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ShimmerProviderAvailability