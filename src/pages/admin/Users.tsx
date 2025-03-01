import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../utils/redux/adminHanlder";
import { AppDispatch } from "../../utils/redux/appStore";

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Users</h2>
      
    </>
  );
};

export default Users;
