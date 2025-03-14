import User from "@/pages/user/User.tsx";
import LandingLayout from "../pages/common/LandingLayout.tsx";
import Users from "../pages/admin/Users.tsx";
import Admin from "../pages/admin/Admin.tsx";
import UserChat from "@/pages/user/UserChat.tsx";
import Services from "@/pages/admin/Services.tsx";
import UserLogin from "@/pages/common/UserLogin.tsx";
import LandingPage from "../pages/common/LandingPage.tsx";
import Dashboard from "../pages/admin/Dashboard.tsx";
import AdminLogin from "@/pages/common/AdminLogin.tsx";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoutes.tsx";
import UserProfile from "@/pages/user/UserProfile.tsx";
import UserPayments from "@/pages/user/UserPayments.tsx";
import UserBookings from "@/pages/user/UserBookings.tsx";
import ServiceSelect from "@/pages/user/ServiceSelect.tsx";
import UserDashboard from "@/pages/user/UserDashboard.tsx";
import PasswordReset from "@/pages/common/PasswordReset.tsx";
import ProviderChat from "@/pages/provider/ProviderChat.tsx";
import ProviderLogin from "@/pages/common/ProviderLogin.tsx";
import ErrorDisplay from "@/pages/common/ErrorDisplay.tsx";
import UserNotifications from "@/pages/user/UserNotifications.tsx";
import ProviderPayment from "@/pages/provider/ProviderPayment.tsx";
import ServiceProviders from "../pages/admin/ServiceProviders.tsx";
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
        ],
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Admin />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Dashboard /> },
            { path: "service-providers", element: <ServiceProviders /> },
            { path: "users", element: <Users /> },
            { path: "services", element: <Services /> },
            { path: "plans", element: <AdminPlans /> },
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
            { index: true, element: <ServiceSelect /> },
            { path: "dashboard", element: <UserDashboard /> },
            { path: "providerProfile", element: <UserProviderProfile /> },
            { path: "profile", element: <UserProfile /> },
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
            { path: "service", element: <ProviderService /> },
            { path: "reviews", element: <ProviderReviews /> },
            { path: "appointments", element: <ProviderAppointments /> },
            { path: "payments", element: <ProviderPayments /> },
            { path: "chat", element: <ProviderChat /> },
            { path: "notifications", element: <ProviderNotifications /> },
            { path: "payment", element: <ProviderPayment />},
            { path: "*", element: <ErrorDisplay /> },
        ],
    },
])
