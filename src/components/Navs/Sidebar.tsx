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
    Menu,
    MapPinHouse,
    CalendarDays,
    Handshake,
    HandCoins,
    Sun,
    Moon,
} from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserData } from '@/utils/interface/sliceInterface';
import { handleSignoutHelper } from '@/utils/helper/signout';
import { toggleSidebar, toggleTheme } from '@/utils/redux/slices/stateSlice';
import { AppDispatch, RootState } from '@/utils/redux/appStore';
import { SideBarProps } from '@/utils/interface/commonInterface';
import { useResetRedux } from '@/utils/hooks/systemHooks/useResetRedux';


const Sidebar: React.FC<SideBarProps> = ({ routes }) => {

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
        'users': <Users />,
        'providers': <Handshake />,
        'profile': <User />,
        'address': <MapPinHouse />,
        'chat': <MessageSquare />,
        'plans': <LayoutGrid />,
        'payments': <HandCoins />,
        'reviews': <Star />,
        'bookings': <CalendarCheck />,
        'services': <Briefcase />,
        'service': <Briefcase />,
        'subscriptions': <LucideCreditCard />,
        'subscription': <CreditCard />,
        'appointments': <CalendarCheck />,
        'notifications': <Bell />,
        'service-providers': <Network />,
        'availability': <CalendarDays />,
        'logout': <LogOut />,
    }

    const getIcon = (name: string): React.ReactNode => {
        const normalizedName = normalizeRouteName(name);
        return iconMap[normalizedName];
    }

    useEffect(() => {
        if (themeMode) {
          document.documentElement.classList.remove('dark');
        } else {
          document.documentElement.classList.add('dark');
        }
      }, [themeMode]);

    return (
        <div className={` ${sidebarOpen ? 'w-[15%]' : 'w-[6%]'} overflow-y-scroll no-scrollbar border-r-2 transition-all duration-300 flex flex-col`}>
            <div className="p-4 flex-1">
                <ul className="space-y-4">

                    {user && (
                        <li className={`p-3 text-[var(--textTwo)] hover:text-[var(--textTwoHover)] font-semibold hover:bg-[var(--menuItemHoverBg)] cursor-pointer rounded-md ${!sidebarOpen && 'flex justify-center'}`} onClick={handleSidebar}>
                            {sidebarOpen ?
                                <Menu className='text-2xl font-bold cursor-pointer text-[var(--textOne)] hover:text-[var(--textOneHover)]' />
                                :
                                <Menu className='text-2xl font-bold cursor-pointer text-[var(--textOne)] hover:text-[var(--textOneHover)]' />
                            }
                        </li>
                    )}

                    {routes.map((route) => (
                        <NavLink key={route.path} to={route.path}>
                            <li title={route.name}
                                className={`relative group p-3 text-[var(--textTwo)] hover:text-[var(--textTwoHover)] font-semibold hover:bg-[var(--menuItemHoverBg)] cursor-pointer rounded-md ${!sidebarOpen && 'flex justify-center'}`}
                            >
                                {sidebarOpen ? route.name : getIcon(route.name) || route.name}

                                {!sidebarOpen && (
                                    <span className="absolute left-full ml-2 px-2 py-1 text-xs font-medium text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        {route.name}
                                    </span>
                                )}
                            </li>
                        </NavLink>
                    ))}

                </ul>
            </div>

            {(user?.isLoggedIn && user.role) && (
                <ul className='p-4'>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative ml-3">
                            <div className='flex'>
                                {themeMode ?
                                    <div className="relative flex rounded-full cursor-pointer mx-3" onClick={changeTheme}>
                                        <Sun />
                                    </div>
                                    :
                                    <div className="relative flex rounded-full cursor-pointer mx-3" onClick={changeTheme}>
                                        <Moon />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    <li className={`p-3 text-[var(--textTwo)] hover:text-[var(--textTwoHover)] font-semibold hover:bg-[var(--menuItemHoverBg)] cursor-pointer rounded-md mt-auto ${!sidebarOpen && 'flex justify-center'}`} onClick={() => {
                        handleSignoutHelper({ role: user?.role, dispatch, resetRedux, navigate })
                    }}>
                        {sidebarOpen ? "Logout" : <LogOut />}
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Sidebar;