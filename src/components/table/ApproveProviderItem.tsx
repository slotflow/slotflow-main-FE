"use client";

import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useProviderActions } from "@/utils/hooks/useAdminActions";

interface ApproveProviderItemProps {
  providerId: string;
}

const ApproveProviderItem: React.FC<ApproveProviderItemProps> = ({ providerId }) => {
  const { handleApprove } = useProviderActions();

  return (
    <DropdownMenuItem onClick={() => handleApprove(providerId)}>
      Approve
    </DropdownMenuItem>
  );
};

export default ApproveProviderItem;