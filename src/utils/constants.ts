import { Route } from "./types";

export const adminRoutes: Route[] = [
  { path: "/admin", name: "Dashboard" }, // Corrected
  { path: "/admin/service-providers", name: "Service Providers" },
  { path: "/admin/users", name: "Users" },
  { path: "/admin/services", name: "Services" },
  { path: "/admin/plans", name: "Plans" },
  { path: "/admin/subscriptions", name: "Subscriptions" },
  { path: "/admin/reviews", name: "Reviews" },
];

  export const userRoutes: Route[] = [
    { path: "dashboard", name: "Dashboard" },
    { path: "profile", name: "Profile" },
    { path: "bookings", name: "Bookings" },
    { path: "payments", name: "Payments" },
    { path: "chat", name: "Chat" },
    { path: "notifications", name: "Notifications" },
  ]