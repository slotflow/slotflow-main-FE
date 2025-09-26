import React, { useMemo } from "react";

interface ProfileHorizontalTabsComponentProps {
    isAdmin: boolean,
    tab: number,
    setTab: (index: number) => void;
    tabArray: { tabName: string, admin: boolean, user: boolean }[];
}

const ProfileHorizontalTabs: React.FC<ProfileHorizontalTabsComponentProps> = ({
    isAdmin,
    tab,
    setTab,
    tabArray
}) => {

    const tabs = useMemo(() => {
        return tabArray.reduce((acc: string[], tab: { tabName: string, admin: boolean, user: boolean }) => {
            if (isAdmin && tab.admin) {
                acc.push(tab.tabName)
            } else if (!isAdmin && tab.user) {
                acc.push(tab.tabName);
            }
            return acc;
        }, [])
    }, [isAdmin, tabArray]);

    return (
        <ul className="flex justify-around mt-2 border overflow-x-scroll no-scrollbar rounded-md">
            {tabs.map((button, index) => (
                <button key={index} className={`p-2 hover:bg-[var(--menuItemHoverBg)] w-full cursor-pointer text-xs md:text-[1rem] ${tab === index && `text-[var(--mainColor)] font-bold`}`} onClick={() => setTab(index)}>{button}</button>
            ))}
        </ul>
    )
}

export default ProfileHorizontalTabs