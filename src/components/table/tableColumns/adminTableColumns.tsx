import { Button } from "../../ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Check, MoreHorizontal, X } from "lucide-react";
import { formatNumberToPrice } from "@/utils/helper/formatter";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { AdminFetchAllPlansResponse } from "@/utils/interface/api/adminPlanApiInterface";
import { AdminfetchAllUsersResponse } from "@/utils/interface/api/adminUserApiInterface";
import { DropDownItemChangeUserStatus } from "../adminTableOptions/AdminUserTableOptions";
import { AdminFetchAllServicesResponse } from "@/utils/interface/api/adminServiceApiInterface";
import { DropDownItemChangePlanBlockStatus } from "../adminTableOptions/AdminPlansTableOptions";
import { AdminFetchAllProvidersResponse } from "@/utils/interface/api/adminProviderApiInterface";
import { DropDownItemChangeServiceBlockStatus } from "../adminTableOptions/AdminSerivceTableOptions";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { DropDownItemApproveProvider, DropDownItemChangeProviderBlockStatus, DropDownItemChangeProviderTrustTag, DropDownItemGetProviderDetailPage } from "../adminTableOptions/AdminProviderTableOptions";

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
      if(isBlocked) {
        return <span className="text-red-500 font-semibold">Blocked</span>
      } else {
        return <span className="text-green-500 font-semibold">Active</span>
      }
    },
  },
  {
    accessorKey: "isAdminVerified",
    header: "Admin Verication",
    cell: ({ row }) => {
      const isVerified = row.original.isAdminVerified;
        if(isVerified) {
          return <span className="text-green-500 font-semibold">Verified</span>
        } else {
        return <span className="text-red-500 font-semibold">Pending</span>
      }
    },
  },
  {
    accessorKey: "isEmailVerified",
    header: "Email Verication",
    cell: ({ row }) => {
      const isEmailVerified = row.original.isEmailVerified;
      if(isEmailVerified) {
          return <span className="text-green-500 font-semibold">Verified</span>
        } else {
        return <span className="text-red-500 font-semibold">Pending</span>
      }
    },
  },
  {
    accessorKey: "trustedBySlotflow",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Slotflow Trusted" />),
    cell: ({ row }) => {
      const isTrusted = row.original.trustedBySlotflow;
      if(isTrusted) {
          return <span className="text-green-500 font-semibold">Verified</span>
        } else {
        return <span className="text-red-500 font-semibold">Pending</span>
      }
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
      if(isBlocked) {
        return <span className="text-red-500 font-semibold">Blocked</span>
      } else {
        return <span className="text-green-500 font-semibold">Active</span>
      }
    },
  },
  {
    accessorKey: "isVerified",
    header: "Email Verication",
    cell: ({ row }) => {
      const isVerified = row.original.isEmailVerified;
        if(isVerified) {
          return <span className="text-green-500 font-semibold">Verified</span>
        } else {
        return <span className="text-red-500 font-semibold">Pending</span>
      }
    }
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
        if(!isBlocked) {
          return <span className="text-green-500 font-semibold">Active</span>
        } else {
        return <span className="text-red-500 font-semibold">Blocked</span>
      }
    }
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
        if(adVisibility) {
          return <span className="text-green-500 font-semibold"><Check /></span>
        } else {
        return <span className="text-red-500 font-semibold"><X /></span>
      }
    }
  },
  {
    accessorKey: "price",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Price" />),
    cell: ({ row }) => {
      const amount = row.original.price;
          return <span className="">{formatNumberToPrice(amount) || amount}</span>
    }
  },
  {
    accessorKey: "isBlocked",
    header: ({ column }) => (<DataTableColumnHeader column={column} title="Status" />),
    cell: ({ row }) => {
      const isBlocked = row.original.isBlocked;
        if(!isBlocked) {
          return <span className="text-green-500 font-semibold">Active</span>
        } else {
        return <span className="text-red-500 font-semibold">Blocked</span>
      }
    }
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Details</DropdownMenuItem>
            <DropDownItemChangePlanBlockStatus planId={plan._id} isBlocked={plan.isBlocked} />
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]


