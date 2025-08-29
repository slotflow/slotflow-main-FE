import { format } from "date-fns";
import { Button } from "../../ui/button";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { FetchBookingsResponse } from "@/utils/interface/api/commonApiInterface";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { DropDownMenuItemUpdateAppointmentStatus } from "../providerTableOptions/providerAppointmentsTableOptions";
import { AppointmentStatus } from "@/utils/interface/entityInterface/bookingInterface";

export const ProviderAppointmentsBookingTableColumns: ColumnDef<FetchBookingsResponse>[] = [
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.appointmentStatus;
      switch (status) {
        case "Booked":
          return <span className="text-yellow-500 font-semibold">Pending Confirmation</span>;
        case "Confirmed":
          return <span className="text-green-500 font-semibold">Confirmed</span>;
        case "RejectedByProvider":
          return <span className="text-red-500 font-semibold">Rejected By Provider</span>;
        case "NotAttended":
          return <span className="text-orange-500 font-semibold">Not Attended</span>;
        case "Completed":
          return <span className="text-purple-500 font-semibold">Completed 🎉</span>;
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
    cell: (
      { row }
    ) => {
      const appointment = row.original;
      return appointment.appointmentStatus === AppointmentStatus.Booked && (
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
                <DropDownMenuItemUpdateAppointmentStatus appointmentId={appointment._id} appointmentStatus={AppointmentStatus.Rejected} text="Reject" />
                <DropDownMenuItemUpdateAppointmentStatus appointmentId={appointment._id} appointmentStatus={AppointmentStatus.Confirmed} text="Confirm" />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]
