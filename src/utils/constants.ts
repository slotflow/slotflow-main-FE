import { Route } from "./types";

export const adminRoutes: Route[] = [
    { path: "dashboard", name: "Dashboard" },
    { path: "service-providers", name: "Service Providers" },
    { path: "users", name: "Users" },
    { path: "services", name: "Services" },
    { path: "plans", name: "Plans" },
    { path: "subscriptions", name: "Subscriptions" },
    { path: "reviews", name: "Reviews" },
  ];

  export const userRoutes: Route[] = [
    { path: "dashboard", name: "Dashboard" },
    { path: "profile", name: "Profile" },
    { path: "bookings", name: "Bookings" },
    { path: "payments", name: "Payments" },
    { path: "reviews", name: "Reviews" },
    { path: "chat", name: "Chat" },
    { path: "notifications", name: "Notifications" },
  ]