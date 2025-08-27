// router.tsx
import { lazy } from "react";
import PlanGuard from "./planGuard.tsx";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoutes.tsx";

const LandingPage = lazy(() => import("../pages/common/LandingPage.tsx"));
const Error404Page = lazy(() => import("@/pages/common/Error404Page.tsx"));
const UserLoginPage = lazy(() => import("@/pages/common/UserLoginPage.tsx"));
const AdminLoginPage = lazy(() => import("@/pages/common/AdminLoginPage.tsx"));
const ProviderLoginPage = lazy(() => import("@/pages/common/ProviderLoginPage.tsx"));
const PasswordResetPage = lazy(() => import("@/pages/common/PasswordResetPage.tsx"));
const PaymentConfirmPage = lazy(() => import("@/pages/common/PaymentConfirmPage.tsx"));
const LandingLayout = lazy(() => import("../pages/common/LandingLayout.tsx"));

const UserMainPage = lazy(() => import("@/pages/user/UserMainPage.tsx"));
const UserChatPage = lazy(() => import("@/pages/user/UserChatPage.tsx"));
const UserProfilePage = lazy(() => import("@/pages/user/UserProfilePage.tsx"));
const UserAddressPage = lazy(() => import("@/pages/user/UserAddressPage.tsx"));
const UserPaymentsPage = lazy(() => import("@/pages/user/UserPaymentsPage.tsx"));
const UserBookingsPage = lazy(() => import("@/pages/user/UserBookingsPage.tsx"));
const UserDashboardPage = lazy(() => import("@/pages/user/UserDashboardPage.tsx"));
const UserNotificationsPage = lazy(() => import("@/pages/user/UserNotificationsPage.tsx"));
const UserServiceSelectPage = lazy(() => import("@/pages/user/UserServiceSelectPage.tsx"));
const UserServiceProviderDetailPage = lazy(() => import("@/pages/user/UserServiceProviderDetailPage.tsx"));

const ProviderMainPage = lazy(() => import("@/pages/provider/ProviderMainPage.tsx"));
const ProviderChatPage = lazy(() => import("@/pages/provider/ProviderChatPage.tsx"));
const ProviderProfilePage = lazy(() => import("@/pages/provider/ProviderProfilePage.tsx"));
const ProviderServicePage = lazy(() => import("@/pages/provider/ProviderServicePage.tsx"));
const ProviderReviewsPage = lazy(() => import("@/pages/provider/ProviderReviewsPage.tsx"));
const ProviderAddressPage = lazy(() => import("@/pages/provider/ProviderAddressPage.tsx"));
const ProviderPaymentsPage = lazy(() => import("@/pages/provider/ProviderPaymentsPage.tsx"));
const ProviderDashboardPage = lazy(() => import("@/pages/provider/ProviderDashboardPage.tsx"));
const ProviderAppointmentsPage = lazy(() => import("@/pages/provider/ProviderAppointmentsPage.tsx"));
const ProviderAvailabilityPage = lazy(() => import("@/pages/provider/ProviderAvailabilityPage.tsx"));
const ProviderSubscriptionPage = lazy(() => import("@/pages/provider/ProviderSubscriptionPage.tsx"));
const ProviderNotificationsPage = lazy(() => import("@/pages/provider/ProviderNotificationsPage.tsx"));

