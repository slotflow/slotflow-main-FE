import { Service } from "../appServiceInterface";

// **** Admin Service Api Interfaces **** \\

// Api common response
interface ApiCommonResponse {
    success: boolean;
    message: string;
}



// Service listing table data Interface used in service custom hook and the column.tsx
export type AppServiceTableInterface = Pick<Service , "_id" | "serviceName" | "isBlocked">;



// **** Fetch All App Services **** \\
// Admin fetch all app services type used as props in the column.tsx
export type AdminFetchAllServicesResponseProps = Pick<Service , "_id" | "serviceName" | "isBlocked">;



// **** Add new app service **** \\
// Admin adding new app service api request payload interface used in adminServiceApi
export interface AdminAddNewServiceRequestPayload {
    appServiceName: string
}

// Admin add new app service api response interface used in adminServiceApi
export type AddNewServiceResponseProps = Pick<Service , "_id" | "serviceName" | "isBlocked">;
export interface AdminAddNewServiceResponseProps extends ApiCommonResponse {
    service: AddNewServiceResponseProps;
}



// **** Change block status of service **** \\
// Admin change service block status api request payload interface used in adminServiceApi
export interface AdminChangeServiceBlockStatusRequestPayload {
    serviceId: string;
    status: boolean;
}

// Admin change service block status api response interface used in adminServiceApi
export type ChangeServicesBlockStatusResponseProps = Pick<Service , "_id" | "serviceName" | "isBlocked">;
export interface AdminChangeServiceBlockStatusResponseProps extends ApiCommonResponse {
    updatedService: ChangeServicesBlockStatusResponseProps;
}



// **** Admin Service Custom hook interface **** \\
// Admin service custom hook interface used in useAdminServiceAction
export interface UseAdminServiceActionReturnType {
    handleServiceAdding: (serviceName: string,setLoading: (loading: boolean) => void) => void;
    handleChangeServiceStatus: (serviceId: string, status: boolean) => void;
  }
