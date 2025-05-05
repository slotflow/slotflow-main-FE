import UserProfileHead from '@/components/user/UserProfileHead';
import { userFetchUserProfileDetails } from '@/utils/apis/user.api';
import UserOrProviderProfileDetails from '@/components/common/profile/UserOrProviderProfileDetails';

const UserProfilePage = () => {
  
  return (
    <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
      <UserProfileHead />
      <UserOrProviderProfileDetails fetchApiFunction={userFetchUserProfileDetails} authUserType='user' profileuUserType='user'/>
    </div>
  )
}

export default UserProfilePage