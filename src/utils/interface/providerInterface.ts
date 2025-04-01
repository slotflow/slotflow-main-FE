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
    createdAt: string;
    updatedAt: string;
}



// This is the interface of a right side showing compoenent in the provider address adding, service adding and availability adding page
export interface RightSideBoxProps {
    props: {
      pageNumber: number;
    };
  }



type CardProps = Pick<Plan, "_id" | "planName" | "description" | "features" | "price">;
export interface PlanCardProps {
    plan: CardProps;
    storeSubscribingData: (id: string, planPrice: number) => void;
}

export interface PlanListProps {
    storeSubscribingData: (planId: string, planPrice: number) => void;
    showPlans: boolean;
    plansRef: React.RefObject<HTMLDivElement>;
}


export interface PaymentConfirmPageProps {
  status: boolean;
}

export interface PaymentSelectionProps {
  paymentSelectionRef: React.RefObject<HTMLDivElement>;
}


export interface PlanListProps {
    storeSubscribingData: (planId: string, planPrice: number) => void;
    showPlans: boolean;
    plansRef: React.RefObject<HTMLDivElement>;
}