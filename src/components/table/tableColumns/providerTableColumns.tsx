import { format } from "date-fns";
import { Button } from "../../ui/button";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { ProviderFetchBookingAppointmentsResponse } from "@/utils/interface/api/providerApiInterface";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";

export const ProviderAppointmentsBookingTableColumns: ColumnDef<ProviderFetchBookingAppointmentsResponse>[] = [
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
      header: ({ column }) => (<DataTableColumnHeader column={column} title="Status" />)
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
        // { row }
      ) => {
        // const appointment = row.original;
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
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    }
]
