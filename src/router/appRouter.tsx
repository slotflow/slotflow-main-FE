import Body from "../pages/Body.tsx";
import User from "../pages/User.tsx";
import Login from "../pages/Login.tsx";
import Admin from "../pages/Admin.tsx";
import HomePage from "../pages/HomePage.tsx";
import Provider from "../pages/Provider.tsx";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes.tsx";

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
                element: <ProtectedRoute allowedRoles={["ADMIN"]}/>,
                children: [
                    {
                        path: "/admin", element: <Admin />
                    }
                ]
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