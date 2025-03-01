import { useEffect, useState } from "react";
import { userOrProvidercolumns } from "@/components/table/columns";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "@/components/table/data-table";
import { getAllProviders } from "../../utils/redux/adminHanlder";
import { AppDispatch, RootState } from "../../utils/redux/appStore";

const ServiceProviders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { serviceProviders } = useSelector((store: RootState) => store.admin);
  const [ listLoading, setListLoading ] = useState(true as boolean);

  useEffect(() => {
    dispatch(getAllProviders());
    if(serviceProviders){
      setListLoading(false)
    }
  }, [dispatch, serviceProviders]);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Service Providers</h2>
      {listLoading ? <p>Loading</p> : 
      <DataTable columns={userOrProvidercolumns} data={serviceProviders} />
      }
    </>
  );
};

export default ServiceProviders;
