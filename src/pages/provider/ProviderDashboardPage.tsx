import { useSelector } from 'react-redux';
import CardOne from '@/components/admin/CardOne';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { RootState } from '@/utils/redux/appStore';
import { GraphView } from '@/utils/helper/GraphView';
import RadialChart from '@/components/common/chart/RadialChart';
import AreaGroupedChart from '@/components/common/chart/AreaGroupedChart';
import BarChartVertical from '@/components/common/chart/BarChartVertical';
import ChartLineMultiple from '@/components/common/chart/ChatLineMultiple';
import BarChartHorizontal from '@/components/common/chart/BarChartHorizontal';
import LineChartHorizontal from '@/components/common/chart/LineChartHorizontal';
import PieChartCompletionBreakdown from '@/components/common/chart/PieChartCompletionBreakdown';
import { providerFetchDashboardGraphData, providerFetchDashboardStatsData } from '@/utils/apis/provider.api';
import { appointmentModeChartConfig, appointmentsOverTimeChartConfig, completionBreakdownChartConfig, newVsReturningUsersChartConfig, peakBookingHoursChartConfig, statsMap, topBookingDaysChartConfig } from '@/utils/constants';
import { LockIcon } from 'lucide-react';

type LimitedRoles = "ADMIN" | "PROVIDER";
type limitedPlans = "Starter" | "Professional" | "Enterprise" | "NoSubscription";

const ProviderDashboardPage: React.FC = () => {

  const [plan, setPlan] = useState<limitedPlans>("NoSubscription");
  const [role, setRole] = useState<LimitedRoles | null>(null);
  const user = useSelector((store: RootState) => store.auth.authUser);

  useEffect(() => {
    if (!user || !user.providerSubscription || !user.role) return;

    const validPlans = ["Starter", "Professional", "Enterprise", "NoSubscription"] as const;
    const validRoles = ["PROVIDER", "ADMIN"] as const;

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
    queryKey: ['providerDashboardStats'],
    queryFn: providerFetchDashboardStatsData,
    refetchOnWindowFocus: false,
  });

  const {
    data: dashboardGraphData,
    isLoading: isGraphLoading,
    isError: isGraphError,
    error: graphError,
  } = useQuery({
    queryKey: ['providerDashboardGraph'],
    queryFn: providerFetchDashboardGraphData,
    refetchOnWindowFocus: false,
  });

  console.log("role : ", role);
  console.log("plan : ", plan);

  return (
    <div className="pb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-2">
        {isNumericDataLoading ? (
          <p>Loading statistics...</p>
        ) : isNumericDataError ? (
          <p className="text-red-500">Failed to load dashboard stats: {String(numericDataError)}</p>
        ) : statsMap.length > 0 ? (
          statsMap.map(({ title, key, icon, price, plans, roles }) => (
            <CardOne
              key={key}
              title={title}
              value={dashboardStats?.[key] ?? 0}
              icon={icon}
              price={price}
              isShow={plans.includes(plan)}
              isAccess={roles.includes(role)}
            />
          ))
        ) : role === "PROVIDER" ? (
          <div className="col-span-full text-center py-8 text-muted-foreground border rounded-md p-4">
            <LockIcon className="mx-auto h-10 w-10 mb-2 text-gray-500" />
            <p className="text-sm">Upgrade your plan to unlock advanced statistics</p>
          </div>
        ) : null}
      </div>

      <div className="p-2">
        {isGraphLoading ? (
          <p>Loading chart data...</p>
        ) : isGraphError ? (
          <p className="text-red-500">Failed to load graphs: {String(graphError)}</p>
        ) : dashboardGraphData ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <AreaGroupedChart
              title="Appointments Over Time"
              description="Completed, Missed, and Cancelled Appointments"
              chartData={dashboardGraphData.appointmentsOvertimeChartData}
              dataKeyOne="completed"
              dataKeyTwo="missed"
              dataKeyThree="cancelled"
              chartConfig={appointmentsOverTimeChartConfig}
              isLocked={!GraphView(plan, "AppointmentsOverTime")}
            />
            <RadialChart
              title="Top Booking Days"
              description="Distribution of bookings throughout the week"
              chartData={dashboardGraphData.topBookingDaysChartData}
              dataKeyOne="count"
              dataKeyTwo="day"
              chartConfig={topBookingDaysChartConfig}
              isLocked={!GraphView(plan, "TopBookingDays")}
            />
            <BarChartVertical
              title="Appointment Distribution"
              description="Online vs Offline appointments over the last 7 days"
              chartData={dashboardGraphData.appointmentModeChartData}
              dataKeyOne="online"
              dataKeyTwo="offline"
              chartConfig={appointmentModeChartConfig}
              isLocked={!GraphView(plan, "AppointmentDistribution")}
            />
            <BarChartHorizontal
              title="Peak Booking Hours"
              description="Hourly booking trends for the past 10 days"
              chartData={dashboardGraphData.peakBookingHoursChartData}
              dataKeyOne="hour"
              dataKeyTwo="bookings"
              dataKeyThree="bookings"
              chartConfig={peakBookingHoursChartConfig}
              isLocked={!GraphView(plan, "PeakBookingHours")}
            />
            <LineChartHorizontal
              title="Appointment Mode Trend"
              description="Online vs Offline Appointments over Time"
              chartData={dashboardGraphData.appointmentModeChartData}
              dataKeyOne="online"
              dataKeyTwo="offline"
              chartConfig={appointmentModeChartConfig}
              isLocked={!GraphView(plan, "AppointmentModeTrend")}
            />
            <ChartLineMultiple
              title="New vs Returning Users"
              description="User engagement trends over the last 10 days"
              chartData={dashboardGraphData.newVsReturningUsersChartData}
              chartConfig={newVsReturningUsersChartConfig}
              dataKeyOne="newUsers"
              dataKeyTwo="returningUsers"
              isLocked={!GraphView(plan, "NewVsReturningUsers")}
            />
            <PieChartCompletionBreakdown
              title="Appointment Completion Breakdown"
              description="Completed, Missed, and Cancelled Appointments"
              chartData={dashboardGraphData.completionBreakdownChartData}
              dataKey="value"
              chartConfig={completionBreakdownChartConfig}
              nameKey={"status"}
              isLocked={!GraphView(plan, "AppointmentCompletionBreakdown")}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ProviderDashboardPage;
