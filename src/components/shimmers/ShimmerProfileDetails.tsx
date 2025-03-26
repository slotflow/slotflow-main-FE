import { ShimmerProfileDetailsProps } from "@/utils/interface/shimmerInterface"

const ShimmerProfileDetails: React.FC<ShimmerProfileDetailsProps> = ({ row }) => {
    return (
        <div className="p-4 space-y-8 w-8/12">
            {Array.from({ length: row }).map((_, index) => (
                <div key={index} className="flex w-full space-x-20 items-center">
                    <label className="text-sm flex items-center my-1 shimmer h-6 w-4/12"></label>
                    <p className="py-1 shimmer h-6 w-8/12"></p>
                </div>
            ))}
        </div>
    )
}

export default ShimmerProfileDetails