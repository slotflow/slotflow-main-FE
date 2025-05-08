import { ProfileDetailsShimmerProps } from "@/utils/interface/componentInterface/shimmerInterface"

const ProfileDetailsShimmer: React.FC<ProfileDetailsShimmerProps> = ({ row }) => {
    return (
        <div className="space-y-1 w-full">
            {Array.from({ length: row }).map((_, index) => (
                <div key={index} className="flex w-full space-x-4 items-center">
                    <label className="text-sm flex items-center my-1 shimmer h-12 w-4/12"></label>
                    <p className="py-1 shimmer h-12 w-8/12"></p>
                </div>
            ))}
        </div>
    )
}

export default ProfileDetailsShimmer