import React from 'react';
import RadialChart from '../common/chart/RadialChart';
import { useQuery } from '@tanstack/react-query';
import { GraphView } from '@/utils/helper/GraphView';
import BarChartVertical from '../common/chart/BarChartVertical';
import AreaGroupedChart from '../common/chart/AreaGroupedChart';
import ChartLineMultiple from '../common/chart/ChatLineMultiple';
import BarChartHorizontal from '../common/chart/BarChartHorizontal';
import LineChartHorizontal from '../common/chart/LineChartHorizontal';
import PieChartCompletionBreakdown from '../common/chart/PieChartCompletionBreakdown';
import { ProviderDashboardGraphResponse } from '@/utils/interface/api/providerApiInterface';
import { appointmentModeChartConfig, appointmentsOverTimeChartConfig, completionBreakdownChartConfig, newVsReturningUsersChartConfig, peakBookingHoursChartConfig, topBookingDaysChartConfig } from '@/utils/constants';

interface DashboardGraphsForProviderProps {
    queryFunction(): Promise<ProviderDashboardGraphResponse>;
    plan: string;
}

const ProviderDashboardGraphs: React.FC<DashboardGraphsForProviderProps> = ({
    queryFunction,
    plan
}) => {
    
    const {
        data: dashboardGraphData,
        isLoading: isGraphLoading,
        isError: isGraphError,
        error: graphError,
    } = useQuery({
        queryKey: ['providerDashboardGraph'],
        queryFn: queryFunction,
        refetchOnWindowFocus: false,
    });

    return (
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
    )
}

export default ProviderDashboardGraphs;