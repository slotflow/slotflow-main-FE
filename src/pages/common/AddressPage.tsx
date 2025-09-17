import React from 'react';
import { toast } from "react-toastify";
import { FormEvent, useState } from "react";
import { RootState } from "@/utils/redux/appStore";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { AppDispatch } from "recharts/types/state/store";
import CommonButton from "@/components/common/CommonButton";
import { setAuthUser } from "@/utils/redux/slices/authSlice";
import ProfileHead from "@/components/common/profile/ProfileHead";
import AddAddress, { AddressFormProps } from "@/components/common/AddAddress";
import { UpdateAddressResponse } from '@/utils/interface/api/commonApiInterface';
import { UserAddUserAddressResponse } from '@/utils/interface/api/userApiInterface';
import UserOrProviderAddressDetails from "@/components/common/profile/UserOrProviderAddressDetails";
import { userAddUserAddress, userFetchUserAddress, userUpdateUserAddress } from "@/utils/apis/user.api";
import { providerFetchProviderAddress, providerUpdateProviderAddress } from "@/utils/apis/provider.api";

const AddressPage: React.FC = () => {

  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const { authUser } = useSelector((state: RootState) => state.auth);
  const [hasErrors, setHasErrors] = useState<boolean>(false);
  const [addAddress, setAddAddress] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);


  const handleAAddAddress = async (e: FormEvent<HTMLFormElement>, formData: AddressFormProps) => {

    e.preventDefault();
    if (hasErrors) {
      toast.error("Please fix the form errors.");
      return;
    }
    try {
      setLoading(true);
      let res: UserAddUserAddressResponse | UpdateAddressResponse;

      if (authUser?.role === "USER") {
        if (isUpdating) {
          res = await userUpdateUserAddress(formData);
        } else {
          res = await userAddUserAddress(formData);
        }
      } else if (authUser?.role === "PROVIDER") {
        res = await providerUpdateProviderAddress(formData);
      } else {
        throw new Error("Unknown role");
      }
      if (res.success) {
        toast.success(res.message);
        queryClient.setQueryData(["userAddress"], res.data);
        setAddAddress(false);
        if (authUser) {
          dispatch(setAuthUser({
            ...authUser,
            isAddressAdded: true,
          }));
        }
      }
    } catch {
      toast.error("Address updating failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-full p-2 flex flex-col">

      <ProfileHead
        updation={false} 
        showDetails
        />

      {addAddress ? (
        <AddAddress
          onSubmit={handleAAddAddress}
          formClassNames={"my-4 border rounded-lg py-6"}
          headingSize={"xs:text-md md:text-xl"}
          heading={"Address Form"}
          buttonText={"Submit"}
          setHasErrors={setHasErrors}
        />
      ) : (
        <UserOrProviderAddressDetails
          fetchApiFunction={
            authUser?.role === "USER" ?
              userFetchUserAddress
              : providerFetchProviderAddress
          }
          queryKey="userAddress"
          setLoading={setLoading}
          setIsUpdating={setIsUpdating}
        />
      )}

      {!loading && (
        <CommonButton
          onClick={() => setAddAddress(!addAddress)}
          text={addAddress
            ? "Close"
            : authUser?.isAddressAdded
              ? "Edit Address"
              : "Add Address"
          }
          className="w-2/12 mt-6"
        />
      )}
    </div>
  )
}

export default AddressPage