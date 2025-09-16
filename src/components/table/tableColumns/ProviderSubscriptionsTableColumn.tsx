import { format } from "date-fns";
import { Button } from "../../ui/button";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { Subscription } from "@/utils/interface/entityInterface/subscriptionInterface";
import { FetchProviderSubscriptionsResponse } from "@/utils/interface/api/commonApiInterface";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";

// For admin side view and provider side view of provider subscriptions
export const ProvidersSubscriptionsTableColumns = (
    handleAdminGetProviderDetailPage: (subscriptionId: Subscription["_id"]) => void,
): ColumnDef<FetchProviderSubscriptionsResponse>[] => [
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
                if (subscriptionStatus == "Expired") {
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
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleAdminGetProviderDetailPage(subscription._id)}>
                                Details
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        }
    ]