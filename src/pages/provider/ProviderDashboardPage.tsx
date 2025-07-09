import React from 'react';
import {
  CalendarCheck,
  CheckCircle,
  XCircle,
  Clock,
  Banknote,
  TrendingUp,
  Wallet,
  Hourglass,
  Users,
} from 'lucide-react';
import CardOne from '@/components/admin/CardOne';
import BarChartUi from '@/components/common/chart/BarChartUi';
import SpreadChart from '@/components/common/chart/SpreadChart';

const BarChartData = [
  { date: "2025-07-01", success: 12, fail: 3 },
  { date: "2025-07-02", success: 15, fail: 2 },
  { date: "2025-07-03", success: 10, fail: 4 },
  { date: "2025-07-04", success: 20, fail: 1 },
  { date: "2025-07-05", success: 18, fail: 5 },
  { date: "2025-07-06", success: 17, fail: 2 },
  { date: "2025-07-07", success: 22, fail: 0 },
];

const SpreadChartData = [
  { date: "2025-04-01", online: 222, offline: 150 },
  { date: "2025-04-02", online: 97, offline: 180 },
  { date: "2025-04-03", online: 167, offline: 120 },
  { date: "2025-04-04", online: 242, offline: 260 },
  { date: "2025-04-05", online: 373, offline: 290 },
  { date: "2025-04-06", online: 301, offline: 340 },
  { date: "2025-04-07", online: 245, offline: 180 },
  { date: "2025-04-08", online: 409, offline: 320 },
  { date: "2025-04-09", online: 59, offline: 110 },
  { date: "2025-04-10", online: 261, offline: 190 },
  { date: "2025-04-11", online: 327, offline: 350 },
  { date: "2025-04-12", online: 292, offline: 210 },
  { date: "2025-04-13", online: 342, offline: 380 },
  { date: "2025-04-14", online: 137, offline: 220 },
  { date: "2025-04-15", online: 120, offline: 170 },
  { date: "2025-04-16", online: 138, offline: 190 },
  { date: "2025-04-17", online: 446, offline: 360 },
  { date: "2025-04-18", online: 364, offline: 410 },
  { date: "2025-04-19", online: 243, offline: 180 },
  { date: "2025-04-20", online: 89, offline: 150 },
  { date: "2025-04-21", online: 137, offline: 200 },
  { date: "2025-04-22", online: 224, offline: 170 },
  { date: "2025-04-23", online: 138, offline: 230 },
  { date: "2025-04-24", online: 387, offline: 290 },
  { date: "2025-04-25", online: 215, offline: 250 },
  { date: "2025-04-26", online: 75, offline: 130 },
  { date: "2025-04-27", online: 383, offline: 420 },
  { date: "2025-04-28", online: 122, offline: 180 },
  { date: "2025-04-29", online: 315, offline: 240 },
  { date: "2025-04-30", online: 454, offline: 380 },
  { date: "2025-05-01", online: 165, offline: 220 },
  { date: "2025-05-02", online: 293, offline: 310 },
  { date: "2025-05-03", online: 247, offline: 190 },
  { date: "2025-05-04", online: 385, offline: 420 },
  { date: "2025-05-05", online: 481, offline: 390 },
  { date: "2025-05-06", online: 498, offline: 520 },
  { date: "2025-05-07", online: 388, offline: 300 },
  { date: "2025-05-08", online: 149, offline: 210 },
  { date: "2025-05-09", online: 227, offline: 180 },
  { date: "2025-05-10", online: 293, offline: 330 },
  { date: "2025-05-11", online: 335, offline: 270 },
  { date: "2025-05-12", online: 197, offline: 240 },
  { date: "2025-05-13", online: 197, offline: 160 },
  { date: "2025-05-14", online: 448, offline: 490 },
  { date: "2025-05-15", online: 473, offline: 380 },
  { date: "2025-05-16", online: 338, offline: 400 },
  { date: "2025-05-17", online: 499, offline: 420 },
  { date: "2025-05-18", online: 315, offline: 350 },
  { date: "2025-05-19", online: 235, offline: 180 },
  { date: "2025-05-20", online: 177, offline: 230 },
  { date: "2025-05-21", online: 82, offline: 140 },
  { date: "2025-05-22", online: 81, offline: 120 },
  { date: "2025-05-23", online: 252, offline: 290 },
  { date: "2025-05-24", online: 294, offline: 220 },
  { date: "2025-05-25", online: 201, offline: 250 },
  { date: "2025-05-26", online: 213, offline: 170 },
  { date: "2025-05-27", online: 420, offline: 460 },
  { date: "2025-05-28", online: 233, offline: 190 },
  { date: "2025-05-29", online: 78, offline: 130 },
  { date: "2025-05-30", online: 340, offline: 280 },
  { date: "2025-05-31", online: 178, offline: 230 },
  { date: "2025-06-01", online: 178, offline: 200 },
  { date: "2025-06-02", online: 470, offline: 410 },
  { date: "2025-06-03", online: 103, offline: 160 },
  { date: "2025-06-04", online: 439, offline: 380 },
  { date: "2025-06-05", online: 88, offline: 140 },
  { date: "2025-06-06", online: 294, offline: 250 },
  { date: "2025-06-07", online: 323, offline: 370 },
  { date: "2025-06-08", online: 385, offline: 320 },
  { date: "2025-06-09", online: 438, offline: 480 },
  { date: "2025-06-10", online: 155, offline: 200 },
  { date: "2025-06-11", online: 92, offline: 150 },
  { date: "2025-06-12", online: 492, offline: 420 },
  { date: "2025-06-13", online: 81, offline: 130 },
  { date: "2025-06-14", online: 426, offline: 380 },
  { date: "2025-06-15", online: 307, offline: 350 },
  { date: "2025-06-16", online: 371, offline: 310 },
  { date: "2025-06-17", online: 475, offline: 520 },
  { date: "2025-06-18", online: 107, offline: 170 },
  { date: "2025-06-19", online: 341, offline: 290 },
  { date: "2025-06-20", online: 408, offline: 450 },
  { date: "2025-06-21", online: 169, offline: 210 },
  { date: "2025-06-22", online: 317, offline: 270 },
  { date: "2025-06-23", online: 480, offline: 530 },
  { date: "2025-06-24", online: 132, offline: 180 },
  { date: "2025-06-25", online: 141, offline: 190 },
  { date: "2025-06-26", online: 434, offline: 380 },
  { date: "2025-06-27", online: 448, offline: 490 },
  { date: "2025-06-28", online: 149, offline: 200 },
  { date: "2025-06-29", online: 103, offline: 160 },
  { date: "2025-06-30", online: 446, offline: 400 },
  { date: "2025-07-01", online: 178, offline: 200 },
  { date: "2025-07-02", online: 470, offline: 410 },
  { date: "2025-07-03", online: 103, offline: 160 },
  { date: "2025-07-04", online: 439, offline: 380 },
  { date: "2025-07-05", online: 88, offline: 140 },
  { date: "2025-07-06", online: 294, offline: 250 },
  { date: "2025-07-07", online: 323, offline: 370 },
  { date: "2025-07-08", online: 385, offline: 320 },
]

const ProviderDashboardPage: React.FC = () => {

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <CardOne title="Total Appointments" value={128} icon={CalendarCheck} />
        <CardOne title="Completed Appointments" value={92} icon={CheckCircle} />
        <CardOne title="Missed Appointments" value={36} icon={XCircle} />
        <CardOne title="Today’s Appointments" value={12} icon={Clock} />
        <CardOne title="Total Earnings" value={12800} icon={Banknote} price />
        <CardOne title="Today’s Earnings" value={1500000} icon={TrendingUp} price />
        <CardOne title="Total Payouts Made" value={10000} icon={Wallet} price />
        <CardOne title="Pending Payout" value={2800} icon={Hourglass} price />
        <CardOne title="Total Served Users" value={520} icon={Users} />
      </div>
      <BarChartUi title="Appintments Data Graph" description="Appointments Success rates data graph" chartData={BarChartData} barOneDataKey='success' barTwoDataKey='fail' />
      <SpreadChart title="Appoints Data Graph" description="Appoints on online and offline" chartData={SpreadChartData} areaOneDataKey="online" areaTwoDataKey="offline" />
    </>
  )
}

export default ProviderDashboardPage