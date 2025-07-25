import { Plan } from "./interface/entityInterface/planInterface";
import { dataSelectListItem, gsapBigSvgYDirectionAnimationProps, HeaderCompoenentNavsProps, Route } from "./interface/commonInterface";
import {
  Banknote,
  CalendarCheck,
  CheckCircle,
  Clock,
  Hourglass,
  Receipt,
  TrendingUp,
  Wallet,
  XCircle,
  Ban,
  ThumbsDown,
  CreditCard,
  IndianRupee,
  DollarSign,
  LucideIcon,
} from "lucide-react";
import { ProviderFetchDashboardStatsDataResponse } from "./interface/api/providerApiInterface";

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
  { path: "subscriptions", name: "Subscriptions" },
  { path: "payments", name: "Payments" },
  { path: "chat", name: "Chat" },
  { path: "video-call", name: "Video call"},
  { path: "reviews", name: "Reviews" },
  { path: "notifications", name: "Notifications" },
]

// Access Control For Provider
export const planAccessMap: Record<string, string[]> = {
  NoSubscription: [
    "Dashboard",
    "Profile",
    "Address",
    "Service",
    "Availability",
  ],
  Free: [
    "Dashboard",
    "Profile",
    "Address",
    "Service",
    "Availability",
    "Appointments",
    "Subscriptions",
  ],
  Starter: [
    "Dashboard",
    "Profile",
    "Address",
    "Service",
    "Availability",
    "Appointments",
    "Subscriptions",
    "Payments",
    "Notifications",
  ],
  Professional: [
    "Dashboard",
    "Profile",
    "Address",
    "Service",
    "Availability",
    "Appointments",
    "Subscriptions",
    "Payments",
    "Notifications",
    "Chat",
    "Reviews",
  ],
  Enterprise: [
    "Dashboard",
    "Profile",
    "Address",
    "Service",
    "Availability",
    "Appointments",
    "Subscriptions",
    "Payments",
    "Notifications",
    "Chat",
    "Video call",
    "Reviews",
  ],
};


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
  { name: 'Home', href: '#home', current: true },
  { name: 'Features', href: '#features', current: false },
  { name: 'Pricing', href: '#pricing', current: false },
  { name: 'Reviews', href: '#reviews', current: false },
  { name: 'About', href: '#', current: false },
  { name: 'Help', href: '#', current: false },
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
    starter: boolean;
    professional: boolean;
    enterprise: boolean;
  }[];
}

type PlanList = Array<Pick<Plan, "_id" | "planName" | "description" | "features" | "price">>

export const PlanList: PlanList = [
  {
    _id: "0",
    planName: "Free",
    description: "Perfect for individuals or freelancers getting started with appointment scheduling.",
    features: [
      "Basic slot creation & booking",
      "Email notifications for bookings",
      "Cancel anytime",
      "Up to 7 bookings",
      "7 days validity",
    ],
    price: 0
  },
  {
    _id: "1",
    planName: "Starter",
    description: "Ideal for solo professionals looking for a branded experience and better control.",
    features: [
      "Everything in Free Plan",
      "Up to 100 bookings per month",
      "Starter dashboard",
      "Custom branding theme",
      "Email Support",
      "Basic Dashboard"
    ],
    price: 499
  },
  {
    _id: "2",
    planName: "Professional",
    description: "Designed for growing teams or businesses that require advanced scheduling and integrations.",
    features: [
      "Everything in Starter Plan",
      "Up to 500 bookings per month",
      "Custom branding logo",
      "Chat service",
      "Google Calendar sync",
      "24/7 Chat support",
      "Medium analytics dashborad",
    ],
    price: 1499
  },
  {
    _id: "3",
    planName: "Enterprise",
    description: "Best suited for organizations that need scalable, secure, and fully customizable scheduling solutions.",
    features: [
      "Everything in Professional Plan",
      "Unlimited bookings",
      "Video call service",
      "Advertisement visibility",
      "24/7 premium support",
      "Advanced analytics dashboard",
    ],
    price: 4999
  }
]

