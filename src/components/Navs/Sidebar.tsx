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
} from 'lucide-react';


const Sidebar = ({ routes }: SideBarProps) => {
    
    const sidebarOpen = useSelector((store: RootState) => store.state.sidebarOpen);
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((store: RootState) => store.auth?.authUser);
    const role: string | undefined= user?.role;
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
        'Chat': <MessageSquare />,
        'users': <Users />,
        'plans': <LayoutGrid />,
        'Payments': <CreditCard />,
        'reviews': <Star />,
        'Profile': <User />,
        'dashboard': <Gauge />,
        'Bookings': <CalendarCheck />,
        'services': <Briefcase />,
        'subscriptions': <LucideCreditCard />,
        'Appointments': <CalendarCheck />,
        'Notifications': <Bell />,
        'service-providers': <Network />,
        'Logout': <LogOut />,
    }

    const getIcon = (name: string): React.ReactNode => {
        const normalizedName = normalizeRouteName(name);
        return iconMap[normalizedName];
    }

    return (
        <div className={` ${sidebarOpen ? 'w-[16%]' : 'w-[6%]'} bg-[var(--background)] shadow-[5px_0_0_0_rgba(0,0,0,0.2)] overflow-y-scroll no-scrollbar border-r-2 transition-all duration-300 flex flex-col`}>
            <div className="p-4 flex-1">
                <ul className="space-y-4">

                    {user && (
                        <li className="px-3" onClick={handleSidebar}>
                            {sidebarOpen ?
                                <Menu className='text-2xl font-bold cursor-pointer text-[var(--textOne)] hover:text-[var(--textOneHover)]' />
                                :
                                <Menu className='text-2xl font-bold cursor-pointer text-[var(--textOne)] hover:text-[var(--textOneHover)]' />
                            }
                        </li>
                    )}

                    {routes.map((route) => (
                        <NavLink key={route.path} to={route.path}>
                            <li className="p-3 text-[var(--textTwo)] hover:text-[var(--textTwoHover)] font-semibold hover:bg-[var(--menuItemHoverBg)] cursor-pointer rounded-md">
                                {sidebarOpen ? route.name : getIcon(route.name)}
                            </li>
                        </NavLink>
                    ))}

                </ul>
            </div>

            <ul className='p-4'>
                <li className="p-3 text-[var(--textTwo)] hover:text-[var(--textTwoHover)] font-semibold hover:bg-[var(--menuItemHoverBg)] cursor-pointer rounded-md mt-auto" onClick={handleSignout}>
                    {sidebarOpen ? "Logout" : <LogOut />}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;