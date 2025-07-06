import { ApiBaseResponse } from "../commonInterface";
import { Service } from "../entityInterface/appServiceInterface";


// ---------------------- Admin Fetch All App Services ----------------------
// Used in useAdminServiceActions hook
export type BasicAppServiceInfo = Pick<Service, "_id" | "serviceName" | "isBlocked">;



// ---------------------- Admin Fetch All App Services ----------------------
// Used as the return type for Admin Fetch All Services API,
// and in AdminAppServicesTableColumns, AdminServicesPage
export type AdminFetchAllServicesResponse = BasicAppServiceInfo;


// ---------------------- Admin add new app service ----------------------
// Admin add new app service api response interface
export interface AdminAddNewServiceResponse extends ApiBaseResponse {
    service: BasicAppServiceInfo
}


// ---------------------- Admin add new app service ----------------------
// Admin change app service block status api request payload type
export type AdminChangeServiceBlockStatusRequest = {
    serviceId: Service["_id"];
    isBlocked: Service["isBlocked"];
}
// Admin change service block status api response interface interface
export interface AdminChangeServiceBlockStatusResponse extends ApiBaseResponse {
    updatedService: BasicAppServiceInfo;
}
