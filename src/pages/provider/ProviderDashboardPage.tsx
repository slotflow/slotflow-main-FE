import React from 'react';
import DashboardStats from '@/components/common/dashboard/DashboardStats';
import DashboardGraphs from '@/components/common/dashboard/DashboardGraphs';
import { providerFetchDashboardGraphData, providerFetchDashboardStatsData } from '@/utils/apis/provider.api';

const ProviderDashboardPage: React.FC = () => {

  return (
    <div className="pb-4">
      <DashboardStats
        queryFunction={providerFetchDashboardStatsData}
      />
      <DashboardGraphs
        queryFunction={providerFetchDashboardGraphData}
      />
    </div>
  )
}

export default ProviderDashboardPage;
