import React from "react";
import { settingsTabs } from "@/utils/constants";
import { Separator } from "@/components/ui/separator";
import NotificationSettings from "@/components/common/NotificationSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import AccountSecurity from "@/components/common/AccountSecurity";
import IntegrationsListing from "@/components/common/IntegrationsListing";
import PersonalizationList from "@/components/common/PersonalizationList";

const SettingsPage: React.FC = () => {
    return (
        <div className="p-2">

            <div className='mb-2'>
                <div className='flex justify-between items-center'>
                    <div className='flex space-x-2'>
                        <h2 className="text-3xl font-bold tracking-tighter">Settings</h2>
                    </div>
                </div>
                <p className='w-8/12 mt-2 text-gray-500 text-sm font-semibold'>List of all integrations, you can use based on your subscription</p>
            </div>
            <Separator className='shadow-sm' />


            <Tabs orientation="vertical" defaultValue="notifications" className="flex w-full py-4 mt-4 space-x-2">

                <TabsList className="flex flex-col w-3/12 items-start space-y-2 px-2 rounded-md self-start">
                    {settingsTabs.map(({ value, label, icon: Icon }) => (
                        <TabsTrigger
                            key={value}
                            value={value}
                            className="flex items-center gap-2 w-full justify-start px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-[var(--menuItemHoverBg)] cursor-pointer"
                        >
                            {Icon && <Icon className="w-4 h-4" />}
                            {label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <div className="flex-1 w-9/12">

                    <TabsContent value="notifications" className="space-y-4">
                       <NotificationSettings />
                    </TabsContent>

                    <TabsContent value="security" className="space-y-4">
                        <AccountSecurity />
                    </TabsContent>

                    <TabsContent value="integrations" className="space-y-4">
                        <IntegrationsListing />
                    </TabsContent>

                    <TabsContent value="personalization" className="space-y-4">
                        <PersonalizationList />
                    </TabsContent>

                </div>
            </Tabs>
        </div>
    )
}

export default SettingsPage
