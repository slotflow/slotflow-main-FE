import React from 'react';
import { statsMap } from '@/utils/constants';
import CardOne from '@/components/admin/CardOne';
import { useQuery } from '@tanstack/react-query';
import AreaGroupedChart from '@/components/common/chart/AreaGroupedChart';
import { providerFetchDashboardGraphData, providerFetchDashboardStatsData } from '@/utils/apis/provider.api';
import BarChartHorizontal from '@/components/common/chart/BarChartHorizontal';
import LineChartHorizontal from '@/components/common/chart/LineChartHorizontal';
import PieChartCompletionBreakdown from '@/components/common/chart/PieChartCompletionBreakdown';
import ChartLineMultiple from '@/components/common/chart/ChatLineMultiple';
import RadialChart from '@/components/common/chart/RadialChart';
import BarChartStacked from '@/components/common/chart/BarChartStacked';
import BarChartVertical from '@/components/common/chart/BarChartVertical';

export const appointmentsOverTime = [
  { date: "2025-07-15", completed: 10, missed: 1, cancelled: 2 },
  { date: "2025-07-16", completed: 12, missed: 2, cancelled: 1 },
  { date: "2025-07-17", completed: 14, missed: 0, cancelled: 3 },
  { date: "2025-07-18", completed: 9, missed: 3, cancelled: 1 },
  { date: "2025-07-19", completed: 13, missed: 1, cancelled: 0 },
  { date: "2025-07-20", completed: 15, missed: 1, cancelled: 2 },
  { date: "2025-07-21", completed: 16, missed: 2, cancelled: 0 },
  { date: "2025-07-22", completed: 11, missed: 3, cancelled: 1 },
  { date: "2025-07-23", completed: 13, missed: 2, cancelled: 2 },
  { date: "2025-07-24", completed: 14, missed: 1, cancelled: 1 },
];

const appointmentsOverTimeChartConfig = {
  completed: {
    label: "Completed",
    color: "#22c55e", // Tailwind green-500
  },
  missed: {
    label: "Missed",
    color: "#f97316", // Tailwind orange-500
  },
  cancelled: {
    label: "Cancelled",
    color: "#ef4444", // Tailwind red-500
  },
}


export const earningsOverTime = [
  { date: "2025-07-15", stripe: 1500, razorpay: 700, paypal: 300 },
  { date: "2025-07-16", stripe: 1600, razorpay: 600, paypal: 500 },
  { date: "2025-07-17", stripe: 1400, razorpay: 800, paypal: 400 },
  { date: "2025-07-18", stripe: 1700, razorpay: 750, paypal: 300 },
  { date: "2025-07-19", stripe: 1550, razorpay: 850, paypal: 250 },
  { date: "2025-07-20", stripe: 1600, razorpay: 900, paypal: 400 },
  { date: "2025-07-21", stripe: 1800, razorpay: 950, paypal: 350 },
  { date: "2025-07-22", stripe: 1650, razorpay: 870, paypal: 300 },
  { date: "2025-07-23", stripe: 1750, razorpay: 820, paypal: 380 },
  { date: "2025-07-24", stripe: 1900, razorpay: 920, paypal: 450 },
];

const earningsOverTimeChartConfig = {
  stripe: {
    label: "Stripe",
    color: "#22c55e",
  },
  razorpay: {
    label: "Razorpay",
    color: "#f97316",
  },
  paypal: {
    label: "Paypal",
    color: "#ef4444",
  },
}

