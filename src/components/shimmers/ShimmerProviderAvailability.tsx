import ShimmerProfileDetails from "./ShimmerProfileDetails"

interface ShimmerProviderAvailabilityProps {
    btCount: number;
    slotCount: number;
}
const ShimmerProviderAvailability: React.FC<ShimmerProviderAvailabilityProps> = ({btCount, slotCount}) => {
    return (
        <div className="w-full mx-auto mt-8 md:flex justify-start flex-grow">
            <div className="flex justify-around items-center flex-col w-3/12 space-y-4 border-r border-[var(--boxBorder)] py-2">
                {Array.from({ length: btCount }).map((_, index) => (
                    <label key={index} className="text-sm flex items-center my-1 shimmer h-6 w-10/12"></label>
                ))}
            </div>
            <div className="flex-1">
                <ShimmerProfileDetails row={4} />
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-2">
                    {Array.from({ length: slotCount }).map((_, index) => (
                        <div key={index} className="border rounded-md h-6 w-28 shimmer"></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ShimmerProviderAvailability