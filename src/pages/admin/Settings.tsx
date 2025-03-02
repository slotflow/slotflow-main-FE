
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../lib/axios';
import { Provider } from '@/utils/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/redux/appStore';
import { approveProvider } from '@/utils/redux/adminHanlder';

const fetchProviders = async () => {
  const response = await axiosInstance.get('/admin/providers');
  return response.data.providers;
};

const Settings = () => {

  const { data: providers, isLoading, isError, error } = useQuery({
    queryKey: ['providers'],
    queryFn: fetchProviders,
  });

  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const handleApprove = (providerId : string) => {
    dispatch(approveProvider(providerId)).unwrap().then(({ providerId, updatedProvider }) => {
      queryClient.setQueryData(['providers'], (oldData: Provider[] | undefined) => {
        if (!oldData) return [];
        return oldData.map((provider) =>
          provider._id === providerId ? updatedProvider : provider
        );
      });
      queryClient.invalidateQueries({ queryKey: ['providers'] });
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div>
      {providers && providers.map((provider: Provider) => (
        <div key={provider._id}>
          {provider.username}
          <button onClick={() => handleApprove(provider._id)}>Approve</button>
        </div>
      ))}
    </div>
  )
}

export default Settings