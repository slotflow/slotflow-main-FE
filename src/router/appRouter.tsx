import User from "../pages/user/User.tsx";
import Body from "../pages/common/Body.tsx";
import Users from "../pages/admin/Users.tsx";
import Admin from "../pages/admin/Admin.tsx";
import Services from "@/pages/admin/Services.tsx";
import UserLogin from "@/pages/user/UserLogin.tsx";
import HomePage from "../pages/common/HomePage.tsx";
import Dashboard from "../pages/admin/Dashboard.tsx";
import Provider from "../pages/provider/Provider.tsx";
import AdminLogin from "@/pages/admin/AdminLogin.tsx";
import ServiceSelect from "@/pages/user/ServiceSelect.tsx";
import PasswordReset from "@/pages/common/PasswordReset.tsx";
import ProviderLogin from "@/pages/provider/ProviderLogin.tsx";
import {  createBrowserRouter, Navigate } from "react-router-dom";
// import { BrowserRouter, createBrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ServiceProviders from "../pages/admin/ServiceProviders.tsx";
import { AdminProtectedRoute, ProviderProtectedRoute, UserProtectedRoute } from "./protectedRoutes.tsx";
// import { Suspense } from "react";
// import { Home } from "lucide-react";

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
                element: <AdminProtectedRoute />,
                children: [
                    {
                        path: "/admin",
                        element: <Admin />,
                        children: [
                            { index: true, element: <Dashboard /> },
                            { path: "dashboard", element: <Navigate to="/admin" replace /> },
                            { path: "service-providers", element: <ServiceProviders /> },
                            { path: "users", element: <Users /> },
                            { path: "services", element: <Services /> },
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
                element: <UserProtectedRoute />,
                children: [
                    { path: "selectService", element: <ServiceSelect /> },
                    { path: "Profile", element: <User /> },
                ],
            },
            {
                path: "/user/login",
                element: <UserLogin />,
            },
            // Provider Routes
            {
                path: "/provider",
                element: <ProviderProtectedRoute />,
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

// export const appRouternew = () => {
//     return (
//         <BrowserRouter>
//             <Suspense fallback={<h1>Loading</h1>}>
//                 <Routes>
//                     <Route path='/' element={<Home />}/>
//                     <Route path='/admin/login' element={<AdminLogin />}/>
//                     <Route path='/user/login' element={<UserLogin />}/>
//                     <Route path='/provider/login' element={<ProviderLogin />}/>

//                     <Route path='/admin/*' 
//                            element={
//                                     <AdminProtectedRoute allowedRoles={['ADMIN']}>
                                        
//                                     </AdminProtectedRoute>
//                            }
//                     />
//                 </Routes>
//             </Suspense>
//         </BrowserRouter>
//     )
// }