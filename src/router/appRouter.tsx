import Login from "../pages/Login";
import Body from "../pages/Body.tsx";
import HomePage from "../pages/HomePage.tsx";
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
            }
        ]
    }
])