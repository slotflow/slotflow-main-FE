import User from "../pages/user/User.tsx";
import Body from "../pages/common/Body.tsx";
import Users from "../pages/admin/Users.tsx";
import Admin from "../pages/admin/Admin.tsx";
import Services from "@/pages/admin/Services.tsx";
import ProtectedRoute from "./protectedRoutes.tsx";
import UserLogin from "@/pages/user/UserLogin.tsx";
import Settings from "../pages/admin/Settings.tsx";
import HomePage from "../pages/common/HomePage.tsx";
import Dashboard from "../pages/admin/Dashboard.tsx";
import Provider from "../pages/provider/Provider.tsx";
import AdminLogin from "@/pages/admin/AdminLogin.tsx";
import { createBrowserRouter } from "react-router-dom";
import PasswordReset from "@/pages/common/PasswordReset.tsx";
import ProviderLogin from "@/pages/provider/ProviderLogin.tsx";
import ServiceProviders from "../pages/admin/ServiceProviders.tsx";

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Body />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/forgotPassword",
                element: <PasswordReset />
            },
            {
                path: "/admin",
                element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
                children: [
                    {
                        path: "/admin",
                        element: <Admin />,
                        children: [
                            { path: "/admin/dashboard", element: <Dashboard /> },
                            { path: "/admin/service-providers", element: <ServiceProviders /> },
                            { path: "/admin/users", element: <Users /> },
                            { path: "/admin/services", element: <Services /> },
                            { path: "/admin/settings", element: <Settings /> },
                        ],
                    },
                ],
            },
            {
                path: "/admin/login",
                element: <AdminLogin />,
            },
            // User Routes
            {
                path: "/user",
                element: <ProtectedRoute allowedRoles={["USER"]} />,
                children: [
                    {
                        path: "/user",
                        element: <User />,
                    },
                ],
            },
            {
                path: "/user/login",
                element: <UserLogin />,
            },
            // Provider Routes
            {
                path: "/provider",
                element: <ProtectedRoute allowedRoles={["PROVIDER"]} />,
                children: [
                    {
                        path: "/provider",
                        element: <Provider />,
                    },
                ],
            },
            {
                path: "/provider/login",
                element: <ProviderLogin />,
            }
        ],
    },
])