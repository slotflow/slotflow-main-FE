import React, { useState } from "react";
import AdminDashboardStats from "@/components/admin/AdminDashboardStats"

const AdminDashboardPage: React.FC = () => {

  const [tab, setTab] = useState<number>(0);

  return (
    <div className="p-2">
      <div className='w-full space-x-4'>
        <button className="bg-[var(--menuItemHoverBg)] rounded-lg px-3 py-1 cursor-pointer " onClick={() => setTab(0)}>Stats</button>
        <button className="bg-[var(--menuItemHoverBg)] rounded-lg px-3 py-1 cursor-pointer " onClick={() => setTab(1)}>Graphs</button>
      </div>
      {tab === 0 && <AdminDashboardStats />}
    </div>
  )
}

export default AdminDashboardPage;