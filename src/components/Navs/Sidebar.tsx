import {
    MessageSquare,
    Users,
    LayoutGrid,
    CreditCard,
    Star,
    User,
    Gauge,
    CalendarCheck,
    CreditCard as LucideCreditCard,
    Bell,
    Network,
    LogOut,
    Briefcase,
    MapPinHouse,
    CalendarDays,
    Handshake,
    HandCoins,
    Sun,
    Moon,
    PanelLeft,
    Video,
    Settings,
    Calendar1,
    ChartNoAxesCombined,
    BookLock,
    ScanHeart,
} from 'lucide-react';
import { SingleTab } from './SingleTab';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logos/logo-transparent.png';
import { UserData } from '@/utils/interface/sliceInterface';
import { handleSignoutHelper } from '@/utils/helper/signout';
import { AppDispatch, RootState } from '@/utils/redux/appStore';
import { SideBarProps } from '@/utils/interface/commonInterface';
import { useResetRedux } from '@/utils/hooks/systemHooks/useResetRedux';
import { toggleSidebar, toggleTheme } from '@/utils/redux/slices/stateSlice';

const Sidebar: React.FC<SideBarProps> = ({
    routes,
    filteredRoutes
}) => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const resetRedux = useResetRedux();

    const sidebarOpen: boolean = useSelector((store: RootState) => store.state.sidebarOpen);
    const user: UserData | null = useSelector((store: RootState) => store.auth?.authUser);
    const themeMode: boolean = useSelector((store: RootState) => store.state.lightTheme);

    const handleSidebar = (): void => {
        dispatch(toggleSidebar());
    }

    const changeTheme = (): void => {
        dispatch(toggleTheme());
    }

    const normalizeRouteName = (name: string): string => {
        return name.toLowerCase().replace(/ /g, "-");
    }

    const iconMap: Record<string, React.ReactNode> = {
        'dashboard': <Gauge />,
        'overview': <Gauge />,
        'analytics': <ChartNoAxesCombined />,
        'reports': <BookLock />,
        '/provider': <Gauge />,
        '/admin': <Gauge />,
        'users': <Users />,
        'providers': <Handshake />,
        'profile': <User />,
        'address': <MapPinHouse />,
        'chat': <MessageSquare />,
        'video-call': <Video />,
        'plans': <LayoutGrid />,
        'payments': <HandCoins />,
        'reviews': <Star />,
        'bookings': <CalendarCheck />,
        'services': <Briefcase />,
        'service': <Briefcase />,
        'subscriptions': <LucideCreditCard />,
        'subscription': <CreditCard />,
        'appointments': <CalendarCheck />,
        'calendar': <Calendar1 />,
        'notifications': <Bell />,
        'settings': <Settings />,
        'service-providers': <Network />,
        'availability': <CalendarDays />,
        'api-strength': <ScanHeart />,
        'logout': <LogOut />,
    }

    const getIcon = (name: string): React.ReactNode => {
        const normalizedName = normalizeRouteName(name);
        return iconMap[normalizedName];
    }

    const basePath = user?.role === "ADMIN" ? "/admin" : user?.role === "PROVIDER" ? "/provider" : "/user";

    useEffect(() => {
        if (themeMode) {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
    }, [themeMode]);

    return (
        <div className={` ${sidebarOpen ? 'w-[15%]' : 'w-[5%]'} overflow-y-scroll no-scrollbar border-r-2 transition-all duration-300 flex flex-col`} >
            <div className="p-4 flex-1">
                <ul>

                    <li className='px-3 pb-4 flex'>
                        <div>
                            <img src={logo} className='size-8' />
                        </div>
                        {sidebarOpen && (
                            <span className='text-[var(--mainColor)] text-3xl font-bold italic hover:text-white px-2 rounded-lg cursor-pointer'>SlotFlow</span>
                        )}
                    </li>

                    <SingleTab icon={<PanelLeft />} text={sidebarOpen ? "Close Menu" : ""} onClick={handleSidebar} sidebarOpen={sidebarOpen} />

                    {routes.map((route) => {
                        const isProvider = user?.role === "PROVIDER";
                        const isLocked = isProvider && filteredRoutes
                            ? !filteredRoutes.some(froute => froute.name === route.name)
                            : false;
                        const fullPath = `${basePath}/${route.path}`;

                        return !isLocked ? (
                            <NavLink
                                key={fullPath}
                                to={fullPath}
                                className="block"
                            >
                                {({ isActive }) => (
                                    <SingleTab
                                        icon={getIcon(route.name)}
                                        text={route.name}
                                        sidebarOpen={sidebarOpen}
                                        locked={isLocked}
                                        active={isActive}
                                    />
                                )}
                            </NavLink>
                        ) : (
                            <SingleTab
                                key={route.path}
                                icon={getIcon(route.name)}
                                text={route.name}
                                sidebarOpen={sidebarOpen}
                                locked={isLocked}
                            />
                        );
                    })}

                </ul>
            </div>

            {(user?.isLoggedIn && user.role) && (
                <ul className='p-4'>
                    <SingleTab
                        icon={!themeMode ? <Sun /> : <Moon />}
                        text={!themeMode ? 'Light' : 'Dark'}
                        onClick={changeTheme}
                        sidebarOpen={sidebarOpen}
                    />

                    <SingleTab
                        icon={<LogOut />}
                        text="Logout"
                        onClick={() => handleSignoutHelper({ role: user?.role, dispatch, resetRedux, navigate })}
                        sidebarOpen={sidebarOpen}
                    />
                </ul>
            )}

        </div>
    );
};

export default Sidebar;