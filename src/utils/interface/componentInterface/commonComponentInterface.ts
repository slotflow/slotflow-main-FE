import { createAsyncThunk } from "@reduxjs/toolkit";
import { Provider } from "../entityInterface/providerInterface";
import { BaseChartData, ChatComponentProps, TimeRange } from "../commonInterface";
import { AdminFetchProviderAvailabilityResponse, AdminFetchProviderServiceResponse } from "../api/adminProviderApiInterface";
import { UpdateUserProfileImageResponse, UserFetchProviderAvailabilityResponse, UserFetchProviderServiceResponse } from "../api/userApiInterface";
import { ProviderFetchServiceAvailabilityResponse, ProviderFetchServiceDetailsResponse, ProviderUpdateProfileImageResponse } from "../api/providerApiInterface";
import { ChartConfig } from "@/components/ui/chart";
import { LucideIcon } from "lucide-react";


// **** Common component interfaces **** \\
// **** Used in components / common **** \\
// **** Used in components / chart **** \\

// **** 1.  profile head compoenent props interface
export interface ProfileHeaderComponentProps {
    updation: boolean;
    updateProfileImageApiFunction?: ReturnType<typeof createAsyncThunk<
        ProviderUpdateProfileImageResponse | UpdateUserProfileImageResponse,
        FormData
    >>;
    showDetails?: boolean;
    isMyProfile?: boolean;
    selectedUserData?: {selectedUserName: string, selectedUserProfileImage: string| null};
}


// **** 2.  Provider service availabilit component props interface
type FetchApiFunctionUserOrAdminRequestPayloadProps = {
    providerId: Provider["_id"]
    date: Date
}
export type ProviderApiFunctionForPSAcomponent = (date: Date) => Promise<ProviderFetchServiceAvailabilityResponse>;
export type UserOrAdminApiFunctionForPSAcomponent = (payload: FetchApiFunctionUserOrAdminRequestPayloadProps) => Promise<UserFetchProviderAvailabilityResponse | AdminFetchProviderAvailabilityResponse>;
type FetchApiFunction = ProviderApiFunctionForPSAcomponent | UserOrAdminApiFunctionForPSAcomponent;
export interface ProviderServiceAvailabilityComponentProps {
    providerId?: string
    fetchApiFuntion: FetchApiFunction;
    queryKey: string;
    role?: string;
}


// **** 3.  Provider Service details showing component props interface
export interface ProviderServiceDetailsComponentProps {
    providerId?: Provider["_id"];
    fetchApiFunction: (providerId?: Provider["_id"]) => Promise<
    AdminFetchProviderServiceResponse |
    ProviderFetchServiceDetailsResponse |
    UserFetchProviderServiceResponse
    >;
    queryKey: string;
    isUser?: boolean;
    shimmerRow?: number;
}


// **** 4. DateSelect component interface
export interface DateSelectInterface {
    onValueChange: (value: TimeRange) => void;
    value: string;
}

// **** 5. Chart Header component interface
export interface ChartHeaderInterface {
    title: string;
    description?: string;
    onValueChange?: (value: TimeRange) => void;
    value?: string;
}


// **** 6. AreaGroupChart compoenent props type
export type AreaGroupChartProps = Pick<ChatComponentProps<BaseChartData>, "title" | "description" | "chartData" | "dataKeyOne" | "dataKeyTwo" | "dataKeyThree" | "chartConfig" | "isLocked">;


// **** 7. BarChartHorizontal compoenent props type
export type BarChartHorizontalProps = Pick<ChatComponentProps<BaseChartData>, "title" | "description" | "chartData" | "dataKeyOne" | "dataKeyTwo" | "dataKeyThree" | "chartConfig" | "isLocked">; 


// **** 8. BarChartStacked compoenent props type
export type BarChartStackedProps = Pick<ChatComponentProps<BaseChartData>, "title" | "description" | "chartData" | "dataKeyOne" | "dataKeyTwo" | "dataKeyThree" | "chartConfig" | "isLocked">;


// **** 9. BarChartVertical compoenent props type
export type BarChartVerticalProps = Pick<ChatComponentProps<BaseChartData>, "title" | "description" | "chartData" | "dataKeyOne" | "dataKeyTwo" | "chartConfig" | "isLocked"> ;


// **** 10. ChartLineMultiple compoenent props type
export type ChartLineMultipleProps = Pick<ChatComponentProps<BaseChartData>, "title" | "description" | "chartData" | "dataKeyOne" | "dataKeyTwo" | "chartConfig" | "isLocked"> ;


// **** 11. LineChartHorizontal compoenent props type
export type LineChartHorizontalProps = Pick<ChatComponentProps<BaseChartData>, "title" | "description" | "chartData" | "dataKeyOne" | "dataKeyTwo" | "chartConfig" | "isLocked"> ;


// **** 12. PieChartCompletionBreakdown compoenent props type
interface CompletionBreakdownData {
  status: string;
  value: number;
}
export interface CompletionChartProps {
  title: string;
  description: string;
  chartData: CompletionBreakdownData[];
  dataKey: string;
  chartConfig: ChartConfig;
  nameKey: string;
  isLocked: boolean;
}
// **** 13. RadialChart compoenent props type
export type ChartDataItem = Record<string, string | number>;
export interface RadialChartInterface<T extends ChartDataItem> {
  title: string;
  description: string;
  chartData: T[];
  dataKeyOne: keyof T;
  dataKeyTwo: keyof T;
  chartConfig: ChartConfig;
  isLocked: boolean;
}


// **** 14. Contact Page
export interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}