import { useQuery } from '@tanstack/react-query';
import DataFetchingError from '../DataFetchingError';
import StatsCard from '@/components/common/dashboard/StatsCard';
import { statsMapIntrface } from '@/utils/interface/commonInterface';
import DashboardStatsShimmer from '@/components/shimmers/DashboardStatsShimmer';

interface DashboardStatsProps<T extends Record<string, number>> {
    queryFunction(): Promise<T>;
    queryKey: string;
    statsMap: Array<statsMapIntrface<T>>;
    plan?: string;
    shimmerCount: number;
}

const DashboardStats = <T extends Record<string, number>>({
    queryFunction,
    queryKey,
    statsMap,
    plan,
    shimmerCount
}: DashboardStatsProps<T>) => {

    const {
        data: dashboardStats,
        isLoading: isNumericDataLoading,
        isError: isNumericDataError,
        error: numericDataError
    } = useQuery({
        queryKey: [queryKey],
        queryFn: queryFunction,
        refetchOnWindowFocus: false,
    });

    if (isNumericDataLoading) return <DashboardStatsShimmer count={shimmerCount} />

    if (isNumericDataError && numericDataError) return <DataFetchingError message={"Data fetching failed"} />

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
            {statsMap.length > 0 ? (
                statsMap.map(({ title, key, icon, price, plans }) => (
                    <StatsCard
                        key={key as string}
                        title={title}
                        value={dashboardStats?.[key] ?? 0}
                        icon={icon}
                        price={price}
                        isShow={!!plan && plans?.includes(plan)}
                    />
                ))
            ) : null}
        </div>
    )
}

export default DashboardStats;