export const peakBookingHours = [
  { date: "2025-07-15", hour: "08:00 AM", bookings: 3 },
  { date: "2025-07-15", hour: "10:00 AM", bookings: 6 },
  { date: "2025-07-15", hour: "12:00 PM", bookings: 4 },
  { date: "2025-07-15", hour: "02:00 PM", bookings: 5 },
  { date: "2025-07-15", hour: "04:00 PM", bookings: 8 },
  { date: "2025-07-15", hour: "06:00 PM", bookings: 7 },
  { date: "2025-07-15", hour: "08:00 PM", bookings: 3 },

  { date: "2025-07-16", hour: "08:00 AM", bookings: 4 },
  { date: "2025-07-16", hour: "10:00 AM", bookings: 7 },
  { date: "2025-07-16", hour: "12:00 PM", bookings: 6 },
  { date: "2025-07-16", hour: "02:00 PM", bookings: 6 },
  { date: "2025-07-16", hour: "04:00 PM", bookings: 10 },
  { date: "2025-07-16", hour: "06:00 PM", bookings: 5 },
  { date: "2025-07-16", hour: "08:00 PM", bookings: 2 },

  { date: "2025-07-17", hour: "08:00 AM", bookings: 2 },
  { date: "2025-07-17", hour: "10:00 AM", bookings: 5 },
  { date: "2025-07-17", hour: "12:00 PM", bookings: 3 },
  { date: "2025-07-17", hour: "02:00 PM", bookings: 6 },
  { date: "2025-07-17", hour: "04:00 PM", bookings: 9 },
  { date: "2025-07-17", hour: "06:00 PM", bookings: 6 },
  { date: "2025-07-17", hour: "08:00 PM", bookings: 3 },

  { date: "2025-07-18", hour: "08:00 AM", bookings: 4 },
  { date: "2025-07-18", hour: "10:00 AM", bookings: 8 },
  { date: "2025-07-18", hour: "12:00 PM", bookings: 5 },
  { date: "2025-07-18", hour: "02:00 PM", bookings: 7 },
  { date: "2025-07-18", hour: "04:00 PM", bookings: 12 },
  { date: "2025-07-18", hour: "06:00 PM", bookings: 8 },
  { date: "2025-07-18", hour: "08:00 PM", bookings: 4 },

  { date: "2025-07-19", hour: "08:00 AM", bookings: 5 },
  { date: "2025-07-19", hour: "10:00 AM", bookings: 9 },
  { date: "2025-07-19", hour: "12:00 PM", bookings: 6 },
  { date: "2025-07-19", hour: "02:00 PM", bookings: 8 },
  { date: "2025-07-19", hour: "04:00 PM", bookings: 11 },
  { date: "2025-07-19", hour: "06:00 PM", bookings: 9 },
  { date: "2025-07-19", hour: "08:00 PM", bookings: 5 },

  { date: "2025-07-20", hour: "08:00 AM", bookings: 2 },
  { date: "2025-07-20", hour: "10:00 AM", bookings: 4 },
  { date: "2025-07-20", hour: "12:00 PM", bookings: 3 },
  { date: "2025-07-20", hour: "02:00 PM", bookings: 4 },
  { date: "2025-07-20", hour: "04:00 PM", bookings: 7 },
  { date: "2025-07-20", hour: "06:00 PM", bookings: 5 },
  { date: "2025-07-20", hour: "08:00 PM", bookings: 2 },

  { date: "2025-07-21", hour: "08:00 AM", bookings: 3 },
  { date: "2025-07-21", hour: "10:00 AM", bookings: 6 },
  { date: "2025-07-21", hour: "12:00 PM", bookings: 4 },
  { date: "2025-07-21", hour: "02:00 PM", bookings: 5 },
  { date: "2025-07-21", hour: "04:00 PM", bookings: 9 },
  { date: "2025-07-21", hour: "06:00 PM", bookings: 7 },
  { date: "2025-07-21", hour: "08:00 PM", bookings: 3 },

  { date: "2025-07-22", hour: "08:00 AM", bookings: 4 },
  { date: "2025-07-22", hour: "10:00 AM", bookings: 7 },
  { date: "2025-07-22", hour: "12:00 PM", bookings: 5 },
  { date: "2025-07-22", hour: "02:00 PM", bookings: 6 },
  { date: "2025-07-22", hour: "04:00 PM", bookings: 10 },
  { date: "2025-07-22", hour: "06:00 PM", bookings: 6 },
  { date: "2025-07-22", hour: "08:00 PM", bookings: 4 },

  { date: "2025-07-23", hour: "08:00 AM", bookings: 3 },
  { date: "2025-07-23", hour: "10:00 AM", bookings: 5 },
  { date: "2025-07-23", hour: "12:00 PM", bookings: 4 },
  { date: "2025-07-23", hour: "02:00 PM", bookings: 5 },
  { date: "2025-07-23", hour: "04:00 PM", bookings: 8 },
  { date: "2025-07-23", hour: "06:00 PM", bookings: 5 },
  { date: "2025-07-23", hour: "08:00 PM", bookings: 3 },

  { date: "2025-07-24", hour: "08:00 AM", bookings: 5 },
  { date: "2025-07-24", hour: "10:00 AM", bookings: 9 },
  { date: "2025-07-24", hour: "12:00 PM", bookings: 6 },
  { date: "2025-07-24", hour: "02:00 PM", bookings: 7 },
  { date: "2025-07-24", hour: "04:00 PM", bookings: 11 },
  { date: "2025-07-24", hour: "06:00 PM", bookings: 8 },
  { date: "2025-07-24", hour: "08:00 PM", bookings: 5 },
];

