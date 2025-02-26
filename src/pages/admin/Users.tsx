import { useEffect } from "react";
import Table from "../../compoenents/admin/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../utils/redux/adminHanlder";
import { AppDispatch, RootState } from "../../utils/redux/appStore";

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((store: RootState) => store.admin?.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Users</h2>
      {users.length > 0 ? <Table data={users} /> : <p>No users found.</p>}
    </>
  );
};

export default Users;
