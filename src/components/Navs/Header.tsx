import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Moon, Sun } from 'lucide-react';
import { greetings } from '@/utils/helper';
import { signout } from '@/utils/apis/auth.api';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/utils/redux/slices/authSlice';
import { toggleTheme } from '@/utils/redux/slices/stateSlice';
import { AppDispatch, RootState } from '../../utils/redux/appStore';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Plans', href: '#', current: false },
  { name: 'Services', href: '#', current: false },
  { name: 'About', href: '#', current: false },
  { name: 'Contact', href: '#', current: false },
]

const Header = () => {

  const dispatch = useDispatch<AppDispatch>();
  const themeMode = useSelector((store: RootState) => store.state.lightTheme);
  const user = useSelector((store: RootState) => store.auth?.authUser);
  const role = user?.role;
  const navigate = useNavigate();
  const changeTheme = () => {
    dispatch(toggleTheme());
  }

  useEffect(() => {
    if (themeMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [themeMode]);

  const greetingString = greetings();

  const handleSignout = () => {
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

  return (
    <nav className={`w-full bg-[var(--background)] border-b-2 border-[var(--boxBorder)]} fixed`}>
      <div className={`mx-auto px-2 sm:px-6 lg:px-8`}>
        <div className="   flex h-16 items-center justify-between">

          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center ml-4">
              <h4 className="text-[var(--mainColor)] font-bold italic text-xl">Slotflow</h4>
            </div>
          </div>

          {!user ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className="rounded-md px-3 py-2 text-sm font-medium text-[var(--textOne)] hover:text-[var(--textOneHover)]"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <div className="hidden sm:ml-6 sm:block">
                <h2 className="text-lg font-semibold text-[var(--textOne)]">
                  {greetingString} {user?.username ? user.username : 'User'}
                </h2>
              </div>
            </div>
          )}


          {user && (
            <button className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-[var(--textOne)] hover:bg-[var(--menuItemHoverBg)] cursor-pointer" onClick={handleSignout}>
              Log out
            </button>
          )}

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div  className="relative ml-3">
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
        </div>
      </div>

      <div className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className="item.current ? 'bg-[var(--menuItemHoverBg)] text-[var(--textOne)]' : 'text-[var(--textOne)] hover:bg-[var(--menuItemHoverBg)] hover:text-[var(--textOneHover)] block rounded-md px-3 py-2 text-base font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Header