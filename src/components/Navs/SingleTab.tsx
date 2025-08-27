import { Lock } from "lucide-react";

interface SingleTabProps {
    icon: React.ReactNode;
    text: string;
    sidebarOpen: boolean;
    onClick?: () => void;
    className?: string;
    locked?: boolean;
    active?: boolean;
}

export const SingleTab: React.FC<SingleTabProps> = ({
    icon,
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
                p-2 my-2 font-semibold rounded-md transition-colors
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
                    <span className='text-2xl font-bold'>{icon}</span>
                    <span className='ml-2'>{text}</span>
                    {locked && <Lock className="mx-auto size-3 my-auto" />}
                </div>
            ) : (
                <span className='text-2xl font-bold cursor-pointer text-[var(--textOne)] hover:text-[var(--textOneHover)]'>{icon}</span>
            )}
        </li>
    );
};