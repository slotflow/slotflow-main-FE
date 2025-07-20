import { dataSelectListItem, gsapBigSvgYDirectionAnimationProps, HeaderCompoenentNavsProps, Route } from "./interface/commonInterface";
import { Plan } from "./interface/entityInterface/planInterface";

// **** Routes for admin **** \\
export const adminRoutes: Route[] = [
  { path: "/admin", name: "Dashboard" },
  { path: "service-providers", name: "Service Providers" },
  { path: "users", name: "Users" },
  { path: "services", name: "Services" },
  { path: "plans", name: "Plans" },
  { path: "subscriptions", name: "Subscriptions" },
  { path: "payments", name: "Payments" },
  { path: "reviews", name: "Reviews" },
];

// **** Routes for user **** \\
export const userRoutes: Route[] = [
  { path: "dashboard", name: "Dashboard" },
  { path: "profile", name: "Profile" },
  { path: "address", name: "Address" },
  { path: "bookings", name: "Bookings" },
  { path: "payments", name: "Payments" },
  { path: "chat", name: "Chat" },
  { path: "notifications", name: "Notifications" },
]

// **** Routes for provider **** \\
export const providerRoutes: Route[] = [
  { path: "/provider", name: "Dashboard" },
  { path: "profile", name: "Profile" },
  { path: "address", name: "Address" },
  { path: "service", name: "Service" },
  { path: "availability", name: "Availability" },
  { path: "appointments", name: "Appointments" },
  { path: "subscription", name: "Subscription" },
  { path: "payments", name: "Payments" },
  { path: "chat", name: "Chat" },
  { path: "reviews", name: "Reviews" },
  { path: "notifications", name: "Notifications" },
]

// **** Gsap animation common oject **** \\
export const gsapBigSvgYDirectionAnimation: gsapBigSvgYDirectionAnimationProps = {
  y: 20,
  duration: 1,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut",
}

// **** Header Navigation Array ***** \\
export const navigation: HeaderCompoenentNavsProps[] = [
  { name: 'Home', href: '/', current: true },
  { name: 'Plans', href: '#', current: false },
  { name: 'Services', href: '#', current: false },
  { name: 'About', href: '#', current: false },
  { name: 'Contact', href: '#', current: false },
]

// **** Provider plan subscription duration array **** \\
export const planDurations: { durationName: string; durationMonth: number }[] = [
  { durationName: "1 Month", durationMonth: 1 },
  { durationName: "3 Months", durationMonth: 3 },
  { durationName: "6 Months", durationMonth: 6 },
  { durationName: "12 Months", durationMonth: 12 }
];

// **** Tabs for provider profile showing in admin side and provider side **** \\
export const providerTabs: { tabName: string, admin: boolean, user: boolean }[] = [
  { tabName: "Details", admin: true, user: true },
  { tabName: "Address", admin: true, user: true },
  { tabName: "Service", admin: true, user: true },
  { tabName: "Availability", admin: true, user: true },
  { tabName: "Subscriptions", admin: true, user: false },
  { tabName: "Payments", admin: true, user: false }
];

// **** Provider service availability component day map **** \\
export const dayMap: {
  [key: string]: {
    day: string,
    tab: number
  }
} = {
  "Sun": { day: "Sunday", tab: 0 },
  "Mon": { day: "Monday", tab: 1 },
  "Tue": { day: "Tuesday", tab: 2 },
  "Wed": { day: "Wednesday", tab: 3 },
  "Thu": { day: "Thursday", tab: 4 },
  "Fri": { day: "Friday", tab: 5 },
  "Sat": { day: "Saturday", tab: 6 }
}

// **** Not chat selected shimmer constants **** \\
export const shimmerMessages: { align: string, height: string, width: string }[] = [
  { align: "end", height: "h-10", width: "w-64" },
  { align: "start", height: "h-24", width: "w-60" },
  { align: "end", height: "h-36", width: "w-72" },
  { align: "start", height: "h-12", width: "w-44" },
  { align: "end", height: "h-14", width: "w-56" },
  { align: "start", height: "h-10", width: "w-60" },
  { align: "end", height: "h-28", width: "w-64" },
  { align: "start", height: "h-32", width: "w-72" },
  { align: "end", height: "h-24", width: "w-56" },
];

