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

export enum PaymentFor {
    ProviderSubscription = "ProviderSubscription",
    AppointmentBooking = "AppointmentBooking",
    ProviderPayout = "ProviderPayout",
    CancelBooking = "CancelBooking"
}

export enum PaymentGateway {
    Stripe = "Stripe",
    Razorpay = "Razorpay",
    Paypal = "Paypal",
}