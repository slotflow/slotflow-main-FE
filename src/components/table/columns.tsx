import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { BlockService } from "./SerivceActions";
import { ChangeUserStatus } from "./UserActions";
import { ColumnDef } from "@tanstack/react-table";
import { Provider, Serivce, User } from "@/utils/types";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import {ApproveProvider, ChangeProviderStatus } from "./ProviderActions";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export const providerColumns: ColumnDef<Provider>[] = [
  {
    accessorKey: "isVerified",
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
            <DropdownMenuItem>Details</DropdownMenuItem>
            <ChangeProviderStatus providerId={provider._id} status={provider.isBlocked}/>
            {provider.isAdminVerified === false && <ApproveProvider providerId={provider._id} />}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

  },
]

export const userColumns: ColumnDef<User>[] = [
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

export const serviceColumns: ColumnDef<Serivce>[] = [
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
            <BlockService serviceId={service._id} status={service.isBlocked}/>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]

