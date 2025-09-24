import { format } from "date-fns";
import { Button } from "../../ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { MoreHorizontal, ReceiptText, VideoIcon } from "lucide-react";
import { AppointmentStatus, Booking } from "@/utils/interface/entityInterface/bookingInterface";
import { FetchBookingsResponse, ValidateRoomId } from "@/utils/interface/api/commonApiInterface";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";

export const UserBookingsTableColumns = (
  handleUserCancelBooking: (bookingId: Booking["_id"]) => void,
  handleUserJoinCall: (data: ValidateRoomId) => void,
  handleNavigateToBookingDetailPage: (bookingId: Booking["_id"]) => void,
): ColumnDef<FetchBookingsResponse>[] => [
    {
      accessorKey: "appointmentDate",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Date" />),
      cell: ({ row }) => {
        const createdAt = row.getValue("appointmentDate");
        const date = format(new Date(createdAt as Date), "dd MMM yyyy");
        return <span>{date}</span>;
      }
    },
    {
      accessorKey: "appointmentMode",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Mode" />)
    },
    {
      accessorKey: "appointmentStatus",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Status" />),
      cell: ({ row }) => {
        const status = row.original.appointmentStatus;
        switch (status) {
          case "Booked":
            return <span className="text-yellow-500 font-semibold">Pending Confirmation</span>;
          case "Cancelled":
            return <span className="text-red-500 font-semibold">Cancelled</span>;
          case "Confirmed":
            return <span className="text-green-500 font-semibold">Confirmed</span>;
          case "RejectedByProvider":
            return <span className="text-red-500 font-semibold">Rejected By Provider</span>;
          case "NotAttended":
            return <span className="text-orange-500 font-semibold">Not Attended</span>;
          case "Completed":
            return <span className="text-indigo-500 font-semibold">Completed 🎉</span>;
          default:
            return <span>{status}</span>;
        }
      }
    },
    {
      accessorKey: "appointmentTime",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Time" />)
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Booked On" />),
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt");
        const date = format(new Date(createdAt as Date), "dd MMM yyyy");
        return <span>{date}</span>;
      }
    },
    {
      accessorKey: "actions",
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const booking = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {booking.appointmentStatus === "Booked" && (
                <DropdownMenuItem
                  onClick={() => handleUserCancelBooking(booking._id)}>
                  Cancel
                </DropdownMenuItem>
              )}
              {booking.appointmentStatus === AppointmentStatus.Confirmed && (
                <DropdownMenuItem
                  onClick={() => handleUserJoinCall({ appointmentId: booking._id, roomId: booking.videoCallRoomId })}
                  className="flex items-center gap-2"
                >
                  <VideoIcon /> Join
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => handleNavigateToBookingDetailPage(booking._id)}
              >
                <ReceiptText /> Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    }
  ]