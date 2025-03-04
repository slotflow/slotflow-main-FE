"use client";

import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useProviderActions } from "@/utils/hooks/useAdminActions";
import Alert from "./alert";


interface ApproveProviderItemProps {
  providerId: string;
}

const ApproveProviderItem: React.FC<ApproveProviderItemProps> = ({ providerId }) => {
  const { handleApprove } = useProviderActions();

  return (
    <>
    <Alert />
    <DropdownMenuItem onClick={() => handleApprove(providerId)}>
      Approve
    </DropdownMenuItem>
    </>
  );
};

export default ApproveProviderItem;