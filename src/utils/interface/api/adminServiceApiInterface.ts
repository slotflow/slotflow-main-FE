import { Service } from "../appServiceInterface";

// **** Admin Service Api Interfaces **** \\

// **** Fetch All App Services **** \\
// Admin fetch all app services type used as props in the column.tsx
export type AdminFetchAllServicesResponseProps = Pick<Service , "_id" | "serviceName" | "isBlocked">;




// **** Add new app service **** \\
// Admin adding new app service api request payload interface used in adminServiceApi
export interface AdminAddNewServiceRequestPayload {
    appServiceName: string
}
// Admin add new app service api response interface used in adminServiceApi
export type AdminAddNewServiceResponseProps = Pick<Service , "_id" | "serviceName" | "isBlocked">;




// **** Change block status of service **** \\
// Admin change service block status api request payload interface used in adminServiceApi
export interface AdminChangeServiceBlockStatusRequestPayload {
    serviceId: string;
    status: boolean;
}

// Admin change service block status api response interface used in adminServiceApi
export type AdminChnageServicesBlockStatusResponseProps = Pick<Service , "_id" | "isBlocked">;





// **** Admin Service Custom hook interface **** \\
// Admin service custom hook interface used in useAdminServiceAction
export interface UseAdminServiceActionReturnType {
    handleServiceAdding: (serviceName: string) => void;
    handleChangeServiceStatus: (serviceId: string, status: boolean) => void;
  }
