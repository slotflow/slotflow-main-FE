import { Booking } from "./bookingInterface";

// List all booking
export type UserListAllBookingsTableColumnsProps = Pick<Booking, "appointmentMode" | "appointmentStatus" | "appointmentTime" | "appointmentDate" | "appointmentDay" | "createdAt" >