import { Route } from "@/utils/types";
import { NavLink } from "react-router-dom"

interface SideBarProps {
  routes: Route[];
}

const SideBar = ({ routes }: SideBarProps) => {
  return (
    <div className="w-[16%] h-full bg-[var(--background)] shadow-[5px_0_0_0_rgba(0,0,0,0.2)] p-4 overflow-y-scroll">
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