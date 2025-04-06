import { formatDate } from '@/utils/helper';
import { useQuery } from '@tanstack/react-query';
import UserProfileHead from '@/components/user/UserProfileHead';
import { fetchUserProfileDetails } from '@/utils/apis/user.api';
import DataFetchingError from '@/components/common/DataFetchingError';
import InfoDisplayComponent from '@/components/common/InfoDisplayComponent';
import ShimmerProfileDetails from '@/components/shimmers/ShimmerProfileDetails';

const UserProfilePage = () => {

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => fetchUserProfileDetails(),
    queryKey: ["UserDetails"]
  });
  
  return (
    <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
      <UserProfileHead />
      <div className="w-full mx-auto py-6 rounded-lg flex-grow">
        {isError ? (
          <DataFetchingError message={error.message} />
        ) : isLoading ? (
          <ShimmerProfileDetails row={7} />
        ) : data? (
          <table className="table-auto border-collapse border border-[var(--boxBorder)] w-full">
            <tbody>
              <InfoDisplayComponent label="Username" value={data?.username} />
              <InfoDisplayComponent label="Email" value={data?.email} />
              <InfoDisplayComponent label="Phone Number" value={data?.phone} />
              <InfoDisplayComponent label="Joined On" value={data?.createdAt} formatDate={formatDate} />
              <InfoDisplayComponent label="Email Verified" value={data?.isEmailVerified} isBoolean={true} />
              <InfoDisplayComponent label="Account Blocked" value={data?.isBlocked} isBoolean={true} />
            </tbody>
          </table>
        ) : (
          <DataFetchingError message="No details found." />
        )}
      </div>
    </div>
  )
}

export default UserProfilePage