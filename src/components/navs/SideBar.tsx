import { RootState } from "@/utils/redux/appStore";
import { Route } from "@/utils/types";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

interface SideBarProps {
  routes: Route[];
}

const SideBar = ({ routes }: SideBarProps) => {

  const sidebarOpen = useSelector((store: RootState) => store.state.sidebarOpen);

  return (
    <div className={` ${sidebarOpen ? 'w-[16%]' : 'w-[6%]'} h-full bg-[var(--background)] shadow-[5px_0_0_0_rgba(0,0,0,0.2)] p-4 overflow-y-scroll transition-all duration-400`}>
      <ul className="space-y-4">
        {routes.map((route) => (
          <NavLink key={route.path} to={route.path}>
            <li className="p-3 text-[var(--textTwo)] font-semibold hover:bg-[var(--menuItemHoverBg)] cursor-pointer rounded-md">
              {route.name}
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  )
}

export default SideBar