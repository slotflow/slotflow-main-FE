import { ProfileDetailsShimmerProps } from "@/utils/interface/componentInterface/shimmerInterface"

const ProfileDetailsShimmer: React.FC<ProfileDetailsShimmerProps> = ({ row }) => {
    return (
        <div className="w-full">
            {Array.from({ length: row }).map((_, index) => (
                <div key={index} className="flex w-full space-x-4 items-center">
                    <label className="text-sm flex items-center mb-3 shimmer h-12 w-4/12"></label>
                    <p className="mb-3 shimmer h-12 w-8/12"></p>
                </div>
            ))}
        </div>
    )
}

export default ProfileDetailsShimmer