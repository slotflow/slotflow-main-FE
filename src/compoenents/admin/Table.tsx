import React from "react"

interface User {
    username: string;
    profileImage: string | null;
    createdAt: string;
}

interface TableProps {
    data: User[];
}

const Table: React.FC<TableProps> = React.memo(({ data }) => {
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-700 text-white">
                    <th className="p-3 text-left">Sl No</th>
                    <th className="p-3 text-left">Username</th>
                    <th className="p-3 text-left">Profile Image</th>
                    <th className="p-3 text-left">Joined On</th>
                    <th className="p-3 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data && data.length > 0 ? (
                    data.map((user, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100">
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3">{user?.username || "N/A"}</td>
                            <td className="p-3">
                                <img src={user?.profileImage ?? "https://cdn-icons-png.flaticon.com/512/8847/8847419.png"}
                                    alt="Profile" className="w-10 h-10 rounded-full" />
                            </td>
                            <td className="p-3">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</td>
                            <td className="p-3 text-center">
                                more
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={7} className="text-center p-3">
                            No data available
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
})

export default Table