// **** ChartHeader date selector data **** \\
export const dateSelectList: dataSelectListItem[] = [
  { value: "7d", content: "Last 7 days" },
  { value: "14d", content: "Last 14 days" },
  { value: "30d", content: "Last month" },
  { value: "60d", content: "Last 2 months" },
  { value: "90d", content: "Last 3 months" },
  { value: "180d", content: "Last 6 months" },
  { value: "365d", content: "Last year" },
]


// **** Pricing Setion Data
interface PlanFeature {
  type: string;
  features: {
    name: string;
    free: boolean;
    standard: boolean;
    enterprise: boolean;
  }[];
}

type PlanList = Array<Pick<Plan, "_id" | "planName" | "description" | "features" | "price">>

export const PlanList: PlanList = [
  {
    _id: "0",
    planName: "Free",
    description: "A free trial plan with limited features for new users",
    features: [
      "Use this for testing your service",
      "No Priority support",
      "Booking limit 7",
      "No Ad visibility",
      "Recommended for testing purpose"
    ],
    price: 0
  },
  {
    _id: "1",
    planName: "Standard",
    description: "A balanced plan for mid sized business with essential features",
    features: [
      "Priority support",
      "Booking limit - 600",
      "Cancel anytime",
      "Ad visibility",
      "Recommended for mid tange services"
    ],
    price: 10000
  },
  {
    _id: "2",
    planName: "Enterprise",
    description: "A high end plan for large scale service providers with maximum exposue",
    features: [
      "Priority support",
      "No booking limit",
      "Cancel anytime",
      "Ad visibility",
      "Recommended for Highend services"
    ],
    price: 20000
  },
]

export const planFeatures: PlanFeature[] = [
  {
    type: "Support",
    features: [
      {
        name: "Priority support",
        free: false,
        standard: true,
        enterprise: true,
      },
    ],
  },
  {
    type: "Booking",
    features: [
      {
        name: "Booking limit 7",
        free: true,
        standard: false,
        enterprise: false,
      },
      {
        name: "Booking limit - 600",
        free: false,
        standard: true,
        enterprise: false,
      },
      {
        name: "No booking limit",
        free: false,
        standard: false,
        enterprise: true,
      },
    ],
  },
  {
    type: "Advertisement",
    features: [
      {
        name: "Visibility",
        free: false,
        standard: true,
        enterprise: true,
      },
    ],
  },
  {
    type: "Plan Control",
    features: [
      {
        name: "Cancel anytime",
        free: false,
        standard: true,
        enterprise: true,
      },
    ],
  },
  {
    type: "Purpose",
    features: [
      {
        name: "Recommended for testing purpose",
        free: true,
        standard: false,
        enterprise: false,
      },
      {
        name: "Recommended for mid range services",
        free: false,
        standard: true,
        enterprise: false,
      },
      {
        name: "Recommended for Highend services",
        free: false,
        standard: false,
        enterprise: true,
      },
    ],
  },
];


// **** FooterBar Data
interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

export const columns: FooterColumnProps[] = [
  {
    title: "Plans For your service",
    links: [
      { text: "Free", href: "" },
      { text: "Standard", href: "" },
      { text: "Enterprise", href: "" },
    ],
  },
  {
    title: "Company",
    links: [
      { text: "About", href: "" },
      { text: "Careers", href: "" },
      { text: "Blog", href: "" },
    ],
  },
  {
    title: "Connect",
    links: [
      { text: "Email", href: "mailto:slotflow.booking@gmail.com" },
      { text: "Facebook", href: "https://github.com/slotflow" },
      { text: "Instagram", href: "https://github.com/slotflow" },
      { text: "LinkedIn", href: "https://www.linkedin.com/in/midhunkpaniker" },
      { text: "Github", href: "https://github.com/slotflow" },
    ],
  },
]
export const copyright: string = " slotflow All rights reserved"
export const policies: FooterLink[] = [
  { text: "Privacy Policy", href: "" },
  { text: "Terms of Service", href: "" },
]
export const about: string = "Simplifying appointment scheduling for individuals and professionals. Stay organized, save time, and make every slot count.";


// **** Approval Pending Page data
interface ApprovalMessage {
  heading: string;
  message1: string;
  message2: string;
  footerNote: string;
}
export const approvalMessages: ApprovalMessage = {
  heading: "Approval in Progress",
  message1: "Thank you for your patience. Your request is currently being reviewed. We will notify you as soon as the process is complete.",
  message2: "We will notify you via email.",
  footerNote: "If you have any queries, please contact us.",
};
