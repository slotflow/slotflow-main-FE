import { Plan } from "./planInterface";

// Provider
export interface Provider {
    _id: string;
    username: string;
    email: string;
    password: string;
    isBlocked: boolean;
    isEmailVerified: boolean;
    isAdminVerified: boolean;
    phone: string;
    profileImage: string;
    addressId: string;
    serviceId: string;
    serviceAvailabilityId: string;
    subscription: [string];
    verificationToken: string;
    trustedBySlotflow: boolean;
    createdAt: Date;
    updatedAt: Date;
}





//  **** PROVIDER COMPONENT / PAGES INTERFACES START **** //

// This is the interface of a right side showing compoenent in the provider address adding, service adding and availability adding page
export interface RightSideBoxProps {
    props: {
      pageNumber: number;
    };
  }


// Plan card interface showing in the provider subscription page
type CardProps = Pick<Plan, "_id" | "planName" | "description" | "features" | "price">;
export interface PlanCardProps {
    plan: CardProps;
    storeSubscribingData: (id: string, planPrice: number) => void;
}

// Plan list interface showing in provider subscription page
export interface PlanListProps {
    storeSubscribingData: (planId: string, planPrice: number) => void;
    showPlans: boolean;
    plansRef: React.RefObject<HTMLDivElement>;
}

// Payment confirmation page interface 
export interface PaymentConfirmPageProps {
  status: boolean;
}

// Payment selection card interface used in the provider subscription page
export interface PaymentSelectionProps {
  paymentSelectionRef: React.RefObject<HTMLDivElement>;
}

//  **** PROVIDER COMPONENT / PAGES INTERFACES END **** //
