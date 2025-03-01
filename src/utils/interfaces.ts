import { Provider, User } from "./types";

export interface AdminState {
    serviceProviders: Provider[];
    users: User[];
}