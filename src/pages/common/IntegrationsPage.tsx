import { toast } from 'react-toastify';
import React, { useEffect } from 'react';
import { RootState } from '@/utils/redux/appStore';
import { Separator } from '@/components/ui/separator';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'recharts/types/state/store';
import IntegrationCard from '@/components/common/Integrations';
import { handleConnectGoogle } from '@/utils/helper/googleConnect';
import googleCalendar from '../../assets/iconImages/gCalendar.png';
import { updateGoogleConnect } from '@/utils/redux/slices/authSlice';
import { setGoogleConnectionLoading } from '@/utils/redux/slices/googleSlice';

const IntegrationsPage: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { authUser } = useSelector((state: RootState) => state.auth);
    const { googleConnectionLoding } = useSelector((state: RootState) => state.google);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const data = params.get("response");
        if (!data) return;
        try {
            const response = JSON.parse(decodeURIComponent(data));
            if (!response.success) {
                toast.error("Connection failed, please try again");
            } else {
                dispatch(updateGoogleConnect());
                dispatch(setGoogleConnectionLoading(false));
                toast.success("Successfully connected!");
            }
        } catch (err) {
            toast.error("Connecting failed");
            console.error("Google connect parse error:", err);
        } finally {
            const url = new URL(window.location.href);
            url.searchParams.delete("response");
            window.history.replaceState({}, "", url.toString());
        }
    }, [dispatch]);

    if (!authUser) return;

    return (
        <div className="flex flex-col p-2">

            <div className='mb-2'>
                <div className='flex justify-between items-center'>
                    <div className='flex space-x-2'>
                        <h2 className="text-2xl font-bold tracking-tighter"> Integrations</h2>
                    </div>
                </div>
                <p className='w-8/12 mt-2 text-gray-500 text-sm'>List of all integrations, you can use based on your subscription</p>
            </div>

            <Separator className='shadow-sm' />

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>

                <IntegrationCard
                    image={googleCalendar}
                    connectOnClick={handleConnectGoogle}
                    connectingLoading={googleConnectionLoding}
                    description='Connect your Google calendar to enable calendar syncing and manage your appointments automatically avoid overlapping.'
                    heading='Google Calendar'
                    isConnected={authUser.googleConnected}
                />

            </div>

        </div>
    )
}

export default IntegrationsPage;