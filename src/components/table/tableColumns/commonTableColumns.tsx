import { format } from "date-fns";
import { Button } from "../../ui/button";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { FetchPaymentsResponse, FetchProviderSubscriptionsResponse } from "@/utils/interface/api/commonApiInterface";
import { DropDownMenuItemGetSubscriptionDetails } from "../adminTableOptions/AddminProviderSubscriptionsTableOptions";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { formatNumberToPrice } from "@/utils/helper/formatter";

// For admin side view and provider side view
export const ProvidersSubscriptionsTableColumns: ColumnDef<FetchProviderSubscriptionsResponse>[] = [
  {
    accessorKey: "planName",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Plan" />)
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
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Status" />),
    cell: ({ row }) => {
      const subscriptionStatus = row.original.subscriptionStatus;
      console.log("subscriptionStatus : ",subscriptionStatus)
        if(subscriptionStatus == "Expired") {
          return <span className="text-red-500 font-semibold">Expired</span>
        } else {
        return <span className="text-green-500 font-semibold">Active</span>
      }
    }
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
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Total" />),
    cell: ({ row }) => {
      const amount = row.original.totalAmount;
          return <span>{formatNumberToPrice(amount) || amount}</span>;
    }
  },
  {
    accessorKey: "discountAmount",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Discont" />),
    cell: ({ row }) => {
      const disAmount = row.original.discountAmount;
          return <span>{formatNumberToPrice(disAmount) || disAmount}</span>;
    }
  },
  {
    accessorKey: "paymentFor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const paymentFor = row.original.paymentFor;
      switch (paymentFor) {
        case "ProviderSubscription":
          return <span className="text-yellow-500 font-semibold">Provider Subscription</span>;
        case "AppointmentBooking":
          return <span className="text-green-500 font-semibold">Appointment Booking</span>;
        case "ProviderPayout":
          return <span className="text-red-500 font-semibold">Provider Payout</span>;
        case "CancelBooking":
          return <span className="text-orange-500 font-semibold">Cancel Booking</span>;
        default:
          return <span>{paymentFor}</span>;
      }
    }
  },
  {
    accessorKey: "paymentGateway",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gateway" />
    ),
    cell: ({ row }) => {
      const paymentGateway = row.original.paymentGateway;
      switch (paymentGateway) {
        case "Stripe":
          return <span className="text-indigo-500 font-semibold">Stripe</span>;
        case "Razorpay":
          return <span className="text-blue-800 font-semibold">Razorpay</span>;
        case "Paypal":
          return <span className="text-blue-400 font-semibold">Paypal</span>;
        default:
          return <span>{paymentGateway}</span>;
      }
    }
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