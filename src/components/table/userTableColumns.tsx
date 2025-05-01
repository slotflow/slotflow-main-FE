import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { UserListAllBookingsTableColumnsProps } from "@/utils/interface/userTableColumnInterface";

// User Bookings listing Table column
export const userAllBookingsTableColumns: ColumnDef<UserListAllBookingsTableColumnsProps>[] = [
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
    accessorKey: "appointmentDay",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Day" />)
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
]