const peakBookingHoursChartConfig = {
  bookings: {
    label: "Bookings",
    color: "#22c55e",
  },
}

export const appointmentModeChartData = [
  { date: "2025-07-15", online: 8, offline: 10 },
  { date: "2025-07-16", online: 9, offline: 5 },
  { date: "2025-07-17", online: 10, offline: 4 },
  { date: "2025-07-18", online: 6, offline: 6 },
  { date: "2025-07-19", online: 11, offline: 3 },
  { date: "2025-07-20", online: 13, offline: 2 },
  { date: "2025-07-21", online: 12, offline: 4 },
  { date: "2025-07-22", online: 10, offline: 3 },
  { date: "2025-07-23", online: 11, offline: 4 },
  { date: "2025-07-24", online: 12, offline: 2 },
];

export const appointmentModeChartConfig = {
  online: {
    label: "Online",
    color: "#3b82f6",
  },
  offline: {
    label: "Offline",
    color: "#10b981",
  },
};



export const completionBreakdown = [
  { status: "Completed", value: 125 },
  { status: "Missed", value: 20 },
  { status: "Cancelled", value: 15 },
];

export const completionBreakdownChartConfig = {
  Completed: {
    label: "Completed",
    color: "#22c55e",
  },
  Missed: {
    label: "Missed",
    color: "#f97316",
  },
  Cancelled: {
    label: "Cancelled",
    color: "#ef4444",
  },
};



export const newVsReturningUsers = [
  { date: "2025-07-15", newUsers: 6, returningUsers: 3 },
  { date: "2025-07-16", newUsers: 7, returningUsers: 5 },
  { date: "2025-07-17", newUsers: 8, returningUsers: 4 },
  { date: "2025-07-18", newUsers: 5, returningUsers: 6 },
  { date: "2025-07-19", newUsers: 9, returningUsers: 3 },
  { date: "2025-07-20", newUsers: 10, returningUsers: 2 },
  { date: "2025-07-21", newUsers: 11, returningUsers: 4 },
  { date: "2025-07-22", newUsers: 9, returningUsers: 5 },
  { date: "2025-07-23", newUsers: 8, returningUsers: 6 },
  { date: "2025-07-24", newUsers: 10, returningUsers: 3 },
];

export const newVsReturningUsersChartConfig = {
  newUsers: {
    label: "New Users",
    color: "#3b82f6",
  },
  returningUsers: {
    label: "Returning Users",
    color: "#10b981",
  },
}


