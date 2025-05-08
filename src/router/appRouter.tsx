import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoutes.tsx";
import UserChatPage from "@/pages/user/UserChatPage.tsx";
import UserMainPage from "@/pages/user/UserMainPage.tsx";
import LandingPage from "../pages/common/LandingPage.tsx";
import Error404Page from "@/pages/common/Error404Page.tsx";
import UserLoginPage from "@/pages/common/UserLoginPage.tsx";
import AdminMainPage from "../pages/admin/AdminMainPage.tsx";
import AdminPlansPage from "@/pages/admin/AdminPlansPage.tsx";
import LandingLayout from "../pages/common/LandingLayout.tsx";
import AdminLoginPage from "@/pages/common/AdminLoginPage.tsx";
import AdminUsersPage from "../pages/admin/AdminUsersPage.tsx";
import UserProfilePage from "@/pages/user/UserProfilePage.tsx";
import UserAddressPage from "@/pages/user/UserAddressPage.tsx";
import UserPaymentsPage from "@/pages/user/UserPaymentsPage.tsx";
import UserBookingsPage from "@/pages/user/UserBookingsPage.tsx";
import UserDashboardPage from "@/pages/user/UserDashboardPage.tsx";
import AdminPaymentsPage from "@/pages/admin/AdminPaymentsPage.tsx";
import AdminServicesPage from "@/pages/admin/AdminServicesPage.tsx";
import PasswordResetPage from "@/pages/common/PasswordResetPage.tsx";
import ProviderLoginPage from "@/pages/common/ProviderLoginPage.tsx";
import ProviderChatPage from "@/pages/provider/ProviderChatPage.tsx";
import ProviderMainPage from "@/pages/provider/ProviderMainPage.tsx";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage.tsx";
import PaymentConfirmPage from "@/pages/common/PaymentConfirmPage.tsx";
import ProviderProfilePage from "@/pages/provider/ProviderProfilePage.tsx";
import ProviderServicePage from "@/pages/provider/ProviderServicePage.tsx";
import ProviderReviewsPage from "@/pages/provider/ProviderReviewsPage.tsx";
import ProviderAddressPage from "@/pages/provider/ProviderAddressPage.tsx";
import UserNotificationsPage from "@/pages/user/UserNotificationsPage.tsx";
import UserServiceSelectPage from "@/pages/user/UserServiceSelectPage.tsx";
import ProviderPaymentsPage from "@/pages/provider/ProviderPaymentsPage.tsx";
import AdminSubscriptionsPage from "@/pages/admin/AdminSubscriptionsPage.tsx";
import ProviderDashboardPage from "@/pages/provider/ProviderDashboardPage.tsx";
import ProviderAddAddressPage from "@/pages/provider/ProviderAddAddressPage.tsx";
import AdminServiceProvidersPage from "../pages/admin/AdminServiceProvidersPage.tsx";
import ProviderAppointmentsPage from "@/pages/provider/ProviderAppointmentsPage.tsx";
import ProviderAvailabilityPage from "@/pages/provider/ProviderAvailabilityPage.tsx";
import ProviderSubscriptionPage from "@/pages/provider/ProviderSubscriptionPage.tsx";
import ProviderNotificationsPage from "@/pages/provider/ProviderNotificationsPage.tsx";
import UserServiceProviderDetailPage from "@/pages/user/UserServiceProviderDetailPage.tsx";
import AdminServiceProviderDetailPage from "@/pages/admin/AdminServiceProviderDetailPage.tsx";
import ProviderAddServiceDetailsPage from "@/pages/provider/ProviderAddServiceDetailsPage.tsx";
import AdminSubcriptionDetailedViewPage from "@/pages/admin/AdminSubcriptionDetailedViewPage.tsx";

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
                    { index: true, element: <AdminDashboardPage /> },
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
                    { index: true, element: <ProviderDashboardPage /> },
                    { path: "profile", element: <ProviderProfilePage /> },
                    { path: "address", element: <ProviderAddressPage /> },
                    { path: "service", element: <ProviderServicePage /> },
                    { path: "availability", element: <ProviderAvailabilityPage /> },
                    { path: "reviews", element: <ProviderReviewsPage /> },
                    { path: "appointments", element: <ProviderAppointmentsPage /> },
                    { path: "subscription", element: <ProviderSubscriptionPage /> },
                    { path: "payments", element: <ProviderPaymentsPage /> },
                    { path: "chat", element: <ProviderChatPage /> },
                    { path: "notifications", element: <ProviderNotificationsPage /> },
                    { path: "addAddress", element: <ProviderAddAddressPage /> },
                    { path: "addServiceDetails", element: <ProviderAddServiceDetailsPage /> },
                    { path: "payment-success", element: <PaymentConfirmPage status={true} userType={"provider"} /> },
                    { path: "payment-failed", element: <PaymentConfirmPage status={false} userType={"provider"} /> },
                    { path: "*", element: <Error404Page /> },
                ],
            },
        ],
    },
])
