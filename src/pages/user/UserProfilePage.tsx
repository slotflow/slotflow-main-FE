import ProfileHead from '@/components/common/profile/ProfileHead';
import { userUpdateUserProfileImage, userFetchUserProfileDetails } from '@/utils/apis/user.api';
import UserOrProviderProfileDetails from '@/components/common/profile/UserOrProviderProfileDetails';

const UserProfilePage = () => {
  
  return (
    <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
      <ProfileHead updateProfileImageApiFunction={userUpdateUserProfileImage} updation={true} />
      <UserOrProviderProfileDetails fetchApiFunction={userFetchUserProfileDetails} queryKey='profileDetails' userSelf shimmerRow={6}/>
    </div>
  )
  
}

export default UserProfilePage