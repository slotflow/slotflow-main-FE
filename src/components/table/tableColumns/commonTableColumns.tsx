import { Button } from "../../ui/button";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { FetchProviderSubscriptionsResponse } from "@/utils/interface/api/commonApiInterface";
import { DropDownMenuItemGetSubscriptionDetails } from "../adminTableOptions/AddminProviderSubscriptionsTableOptions";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";

export const ProvidersSubscriptionsTableColumns: ColumnDef<FetchProviderSubscriptionsResponse>[] = [
  {
    accessorKey: "planName",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Plan " />)
  },
  {
    accessorKey: "price",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="price " />)
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Start Date" />),
    cell: ({ row }) => {
      const startDate = row.getValue("startDate");
      const formattedDate = startDate ? (new Date(startDate as Date), "dd MMM yyyy") : "N/A";
      return <span>{formattedDate}</span>;
    }

  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Expires on" />),
    cell: ({ row }) => {
      const endDate = row.getValue("endDate");
      const formattedDate = endDate ? (new Date(endDate as Date), "dd MMM yyyy") : "N/A";
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