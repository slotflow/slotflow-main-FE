import User from "@/pages/user/User.tsx";
import LandingLayout from "../pages/common/LandingLayout.tsx";
import AdminUsers from "../pages/admin/AdminUsers.tsx";
import Admin from "../pages/admin/Admin.tsx";
import UserChatPage from "@/pages/user/UserChatPage.tsx";
import AdminServices from "@/pages/admin/AdminServices.tsx";
import UserLogin from "@/pages/common/UserLogin.tsx";
import LandingPage from "../pages/common/LandingPage.tsx";
import AdminDashboard from "../pages/admin/AdminDashboard.tsx";
import AdminLogin from "@/pages/common/AdminLogin.tsx";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoutes.tsx";
import UserProfilePage from "@/pages/user/UserProfilePage.tsx";
import UserPaymentsPage from "@/pages/user/UserPaymentsPage.tsx";
import UserBookingsPage from "@/pages/user/UserBookingsPage.tsx";
import UserDashboardPage from "@/pages/user/UserDashboardPage.tsx";
import PasswordReset from "@/pages/common/PasswordReset.tsx";
import ProviderChat from "@/pages/provider/ProviderChat.tsx";
import ProviderLogin from "@/pages/common/ProviderLogin.tsx";
import ErrorDisplay from "@/pages/common/ErrorDisplay.tsx";
import UserNotificationsPage from "@/pages/user/UserNotificationsPage.tsx";
import AdminServiceProviders from "../pages/admin/AdminServiceProviders.tsx";
import ProviderProfile from "@/pages/provider/ProviderProfile.tsx";
import ProviderService from "@/pages/provider/ProviderService.tsx";
import ProviderReviews from "@/pages/provider/ProviderReviews.tsx";
import ProviderPayments from "@/pages/provider/ProviderPayments.tsx";
import UserServiceProviderDetailPage from "@/pages/user/UserServiceProviderDetailPage.tsx";
import ProviderDashboard from "@/pages/provider/ProviderDashboard.tsx";
import ProviderAppointments from "@/pages/provider/ProviderAppointments.tsx";
import ProviderNotifications from "@/pages/provider/ProviderNotifications.tsx";
import AdminPlans from "@/pages/admin/AdminPlans.tsx";
import Provider from "@/pages/provider/Provider.tsx";
import ProviderAddAddress from "@/pages/provider/ProviderAddAddress.tsx";
import ProviderAddServiceDetails from "@/pages/provider/ProviderAddServiceDetails.tsx";
import AdminServiceProviderDetailPage from "@/pages/admin/AdminServiceProviderDetailPage.tsx";
import ProviderAddress from "@/pages/provider/ProviderAddress.tsx";
import ProviderAvailability from "@/pages/provider/ProviderAvailability.tsx";
import ProviderSubscription from "@/pages/provider/ProviderSubscription.tsx";
import PaymentConfirmPage from "@/pages/common/PaymentConfirmPage.tsx";
import UserAddressPage from "@/pages/user/UserAddressPage.tsx";
import AdminSubscriptions from "@/pages/admin/AdminSubscriptions.tsx";
import AdminSubcriptionDetailedView from "@/pages/admin/AdminSubcriptionDetailedView.tsx";
import AdminPayments from "@/pages/admin/AdminPayments.tsx";
import UserServiceSelectPage from "@/pages/user/UserServiceSelectPage.tsx";

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
                        <Admin />
                    </ProtectedRoute>
                ),
                children: [
                    { index: true, element: <AdminDashboard /> },
                    { path: "service-providers", element: <AdminServiceProviders /> },
                    { path: "service-provider/:providerId", element: <AdminServiceProviderDetailPage /> },
                    { path: "users", element: <AdminUsers /> },
                    { path: "services", element: <AdminServices /> },
                    { path: "plans", element: <AdminPlans /> },
                    { path: "subscriptions", element: <AdminSubscriptions /> },
                    { path: "payments", element: <AdminPayments /> },
                    { path: "subscription/:subscriptionId", element: <AdminSubcriptionDetailedView /> },
                    { path: "*", element: <ErrorDisplay /> },
                ],
            },
            {
                path: "/user",
                element: (
                    <ProtectedRoute allowedRoles={["USER"]}>
                        <User />
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
                        <Provider />
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
