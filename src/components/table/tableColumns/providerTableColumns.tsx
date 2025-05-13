import { format } from "date-fns";
import { Button } from "../../ui/button";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { ProviderBookingAppointmentsTableColumnProps, ProviderPaymentsTableColumnsProps, ProviderSubscriptionsTableColumnsProps } from "@/utils/interface/tableColumnInterface";

export const ProviderSubscriptionsTableColumns: ColumnDef<ProviderSubscriptionsTableColumnsProps>[] = [
  {
    accessorKey: "subscriptionPlanId.planName",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Plan" />)
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Paid on" />),
    cell: ({ row }) => {
      const startDate = row.getValue("startDate");
      const formattedDate = startDate ? format(new Date(startDate as Date), "dd MMM yyyy") : "N/A";
      return <span>{formattedDate}</span>;
    }

  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Expires on" />),
    cell: ({ row }) => {
      const endDate = row.getValue("endDate");
      const formattedDate = endDate ? format(new Date(endDate as Date), "dd MMM yyyy") : "N/A";
      return <span>{formattedDate}</span>;
    }

  },
  {
    accessorKey: "subscriptionStatus",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Status" />)
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const subscription = row.original;
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
            {subscription.subscriptionStatus === "Active" && (
              <DropdownMenuItem>Cancel</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]

export const ProviderPaymentsTableColumns: ColumnDef<ProviderPaymentsTableColumnsProps>[] = [
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

export const ProviderAppointmentsBookingTableColumns: ColumnDef<ProviderBookingAppointmentsTableColumnProps>[] = [
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
