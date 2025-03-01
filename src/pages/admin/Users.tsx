import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "@/components/table/data-table";
import { getAllUsers } from "../../utils/redux/adminHanlder";
import { AppDispatch, RootState } from "../../utils/redux/appStore";
import { userOrProvidercolumns } from "@/components/table/columns";

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((store: RootState) => store.admin?.users);
  const [ listLoading, setListLoading ] = useState(true as boolean);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if(users) setListLoading(false);
  }, [users]);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Users</h2>
      {listLoading ? <p>Loading</p> :
      <DataTable columns={userOrProvidercolumns} data={users} />
      }
    </>
  );
};

export default Users;
