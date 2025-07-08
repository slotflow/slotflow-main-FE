import React from 'react';
import { Activity, LucideIcon } from 'lucide-react';

interface DashboardCardOneInterface {
  title: string;
  value: number;
  icon: LucideIcon;
}

const CardOne: React.FC<DashboardCardOneInterface> = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-[var(--menuBg)] text-[var(--textTwo)] rounded-2xl shadow-md p-4 flex items-center justify-between transition hover:shadow-lg">
      <div>
        <h4 className="text-sm font-medium">{title}</h4>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      <div className="bg-[var(--mainColor)] p-3 rounded-full">
        {Icon ? <Icon size={24} /> : <Activity size={24} />}
      </div>
    </div>
  )
}

export default CardOne
