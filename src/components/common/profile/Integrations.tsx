import { toast } from 'react-toastify';
import React, { useEffect } from 'react';
import { RootState } from '@/utils/redux/appStore';
import { Check, Combine, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'recharts/types/state/store';
import GoogleButton from '@/components/form/GoogleButton';
import { handleConnectGoogle } from '@/utils/helper/googleConnect';
import { updateGoogleConnect } from '@/utils/redux/slices/authSlice';
import googleCalendar from '../../../assets/iconImages/gCalendar.png';
import { setGoogleConnectionLoading } from '@/utils/redux/slices/googleSlice';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Integrations: React.FC = () => {

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
                toast.error("Google connection failed, please try again");
            } else {
                dispatch(updateGoogleConnect());
                dispatch(setGoogleConnectionLoading(false));
                toast.success("Google successfully connected!");
            }
        } catch (err) {
            toast.error("Invalid response from Google connect");
            console.error("Google connect parse error:", err);
        } finally {
            const url = new URL(window.location.href);
            url.searchParams.delete("response");
            window.history.replaceState({}, "", url.toString());
        }
    }, [dispatch]);

    return (
        <div className="min-h-full flex flex-col">

            <div className='border rounded-md my-2 p-2'>
                <div className='flex justify-between items-center'>
                    <div className='flex space-x-2'>
                        <Combine />
                        <h2 className="text-xl font-semibold"> Integrations</h2>
                    </div>
                </div>
                <p className='w-8/12 mt-2 text-gray-500 text-sm'>List of all integrations, you can use based on your subscription</p>
            </div>


            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                
                <Card className="w-full mt-4 border shadow-sm">
                    <CardHeader className="flex items-center space-x-4">
                        <img src={googleCalendar} alt="Google" className="size-12" />
                        <CardTitle className="text-lg font-semibold">Google Calendar</CardTitle>
                    </CardHeader>

                    <CardContent className="text-sm">
                        Connect your Google calendar to enable calendar syncing and manage your appointments automatically avoid overlapping.
                    </CardContent>

                    <CardFooter className="flex justify-end">
                        {authUser?.googleConnected ? (
                            <Check className="text-green-500 w-5 h-5" />
                        ) : googleConnectionLoding ? (
                            <span className="flex items-center text-gray-600">
                                <Loader2 className="animate-spin mr-2 w-4 h-4" />
                                Connecting...
                            </span>
                        ) : (
                            <GoogleButton
                                text="Connect"
                                onClick={(e) => handleConnectGoogle(e, dispatch)}
                                className="px-3 py-1 text-sm rounded-md transition w-full"
                            />
                        )}
                    </CardFooter>
                </Card>

            </div>

        </div>
    )
}

export default Integrations