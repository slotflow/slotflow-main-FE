import UserLogin from "@/pages/common/UserLogin.tsx";
import AdminPlansPage from "@/pages/admin/AdminPlansPage.tsx";
import AdminLogin from "@/pages/common/AdminLogin.tsx";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoutes.tsx";
import AdminUsersPage from "../pages/admin/AdminUsersPage.tsx";
import UserChatPage from "@/pages/user/UserChatPage.tsx";
import UserMainPage from "@/pages/user/UserMainPage.tsx";
import LandingPage from "../pages/common/LandingPage.tsx";
import ErrorDisplay from "@/pages/common/ErrorDisplay.tsx";
import AdminPaymentsPage from "@/pages/admin/AdminPaymentsPage.tsx";
import AdminServicesPage from "@/pages/admin/AdminServicesPage.tsx";
import AdminMainPage from "../pages/admin/AdminMainPage.tsx";
import PasswordReset from "@/pages/common/PasswordReset.tsx";
import ProviderChat from "@/pages/provider/ProviderChat.tsx";
import ProviderLogin from "@/pages/common/ProviderLogin.tsx";
import LandingLayout from "../pages/common/LandingLayout.tsx";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage.tsx";
import UserProfilePage from "@/pages/user/UserProfilePage.tsx";
import UserAddressPage from "@/pages/user/UserAddressPage.tsx";
import UserPaymentsPage from "@/pages/user/UserPaymentsPage.tsx";
import UserBookingsPage from "@/pages/user/UserBookingsPage.tsx";
import UserDashboardPage from "@/pages/user/UserDashboardPage.tsx";
import ProviderProfile from "@/pages/provider/ProviderProfile.tsx";
import ProviderService from "@/pages/provider/ProviderService.tsx";
import ProviderReviews from "@/pages/provider/ProviderReviews.tsx";
import ProviderAddress from "@/pages/provider/ProviderAddress.tsx";
import ProviderPayments from "@/pages/provider/ProviderPayments.tsx";
import ProviderMainPage from "@/pages/provider/ProviderMainPage.tsx";
import AdminSubscriptionsPage from "@/pages/admin/AdminSubscriptionsPage.tsx";
import ProviderDashboard from "@/pages/provider/ProviderDashboard.tsx";
import PaymentConfirmPage from "@/pages/common/PaymentConfirmPage.tsx";
import ProviderAddAddress from "@/pages/provider/ProviderAddAddress.tsx";
import UserNotificationsPage from "@/pages/user/UserNotificationsPage.tsx";
import UserServiceSelectPage from "@/pages/user/UserServiceSelectPage.tsx";
import AdminServiceProvidersPage from "../pages/admin/AdminServiceProvidersPage.tsx";
import ProviderAppointments from "@/pages/provider/ProviderAppointments.tsx";
import ProviderAvailability from "@/pages/provider/ProviderAvailability.tsx";
import ProviderSubscription from "@/pages/provider/ProviderSubscription.tsx";
import ProviderNotifications from "@/pages/provider/ProviderNotifications.tsx";
import ProviderAddServiceDetails from "@/pages/provider/ProviderAddServiceDetails.tsx";
import AdminSubcriptionDetailedViewPage from "@/pages/admin/AdminSubcriptionDetailedViewPage.tsx";
import UserServiceProviderDetailPage from "@/pages/user/UserServiceProviderDetailPage.tsx";
import AdminServiceProviderDetailPage from "@/pages/admin/AdminServiceProviderDetailPage.tsx";

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <LandingLayout />,
        children: [
            { path: "/", element: <LandingPage /> },
            { path: "/forgotPassword", element: <PasswordReset /> },
            { path: "/admin/login", element: <AdminLogin /> },
            { path: "/user/login", element: <UserLogin /> },
            { path: "/provider/login", element: <ProviderLogin /> },
            { path: "*", element: <ErrorDisplay /> },
            {
                path: "/admin",
                element: (
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                        <AdminMainPage />
                    </ProtectedRoute>
                ),
                children: [
                    { index: true, element: <AdminDashboardPage /> },
                    { path: "service-providers", element: <AdminServiceProvidersPage /> },
                    { path: "service-provider/:providerId", element: <AdminServiceProviderDetailPage /> },
                    { path: "users", element: <AdminUsersPage /> },
                    { path: "services", element: <AdminServicesPage /> },
                    { path: "plans", element: <AdminPlansPage /> },
                    { path: "subscriptions", element: <AdminSubscriptionsPage /> },
                    { path: "payments", element: <AdminPaymentsPage /> },
                    { path: "subscription/:subscriptionId", element: <AdminSubcriptionDetailedViewPage /> },
                    { path: "*", element: <ErrorDisplay /> },
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
                    { path: "*", element: <ErrorDisplay /> },
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
                    { index: true, element: <ProviderDashboard /> },
                    { path: "profile", element: <ProviderProfile /> },
                    { path: "address", element: <ProviderAddress /> },
                    { path: "service", element: <ProviderService /> },
                    { path: "availability", element: <ProviderAvailability /> },
                    { path: "reviews", element: <ProviderReviews /> },
                    { path: "appointments", element: <ProviderAppointments /> },
                    { path: "subscription", element: <ProviderSubscription /> },
                    { path: "payments", element: <ProviderPayments /> },
                    { path: "chat", element: <ProviderChat /> },
                    { path: "reviews", element: <ProviderReviews /> },
                    { path: "notifications", element: <ProviderNotifications /> },
                    { path: "addAddress", element: <ProviderAddAddress /> },
                    { path: "addServiceDetails", element: <ProviderAddServiceDetails /> },
                    { path: "payment-success", element: <PaymentConfirmPage status={true} userType={"provider"} /> },
                    { path: "payment-failed", element: <PaymentConfirmPage status={false} userType={"provider"} /> },
                    { path: "*", element: <ErrorDisplay /> },
                ],
            },
        ],
    },
])
