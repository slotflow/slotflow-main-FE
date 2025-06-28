import { Plan } from "../entityInterface/planInterface";
import { Subscription } from "../entityInterface/subscriptionInterface";

// **** common return type of fetch provider subscriptions for admin and provider
// Used as the return type for Fetching a specific providers subscriptons API,
// and in ProviderSubscriptionsTableColumns, AdminProviderApi, AdminProviderSubscriptions
export type FetchProviderSubscriptionsResponse = Pick<Subscription, "_id" | "startDate" | "endDate" | "subscriptionStatus"> & Pick<Plan, "planName" | "price">;

