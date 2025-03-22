
interface ShimmerProfileDetails {
    row: number;
}
const ShimmerProfileDetails: React.FC<ShimmerProfileDetails> = ({ row }) => {
    return (
        <div className="p-4 space-y-6 w-1/2">
            <h4 className="shimmer h-6 w-6/12"></h4>
            {Array.from({ length: row }).map(() => (
                <div>
                    <label className="text-sm flex items-center my-1 shimmer h-4 w-4/12"></label>
                    <p className="py-1 shimmer h-4 w-8/12"></p>
                </div>
            ))}
        </div>
    )
}

export default ShimmerProfileDetails