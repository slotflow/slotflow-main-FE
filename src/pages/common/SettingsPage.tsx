import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/redux/appStore';
import { } from '@/utils/interface/api/userApiInterface';
import Address from '@/components/common/profile/Address';
import Profile from '@/components/common/profile/Profile';
import ProfileHead from '@/components/common/profile/ProfileHead';
import { userUpdateUserProfileImage } from '@/utils/apis/user.api';
import DataFetchingError from '@/components/common/DataFetchingError';
import { providerUpdateProviderProfileImage } from '@/utils/apis/provider.api';
import Integrations from '@/components/common/profile/Integrations';
import ProviderService from '@/components/provider/ProviderService';
import ProviderAvailability from '@/components/provider/ProviderAvailability';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { SettingTabs } from '@/utils/constants';

const SettingsPage: React.FC = () => {

    const { authUser } = useSelector((state: RootState) => state.auth);

    const isProvider = authUser?.role === "PROVIDER";

    const updateProfileImageApiFunction = isProvider
        ? providerUpdateProviderProfileImage
        : userUpdateUserProfileImage;

    if (!authUser) return <DataFetchingError message='User not found' />

    return (
        <div className="min-h-full p-2 flex flex-col mb-10">

            <ProfileHead
                updateProfileImageApiFunction={updateProfileImageApiFunction}
                updation={true}
                showDetails
                isMyProfile
            />

            <Tabs defaultValue="tab1" className="w-full mt-2">

                <TabsList className="flex w-full justify-between border rounded-md my-2">
                    {SettingTabs.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="w-full cursor-pointer px-4 py-2 text-sm font-medium text-black dark:text-white hover:text-gray-900 
                 data-[state=active]:bg-[var(--mainColor)] data-[state=active]:text-white 
                 data-[state=active]:rounded-md transition"
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="tab1" className="">
                    <Profile />
                </TabsContent>

                <TabsContent value="tab2" className="">
                    <Address />
                </TabsContent>

                <TabsContent value="tab3" className="">
                    <Integrations />
                </TabsContent>

                {isProvider && (
                    <React.Fragment>
                        <TabsContent value="tab4" className="">
                            <ProviderService />
                        </TabsContent>
                        <TabsContent value="tab5" className="">
                            <ProviderAvailability />
                        </TabsContent>
                    </React.Fragment>
                )}
            </Tabs>
        </div>
    )
}

export default SettingsPage