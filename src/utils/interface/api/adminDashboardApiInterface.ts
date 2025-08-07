// **** 1. used as the response type of the admin fetch dashboard todays stats data
export interface AdminFetchDashboardTodayStatsDataResponse extends Record<string, number> {
  newUsers: number;
  newProviders: number;

  todaysTotalRevenue: number;
  todaysTotalPayouts: number;

  todaysAppointments: number;
  todaysCancelledAppointments: number;
}

// **** 2. used as the Response type of the admin fetch dashboard user stats data
export interface AdminFetchDashboardUserStatsDataResponse extends Record<string, number> {
    totalUsers: number;
    emailVerifiedUsers: number;
    blockedUsers: number;
}

// **** 3. used as the response type of the admin fetch dashboard provider stats data
export interface AdminFetchDashboardProviderStatsDataResponse extends Record<string, number> {
    totalProviders: number;
    emailVerifiedProviders: number;
    adminVerifiedProviders: number;
    blockedProviders: number;
    addressAddedProviders: number;
    serviceAddedProviders: number;
    availabilityAddedProviders: number;
}

// **** 4. used as the response type of the admin fetch dashboard subscription stats data
export interface AdminFetchDashboardSubscriptionStatsDataResponse extends Record<string, number> {
    activeSubscriptions: number;
    expiredSubscriptions: number;
    subscriptionsByFreePlan: number;
    subscriptionsByStarterPlan: number;
    subscriptionsByProfessionalPlan: number;
    subscriptionsByEnterprisePlan: number;
}

// **** 5. used as the response type of the admin fetch dashboard revenue stats data
export interface AdminFetchDashboardRevenueStatsDataResponse extends Record<string, number> {
    totalRevenue: number;
    totalRevenueViaSubscriptions: number;
    revenueByStarterPlan: number;
    revenueByProfessionalPlan: number;
    revenueByEnterprisePlan: number;
    totalRevenueViaAppointments: number;
}

// **** 6. used as the response type of the admin fetch dashboard payment stats data
export interface AdminFetchDashboardPaymentStatsDataResponse extends Record<string, number> {
    totalRefundsIssued: number;
    totalFailedPayments: number;
    revenueByStripe: number;
    revenueByRazorpay: number;
    revenueByPaypal: number;
    totalPayoutsToProviders: number;
}

// **** 7. used as the response type of the admin fetch dashboard appointments stats data
export interface AdminFetchDashboardAppointmentStatsDataResponse extends Record<string, number> {
    totalAppointments: number;
    completedAppointments: number;
    cancelledAppointments: number;
    missedAppointments: number;
    rejectedAppointments: number;
}



// **** Used as the return interface for the admin fetch dashboard graph data
export interface AdminDashboardGraphResponse {
    appointmentsOvertimeChartData: Array<{
        date: string;
        completed: number;
        missed: number;
        cancelled: number;
    }>;

    peakBookingHoursChartData: Array<{
        date: string;
        hour: string;
        bookings: number;
    }>;

    appointmentModeChartData: Array<{
        date: string;
        online: number;
        offline: number;
    }>;

    completionBreakdownChartData: Array<{
        status: 'completed' | 'missed' | 'cancelled' | 'rejected';
        value: number;
    }>;

    newVsReturningUsersChartData: Array<{
        date: string;
        newUsers: number;
        returningUsers: number;
    }>;

    topBookingDaysChartData: Array<{
        day: string;
        count: number;
    }>;

    earningThroughGatewaysChartData: Array<{
        gateWay: string;
        count: number;
    }>

}