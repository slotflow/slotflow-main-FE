import { useState } from "react";
import CommonButton from "@/components/common/CommonButton";
import ProfileHead from "@/components/common/profile/ProfileHead";
import UserOrProviderProfileDetails from "@/components/common/profile/UserOrProviderProfileDetails";
import { providerFetchProviderProfileDetails, providerUpdateProviderProfileImage } from "@/utils/apis/provider.api";
import UserInfoAddingOrUpdating from "@/components/common/UserInfoAddingOrUpdating";

const ProviderProfilePage = () => {
  
  const [openUserInfoForm, setOpenUserInfoForm] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    phone: ""
  });

  return (
    <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
      <ProfileHead updateProfileImageApiFunction={providerUpdateProviderProfileImage} updation={true} />
      <UserOrProviderProfileDetails 
        fetchApiFunction={providerFetchProviderProfileDetails} 
        queryKey="profileDetails" 
        providerSelf 
        shimmerRow={8} 
        setData={setUserInfo}
      />
      <CommonButton text={openUserInfoForm ? "Close" : "Update Info"} className="w-2/12 my-4" onClick={(e) => {
        e.preventDefault();
        setOpenUserInfoForm(!openUserInfoForm);
      }}/>
      {(openUserInfoForm && userInfo) && (
        <UserInfoAddingOrUpdating title="Update your username and phone" userInfo={userInfo} setOpenUserInfoForm={setOpenUserInfoForm}/>
      )}
    </div>
  )
  
}

export default ProviderProfilePage