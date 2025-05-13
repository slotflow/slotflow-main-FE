export enum AppointmentStatus {
    Booked = "Booked",
    Completed = "Completed",
    Cancelled = "Cancelled",
    Rejected = "Rejected",
}

export interface Booking {
    _id: string;
    serviceProviderId: string;
    userId: string;
    appointmentDate: string;
    appointmentTime: string;
    appointmentMode: string;
    appointmentStatus: AppointmentStatus;
    slotId: string;
    paymentId: string;
    createdAt: string;
    updatedAt: string;
}