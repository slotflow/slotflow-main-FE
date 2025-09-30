import React from 'react';
import DashboardStats from '@/components/common/dashboard/DashboardStats';
import { providerFetchDashboardStatsData } from '@/utils/apis/provider.api';
import { providerDashboardTabs, statsMapForProvider } from '@/utils/constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import ProviderDashboardGraphs from '@/components/provider/ProviderDashboardGraphs';
import { ProviderFetchDashboardStatsDataResponse } from '@/utils/interface/api/providerApiInterface';

const ProviderDashboardPage: React.FC = () => {

  return (
    <div className="pb-4">
      <Tabs defaultValue="stats" className="w-full">

        <TabsList className="grid grid-cols-2 w-full border rounded-md mb-4">
          {providerDashboardTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 
                 data-[state=active]:bg-[var(--mainColor)] data-[state=active]:text-white 
                 data-[state=active]:rounded-md transition"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="stats">
          <DashboardStats<ProviderFetchDashboardStatsDataResponse>
            queryFunction={providerFetchDashboardStatsData}
            queryKey="dashboardStats"
            statsMap={statsMapForProvider}
            shimmerCount={11}
            role="PROVIDER"
          />
        </TabsContent>

        <TabsContent value="graphs">
          <ProviderDashboardGraphs />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProviderDashboardPage;
