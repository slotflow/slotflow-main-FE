import { NavLink } from "react-router-dom"

const SideBar = () => {
   
    return (
        <div className="w-[16%] h-full bg-[var(--background)] shadow-[5px_0_0_0_rgba(0,0,0,0.2)] p-4 overflow-y-scroll">
            <ul className="space-y-4">
                <NavLink to="/admin/dashboard">
                    <li className="p-3 text-[var(--textTwo)] font-semibold hover:bg-[var(--menuItemHoverBg)] cursor-pointer rounded-md">
                        Dashboard
                    </li>
                </NavLink>
                <NavLink to="/admin/service-providers">
                    <li className="p-3 text-[var(--textTwo)] font-semibold hover:bg-[var(--menuItemHoverBg)] cursor-pointer rounded-md">
                        Service Providers
                    </li>
                </NavLink>
                <NavLink to="/admin/users">
                    <li className="p-3 text-[var(--textTwo)] font-semibold hover:bg-[var(--menuItemHoverBg)] cursor-pointer rounded-md">
                        Users
                    </li>
                </NavLink>
                <NavLink to="/admin/services">
                    <li className="p-3 text-[var(--textTwo)] font-semibold hover:bg-[var(--menuItemHoverBg)] cursor-pointer rounded-md">
                        Services
                    </li>
                </NavLink>
                <NavLink to="/admin/services">
                    <li className="p-3 text-[var(--textTwo)] font-semibold hover:bg-[var(--menuItemHoverBg)] cursor-pointer rounded-md">
                        Plans
                    </li>
                </NavLink>
                <NavLink to="/admin/services">
                    <li className="p-3 text-[var(--textTwo)] font-semibold hover:bg-[var(--menuItemHoverBg)] cursor-pointer rounded-md">
                        Subscriptions
                    </li>
                </NavLink>
                <NavLink to="/admin/services">
                    <li className="p-3 text-[var(--textTwo)] font-semibold hover:bg-[var(--menuItemHoverBg)] cursor-pointer rounded-md">
                        Reviews
                    </li>
                </NavLink>
                <NavLink to="/admin/settings">
                    <li className="p-3 text-[var(--textTwo)] font-semibold hover:bg-[var(--menuItemHoverBg)] cursor-pointer rounded-md">
                        Settings
                    </li>
                </NavLink>
            </ul>
        </div>
    )
}

export default SideBar