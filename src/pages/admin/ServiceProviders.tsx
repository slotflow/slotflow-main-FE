import { useEffect } from "react";
import Table from "../../compoenents/admin/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllProviders } from "../../utils/redux/adminHanlder";
import { AppDispatch, RootState } from "../../utils/redux/appStore";

const ServiceProviders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const providers = useSelector((store: RootState) => store.admin?.serviceProviders);

  useEffect(() => {
    dispatch(getAllProviders());
  }, [dispatch]);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Service Providers</h2>
      {providers.length > 0 ? <Table data={providers} /> : <p>No providers found.</p>}
    </>
  );
};

export default ServiceProviders;
