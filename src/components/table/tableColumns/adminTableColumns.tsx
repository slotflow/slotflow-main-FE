import { Button } from "../../ui/button";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { DropDownItemChangeUserStatus } from "../adminTableOptions/AdminUserTableOptions";
import { DropDownItemChangePlanBlockStatus } from "../adminTableOptions/AdminPlansTableOptions";
import { DropDownItemChangeServiceBlockStatus } from "../adminTableOptions/AdminSerivceTableOptions";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { DropDownItemApproveProvider, DropDownItemChangeProviderBlockStatus, DropDownItemChangeProviderTrustTag, DropDownItemGetProviderDetailPage } from "../adminTableOptions/AdminProviderTableOptions";
import { AdminfetchAllUsersResponse } from "@/utils/interface/api/adminUserApiInterface";
import { AdminFetchAllPlansResponse } from "@/utils/interface/api/adminPlanApiInterface";
import { AdminFetchAllServicesResponse } from "@/utils/interface/api/adminServiceApiInterface";
import { AdminFetchAllProvidersResponse } from "@/utils/interface/api/adminProviderApiInterface";

export const AdminProvidersTableColumns: ColumnDef<AdminFetchAllProvidersResponse>[] = [
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
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Account Status" />),
    cell: ({ row }) => {
      const isBlocked = row.original.isBlocked;
      return <span>{isBlocked ? "Blocked" : "Active"}</span>;
    },
  },
  {
    accessorKey: "isAdminVerified",
    header: "Admin Verication",
    cell: ({ row }) => {
      const isVerified = row.original.isAdminVerified;
      return <span>{isVerified ? "verified" : "Pending"}</span>;
    },
  },
  {
    accessorKey: "isEmailVerified",
    header: "Email Verication",
    cell: ({ row }) => {
      const isEmailVerified = row.original.isEmailVerified;
      return <span>{isEmailVerified ? "verified" : "Pending"}</span>;
    },
  },
  {
    accessorKey: "trustedBySlotflow",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Slotflow Trusted" />),
    cell: ({ row }) => {
      const isTrusted = row.original.trustedBySlotflow;
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
            <DropDownItemGetProviderDetailPage providerId={provider._id} />
            {!provider.isAdminVerified && (
              <DropDownItemApproveProvider providerId={provider._id} />
            )}
            <DropDownItemChangeProviderBlockStatus providerId={provider._id} isBlocked={provider.isBlocked} />
            <DropDownItemChangeProviderTrustTag providerId={provider._id} trustedBySlotflow={provider.trustedBySlotflow} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },
]

export const AdminUsersTableColumns: ColumnDef<AdminfetchAllUsersResponse>[] = [
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
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Account Status" />),
    cell: ({ row }) => {
      const isBlocked = row.original.isBlocked;
      return <span>{isBlocked ? "Blocked" : "Active"}</span>;
    },
  },
  {
    accessorKey: "isVerified",
    header: "Email Verication",
    cell: ({ row }) => {
      const isVerified = row.original.isEmailVerified;
      return <span>{isVerified ? "verified" : "Pending"}</span>;
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
            <DropDownItemChangeUserStatus userId={user._id} isBlocked={user.isBlocked} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]

export const AdminAppServicesTableColumns: ColumnDef<AdminFetchAllServicesResponse>[] = [
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
            <DropDownItemChangeServiceBlockStatus serviceId={service._id} isBlocked={service.isBlocked} />
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]

export const AdminPlansTableColumns: ColumnDef<AdminFetchAllPlansResponse>[] = [
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
    accessorKey: "maxBookingPerMonth",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Max Booking" />)
  },
  {
    accessorKey: "adVisibility",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="ad Visibility" />),
    cell: ({ row }) => {
      const adVisibility = row.original.adVisibility;
      return <span>{adVisibility ? "Yes" : "No"}</span>
    }
  },
  {
    accessorKey: "price",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Price" />)
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
            <DropDownItemChangePlanBlockStatus planId={plan._id} isBlocked={plan.isBlocked} />
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]


