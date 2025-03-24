import { Service } from "../appServiceInterface";

// **** Admin Service Api Interfaces **** \\

// Common response interface
interface ApiCommonResponse {
    success: boolean;
    message: string;
}



// **** Fetch All App Services **** \\
// Admin fetch all app services type used as props in the column.tsx
export type FetchAllServicesProps = Pick<Service , "_id" | "serviceName" | "isBlocked">;
// Admin fetch all app service api response interface
export interface AdminFetchAllServicesResponse extends ApiCommonResponse {
    services : FetchAllServicesProps[];
}



// **** Add new app service **** \\
// Admin adding new app service api request payload interface used in adminServiceApi
export interface AdminAddNewServiceRequestPayload {
    serviceName: string
}
// Admin add new app service api response interface used in adminServiceApi
type AddNewServiceProps = Pick<Service , "_id" | "serviceName" | "isBlocked">;
export interface AdminAddNewServiceResponse extends ApiCommonResponse {
    service: AddNewServiceProps;
}



// **** Change block status of service **** \\
// Admin change service block status api request payload interface used in adminServiceApi
export interface AdminChangeServiceBlockStatusRequestPayload {
    serviceId: string;
    status: boolean;
}

// Admin change service block status api response interface used in adminServiceApi
type ChnageServicesBlockStatusProps = Pick<Service , "_id" | "isBlocked">;
export interface AdminChangeServiceBlockStatusResponse extends ApiCommonResponse {
    serviceId: string;
    updatedService: ChnageServicesBlockStatusProps;
}




// **** Admin Service Custom hook interface **** \\
// Admin service custom hook interface used in useAdminServiceAction
export interface UseAdminServiceActionReturnType {
    handleServiceAdding: (serviceName: string) => void;
    handleChangeServiceStatus: (serviceId: string, status: boolean) => void;
  }
