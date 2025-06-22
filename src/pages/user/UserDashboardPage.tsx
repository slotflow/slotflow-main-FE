import { useSelector } from 'react-redux';
import { Loader, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { RootState } from '@/utils/redux/appStore';
import { userSearchServiceProviders } from '@/utils/apis/user.api';
import DataFetchingError from '@/components/common/DataFetchingError';
import UserViewProviderCard from '@/components/user/UserViewProviderCard';

const UserDashboardPage = () => {
  const selectedServices = useSelector((store: RootState) => store.user.selectedServices);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => userSearchServiceProviders(selectedServices),
    queryKey: ['providers'],
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black/70 z-50">
        <Loader className="w-10 h-10 animate-spin text-white" />
      </div>
    );
  }

  if (isError) {
    return <DataFetchingError message={error?.message || "Something went wrong"} />;
  }

  return (
    <div className='px-6'>
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2 top-2 h-5 w-5 text-gray-500" />
        <Input type="text" placeholder="Search..." className="pl-8" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 my-4">
        {data?.map((provider, index) => (
          <UserViewProviderCard key={index} {...provider} />
        ))}
      </div>
    </div>
  );
};

export default UserDashboardPage;