export const topBookingDays = [
  { day: "Monday", bookings: 30 },
  { day: "Tuesday", bookings: 28 },
  { day: "Wednesday", bookings: 35 },
  { day: "Thursday", bookings: 25 },
  { day: "Friday", bookings: 40 },
  { day: "Saturday", bookings: 45 },
  { day: "Sunday", bookings: 20 },
];

export const topBookingDaysChartConfig = {
  Monday: {
    label: "Monday",
    color: "#6366F1",
  },
  Tuesday: {
    label: "Tuesday",
    color: "#10B981",
  },
  Wednesday: {
    label: "Wednesday",
    color: "#F59E0B",
  },
  Thursday: {
    label: "Thursday",
    color: "#EF4444",
  },
  Friday: {
    label: "Friday",
    color: "#3B82F6",
  },
  Saturday: {
    label: "Saturday",
    color: "#8B5CF6",
  },
  Sunday: {
    label: "Sunday",
    color: "#EC4899",
  },
};


export const appointmentDistributionData = [
  { date: "2025-07-15", online: 25, offline: 40 },
  { date: "2025-07-16", online: 30, offline: 35 },
  { date: "2025-07-17", online: 20, offline: 45 },
  { date: "2025-07-18", online: 28, offline: 38 },
  { date: "2025-07-19", online: 32, offline: 30 },
  { date: "2025-07-20", online: 35, offline: 27 },
  { date: "2025-07-21", online: 40, offline: 20 },
];

export const appointmentDistributionChartConfig = {
  online: {
    label: "Online",
    color: "#3B82F6", // Tailwind blue-500
  },
  offline: {
    label: "Offline",
    color: "#10B981", // Tailwind green-500
  },
};




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
              chartData={appointmentsOverTime}
              areaOneDataKey="completed"
              areaTwoDataKey="missed"
              areaThreeDataKey="cancelled"
              chartConfig={appointmentsOverTimeChartConfig}
            />
            <BarChartStacked
              title="Earnings by Payment Gateway"
              description="Stripe, Razorpay, and Paypal Payments per day."
              chartData={earningsOverTime}
              dataKeyOne='stripe'
              dataKeyTwo='razorpay'
              dataKeyThree='paypal'
              chartConfig={earningsOverTimeChartConfig}
            />
            <BarChartHorizontal
              title="Peak Booking Hours"
              description="Hourly booking trends for the past 10 days"
              chartData={peakBookingHours}
              yAxisDataKey="hour"
              xAxisDataKey="bookings"
              barDataKey="bookings"
              chartConfig={peakBookingHoursChartConfig}
            />
            <LineChartHorizontal
              title="Appointment Mode Trend"
              description="Online vs Offline Appointments over Time"
              chartData={appointmentModeChartData}
              dataKeyOne="online"
              dataKeyTwo="offline"
              chartConfig={appointmentModeChartConfig}
            />
            <ChartLineMultiple
              title="New vs Returning Users"
              description="User engagement trends over the last 10 days"
              chartData={newVsReturningUsers}
              chartConfig={newVsReturningUsersChartConfig}
              dataKeyOne="newUsers"
              dataKeyTwo="returningUsers"
            />
            <PieChartCompletionBreakdown
              title="Appointment Completion Breakdown"
              description="Completed, Missed, and Cancelled Appointments"
              chartData={completionBreakdown}
              dataKey="value"
              chartConfig={completionBreakdownChartConfig}
              nameKey={"status"}
            />
            <RadialChart
              title="Top Booking Days"
              description="Distribution of bookings throughout the week"
              chartData={topBookingDays}
              dataKey="bookings"
              nameKey="day"
              chartConfig={topBookingDaysChartConfig}
            />
            <BarChartVertical
              title="Appointment Distribution"
              description="Online vs Offline appointments over the last 7 days"
              chartData={appointmentDistributionData}
              barOneDataKey="online"
              barTwoDataKey="offline"
              chartConfig={appointmentDistributionChartConfig}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ProviderDashboardPage
