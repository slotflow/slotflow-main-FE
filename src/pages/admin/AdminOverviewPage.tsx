import React from 'react';
import {
    userStatsMapForAdmin,
    todayStatsMapForAdmin,
    providerStatsMapForAdmin,
    AppointmentsStatsMapForAdmin,
    subscriptionStatsMapForAdmin,
    revenueAnAndPaymentsStatsMapForAdmin,
    adminOverviewTabs,
} from '@/utils/constants';
import {
    adminFetchDashboardUserStatsData,
    adminFetchDashboardTodayStatsData,
    adminFetchDashboardRevenueStatsData,
    adminFetchDashboardProviderStatsData,
    adminFetchDashboardAppointmentStatsData,
    adminFetchDashboardSubscriptionStatsData,
} from '@/utils/apis/adminDashboard.api';
import {
    AdminFetchDashboardUserStatsDataResponse,
    AdminFetchDashboardTodayStatsDataResponse,
    AdminFetchDashboardProviderStatsDataResponse,
    AdminFetchDashboardAppointmentStatsDataResponse,
    AdminFetchDashboardSubscriptionStatsDataResponse,
    AdminFetchDashboardRevenueAndPaymentsStatsDataResponse,
} from "@/utils/interface/api/adminDashboardApiInterface";
import DashboardStats from '@/components/common/dashboard/DashboardStats';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const AdminOverviewPage: React.FC = () => {
    return (
        <div className="p-4">
            <Tabs defaultValue="today" className="w-full">

                <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4 w-full">
                    {adminOverviewTabs.map((tab) => (
                        <TabsTrigger key={tab.value} className="cursor-pointer" value={tab.value}>
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="today">
                    <DashboardStats<AdminFetchDashboardTodayStatsDataResponse>
                        queryFunction={adminFetchDashboardTodayStatsData}
                        queryKey="dashboardTodayStats"
                        statsMap={todayStatsMapForAdmin}
                        shimmerCount={6}
                        heading=""
                        role="ADMIN"
                    />
                </TabsContent>

                <TabsContent value="users">
                    <DashboardStats<AdminFetchDashboardUserStatsDataResponse>
                        queryFunction={adminFetchDashboardUserStatsData}
                        queryKey="dashboardUsersStats"
                        statsMap={userStatsMapForAdmin}
                        shimmerCount={3}
                        heading=""
                        role="ADMIN"
                    />
                </TabsContent>

                <TabsContent value="providers">
                    <DashboardStats<AdminFetchDashboardProviderStatsDataResponse>
                        queryFunction={adminFetchDashboardProviderStatsData}
                        queryKey="dashboardProvidersStats"
                        statsMap={providerStatsMapForAdmin}
                        shimmerCount={7}
                        heading=""
                        role="ADMIN"
                    />
                </TabsContent>

                <TabsContent value="subscriptions">
                    <DashboardStats<AdminFetchDashboardSubscriptionStatsDataResponse>
                        queryFunction={adminFetchDashboardSubscriptionStatsData}
                        queryKey="dashboardSubscriptionStats"
                        statsMap={subscriptionStatsMapForAdmin}
                        shimmerCount={6}
                        heading=""
                        role="ADMIN"
                    />
                </TabsContent>

                <TabsContent value="revenue">
                    <DashboardStats<AdminFetchDashboardRevenueAndPaymentsStatsDataResponse>
                        queryFunction={adminFetchDashboardRevenueStatsData}
                        queryKey="dashboardRevenueStats"
                        statsMap={revenueAnAndPaymentsStatsMapForAdmin}
                        shimmerCount={9}
                        heading=""
                        role="ADMIN"
                    />
                </TabsContent>

                <TabsContent value="appointments">
                    <DashboardStats<AdminFetchDashboardAppointmentStatsDataResponse>
                        queryFunction={adminFetchDashboardAppointmentStatsData}
                        queryKey="dashboardAppointmentsStats"
                        statsMap={AppointmentsStatsMapForAdmin}
                        shimmerCount={5}
                        heading=""
                        role="ADMIN"
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminOverviewPage;
