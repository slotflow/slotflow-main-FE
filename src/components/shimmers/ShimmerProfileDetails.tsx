
interface ShimmerProfileDetails {
    row: number;
}
const ShimmerProfileDetails: React.FC<ShimmerProfileDetails> = ({ row }) => {
    return (
        <div className="p-4 space-y-6 w-8/12">
            {Array.from({ length: row }).map((_,index) => (
                <div key={index} className="flex w-full space-x-20">
                    <label className="text-sm flex items-center my-1 shimmer h-4 w-4/12"></label>
                    <p className="py-1 shimmer h-4 w-8/12"></p>
                </div>
            ))}
        </div>
    )
}

export default ShimmerProfileDetails