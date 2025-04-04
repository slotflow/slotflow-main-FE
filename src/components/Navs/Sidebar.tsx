import { toast } from 'react-toastify';
import { signout } from '@/utils/apis/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { setAuthUser } from '@/utils/redux/slices/authSlice';
import { toggleSidebar } from '@/utils/redux/slices/stateSlice';
import { AppDispatch, RootState } from '@/utils/redux/appStore';
import { SideBarProps } from '@/utils/interface/commonInterface';
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
} from 'lucide-react';
import { UserData } from '@/utils/interface/sliceInterface';


const Sidebar = ({ routes }: SideBarProps) => {

    const dispatch = useDispatch<AppDispatch>();

    const sidebarOpen: boolean = useSelector((store: RootState) => store.state.sidebarOpen);
    const user: UserData | null = useSelector((store: RootState) => store.auth?.authUser);

    const role: string | undefined = user?.role;

    const navigate = useNavigate();

    const handleSignout = (): void => {
        dispatch(signout()).unwrap().then((res) => {
            toast.success(res.message);
            if (role === "USER") {
                dispatch(setAuthUser(null));
                navigate("/user/login");
            } else if (role === "PROVIDER") {
                dispatch(setAuthUser(null));
                navigate("/provider/login");
            } else if (role === "ADMIN") {
                console.log("logging out");
                dispatch(setAuthUser(null));
                navigate("/admin/login");
            }
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    const handleSidebar = (): void => {
        dispatch(toggleSidebar());
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

            <ul className='p-4'>
                <li className={`p-3 text-[var(--textTwo)] hover:text-[var(--textTwoHover)] font-semibold hover:bg-[var(--menuItemHoverBg)] cursor-pointer rounded-md mt-auto flex justify-center ${!sidebarOpen && 'flex justify-center'}`} onClick={handleSignout}>
                    {sidebarOpen ? "Logout" : <LogOut />}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;