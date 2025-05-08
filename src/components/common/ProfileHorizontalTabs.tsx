import React, { useMemo } from "react";
import { providerTabs } from "@/utils/constants";

interface ProfileHorizontalTabsComponentProps {
    isAdmin: boolean,
    tab: number,
    setTab: (index: number) => void;
}

const ProfileHorizontalTabs: React.FC<ProfileHorizontalTabsComponentProps> = ({
    isAdmin,
    tab,
    setTab
}) => {

    const profileTabs = useMemo(() => {
        return providerTabs.reduce((acc: string[], tab: { tabName: string, admin: boolean, user: boolean }) => {
            if (isAdmin && tab.admin) {
                acc.push(tab.tabName)
            } else if (!isAdmin && tab.user) {
                acc.push(tab.tabName);
            }
            return acc;
        }, [])
    }, [isAdmin]);

    return (
        <ul className="flex justify-around mt-2 border overflow-x-scroll no-scrollbar rounded-md">
            {profileTabs.map((button, index) => (
                <button key={index} className={`p-2 hover:bg-[var(--menuItemHoverBg)] w-full cursor-pointer text-xs md:text-[1rem] ${tab === index && `text-[var(--mainColor)] font-bold`}`} onClick={() => setTab(index)}>{button}</button>
            ))}
        </ul>
    )
}

export default ProfileHorizontalTabs