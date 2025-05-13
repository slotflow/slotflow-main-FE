import { CommonResponse } from "../commonInterface";
import { Service } from "../entityInterface/appServiceInterface";


// Admin fetch all app services api response type
export type AdminFetchAllServicesApiResponse = Pick<Service , "_id" | "serviceName" | "isBlocked">;


// Admin add new app service api response interface
export interface AdminAddNewServiceApiResponse extends CommonResponse {
    service: Pick<Service , "_id" | "serviceName" | "isBlocked">;
}


// Admin change app service block status api request payload type
export type AdminChangeServiceBlockStatusApiRequestPayload = {
    serviceId: Service["_id"];
    isBlocked: Service["isBlocked"];
}
// Admin change service block status api response interface interface
export interface AdminChangeServiceBlockStatusApiResponse extends CommonResponse {
    updatedService: Pick<Service , "_id" | "serviceName" | "isBlocked">;
}
