import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FormEvent, useState } from "react";
import { AppDispatch } from "@/utils/redux/appStore";
import RightSideBox from "@/components/provider/RightSideBox";
import { providerAddProviderAddress } from "@/utils/apis/provider.api";
import AddAddress, { AddressFormProps } from "@/components/common/AddAddress";


const ProviderAddAddressPage = () => {

    const dispatch = useDispatch<AppDispatch>()
    const [hasErrors, setHasErrors] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>, formData: AddressFormProps) => {
        e.preventDefault();
        if (hasErrors) {
            toast.error("Please fix the form errors.");
            return;
        }
        await dispatch(providerAddProviderAddress({ formData }))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    toast.success(res.message);
                } else {
                    toast.error(res.message);
                }
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            })
    }

    return (

        <div className="min-h-screen flex justify-center w-full bg-[var(--background)]">
            <div className="w-8/12 px-10">
                <AddAddress onSubmit={handleSubmit} formClassNames={"mt-10 px-12"} headingSize={"xs:text-md md:text-xl md:text-2xl"} heading={"Lets Add Your Address"} buttonText={"Next"} setHasErrors={setHasErrors} />
            </div>
            <RightSideBox props={{ pageNumber: 1 }} />
        </div>
    )
}

export default ProviderAddAddressPage