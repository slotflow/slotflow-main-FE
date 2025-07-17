import { format } from "date-fns";
import { Button } from "../../ui/button";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { FetchPaymentsResponse, FetchProviderSubscriptionsResponse } from "@/utils/interface/api/commonApiInterface";
import { DropDownMenuItemGetSubscriptionDetails } from "../adminTableOptions/AddminProviderSubscriptionsTableOptions";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";

// For admin side view and provider side view
export const ProvidersSubscriptionsTableColumns: ColumnDef<FetchProviderSubscriptionsResponse>[] = [
  {
    accessorKey: "planName",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Plan" />)
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Amount paid" />)
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Start Date" />),
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
            <DropDownMenuItemGetSubscriptionDetails subscriptionId={subscription._id}/>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]


// for admin side, provider side and user side view of payments table
export const PaymentsTableColumns: ColumnDef<FetchPaymentsResponse>[] = [
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