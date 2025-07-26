// **** Used as the return interface for the admin fetch dashboard data
export interface AdminDashboardDateRangeStatsData {
  newUsers: number;
  newProviders: number;

  todaysTotalRevenue: number;
  todaysTotalPayouts: number;

  todaysAppointments: number;
  todaysCancelledAppointments: number;
}

export interface AdminUserStats {
  totalUsers: number;
  emailVerifiedUsers: number;
  blockedUsers: number;
}

export interface AdminProviderStats {
  totalProviders: number;
  emailVerifiedProviders: number;
  adminVerifiedProviders: number;
  blockedProviders: number;
  addressAddedProviders: number;
  serviceAddedProviders: number;
  availabilityAddedProviders: number;
}

export interface AdminSubscriptionStats {
  activeSubscriptions: number;
  expiredSubscriptions: number;
  notSubscribedProviders: number;

  subscriptionsByFreePlan: number;
  subscriptionsByStarterPlan: number;
  subscriptionsByProfessionalPlan: number;
  subscriptionsByEnterprisePlan: number;
}

export interface AdminRevenueStats {
  totalRevenue: number;
  totalRevenueViaSubscriptions: number;
  revenueByStarterPlan: number;
  revenueByProfessionalPlan: number;
  revenueByEnterprisePlan: number;
  totalRevenueViaAppointments: number;
}

export interface AdminPaymentStats {
  totalRefundsIssued: number;
  totalFailedPayments: number;

  revenueByStripe: number;
  revenueByRazorpay: number;
  revenueByPaypal: number;

  totalPayoutsToProviders: number;
}

export interface AdminAppointmentStats {
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  missedAppointments: number;
  rejectedAppointments: number;
}

export interface AdminDashboardDateRangeStats {
  newUsers: number;
  newProviders: number;

  todaysTotalRevenue: number;
  todaysTotalPayouts: number;

  todaysAppointments: number;
  todaysCancelledAppointments: number;
}

export interface AdminDashboardCombinedStatsResponse {
  users: AdminUserStats;
  providers: AdminProviderStats;
  subscriptions: AdminSubscriptionStats;
  revenue: AdminRevenueStats;
  payments: AdminPaymentStats;
  appointments: AdminAppointmentStats;
  dateRangeStats: AdminDashboardDateRangeStats;
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