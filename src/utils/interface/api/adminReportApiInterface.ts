import { FetchFunctionParams } from "../commonInterface";
import { Payment } from "../entityInterface/paymentInterface";

// Admin fetch revenue report request
export interface AdmminFetchRevenueReportRequest extends FetchFunctionParams {
    startDate?: Date;
    endDate?: Date;
}
// Admin fetch revenue report response
export type AdminFetchRevenueReportRow = Pick<
  Payment,
  | "createdAt"
  | "discountAmount"
  | "initialAmount"
  | "totalAmount"
  | "paymentGateway"
  | "paymentMethod"
  | "paymentStatus"
  | "paymentFor"
>;

export interface AdminFetchRevenueReportResponse {
  data : {
    rows: AdminFetchRevenueReportRow[];
    grandTotal: number;
    grandDiscount: number;
    grandInitalAmount: number;
  }
  totalPages: number;
  currentPage: number;
  totalCount: number;
}





// import { format } from 'date-fns';
// import { DateRange } from 'react-day-picker';
// import { Button } from '@/components/ui/button';
// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { Calendar } from '@/components/ui/calendar';
// import { Calendar as CalendarIcon } from 'lucide-react';
// import { DataTable } from '@/components/table/data-table';
// import TableShimmer from '@/components/shimmers/TableShimmer';
// import { OnChangeFn, PaginationState } from '@tanstack/react-table';
// import DataFetchingError from '@/components/common/DataFetchingError';
// import { adminFetchRevenueReport } from '@/utils/apis/adminReport.api';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { AdminRevenueTableColumn } from '@/components/table/tableColumns/AdminRevenueTableColumn';
// import { AdminFetchRevenueReportRow } from '@/utils/interface/api/adminReportApiInterface';

// const AdminRevenueReport: React.FC = () => {
//   const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

//   const [pagination, setPagination] = useState<PaginationState>({
//     pageIndex: 0,
//     pageSize: 10,
//   });

//   const handlePaginationChange: OnChangeFn<PaginationState> = (updaterOrValue) => {
//     setPagination(updaterOrValue);
//   };

//   const { data, isLoading, isError, error, refetch } = useQuery({
//     queryFn: () =>
//       adminFetchRevenueReport({
//         startDate: dateRange?.from,
//         endDate: dateRange?.to,
//         pagination: {
//           page: pagination.pageIndex + 1,
//           limit: pagination.pageSize,
//         },
//       }),
//     queryKey: ["revenue", dateRange?.from, dateRange?.to, pagination.pageIndex, pagination.pageSize],
//     staleTime: 60 * 60 * 1000,
//     refetchOnWindowFocus: false,
//   });

//   const column = AdminRevenueTableColumn();

//   const handleExportPDF = () => {
//     console.log("Generate PDF for revenue report", data?.rows);
//   };

//   const handleExportSpreadsheet = () => {
//     console.log("Generate Spreadsheet for revenue report", data?.rows);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Revenue Report</h2>

//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//         <Popover>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               className="w-full md:w-auto justify-start text-left font-normal cursor-pointer"
//             >
//               <CalendarIcon className="mr-2 h-4 w-4" />
//               {dateRange?.from && dateRange?.to ? (
//                 <>
//                   {format(dateRange.from, "MMM dd, yyyy")} - {format(dateRange.to, "MMM dd, yyyy")}
//                 </>
//               ) : (
//                 <span>Select Date Range</span>
//               )}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto p-0" align="start">
//             <Calendar
//               mode="range"
//               selected={dateRange}
//               onSelect={setDateRange}
//               numberOfMonths={2}
//             />
//           </PopoverContent>
//         </Popover>

//         <div className="flex gap-2">
//           <Button className="cursor-pointer" onClick={() => refetch()}>
//             Reset / Apply Filter
//           </Button>
//           <Button className="cursor-pointer" variant="outline" onClick={handleExportPDF}>
//             Export PDF
//           </Button>
//           <Button className="cursor-pointer" variant="outline" onClick={handleExportSpreadsheet}>
//             Export Spreadsheet
//           </Button>
//         </div>
//       </div>

//       {isLoading ? (
//         <TableShimmer columnsCount={8} />
//       ) : data? (
//         <>
//           <DataTable
//             columns={column}
//             data={data.rows as AdminFetchRevenueReportRow[]} // <-- pass rows here
//             pageCount={data.totalPages}
//             pagination={pagination}
//             onPaginationChange={handlePaginationChange}
//           />

//           <div className="flex justify-end mt-4">
//             <p className="text-lg font-bold">
//               Grand Total: {data?.grandTotal || 0}
//             </p>
//           </div>
//         </>
//       ) : isError && error ? (
//         <DataFetchingError message={(error as Error).message} className="min-h-full" />
//       ) : (
//         <DataFetchingError message={"No revenue found in database"} className="min-h-full" />
//       )}
//     </div>
//   );
// };

// export default AdminRevenueReport;
