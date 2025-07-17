import { useState } from 'react';
import CommonButton from '@/components/common/CommonButton';
import ProfileHead from '@/components/common/profile/ProfileHead';
import { User } from '@/utils/interface/entityInterface/userInterface';
import UserInfoAddingOrUpdating from '@/components/common/UserInfoAddingOrUpdating';
import { userUpdateUserProfileImage, userFetchUserProfileDetails } from '@/utils/apis/user.api';
import UserOrProviderProfileDetails from '@/components/common/profile/UserOrProviderProfileDetails';

type userInfoType = Pick<User, "username" | "phone">;

const UserProfilePage: React.FC = () => {

  const [openUserInfoForm, setOpenUserInfoForm] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<userInfoType>({
    username: "",
    phone: ""
  });

  return (
    <div className="min-h-full flex flex-col p-2">
      <ProfileHead updateProfileImageApiFunction={userUpdateUserProfileImage} updation={true} />
      <UserOrProviderProfileDetails 
        fetchApiFunction={userFetchUserProfileDetails} 
        queryKey='profileDetails' 
        userSelf 
        shimmerRow={6} 
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

export default UserProfilePage