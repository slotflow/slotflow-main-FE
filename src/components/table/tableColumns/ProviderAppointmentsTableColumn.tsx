import { format } from "date-fns";
import { Button } from "../../ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { Check, MoreHorizontal, ReceiptText, VideoIcon, X } from "lucide-react";
import { AppointmentStatus, Booking } from "@/utils/interface/entityInterface/bookingInterface";
import { FetchBookingsResponse, ValidateRoomId } from "@/utils/interface/api/commonApiInterface";
import { ProviderChangeAppointmentStatusRequest } from "@/utils/interface/api/providerApiInterface";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";

export const ProviderAppointmentsBookingTableColumns = (
  handleChangeAppointmentStatus: (data: ProviderChangeAppointmentStatusRequest) => void,
  handleProviderJoinCall: (data: ValidateRoomId) => void,
  handleNavigateToAppointmentDetailPage: (appointmentId: Booking["_id"]) => void,
): ColumnDef<FetchBookingsResponse>[] => [
    {
      accessorKey: "createdAt",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Booked At" />),
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt");
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
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
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
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Slot" />)
    },
    {
      accessorKey: "appointmentDate",
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Booking On" />),
      cell: ({ row }) => {
        const createdAt = row.getValue("appointmentDate");
        const date = format(new Date(createdAt as Date), "dd MMM yyyy");
        return <span>{date}</span>;
      }
    },
    {
      accessorKey: "actions",
      header: "Actions",
      id: "actions",
      cell: (
        { row }
      ) => {
        const appointment = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {appointment.appointmentStatus === AppointmentStatus.Booked && (
                <>
                  <DropdownMenuItem
                    onClick={() => handleChangeAppointmentStatus({ appointmentId: appointment._id, appointmentStatus: AppointmentStatus.Confirmed })}
                    className="flex items-center gap-2"
                  >
                    {<Check className="w-4 h-4" />}
                    <span>Confirm</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleChangeAppointmentStatus({ appointmentId: appointment._id, appointmentStatus: AppointmentStatus.Rejected })}
                    className="flex items-center gap-2"
                  >
                    {<X className="w-4 h-4" />}
                    <span>Reject</span>
                  </DropdownMenuItem>
                </>
              )}
              {appointment.appointmentStatus === AppointmentStatus.Confirmed && (
                <DropdownMenuItem
                  onClick={() => handleProviderJoinCall({ appointmentId: appointment._id, roomId: appointment.videoCallRoomId })}
                  className="flex items-center gap-2"
                >
                  <VideoIcon /> Join
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => handleNavigateToAppointmentDetailPage(appointment._id)}
              >
                <ReceiptText /> Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    }
  ]
