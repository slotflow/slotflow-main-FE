//  User
export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    isBlocked: boolean;
    isEmailVerified: boolean;
    phone: string;
    profileImage: string;
    addressId: string;
    bookingsId: string;
    verificationToken: string;
    createdAt: string;
    updatedAt: string;
}