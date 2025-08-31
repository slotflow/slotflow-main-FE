import React, { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { navigation } from '@/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/logos/logo-transparent.png';
import { toggleTheme } from '@/utils/redux/slices/stateSlice';
import { AppDispatch, RootState } from '../../utils/redux/appStore';

const Header: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();

  const themeMode: boolean = useSelector((store: RootState) => store.state.lightTheme);

  const changeTheme = (): void => {
    dispatch(toggleTheme());
  }

  useEffect(() => {
    if (themeMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [themeMode]);

  return (
    <nav className={`w-full bg-[var(--background)] fixed transition-colors duration-300 ease-in-out z-50`}>
      <div className={`max-w-7xl mx-auto flex h-16 items-center justify-between`}>

        <div className='w-3/12 flex items-center'>
          <div className='flex items-center justify-center'>
            <img src={logo} className='size-8' />
          </div>
          <h4 className="ml-2 text-[var(--mainColor)] text-3xl font-bold italic hover:text-white px-2 rounded-lg cursor-pointer">Slotflow</h4>
        </div>

        <div className='w-6/12'>
          <div className="flex flex-1 items-center justify-center">
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
        </div>

        <div className='w-3/12 flex justify-end'>
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

      {/* <div className="sm:hidden">
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
      </div> */}

    </nav>
  )
}

export default Header