import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/appStore";
import CommonButton from "@/components/common/CommonButton";
import ProfileHead from "@/components/common/profile/ProfileHead";
import { userFetchUserProfileDetails } from "@/utils/apis/user.api";
import { handleUpdatedAtCheck } from "@/utils/helper/checkUpdatedAtDate";
import { providerFetchProviderProfileDetails } from "@/utils/apis/provider.api";
import UserInfoAddingOrUpdating from "@/components/common/UserInfoAddingOrUpdating";
import UserOrProviderProfileDetails from "@/components/common/profile/UserOrProviderProfileDetails";

const ProfilePage: React.FC = () => {

  const { authUser } = useSelector((state: RootState) => state.auth);
  const [openUserInfoForm, setOpenUserInfoForm] = useState<boolean>(false);
  const isProvider = authUser?.role === "PROVIDER";

  const fetchApiFunction = isProvider
    ? providerFetchProviderProfileDetails
    : userFetchUserProfileDetails;

  const shimmerRow = isProvider ? 8 : 6;

  if(!authUser) return null;

  return (
    <div className="min-h-full flex flex-col p-2">
      <ProfileHead 
        updation={false} 
        showDetails
        isMyProfile
      />
      <UserOrProviderProfileDetails
        fetchApiFunction={fetchApiFunction}
        queryKey="profileDetails"
        providerSelf={isProvider}
        userSelf={!isProvider}
        shimmerRow={shimmerRow}
      />
      <CommonButton
        text={openUserInfoForm ? "Close" : "Update Info"}
        className="w-2/12 my-4"
        onClick={(e) =>
          handleUpdatedAtCheck({
            e,
            updatedAt: authUser?.updatedAt || "",
            errorMessage:
              "You can update your name and phone number only once every 30 days.",
            openUserInfoForm,
            setOpenUserInfoForm,
          })
        }
      />
      {openUserInfoForm && (
        <UserInfoAddingOrUpdating
          title="Update your username and phone"
          setOpenUserInfoForm={setOpenUserInfoForm}
        />
      )}
    </div>
  );
};

export default ProfilePage;
