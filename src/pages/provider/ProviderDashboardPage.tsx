import React from 'react';
import DashboardStats from '@/components/common/dashboard/DashboardStats';
import DashboardGraphs from '@/components/common/dashboard/DashboardGraphs';
import { providerFetchDashboardGraphData, providerFetchDashboardStatsData } from '@/utils/apis/provider.api';
import { statsMapForProvider } from '@/utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/redux/appStore';
import { ProviderFetchDashboardStatsDataResponse } from '@/utils/interface/api/providerApiInterface';

const ProviderDashboardPage: React.FC = () => {

  const user = useSelector((store: RootState) => store.auth.authUser);

  return (
    <div className="pb-4">
      <DashboardStats<ProviderFetchDashboardStatsDataResponse>
        queryFunction={providerFetchDashboardStatsData}
        queryKey='dashboardStats'
        statsMap={statsMapForProvider}
        plan={user?.providerSubscription ?? "NoSubscription"}
      />
      <DashboardGraphs
        queryFunction={providerFetchDashboardGraphData}
      />
    </div>
  )
}

export default ProviderDashboardPage;
