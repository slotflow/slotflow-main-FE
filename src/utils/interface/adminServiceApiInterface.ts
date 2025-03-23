import { Service } from "./appServiceInterface";

// **** Admin Service Api Interfaces **** \\

interface ApiCommonResponse {
    success: boolean;
    message: string;
}

// Admin adding new app service api request payload interface used in adminServiceApi
export interface AdminAddNewServiceRequestPayload {
    serviceName: string
}

// Admin add new app service api response interface used in adminServiceApi
export interface AdminAddNewServiceResponse extends ApiCommonResponse{
    service: Service;
}

// Admin change service block status api request payload interface used in adminServiceApi
export interface AdminChangeServiceBlockStatusRequestPayload {
    serviceId: string;
    status: boolean;
}

// Admin change service block status api response interface used in adminServiceApi
export interface AdminChangeServiceBlockStatusResponse extends ApiCommonResponse{
    serviceId: string;
    updatedService: Service;
}


// **** Admin Service Custom hook interface **** \\

// Admin service custom hook interface used in useAdminServiceAction
export interface UseAdminServiceActionReturnType {
    handleServiceAdding: (serviceName: string) => void;
    handleChangeServiceStatus: (serviceId: string, status: boolean) => void;
  }
