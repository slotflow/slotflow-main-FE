interface SingleTabProps {
    icon: React.ReactNode;
    text: string;
    sidebarOpen: boolean;
    onClick?: () => void;
    className?: string;
}

export const SingleTab: React.FC<SingleTabProps> = ({
    icon,
    text,
    sidebarOpen,
    onClick,
    className = '',
}) => {
    return (
        <li
            title={text}
            onClick={onClick}
            className={`p-3 text-[var(--textTwo)] hover:text-[var(--textTwoHover)] font-semibold hover:bg-[var(--menuItemHoverBg)] cursor-pointer rounded-md ${!sidebarOpen && 'flex justify-center'} ${className}`}
        >
            {sidebarOpen ? (
                <div className='flex cursor-pointer text-[var(--textOne)] hover:text-[var(--textOneHover)]'>
                    <span className='text-2xl font-bold'>{icon}</span>
                    <span className='ml-2'>{text}</span>
                </div>
            ) : (
                <span className='text-2xl font-bold cursor-pointer text-[var(--textOne)] hover:text-[var(--textOneHover)]'>{icon}</span>
            )}
        </li>
    );
};