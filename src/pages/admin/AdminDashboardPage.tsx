import { Users } from "lucide-react";
import CardOne from "@/components/admin/CardOne";
import BarChartUi from "@/components/common/chart/BarChartUi";
import SpreadChart from "@/components/common/chart/SpreadChart";

const AdminDashboardPage = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <CardOne title="Current Traffic" value={128} icon={Users} />
        <CardOne title="Current Traffic" value={128} icon={Users} />
        <CardOne title="Current Traffic" value={128} icon={Users} />
        <CardOne title="Current Traffic" value={128} icon={Users} />
        <CardOne title="Current Traffic" value={128} icon={Users} />
        <CardOne title="Current Traffic" value={128} icon={Users} />
        <CardOne title="Current Traffic" value={128} icon={Users} />
        <CardOne title="Current Traffic" value={128} icon={Users} />
        <CardOne title="Current Traffic" value={128} icon={Users} />
        <CardOne title="Current Traffic" value={128} icon={Users} />
        <CardOne title="Current Traffic" value={128} icon={Users} />
        <CardOne title="Current Traffic" value={128} icon={Users} />
        <CardOne title="Current Traffic" value={128} icon={Users} />
      </div>
      <BarChartUi />
      <SpreadChart />
    </>
  )
}

export default AdminDashboardPage