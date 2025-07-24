import React from 'react';
import { statsMap } from '@/utils/constants';
import CardOne from '@/components/admin/CardOne';
import { useQuery } from '@tanstack/react-query';
import BarChartUi from '@/components/common/chart/BarChartUi';
import SpreadChart from '@/components/common/chart/SpreadChart';
import { providerFetchDashboardGraphData, providerFetchDashboardStatsData } from '@/utils/apis/provider.api';

export const BarChartData = [
  { date: "2025-07-11", online: 92, offline: 150 },
  { date: "2025-07-12", online: 492, offline: 420 },
  { date: "2025-07-13", online: 81, offline: 130 },
  { date: "2025-07-14", online: 426, offline: 380 },
  { date: "2025-07-15", online: 307, offline: 350 },
  { date: "2025-07-16", online: 371, offline: 310 },
  { date: "2025-07-17", online: 475, offline: 520 },
  { date: "2025-07-18", online: 107, offline: 170 },
  { date: "2025-07-19", online: 341, offline: 290 },
  { date: "2025-07-20", online: 408, offline: 450 },
  { date: "2025-07-21", online: 169, offline: 210 },
  { date: "2025-07-22", online: 317, offline: 270 },
  { date: "2025-07-23", online: 480, offline: 530 },
  { date: "2025-07-24", online: 132, offline: 180 },
  { date: "2025-07-25", online: 141, offline: 190 },
  { date: "2025-07-26", online: 434, offline: 380 },
  { date: "2025-07-27", online: 448, offline: 490 },
  { date: "2025-07-28", online: 149, offline: 200 },
  { date: "2025-07-29", online: 103, offline: 160 },
  { date: "2025-07-30", online: 446, offline: 400 },
  { date: "2025-07-01", online: 178, offline: 200 },
  { date: "2025-07-02", online: 470, offline: 410 },
  { date: "2025-07-03", online: 103, offline: 160 },
  { date: "2025-07-04", online: 439, offline: 380 },
  { date: "2025-07-05", online: 88, offline: 140 },
  { date: "2025-07-06", online: 294, offline: 250 },
  { date: "2025-07-07", online: 323, offline: 370 },
  { date: "2025-07-08", online: 385, offline: 320 },
]

const ProviderDashboardPage: React.FC = () => {

  const {
    data: dashboardStats,
    isLoading: isNumericDataLoading,
    isError: isNumericDataError,
    error: numericDataError
  } = useQuery({
    queryKey: ['providerDashboardStats'],
    queryFn: providerFetchDashboardStatsData,
    refetchOnWindowFocus: false,
  });

  // const {
  //   data: dashboardGraphData,
  //   isLoading: isGraphLoading,
  //   isError: isGraphError,
  //   error: graphError,
  // } = useQuery({
  //   queryKey: ['providerDashboardGraph'],
  //   queryFn: providerFetchDashboardGraphData,
  //   refetchOnWindowFocus: false,
  // });




  return (
    <div className="pb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-2">
        {isNumericDataLoading ? (
          <p>Loading statistics...</p>
        ) : isNumericDataError ? (
          <p className="text-red-500">Failed to load dashboard stats: {String(numericDataError)}</p>
        ) : dashboardStats && (
          statsMap.map(({ title, key, icon, price }) => (
            <CardOne
              key={key}
              title={title}
              value={dashboardStats?.[key] ?? 0}
              icon={icon}
              price={price}
            />
          ))
        )}
      </div>

      {/* 📊 Charts */}
      {/* <div className="p-2">
        {isGraphLoading ? (
          <p>Loading chart data...</p>
        ) : isGraphError ? (
          <p className="text-red-500">Failed to load graphs: {String(graphError)}</p>
        ) : dashboardGraphData ? (
          <>
            <BarChartUi
              title="Appointments Data Graph"
              description="Appointments success vs failure rate"
              chartData={dashboardGraphData?.barChart}
              barOneDataKey="success"
              barTwoDataKey="fail"
            />
            <SpreadChart
              title="Revenue Data Graph"
              description="Online vs Offline appointments revenue"
              chartData={dashboardGraphData?.spreadChart}
              areaOneDataKey="online"
              areaTwoDataKey="offline"
            />
          </>
        ) : null}
      </div> */}
    </div>
  )
}

export default ProviderDashboardPage