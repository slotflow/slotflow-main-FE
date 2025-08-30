import dayjs from "dayjs";
import { toast } from "react-toastify";

interface handleUpdatedAtCheckProps {
    e: React.MouseEvent<HTMLElement>;
    updatedAt: string;
    errorMessage: string;
    openUserInfoForm?: boolean;
    setOpenUserInfoForm?: (value : boolean) => void;
}

export const handleUpdatedAtCheck = ({
    e,
    updatedAt,
    errorMessage,
    openUserInfoForm,
    setOpenUserInfoForm
}: handleUpdatedAtCheckProps) => {
    e.preventDefault();
    const thirtyDaysAgo = dayjs().subtract(30,"day");
    if(!openUserInfoForm) {
      if(dayjs(updatedAt).isBefore(thirtyDaysAgo)) {
        setOpenUserInfoForm?.(true);
        return;
      } else {
        toast.info(errorMessage || "You can only update after some days.");
        return;
      }
    }
  }