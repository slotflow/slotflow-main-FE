import User from "@/pages/user/User.tsx";
import LandingLayout from "../pages/common/LandingLayout.tsx";
import AdminUsers from "../pages/admin/AdminUsers.tsx";
import Admin from "../pages/admin/Admin.tsx";
import UserChat from "@/pages/user/UserChat.tsx";
import AdminServices from "@/pages/admin/AdminServices.tsx";
import UserLogin from "@/pages/common/UserLogin.tsx";
import LandingPage from "../pages/common/LandingPage.tsx";
import AdminDashboard from "../pages/admin/AdminDashboard.tsx";
import AdminLogin from "@/pages/common/AdminLogin.tsx";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoutes.tsx";
import UserProfile from "@/pages/user/UserProfile.tsx";
import UserPayments from "@/pages/user/UserPayments.tsx";
import UserBookings from "@/pages/user/UserBookings.tsx";
import UserServiceSelect from "@/pages/user/UserServiceSelect.tsx";
import UserDashboard from "@/pages/user/UserDashboard.tsx";
import PasswordReset from "@/pages/common/PasswordReset.tsx";
import ProviderChat from "@/pages/provider/ProviderChat.tsx";
import ProviderLogin from "@/pages/common/ProviderLogin.tsx";
import ErrorDisplay from "@/pages/common/ErrorDisplay.tsx";
import UserNotifications from "@/pages/user/UserNotifications.tsx";
import AdminServiceProviders from "../pages/admin/AdminServiceProviders.tsx";
import ProviderProfile from "@/pages/provider/ProviderProfile.tsx";
import ProviderService from "@/pages/provider/ProviderService.tsx";
import ProviderReviews from "@/pages/provider/ProviderReviews.tsx";
import ProviderPayments from "@/pages/provider/ProviderPayments.tsx";
import UserProviderProfile from "@/pages/user/UserProviderProfile.tsx";
import ProviderDashboard from "@/pages/provider/ProviderDashboard.tsx";
import ProviderAppointments from "@/pages/provider/ProviderAppointments.tsx";
import ProviderNotifications from "@/pages/provider/ProviderNotifications.tsx";
import AdminPlans from "@/pages/admin/AdminPlans.tsx";
import Provider from "@/pages/provider/Provider.tsx";
import ProviderAddAddress from "@/pages/provider/ProviderAddAddress.tsx";
import ProviderAddServiceDetails from "@/pages/provider/ProviderAddServiceDetails.tsx";
import AdminServiceProviderDetailProfile from "@/pages/admin/AdminServiceProviderDetailProfile.tsx";
import ProviderAddress from "@/pages/provider/ProviderAddress.tsx";
import ProviderAvailability from "@/pages/provider/ProviderAvailability.tsx";
import ProviderSubscription from "@/pages/provider/ProviderSubscription.tsx";
import PaymentConfirmPage from "@/pages/common/PaymentConfirmPage.tsx";
import UserAddress from "@/pages/user/UserAddress.tsx";
import AdminSubscriptions from "@/pages/admin/AdminSubscriptions.tsx";
import AdminSubcriptionDetailedView from "@/pages/admin/AdminSubcriptionDetailedView.tsx";
import AdminPayments from "@/pages/admin/AdminPayments.tsx";

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
                    { path: "service-provider/:providerId", element: <AdminServiceProviderDetailProfile /> },
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
                    { index: true, element: <UserServiceSelect /> },
                    { path: "dashboard", element: <UserDashboard /> },
                    { path: "providerProfile", element: <UserProviderProfile /> },
                    { path: "profile", element: <UserProfile /> },
                    { path: "address", element: <UserAddress /> },
                    { path: "bookings", element: <UserBookings /> },
                    { path: "payments", element: <UserPayments /> },
                    { path: "chat", element: <UserChat /> },
                    { path: "notifications", element: <UserNotifications /> },
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
                    { path: "payment-success", element: <PaymentConfirmPage status={true} /> },
                    { path: "payment-failed", element: <PaymentConfirmPage status={false} /> },
                    { path: "*", element: <ErrorDisplay /> },
                ],
            },
        ],
    },
])
