export interface Review {
    _id: string,
    userId: string,
    providerId: string,
    bookingId: string,
    reviewText: string,
    rating: number,
    reported: boolean,
    isBlocked: boolean,
    createdAt: string,
    updatedAt: string,
}