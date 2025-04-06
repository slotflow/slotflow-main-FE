import { Service } from "../appServiceInterface";
import { CommonResponse } from "../commonInterface";

// **** ADMIN APP SERVICE API INTERFACES START **** \\

// Admin fetch all app services
// Used in adminService.api.ts, columns.tsx, useAdminServiceActions.ts
export type AdminFetchAllServices = Pick<Service , "_id" | "serviceName" | "isBlocked">;

// Admin adding new app service api request payload interface used in adminService.api.ts
export interface AdminAddNewServiceRequestPayload {
    appServiceName: string
}

// Admin add new app service api response interface used in adminService.api.ts
export interface AdminAddNewServiceResponseProps extends CommonResponse {
    service: Pick<Service , "_id" | "serviceName" | "isBlocked">;
}

// Admin change app service block status api request payload interface used in adminService.api.ts
export interface AdminChangeServiceBlockStatusRequestPayload {
    serviceId: string;
    status: boolean;
}

// Admin change service block status api response interface used in adminService.api.ts
export interface AdminChangeServiceBlockStatusResponseProps extends CommonResponse {
    updatedService: Pick<Service , "_id" | "serviceName" | "isBlocked">;
}

// **** ADMIN APP SERVICE API INTERFACES END **** \\





// **** ADMIN SERVICE CUSTOM HOOK INTERFACES START **** \\

// Admin service custom hook interface used in useAdminServiceAction
export interface UseAdminServiceActionReturnType {
    handleServiceAdding: (serviceName: string,setLoading: (loading: boolean) => void) => void;
    handleChangeServiceStatus: (serviceId: string, status: boolean) => void;
}

// **** ADMIN SERVICE CUSTOM HOOK INTERFACES END **** \\
