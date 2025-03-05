import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { signout } from '../../utils/apis/auth.api';
import { toggleTheme } from '@/utils/redux/stateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { AppDispatch, RootState } from '../../utils/redux/appStore';
import { changeAdmin, changeProvider, changeUser } from '../../utils/redux/authSlice';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { setAdminForm, setChangePassword, setChangePasswordForm, setLoginForm, setSignUpForm, setVerifyEmailForm, setVerifyOtpForm } from '../../utils/redux/signFormSlice';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Plans', href: '#', current: false },
  { name: 'Services', href: '#', current: false },
  { name: 'About', href: '#', current: false },
  { name: 'Contact', href: '#', current: false },
]

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const themeMode = useSelector((store : RootState) => store.state.lightTheme);
  
  const changeTheme = () => {
    dispatch(toggleTheme()); 
  }

  const handleSignout = () => {
    dispatch(signout()).unwrap().then((res) => {
      toast.success(res.message);
      dispatch(setLoginForm(true));
      dispatch(setVerifyOtpForm(false));
      dispatch(setVerifyEmailForm(false));
      dispatch(setSignUpForm(false));
      dispatch(setAdminForm(false));
      dispatch(setChangePassword(false));
      dispatch(setChangePasswordForm(false));
      dispatch(changeProvider(false)); 
      dispatch(changeAdmin(false)); 
      dispatch(changeUser(false)); 
    }).catch((error) => {
      toast.error(error.message);
    })
  }

  useEffect(() => {
    if (themeMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [themeMode]);

  return (
    <Disclosure as="nav" className="absolute w-full bg-[var(--background)]">
      <div className={`mx-auto max-w-7xl px-2 sm:px-6 lg:px-8`}>
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <p className='text-[var(--mainColor)] text-sm md:text-xl font-semibold italic cursor-pointer hover:text-[var(--mainColorHover)]'>Slotflow</p>
            </div>
            <div className="hidden sm:ml-6 sm:block">
             
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className="rounded-md px-3 py-2 text-sm font-medium text-[var(--textOne)] hover:text-[var(--textOneHover)]" 
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
            
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div className='flex'>
                <MenuButton className="relative flex rounded-full cursor-pointer">
                  <svg className="w-7 h-7 text-[var(--mainColor)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                  </svg>   
                </MenuButton>
                {themeMode? 
                  <div className="relative flex rounded-full cursor-pointer mx-3" onClick={changeTheme}>
                    <svg className="w-7 h-7 text-[var(--mainColor)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
                    </svg>
                  </div>
                : 
                  <div className="relative flex rounded-full cursor-pointer mx-3" onClick={changeTheme}>
                    <svg className="w-7 h-7 text-[var(--mainColor)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z"/>
                    </svg>
                  </div>
                }
              </div>
              <MenuItems
                transition
                className="absolute bg-[var(--menuBg)] right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
               
               <MenuItem>
                  <a
                    onClick={handleSignout}
                    className="block px-4 py-2 text-sm cursor-pointer text-[var(--textOne)] hover:text-[var(--textOneHover)] hover:bg-[var(--menuItemHoverBg)]" 
                  >
                    Sign Out
                  </a>
                </MenuItem>
                <>
               <MenuItem>
                  <a
                    onClick={() => {
                      dispatch(changeAdmin(false));
                      dispatch(setLoginForm(true));
                      dispatch(setVerifyOtpForm(false));
                      dispatch(setVerifyEmailForm(false));
                      dispatch(setSignUpForm(false));
                      dispatch(setAdminForm(false));
                      dispatch(setChangePassword(false));
                      dispatch(setChangePasswordForm(false));
                    }}
                    className="block px-4 py-2 text-sm cursor-pointer text-[var(--textOne)] hover:text-[var(--textOneHover)] hover:bg-[var(--menuItemHoverBg)]" 
                    >
                    Sign In
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    onClick={() => {
                      dispatch(changeAdmin(false));
                      dispatch(setSignUpForm(true));
                      dispatch(setLoginForm(false));
                      dispatch(setVerifyOtpForm(false));
                      dispatch(setVerifyEmailForm(false));
                      dispatch(setAdminForm(false));
                      dispatch(setChangePassword(false));
                      dispatch(setChangePasswordForm(false));
                    }}
                    className="block px-4 py-2 text-sm cursor-pointer text-[var(--textOne)] hover:text-[var(--textOneHover)] hover:bg-[var(--menuItemHoverBg)]"
                    >
                    Sign Up
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    onClick={() => {
                      dispatch(changeAdmin(true));
                      dispatch(changeUser(false));
                      dispatch(changeProvider(false));
                      dispatch(setAdminForm(true));
                      dispatch(setLoginForm(false));
                      dispatch(setVerifyOtpForm(false));
                      dispatch(setVerifyEmailForm(false));
                      dispatch(setSignUpForm(false));
                      dispatch(setChangePassword(false));
                      dispatch(setChangePasswordForm(false));
                    }}
                    className="block px-4 py-2 cursor-pointer text-[var(--textOne)] hover:text-[var(--textOneHover)] hover:bg-[var(--menuItemHoverBg)]"
                    >
                      Admin
                  </a>
                </MenuItem>
                    </>
                
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className="item.current ? 'bg-[var(--menuItemHoverBg)] text-[var(--textOne)]' : 'text-[var(--textOne)] hover:bg-[var(--menuItemHoverBg)] hover:text-[var(--textOneHover)] block rounded-md px-3 py-2 text-base font-medium"
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default Header