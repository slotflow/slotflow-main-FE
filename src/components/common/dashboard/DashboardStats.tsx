import StatsCard from '@/components/common/dashboard/StatsCard';
import { statsMapForProvider, validPlans, validRoles } from '@/utils/constants';
import { ProviderFetchDashboardStatsDataResponse } from '@/utils/interface/api/providerApiInterface';
import { limitedPlans, LimitedRoles } from '@/utils/interface/commonInterface';
import { RootState } from '@/utils/redux/appStore';
import { useQuery } from '@tanstack/react-query';
import { LockIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface DashboardStatsProps {
    queryFunction(): Promise<ProviderFetchDashboardStatsDataResponse>;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
    queryFunction
}) => {

    const [plan, setPlan] = useState<limitedPlans>("NoSubscription");
    const [role, setRole] = useState<LimitedRoles | null>(null);
    const user = useSelector((store: RootState) => store.auth.authUser);

    useEffect(() => {
        if (!user || !user.providerSubscription || !user.role) return;

        if (validPlans.includes(user.providerSubscription as limitedPlans)) {
            setPlan(user.providerSubscription as limitedPlans);
        } else {
            setPlan("NoSubscription");
        }

        if (validRoles.includes(user.role as "PROVIDER" | "ADMIN")) {
            setRole(user.role as LimitedRoles);
        }
    }, [user]);

    const {
        data: dashboardStats,
        isLoading: isNumericDataLoading,
        isError: isNumericDataError,
        error: numericDataError
    } = useQuery({
        queryKey: ['DashboardStats'],
        queryFn: queryFunction,
        refetchOnWindowFocus: false,
    });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
            {isNumericDataLoading ? (
                <p>Loading statistics...</p>
            ) : isNumericDataError ? (
                <p className="text-red-500">Failed to load dashboard stats: {String(numericDataError)}</p>
            ) : statsMapForProvider.length > 0 ? (
                statsMapForProvider.map(({ title, key, icon, price, plans }) => (
                    <StatsCard
                        key={key}
                        title={title}
                        value={dashboardStats?.[key] ?? 0}
                        icon={icon}
                        price={price}
                        isShow={plans.includes(plan)}
                    />
                ))
            ) : role === "PROVIDER" ? (
                <div className="col-span-full text-center py-8 text-muted-foreground border rounded-md p-4">
                    <LockIcon className="mx-auto h-10 w-10 mb-2 text-gray-500" />
                    <p className="text-sm">Upgrade your plan to unlock advanced statistics</p>
                </div>
            ) : null}
        </div>
    )
}

export default DashboardStats