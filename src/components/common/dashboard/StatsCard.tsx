import React from 'react';
import { Activity, LockIcon, LucideIcon } from 'lucide-react';
import { formatNumberToPrice } from '@/utils/helper/formatter';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/redux/appStore';

interface DashboardCardOneInterface {
  title: string;
  value: number | string;
  icon: LucideIcon;
  price?: boolean;
  isShow?: boolean; // Controlling visibility using plan
  isAccess?: boolean; // controlling visibility using plan
}

const StatsCard: React.FC<DashboardCardOneInterface> = ({ title, value, icon: Icon, price, isShow, isAccess }) => {

  const themeMode = useSelector((store: RootState) => store.state.lightTheme);

  return isAccess ? (
    <div className="relative bg-[var(--menuBg)] text-[var(--textTwo)] rounded-2xl shadow-md p-4 flex items-center justify-between transition hover:shadow-lg overflow-hidden">
      <div>
        <h4 className="text-sm md:text-[16px]">{title}</h4>
        <h3 className="text-xl font-bold mt-2">
          {price ? formatNumberToPrice(value as number) : value}
        </h3>
      </div>
      <div className="bg-[var(--mainColor)] p-3 rounded-full">
        {Icon ? <Icon size={24} className="text-white" /> : <Activity size={24} />}
      </div>

      {!isShow && (
        <div className={`absolute inset-0 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl ${themeMode ? "bg-white/70" : "bg-black/70"}`}>
          <div className="text-center">
            <LockIcon className="mx-auto mb-2" size={20} />
            <span className="text-sm font-medium">No Access</span>
          </div>
        </div>
      )}
    </div>
  ) : null
}

export default StatsCard;
