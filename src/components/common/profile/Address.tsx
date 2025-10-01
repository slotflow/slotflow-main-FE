import React from 'react';
import { toast } from "react-toastify";
import { FormEvent, useState } from "react";
import { Button } from '@/components/ui/button';
import { RootState } from "@/utils/redux/appStore";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { AppDispatch } from "recharts/types/state/store";
import { Edit, MapPinHouse, Plus, X } from 'lucide-react';
import { setAuthUser } from "@/utils/redux/slices/authSlice";
import AddressListing from "@/components/common/profile/AddressListing";
import AddAddress, { AddressFormProps } from "@/components/common/AddAddress";
import { UpdateAddressResponse } from '@/utils/interface/api/commonApiInterface';
import { UserAddUserAddressResponse } from '@/utils/interface/api/userApiInterface';
import { userAddUserAddress, userFetchUserAddress, userUpdateUserAddress } from "@/utils/apis/user.api";
import { providerFetchProviderAddress, providerUpdateProviderAddress } from "@/utils/apis/provider.api";

const Address: React.FC = () => {

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
    <div className="min-h-full flex flex-col">

      <div className='border rounded-md my-2 p-2'>
        <div className='flex justify-between items-center'>
          <div className='flex space-x-2'>
            <MapPinHouse />
            <h2 className="text-xl font-semibold"> Address</h2>
          </div>
          <Button
            variant="outline"
            disabled={loading}
            onClick={() => setAddAddress(!addAddress)}
            className="cursor-pointer"
          >{addAddress
            ? <span className='flex items-center'><X className='mr-2' />Close</span>
            : authUser?.isAddressAdded
              ? <span className='flex items-center'><Edit className='mr-2' />  Edit Address</span>
              : <span className='flex items-center'><Plus className='mr-2' />  Add Address</span>
            }</Button>
        </div>
        {authUser?.role === "PROVIDER" && (
          <p className='w-8/12 mt-2 text-gray-500 text-sm'>Your address will be visible to customers. Please provide your service office address if you only take offline appointments; otherwise, your contact address is sufficient.</p>
        )}
      </div>

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
        <AddressListing
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
    </div>
  )
}

export default Address;