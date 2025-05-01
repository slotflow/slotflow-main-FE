import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { UserBookingsTableColumnsProps, UserPaymentsTableColumnsProps } from "@/utils/interface/tableColumnInterface";

export const userAllBookingsTableColumns: ColumnDef<UserBookingsTableColumnsProps>[] = [
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

export const UserPaymentsTableColumns: ColumnDef<UserPaymentsTableColumnsProps>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Paid on" />),
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt");
      const formattedDate = createdAt ? format(new Date(createdAt as Date), "dd MMM yyyy") : "N/A";
      return <span>{formattedDate}</span>;
    }
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Total" />)
  },
  {
    accessorKey: "discountAmount",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Discont" />)
  },
  {
    accessorKey: "paymentFor",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Category" />)
  },
  {
    accessorKey: "paymentGateway",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Gateway" />)
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Method" />)
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Status" />)
  },
]