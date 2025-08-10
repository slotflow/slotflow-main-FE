import React from 'react';
import DashboardStats from '../common/dashboard/DashboardStats';
import { AppointmentsStatsMapForAdmin, 
    // paymentsStatsMapForAdmin, 
    providerStatsMapForAdmin, revenueStatsMapForAdmin, subscriptionStatsMapForAdmin, todayStatsMapForAdmin, userStatsMapForAdmin } from '@/utils/constants';
import { adminFetchDashboardAppointmentStatsData, 
    // adminFetchDashboardPaymentStatsData, 
    adminFetchDashboardProviderStatsData, adminFetchDashboardRevenueStatsData, adminFetchDashboardSubscriptionStatsData, adminFetchDashboardTodayStatsData, adminFetchDashboardUserStatsData } from '@/utils/apis/adminDashboard.api';
import { AdminFetchDashboardAppointmentStatsDataResponse, 
    // AdminFetchDashboardPaymentStatsDataResponse, 
    AdminFetchDashboardProviderStatsDataResponse, AdminFetchDashboardRevenueStatsDataResponse, AdminFetchDashboardSubscriptionStatsDataResponse, AdminFetchDashboardTodayStatsDataResponse, AdminFetchDashboardUserStatsDataResponse } from "@/utils/interface/api/adminDashboardApiInterface"

const AdminDashboardStats: React.FC = () => {
    return (
        <div>
            <DashboardStats<AdminFetchDashboardTodayStatsDataResponse>
                queryFunction={adminFetchDashboardTodayStatsData}
                queryKey="dashboardTodayStats"
                statsMap={todayStatsMapForAdmin}
                shimmerCount={6}
                heading='Todays Latest Stats'
                role='ADMIN'
            />
            <DashboardStats<AdminFetchDashboardUserStatsDataResponse>
                queryFunction={adminFetchDashboardUserStatsData}
                queryKey="dashboardUsersStats"
                statsMap={userStatsMapForAdmin}
                shimmerCount={3}
                heading='Users Stats'
                role='ADMIN'
            />
            <DashboardStats<AdminFetchDashboardProviderStatsDataResponse>
                queryFunction={adminFetchDashboardProviderStatsData}
                queryKey="dashboardProvidersStats"
                statsMap={providerStatsMapForAdmin}
                shimmerCount={7}
                heading='Providers Stats'
                role='ADMIN'
            />
            <DashboardStats<AdminFetchDashboardSubscriptionStatsDataResponse>
                queryFunction={adminFetchDashboardSubscriptionStatsData}
                queryKey="dashboardSubscriptionStats"
                statsMap={subscriptionStatsMapForAdmin}
                shimmerCount={6}
                heading='Subscriptions Stats'
                role='ADMIN'
            />
            <DashboardStats<AdminFetchDashboardRevenueStatsDataResponse>
                queryFunction={adminFetchDashboardRevenueStatsData}
                queryKey="dashboardRevenueStats"
                statsMap={revenueStatsMapForAdmin}
                shimmerCount={9}
                heading='Revenue Stats'
                role='ADMIN'
            />
            {/* <DashboardStats<AdminFetchDashboardPaymentStatsDataResponse>
                queryFunction={adminFetchDashboardPaymentStatsData}
                queryKey="dashboardPaymentStats"
                statsMap={paymentsStatsMapForAdmin}
                shimmerCount={6}
                heading='Payment Stats'
                role='ADMIN'
            /> */}
            <DashboardStats<AdminFetchDashboardAppointmentStatsDataResponse>
                queryFunction={adminFetchDashboardAppointmentStatsData}
                queryKey="dashboardAppointmentsStats"
                statsMap={AppointmentsStatsMapForAdmin}
                shimmerCount={5}
                heading='Appointments Stats'
                role='ADMIN'
            />
        </div>
    )
}

export default AdminDashboardStats;