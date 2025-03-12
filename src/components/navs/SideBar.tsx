import { Route } from '@/utils/types';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '@/utils/redux/appStore';

interface SideBarProps {
    routes: Route[];
}

const Sidebar = ({ routes }: SideBarProps) => {
    const sidebarOpen = useSelector((store: RootState) => store.state.sidebarOpen);
    return (
        <div
            className={` ${sidebarOpen ? 'w-[16%]' : 'w-[6%]' } bg-[var(--background)] shadow-[5px_0_0_0_rgba(0,0,0,0.2)] overflow-y-scroll no-scrollbar border-r-2 h-screen transition-all duration-300`}>
            <div className="sticky top-0 z-10 bg-[var(--background)] w-full p-4 text-center">
                <h4 className="text-[var(--mainColor)] font-bold italic text-2xl">Slotflow</h4>
            </div>
            <div className="p-4">
                <ul className="space-y-4">
                    {routes.map((route) => (
                        <NavLink key={route.path} to={route.path}>
                            <li className="p-3 text-[var(--textTwo)] hover:text-[var(--textTwoHover)] font-semibold hover:bg-[var(--menuItemHoverBg)] cursor-pointer rounded-md">
                                {route.name}
                            </li>
                        </NavLink>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;