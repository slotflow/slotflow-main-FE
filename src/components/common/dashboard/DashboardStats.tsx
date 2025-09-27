import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DataFetchingError from '../DataFetchingError';
import StatsCard from '@/components/common/dashboard/StatsCard';
import { statsMapIntrface } from '@/utils/interface/commonInterface';
import HorizontalChartForAdminReact from '../chart/HorizontalChartForAdmin';
import DashboardStatsShimmer from '@/components/shimmers/DashboardStatsShimmer';

interface DashboardStatsProps<T extends Record<string, number>> {
    queryFunction(): Promise<T>;
    queryKey: string;
    statsMap: Array<statsMapIntrface<T>>;
    plan?: string;
    shimmerCount: number;
    heading?: string;
    role: string;
}

const DashboardStats = <T extends Record<string, number>>({
    queryFunction,
    queryKey,
    statsMap,
    plan,
    shimmerCount,
    heading,
    role,
}: DashboardStatsProps<T>) => {

    const [chartData, setChartData] = useState<{ name: string; value: number }[]>();

    const {
        data: dashboardStats,
        isLoading: isNumericDataLoading,
        isError: isNumericDataError,
        error: numericDataError
    } = useQuery({
        queryKey: [queryKey],
        queryFn: queryFunction,
        staleTime: 1 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (dashboardStats && statsMap.length > 0) {
            const formattedData = statsMap.map((stat) => ({
                name: stat.title,
                value: dashboardStats[stat.key] ?? 0,
            }));

            setChartData(formattedData);
        }
    }, [dashboardStats, statsMap]);

    return (
        <div>
            <h4 className='text-lg font-bold'>{heading}</h4>
            {isNumericDataLoading ? (
                <DashboardStatsShimmer count={shimmerCount} />
            ) : (isNumericDataError && numericDataError) ? (
                <DataFetchingError message={"Data fetching failed"} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {statsMap.length > 0 ? (
                        statsMap.map(({ title, key, icon, price, plans }) => (
                            <StatsCard
                                key={key as string}
                                title={title}
                                value={dashboardStats?.[key] ?? 0}
                                icon={icon}
                                price={price}
                                isShow={role === "PROVIDER" ? plans?.includes(plan!) : true}
                            />
                        ))
                    ) : null}
                </div>
            )}

            <div className='mt-6'>
                <HorizontalChartForAdminReact
                    chartData={chartData ?? []}
                    isLOading={isNumericDataLoading}
                />
            </div>
        </div>
    )
}

export default DashboardStats;