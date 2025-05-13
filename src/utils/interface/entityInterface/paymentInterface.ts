export interface Payment {
    _id: string,
    transactionId: string,
    paymentStatus: string,
    paymentMethod: string,
    paymentGateway: string,
    paymentFor: string,
    initialAmount: number,
    discountAmount: number,
    totalAmount: number,
    createdAt: Date,
    updatedAt: Date,
    userId?: string,
    providerId?: string,
}

