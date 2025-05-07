import ProfileHead from '@/components/common/profile/ProfileHead';
import { updateUserProfileImage, userFetchUserProfileDetails } from '@/utils/apis/user.api';
import UserOrProviderProfileDetails from '@/components/common/profile/UserOrProviderProfileDetails';

const UserProfilePage = () => {
  
  return (
    <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
      <ProfileHead updateProfileImageApiFunction={updateUserProfileImage} updation={true} />
      <UserOrProviderProfileDetails fetchApiFunction={userFetchUserProfileDetails} queryKey='profileDetails' authUserType='user' profileuUserType='user'/>
    </div>
  )
  
}

export default UserProfilePage