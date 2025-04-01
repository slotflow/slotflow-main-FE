import { format } from "date-fns";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { ChangeUserStatus } from "./AdminUserActions";
import { ChangePlanBlockStatus } from "./AdminPlanActions";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { ChangeServiceBlockStatus } from "./AdminSerivceActions";
import { PlanTableInterface } from "@/utils/interface/api/adminPlanApiInterface";
import { UsersTableInterfaceProps } from "@/utils/interface/api/adminUserApiInterface";
import { AppServiceTableInterface } from "@/utils/interface/api/adminServiceApiInterface";
import { ProvidersTableInterfaceProps } from "@/utils/interface/api/adminProviderApiInterface";
import {ApproveProvider, ChangeProviderBlockStatus, GetProviderDetailPage } from "./AdminProviderActions";
import { ProviderPaymentsTableInterfaceProps, ProviderSubscriptionTableInterfaceProps } from "@/utils/interface/subscriptionInterface";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export const providerColumns: ColumnDef<ProvidersTableInterfaceProps>[] = [
  {
    accessorKey: "isAdminVerified",
    header: "Admin Verication",
    cell: ({ row }) => {
      const isVerified = row.original.isAdminVerified;
      return <span>{isVerified ? "verified" : "Pending"}</span>;
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Username" />)
  },
  {
    accessorKey: "email",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Email" />)
  },
  {
    accessorKey: "isBlocked",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Status" />),
    cell: ({ row }) => {
      const isBlocked = row.original.isBlocked;
      return <span>{isBlocked ? "Blocked" : "Active"}</span>;
    },
  },
  {
    accessorKey: "trustedBySlotflow",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Slotflow Trusted" />),
    cell: ({ row }) => {
      const isTrusted = row.original.isBlocked;
      return <span>{isTrusted ? "Trusted" : "Pending"}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const provider = row.original;
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
            <GetProviderDetailPage providerId={provider._id} />
            <ChangeProviderBlockStatus providerId={provider._id} status={provider.isBlocked}/>
            {provider.isAdminVerified === false && <ApproveProvider providerId={provider._id} />}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

  },
]

export const userColumns: ColumnDef<UsersTableInterfaceProps>[] = [
  {
    accessorKey: "isVerified",
    header: "Verication",
    cell: ({ row }) => {
      const isVerified = row.original.isEmailVerified;
      return <span>{isVerified ? "verified" : "Pending"}</span>;
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Username" />)
  },
  {
    accessorKey: "email",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Email" />)
  },
  {
    accessorKey: "isBlocked",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Status" />),
    cell: ({ row }) => {
      const isBlocked = row.original.isBlocked;
      return <span>{isBlocked ? "Blocked" : "Active"}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
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
            <DropdownMenuItem>Details</DropdownMenuItem>
            <ChangeUserStatus userId={user._id} status={user.isBlocked} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]

export const serviceColumns: ColumnDef<AppServiceTableInterface>[] = [
  {
    accessorKey: "_id",
    header: "id",
    cell: ({ row }) => {
      const id = row.original._id;
      return <span>{id.toString().slice(-4)}</span>;
    },
  },
  {
    accessorKey: "serviceName",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="ServiceName" />)
  },
  {
    accessorKey: "isBlocked",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Status" />),
    cell: ({ row }) => {
      const isBlocked = row.original.isBlocked;
      return <span>{isBlocked ? "Blocked" : "Active"}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const service = row.original;
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
            <ChangeServiceBlockStatus serviceId={service._id} status={service.isBlocked}/>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]


export const planColumns: ColumnDef<PlanTableInterface>[] = [
  {
    accessorKey: "_id",
    header: "id",
    cell: ({ row }) => {
      const id = row.original._id;
      return <span>{id.toString().slice(-4)}</span>;
    },
  },
  {
    accessorKey: "planName",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Plan" />)
  },
  {
    accessorKey: "isBlocked",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Status" />),
    cell: ({ row }) => {
      const isBlocked = row.original.isBlocked;
      return <span>{isBlocked ? "Blocked" : "Active"}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const plan = row.original;
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
            <DropdownMenuItem>Details</DropdownMenuItem>
            <ChangePlanBlockStatus planId={plan._id} status={plan.isBlocked}/>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]

export const providerSubscriptionColumns: ColumnDef<ProviderSubscriptionTableInterfaceProps>[] = [
  {
    accessorKey: "subscriptionPlanId.planName",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Plan" />)
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Paid on" />),
    cell: ({ row }) => {
        const startDate = row.getValue("startDate"); // Get the raw startDate value
        const formattedDate = startDate ? format(new Date(startDate as Date), "dd MMM yyyy") : "N/A"; // Format the date
        return <span>{formattedDate}</span>;
    }

  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Expires on" />),
    cell: ({ row }) => {
        const endDate = row.getValue("endDate"); // Get the raw endDate value
        const formattedDate = endDate ? format(new Date(endDate as Date), "dd MMM yyyy") : "N/A"; // Format the date
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


export const providerPaymentsColumns: ColumnDef<ProviderPaymentsTableInterfaceProps>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Paid on" />),
    cell: ({ row }) => {
        const startDate = row.getValue("createdAt");
        const formattedDate = startDate ? format(new Date(startDate as Date), "dd MMM yyyy") : "N/A";
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

