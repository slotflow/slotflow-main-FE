export interface Payment {
    _id: string;
    transactionId: string, // Stripe payment_intent || razorpay's payment_id || paypals capture_id
    paymentStatus: string,
    paymentMethod: string,
    paymentGateway: PaymentGateway,
    paymentFor: PaymentFor,
    initialAmount: number,
    discountAmount: number,
    totalAmount: number,
    createdAt: Date,
    updatedAt: Date,  
    userId?: string,
    providerId?: string,
    refundId?: string,
    refundAmount?: number,
    refundStatus?: string,
    refundAt?: Date,
    refundReason?: string,
    chargeId?: string,
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