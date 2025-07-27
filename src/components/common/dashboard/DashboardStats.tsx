import { useQuery } from '@tanstack/react-query';
import { statsMapIntrface } from '@/utils/constants';
import StatsCard from '@/components/common/dashboard/StatsCard';


interface DashboardStatsProps<T extends Record<string, number>> {
  queryFunction(): Promise<T>;
  queryKey: string;
  statsMap: Array<statsMapIntrface<T>>;
  plan: string;
}

const DashboardStats = <T extends Record<string, number>>({
    queryFunction,
    queryKey,
    statsMap,
    plan,
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

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
            {isNumericDataLoading ? (
                <p>Loading statistics...</p>
            ) : isNumericDataError ? (
                <p className="text-red-500">Failed to load dashboard stats: {String(numericDataError)}</p>
            ) : statsMap.length > 0 ? (
                statsMap.map(({ title, key, icon, price, plans }) => (
                    <StatsCard
                        key={key as string}
                        title={title}
                        value={dashboardStats?.[key] ?? 0}
                        icon={icon}
                        price={price}
                        isShow={plans?.includes(plan)}
                    />
                ))
            ) : null}
        </div>
    )
}

export default DashboardStats;