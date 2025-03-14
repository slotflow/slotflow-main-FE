import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/utils/redux/slices/stateSlice';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { AppDispatch, RootState } from '../../utils/redux/appStore';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu } from '@headlessui/react';
import { greetings } from '@/utils/helper';

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

  return (
    <Disclosure as="nav" className={`w-full bg-[var(--background)] border-b-2 border-[var(--boxBorder)]} fixed`}>
      <div className={`mx-auto px-2 sm:px-6 lg:px-8`}>
        <div className="   flex h-16 items-center justify-between">

          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

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
                <h2 className="text-lg font-semibold">
                  {greetingString} {user?.username ? user.username : 'User'}
                </h2>
              </div>
            </div>
          )}

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative ml-3">
              <div className='flex'>
                {themeMode ?
                  <div className="relative flex rounded-full cursor-pointer mx-3" onClick={changeTheme}>
                    <svg className="w-7 h-7 text-[var(--mainColor)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                    </svg>
                  </div>
                  :
                  <div className="relative flex rounded-full cursor-pointer mx-3" onClick={changeTheme}>
                    <svg className="w-7 h-7 text-[var(--mainColor)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z" />
                    </svg>
                  </div>
                }
              </div>
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