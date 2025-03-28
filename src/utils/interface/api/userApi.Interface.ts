import { User } from "../userInterface";

// Common Response Type
export interface ApiCommonResponse {
    success: boolean;
    message: string;
}


// Fetch user profile details api response
export type UserFetchProfileDetailsResponseProps = Pick<User, "username" | "email" | "isBlocked" | "isEmailVerified" | "phone" | "createdAt">;

// User update profile Image api response
export interface UserUpdateProfileImageResponseProps extends ApiCommonResponse {
    profileImage: string;
}