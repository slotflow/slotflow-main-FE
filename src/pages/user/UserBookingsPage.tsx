import { useQuery } from "@tanstack/react-query";
import { userFetchBookings } from "@/utils/apis/user.api";
// import { DataTable } from "@/components/table/data-table";
import ShimmerTable from "@/components/shimmers/ShimmerTable";
import ShimmerTableTop from "@/components/shimmers/ShimmerTableTop";
import DataFetchingError from "@/components/common/DataFetchingError";

const UserBookingsPage = () => {
 const { data, isLoading, isError, error } = useQuery({
         queryKey: ["subscriptions"],
         queryFn: () => userFetchBookings(),
     });
 
     return (
         <div className="p-6">
             <h2 className="text-2xl font-bold mb-4">Your Subscription History</h2>
             {isError ? (
                 <DataFetchingError message={(error as Error).message} />
             ) : isLoading ? (
                 <>
                     <ShimmerTableTop />
                     <ShimmerTable />
                 </>
             ) : data ? (
                //  <DataTable columns={} data={} />
                <>
                     <ShimmerTableTop />
                     <ShimmerTable />
                 </>
             ) : (
                 <DataFetchingError message="No data found" />
             )}
         </div>
     );
}

export default UserBookingsPage