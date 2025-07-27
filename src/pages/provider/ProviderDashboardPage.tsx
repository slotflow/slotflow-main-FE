import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/redux/appStore';
import { statsMapForProvider } from '@/utils/constants';
import DashboardStats from '@/components/common/dashboard/DashboardStats';
import DashboardGraphs from '@/components/provider/DashboardGraphsForProvider';
import { ProviderFetchDashboardStatsDataResponse } from '@/utils/interface/api/providerApiInterface';
import { providerFetchDashboardGraphData, providerFetchDashboardStatsData } from '@/utils/apis/provider.api';

const ProviderDashboardPage: React.FC = () => {

  const user = useSelector((store: RootState) => store.auth.authUser);

  return (
    <div className="pb-4">
      <DashboardStats<ProviderFetchDashboardStatsDataResponse>
        queryFunction={providerFetchDashboardStatsData}
        queryKey='dashboardStats'
        statsMap={statsMapForProvider}
        plan={user?.providerSubscription ?? "NoSubscription"}
        shimmerCount={14}
      />
      <DashboardGraphs
        queryFunction={providerFetchDashboardGraphData}
        plan={user?.providerSubscription ?? "NoSubscription"}
      />
    </div>
  )
}

export default ProviderDashboardPage;
