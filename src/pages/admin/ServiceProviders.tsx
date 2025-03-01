import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "@/components/table/data-table";
import ShimmerTable from "@/components/shimmers/ShimmerTable";
import { getAllProviders } from "../../utils/redux/adminHanlder";
import { userOrProvidercolumns } from "@/components/table/columns";
import ShimmerTableTop from "@/components/shimmers/ShimmerTableTop";
import { AppDispatch, RootState } from "../../utils/redux/appStore";

const ServiceProviders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { serviceProviders } = useSelector((store: RootState) => store.admin);
  const [listLoading, setListLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllProviders());
  }, [dispatch]);

  useEffect(() => {
    if (serviceProviders) {
      setListLoading(false);
    }
  }, [serviceProviders]);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Service Providers</h2>
      {listLoading ?
        <>
          <ShimmerTableTop />
          <ShimmerTable />
        </>
        :
        <DataTable columns={userOrProvidercolumns} data={serviceProviders} />
      }
    </>
  );
};

export default ServiceProviders;