const AdminMainPage = lazy(() => import("../pages/admin/AdminMainPage.tsx"));
const AdminPlansPage = lazy(() => import("@/pages/admin/AdminPlansPage.tsx"));
const AdminUsersPage = lazy(() => import("@/pages/admin/AdminUsersPage.tsx"));
const AdminPaymentsPage = lazy(() => import("@/pages/admin/AdminPaymentsPage.tsx"));
const AdminServicesPage = lazy(() => import("@/pages/admin/AdminServicesPage.tsx"));
const AdminDashboardPage = lazy(() => import("../pages/admin/AdminDashboardPage.tsx"));
const AdminSubscriptionsPage = lazy(() => import("@/pages/admin/AdminSubscriptionsPage.tsx"));
const AdminServiceProvidersPage = lazy(() => import("../pages/admin/AdminServiceProvidersPage.tsx"));
const AdminServiceProviderDetailPage = lazy(() => import("@/pages/admin/AdminServiceProviderDetailPage.tsx"));
const AdminSubcriptionDetailedViewPage = lazy(() => import("@/pages/admin/AdminSubcriptionDetailedViewPage.tsx"));

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <LandingLayout />,
        children: [
            { path: "/", element: <LandingPage /> },
            { path: "/forgotPassword", element: <PasswordResetPage /> },
            { path: "/admin/login", element: <AdminLoginPage /> },
            { path: "/user/login", element: <UserLoginPage /> },
            { path: "/provider/login", element: <ProviderLoginPage /> },
            { path: "*", element: <Error404Page /> },
            {
                path: "/admin",
                element: (
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                        <AdminMainPage />
                    </ProtectedRoute>
                ),
                children: [
                    { path: "dashboard", element: <AdminDashboardPage /> },
                    { path: "service-providers", element: <AdminServiceProvidersPage /> },
                    { path: "service-provider/:providerId", element: <AdminServiceProviderDetailPage /> },
                    { path: "users", element: <AdminUsersPage /> },
                    { path: "services", element: <AdminServicesPage /> },
                    { path: "plans", element: <AdminPlansPage /> },
                    { path: "subscriptions", element: <AdminSubscriptionsPage /> },
                    { path: "payments", element: <AdminPaymentsPage /> },
                    { path: "subscription/:subscriptionId", element: <AdminSubcriptionDetailedViewPage /> },
                    { path: "*", element: <Error404Page /> },
                ],
            },
            {
                path: "/user",
                element: (
                    <ProtectedRoute allowedRoles={["USER"]}>
                        <UserMainPage />
                    </ProtectedRoute>
                ),
                children: [
                    { index: true, element: <UserServiceSelectPage /> },
                    { path: "dashboard", element: <UserDashboardPage /> },
                    { path: "providerProfile/:providerId", element: <UserServiceProviderDetailPage /> },
                    { path: "profile", element: <UserProfilePage /> },
                    { path: "address", element: <UserAddressPage /> },
                    { path: "bookings", element: <UserBookingsPage /> },
                    { path: "payments", element: <UserPaymentsPage /> },
                    { path: "chat", element: <UserChatPage /> },
                    { path: "notifications", element: <UserNotificationsPage /> },
                    { path: "payment-success", element: <PaymentConfirmPage status={true} userType={"user"} /> },
                    { path: "payment-failed", element: <PaymentConfirmPage status={false} userType={"user"} /> },
                    { path: "*", element: <Error404Page /> },
                ],
            },
            {
                path: "/provider",
                element: (
                    <ProtectedRoute allowedRoles={["PROVIDER"]}>
                        <ProviderMainPage />
                    </ProtectedRoute>
                ),
                children: [
                    { path: "dashboard", element: <ProviderDashboardPage /> },
                    { path: "profile", element: <ProviderProfilePage /> },
                    { path: "address", element: <ProviderAddressPage /> },
                    { path: "service", element: <ProviderServicePage /> },
                    { path: "availability", element: <ProviderAvailabilityPage /> },
                    {
                        path: "reviews",
                        element: (
                            <PlanGuard routeName="Reviews">
                                <ProviderReviewsPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "appointments",
                        element: (
                            <PlanGuard routeName="Appointments">
                                <ProviderAppointmentsPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "subscriptions",
                        element: (
                            <PlanGuard routeName="Subscriptions">
                                <ProviderSubscriptionPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "payments",
                        element: (
                            <PlanGuard routeName="Payments">
                                <ProviderPaymentsPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "chat",
                        element: (
                            <PlanGuard routeName="Chat">
                                <ProviderChatPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "video",
                        element: (
                            <PlanGuard routeName="Video call">
                                <ProviderChatPage />
                            </PlanGuard>
                        )
                    },
                    {
                        path: "notifications",
                        element: (
                            <PlanGuard routeName="Notifications">
                                <ProviderNotificationsPage />
                            </PlanGuard>
                        )
                    },
                    { path: "payment-success", element: <PaymentConfirmPage status={true} userType={"provider"} /> },
                    { path: "payment-failed", element: <PaymentConfirmPage status={false} userType={"provider"} /> },
                    { path: "*", element: <Error404Page /> },
                ],
            },
        ],
    },
])
