import Body from "../pages/Body.tsx";
import User from "../pages/User.tsx";
import Login from "../pages/Login.tsx";
import Admin from "../pages/Admin.tsx";
import HomePage from "../pages/HomePage.tsx";
import Provider from "../pages/Provider.tsx";
import { createBrowserRouter } from "react-router-dom";

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
                element: <Admin />
            },
            {
                path: "/user",
                element: <User />
            },
            {
                path: "/provider",
                element: <Provider />
            }
        ]
    }
])