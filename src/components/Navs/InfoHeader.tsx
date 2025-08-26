import dayjs from 'dayjs';
import { Circle, CircleOff } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface InfoHeaderProps {
    profileImage?: string;
    username: string;
}

const InfoHeader: React.FC<InfoHeaderProps> = ({
    profileImage,
    username
}) => {
    
    const formatted = dayjs().format('DD MM dddd hh:mm A');

    const [ isOnline, setIsOnline ] = useState(true)
    useEffect(() => {
        window.addEventListener("offline" , () => {
            setIsOnline(false);
        })

        window.addEventListener("online" , () => {
            setIsOnline(true);
        })
    }, [])

    return (
        <nav className={`bg-[var(--menuItemHoverBg)] m-4 p-2 rounded-md mt-4 flex justify-between`}>
            <div className='flex'>
                <img
                    src={profileImage || "/images//avatar.png"}
                    className='size-6 rounded-full'
                />
                <h4 className='italic ml-2'>Hi, {username}</h4>
            </div>

            <div className='flex space-x-2 items-center'>
                <h4 className='text-sm'>{formatted}</h4>
                <div className='flex' title={isOnline ? "Online" : "Offline"} >
                    {isOnline ? (
                        <Circle className="size-4 text-green-500 fill-green-500" />
                    ) : (
                        <CircleOff className="size-4 text-red-500 fill-red-500" />
                    )}
                </div>
            </div>
        </nav>
    )
}

export default InfoHeader