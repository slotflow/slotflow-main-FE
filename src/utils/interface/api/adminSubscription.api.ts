import { Subscription } from "../subscriptionInterface";

// Admin fetch all subscription api response props
export type AdminFetchAllSubscriptionsResponseProps = Pick<Subscription, "_id" | "createdAt" | "providerId" | "startDate" | "endDate" | "subscriptionStatus">;