export const planFeatures: PlanFeature[] = [
{
    type: "Support",
    features: [
      {
        name: "Email support",
        free: false,
        starter: true,
        professional: true,
        enterprise: true
      },
      {
        name: "Chat support",
        free: false,
        starter: false,
        professional: true,
        enterprise: true
      },
      {
        name: "24/7 premium support",
        free: false,
        starter: false,
        professional: false,
        enterprise: true
      }
    ]
  },
  {
    type: "Booking",
    features: [
      {
        name: "Booking limit: 7",
        free: true,
        starter: false,
        professional: false,
        enterprise: false
      },
      {
        name: "Booking limit: 100/month",
        free: false,
        starter: true,
        professional: false,
        enterprise: false
      },
      {
        name: "Booking limit: 500/month",
        free: false,
        starter: false,
        professional: true,
        enterprise: false
      },
      {
        name: "Unlimited bookings",
        free: false,
        starter: false,
        professional: false,
        enterprise: true
      }
    ]
  },
  {
    type: "Integrations",
    features: [
      {
        name: "Chat service",
        free: false,
        starter: false,
        professional: true,
        enterprise: true
      },
      {
        name: "Google Calendar sync",
        free: false,
        starter: false,
        professional: true,
        enterprise: true
      },
      {
        name: "Video call service",
        free: false,
        starter: false,
        professional: false,
        enterprise: true
      }
    ]
  },
  {
    type: "Analytics & Branding",
    features: [
      {
        name: "Starter dashboard",
        free: false,
        starter: true,
        professional: false,
        enterprise: false
      },
      {
        name: "Medium analytics dashboard",
        free: false,
        starter: false,
        professional: true,
        enterprise: false
      },
      {
        name: "Advanced analytics dashboard",
        free: false,
        starter: false,
        professional: false,
        enterprise: true
      },
      {
        name: "Custom branding theme",
        free: false,
        starter: true,
        professional: true,
        enterprise: true
      },
      {
        name: "Custom branding logo",
        free: false,
        starter: false,
        professional: true,
        enterprise: true
      }
    ]
  },
  {
    type: "Advertisement",
    features: [
      {
        name: "Advertisement visibility",
        free: false,
        starter: false,
        professional: true,
        enterprise: true
      }
    ]
  },
  {
    type: "Plan Control",
    features: [
      {
        name: "Cancel anytime",
        free: true,
        starter: true,
        professional: true,
        enterprise: true
      },
      {
        name: "7 days validity",
        free: true,
        starter: false,
        professional: false,
        enterprise: false
      }
    ]
  },
  {
    type: "Purpose",
    features: [
      {
        name: "Recommended for testing purpose",
        free: true,
        starter: false,
        professional: false,
        enterprise: false
      },
      {
        name: "Recommended for solo professionals",
        free: false,
        starter: true,
        professional: false,
        enterprise: false
      },
      {
        name: "Recommended for growing teams",
        free: false,
        starter: false,
        professional: true,
        enterprise: false
      },
      {
        name: "Recommended for enterprises",
        free: false,
        starter: false,
        professional: false,
        enterprise: true
      }
    ]
  }
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


// **** Features Section Data
interface featureContent {
  title: string;
  description: string;
  href: string;
}
export const featureContent: featureContent[] = [
  {
    title: "Collaborative Editing",
    description: "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    href: ""
  },
  {
    title: "Real time changes",
    description: "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    href: ""
  },
  {
    title: "Version control",
    description: "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    href: ""
  },
  {
    title: "Running out of content",
    description: "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    href: ""
  },
];


// **** Provider Dashboard Stats Cards Data
export const statsMap: {
  title: string;
  key: keyof ProviderFetchDashboardStatsDataResponse;
  icon: LucideIcon;
  price?: boolean;
}[] = [
  {
    title: "Total Appointments",
    key: "totalAppointments",
    icon: CalendarCheck,
  },
  {
    title: "Completed Appointments",
    key: "completedAppointments",
    icon: CheckCircle,
  },
  {
    title: "Missed Appointments",
    key: "missedAppointments",
    icon: XCircle,
  },
  {
    title: "Cancelled by User",
    key: "cancelledAppointmentsByUser",
    icon: Ban,
  },
  {
    title: "Rejected by Provider",
    key: "rejectedAppointmentsByProvider",
    icon: ThumbsDown,
  },
  {
    title: "Today’s Appointments",
    key: "todaysAppointments",
    icon: Clock,
  },
  {
    title: "Subscription Payments",
    key: "totalSubscriptionPaidAmount",
    icon: Receipt,
    price: true,
  },
  {
    title: "Total Earnings",
    key: "totalEarnings",
    icon: Banknote,
    price: true,
  },
  {
    title: "Earnings via Stripe",
    key: "totalEarningsThroughStripe",
    icon: CreditCard,
    price: true,
  },
  {
    title: "Earnings via Razorpay",
    key: "totalEarningsThroughRazorpay",
    icon: IndianRupee,
    price: true,
  },
  {
    title: "Earnings via PayPal",
    key: "totalEarningsThroughPaypal",
    icon: DollarSign,
    price: true,
  },
  {
    title: "Today’s Earnings",
    key: "todaysEarnings",
    icon: TrendingUp,
    price: true,
  },
  {
    title: "Total Payouts Made",
    key: "totalPayoutsMade",
    icon: Wallet,
    price: true,
  },
  {
    title: "Pending Payout",
    key: "pendingPayout",
    icon: Hourglass,
    price: true,
  },
];


// **** Provider Dashboard Graphs map according to plan
export const planChartAccess: Record<string, string[]> = {
  Starter: [
    "AppointmentsOverTime",
    "TopBookingDays",
  ],
  Professional: [
    "AppointmentsOverTime",
    "TopBookingDays",
    "AppointmentModeTrend",
    "NewVsReturningUsers",
  ],
  Enterprise: [
    "AppointmentsOverTime",
    "TopBookingDays",
    "AppointmentDistribution",
    "PeakBookingHours",
    "AppointmentModeTrend",
    "AppointmentCompletionBreakdown",
    "NewVsReturningUsers",
  ],
};