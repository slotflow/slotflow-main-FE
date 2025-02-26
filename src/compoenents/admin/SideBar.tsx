import { NavLink } from "react-router-dom"

const SideBar = () => {
    return (
        <div className="w-[20%] min-h-screen bg-gray-500 shadow-md p-4">
            <ul className="space-y-4 pt-20">
                <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "text-yellow-400" : ""}>
                    <li className="p-3 text-white font-semibold hover:bg-gray-700 cursor-pointer rounded-md">
                        Dashboard
                    </li>
                </NavLink>
                <NavLink to="/admin/service-providers" className={({ isActive }) => isActive ? "text-yellow-400" : ""}>
                    <li className="p-3 text-white font-semibold hover:bg-gray-700 cursor-pointer rounded-md">
                        Service Providers
                    </li>
                </NavLink>
                <NavLink to="/admin/users" className={({ isActive }) => isActive ? "text-yellow-400" : ""}>
                    <li className="p-3 text-white font-semibold hover:bg-gray-700 cursor-pointer rounded-md">
                        Users
                    </li>
                </NavLink>
                <NavLink to="/admin/settings" className={({ isActive }) => isActive ? "text-yellow-400" : ""}>
                    <li className="p-3 text-white font-semibold hover:bg-gray-700 cursor-pointer rounded-md">
                        Settings
                    </li>
                </NavLink>
            </ul>
        </div>
    )
}

export default SideBar