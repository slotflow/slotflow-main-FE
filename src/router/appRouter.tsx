import User from "@/pages/user/User.tsx";
import Body from "../pages/common/Body.tsx";
import Users from "../pages/admin/Users.tsx";
import Admin from "../pages/admin/Admin.tsx";
import UserChat from "@/pages/user/UserChat.tsx";
import Services from "@/pages/admin/Services.tsx";
import UserLogin from "@/pages/user/UserLogin.tsx";
import HomePage from "../pages/common/HomePage.tsx";
import Dashboard from "../pages/admin/Dashboard.tsx";
import AdminLogin from "@/pages/admin/AdminLogin.tsx";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoutes.tsx";
import UserProfile from "@/pages/user/UserProfile.tsx";
import UserPayments from "@/pages/user/UserPayments.tsx";
import UserBookings from "@/pages/user/userBookings.tsx";
import ServiceSelect from "@/pages/user/ServiceSelect.tsx";
import UserDashboard from "@/pages/user/UserDashboard.tsx";
import PasswordReset from "@/pages/common/PasswordReset.tsx";
import ProviderLogin from "@/pages/provider/ProviderLogin.tsx";
import ServiceProviders from "../pages/admin/ServiceProviders.tsx";
import UserNotifications from "@/pages/user/UserNotifications.tsx";
import UserProviderProfile from "@/pages/user/UserProviderProfile.tsx";


export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Body />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/forgotPassword", element: <PasswordReset /> },
            { path: "/admin/login", element: <AdminLogin /> },
            { path: "/user/login", element: <UserLogin /> },
            { path: "/provider/login", element: <ProviderLogin /> },
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
                ],
            },
        ],
    },
])
