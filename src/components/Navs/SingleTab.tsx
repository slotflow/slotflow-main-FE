import { Lock } from "lucide-react";

interface SingleTabProps {
    icon: React.ReactNode;
    text: string;
    sidebarOpen: boolean;
    onClick?: () => void;
    className?: string;
    locked?: boolean; // ✅ NEW: lock control

}

export const SingleTab: React.FC<SingleTabProps> = ({
    icon,
    text,
    sidebarOpen,
    onClick,
    className = '',
    locked = false
}) => {
    return (
        <li
            title={!locked ? text : text+" locked"}
            onClick={onClick}
            className={`p-3 font-semibold hover:bg-[var(--menuItemHoverBg)] cursor-pointer rounded-md ${!sidebarOpen && 'flex justify-center'} ${className} ${!locked ? "text-[var(--textOne)] hover:text-[var(--textOneHover)] " : "text-muted"}`}
        >
            {sidebarOpen ? (
                <div className='flex cursor-pointer'>
                    <span className='text-2xl font-bold'>{icon}</span>
                    <span className='ml-2'>{text}</span>
                    {locked &&<Lock className="mx-auto size-3 my-auto" />}
                </div>
            ) : (
                <span className='text-2xl font-bold cursor-pointer text-[var(--textOne)] hover:text-[var(--textOneHover)]'>{icon}</span>
            )}
        </li>
    );
};