import { Lock } from "lucide-react";

interface SingleTabProps {
    icon: React.ElementType;
    text: string;
    sidebarOpen: boolean;
    onClick?: () => void;
    className?: string;
    locked?: boolean;
    active?: boolean;
}

export const SingleTab: React.FC<SingleTabProps> = ({
    icon: Icon,
    text,
    sidebarOpen,
    onClick,
    className = '',
    locked = false,
    active
}) => {
    return (
        <li
            title={!locked ? text : text + " locked"}
            onClick={onClick}
            className={`
                px-2 py-1.5 my-2 font-semibold rounded-md transition-colors
                ${!sidebarOpen ? 'flex justify-center' : 'flex items-center'}
                ${className}
                ${locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${active
                    ? 'bg-[var(--menuItemHoverBg)] text-[var(--textOneHover)]'
                    : 'text-[var(--textOne)] hover:bg-[var(--menuItemHoverBg)] hover:text-[var(--textOneHover)]'
                }
            `}
        >
            {sidebarOpen ? (
                <div className='flex cursor-pointer'>
                    <Icon className='size-6 dark:text-gray-300' />
                    <span className='ml-3 text-[16px]'>{text}</span>
                    {locked && <Lock className="mx-auto size-3 my-auto" />}
                </div>
            ) : (
                <Icon className='text-2xl font-bold cursor-pointer text-[var(--textOne)] hover:text-[var(--textOneHover)]' />)}
        </li>
    );
};