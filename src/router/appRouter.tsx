import Body from "../pages/Body.tsx";
import User from "../pages/User.tsx";
import Login from "../pages/Login.tsx";
import Admin from "../pages/admin/Admin.tsx";
import HomePage from "../pages/HomePage.tsx";
import Provider from "../pages/Provider.tsx";
import Users from "../pages/admin/Users.tsx";
import ProtectedRoute from "./protectedRoutes.tsx";
import Settings from "../pages/admin/Settings.tsx";
import Dashboard from "../pages/admin/Dashboard.tsx";
import { createBrowserRouter } from "react-router-dom";
import ServiceProviders from "../pages/admin/ServiceProviders.tsx";
import Services from "@/pages/admin/Services.tsx";

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Body />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/admin",
                element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
                children: [
                    {
                        path: "/admin", element: <Admin />, children: [
                            { path: "/admin/dashboard", element: <Dashboard /> },
                            { path: "/admin/service-providers", element: <ServiceProviders /> },
                            { path: "/admin/users", element: <Users /> },
                            { path: "/admin/services", element: <Services /> },
                            { path: "/admin/settings", element: <Settings /> },
                        ]
                    },
                ],
            },
            {
                path: "/user",
                element: <ProtectedRoute allowedRoles={["USER"]} />,
                children: [
                    {
                        path: "/user", element: <User />
                    }
                ]
            },
            {
                path: "/provider",
                element: <ProtectedRoute allowedRoles={["PROVIDER"]} />,
                children: [
                    {
                        path: "/provider", element: <Provider />
                    }
                ]
            }
        ]
    }
])