interface ShimmerTableComponentProps {
    columnsCount?: number;
}

const ShimmerTable: React.FC<ShimmerTableComponentProps> = ({
    columnsCount
}) => {
    return (
        <div className="flex flex-col rounded-md overflow-hidden border-1">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-10 flex items-center border-b-1 mb-1">
                    {Array.from({ length: columnsCount || 5 }).map((_, index) => (
                        <div key={index} className="h-5 w-1/5 shimmer mx-2"></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ShimmerTable;