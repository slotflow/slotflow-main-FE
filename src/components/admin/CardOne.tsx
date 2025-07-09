import React from 'react';
import { Activity, LucideIcon } from 'lucide-react';
import { formatPrice } from '@/utils/helper/priceFormatter';

interface DashboardCardOneInterface {
  title: string;
  value: number | string;
  icon: LucideIcon;
  price?: boolean
}

const CardOne: React.FC<DashboardCardOneInterface> = ({ title, value, icon: Icon, price }) => {
  return (
    <div className="bg-[var(--menuBg)] text-[var(--textTwo)] rounded-2xl shadow-md p-4 flex items-center justify-between transition hover:shadow-lg">
      <div>
        <h4 className="text-sm md:text-[16px]">{title}</h4>
        <h3 className="text-xl font-bold mt-2">{price ?  formatPrice(value as number) : value}</h3>
      </div>
      <div className="bg-[var(--mainColor)] p-3 rounded-full">
        {Icon ? <Icon size={24} className="text-white" /> : <Activity size={24} />}
      </div>
    </div>
  )
}

export default CardOne
