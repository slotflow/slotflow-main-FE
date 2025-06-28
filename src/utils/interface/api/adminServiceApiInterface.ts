import { CommonResponse } from "../commonInterface";
import { Service } from "../entityInterface/appServiceInterface";


// ---------------------- Admin Fetch All App Services ----------------------
// Used in useAdminServiceActions hook
export type BasicAppServiceInfo = Pick<Service, "_id" | "serviceName" | "isBlocked">;



// ---------------------- Admin Fetch All App Services ----------------------
// Used as the return type for Admin Fetch All Services API,
// and in AdminAppServicesTableColumns, AdminServicesPage
export type AdminFetchAllServicesApiResponse = BasicAppServiceInfo;


// ---------------------- Admin add new app service ----------------------
// Admin add new app service api response interface
export interface AdminAddNewServiceApiResponse extends CommonResponse {
    service: BasicAppServiceInfo
}


// ---------------------- Admin add new app service ----------------------
// Admin change app service block status api request payload type
export type AdminChangeServiceBlockStatusApiRequestPayload = {
    serviceId: Service["_id"];
    isBlocked: Service["isBlocked"];
}
// Admin change service block status api response interface interface
export interface AdminChangeServiceBlockStatusApiResponse extends CommonResponse {
    updatedService: BasicAppServiceInfo;
}
