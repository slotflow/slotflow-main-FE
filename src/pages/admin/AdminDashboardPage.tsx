import DashboardStats from "@/components/common/dashboard/DashboardStats"
import { adminFetchDashboardUserStatsData } from "@/utils/apis/adminDashboard.api"
import { userStatsMapForAdmin } from "@/utils/constants"
import { AdminFetchDashboardUserStatsDataResponse } from "@/utils/interface/api/adminDashboardApiInterface"

const AdminDashboardPage = () => {
  return (
    <div className="pb-4">
      <DashboardStats<AdminFetchDashboardUserStatsDataResponse>
        queryFunction={adminFetchDashboardUserStatsData}
        queryKey="dashboardUserStats"
        statsMap={userStatsMapForAdmin}
        shimmerCount={3}
      />
    </div>
  )
}

export default AdminDashboardPage