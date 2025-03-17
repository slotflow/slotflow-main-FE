import CustomButton from "@/components/Button/CustomButton";
import InputField from "@/components/form/InputFieldWithLable"
import { addProviderAddress } from "@/utils/apis/provider.api";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { setAddress } from "@/utils/redux/slices/authSlice";
import { FormEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProviderAddAddress = () => {

    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((store: RootState) => store.auth.authUser);
    const [hasErrors, setHasErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        addressLine: "",
        phone: "",
        place: "",
        city: "",
        district: "",
        pincode: "",
        state: "",
        country: "",
        googleMapLink: "",
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        setHasErrors(false);
    }, []);

    const handleErrorChange = (hasError: boolean) => {
        setHasErrors(hasError);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (hasErrors) {
            toast.error("Please fix the form errors.");
            return;
        }
        setLoading(true);
        console.log("formData : ", formData);
        if (user?._id) {
            dispatch(addProviderAddress({ providerId: user._id, formData }))
                .unwrap()
                .then((res) => {
                    if (res.success) {
                        toast.success(res.message);
                        dispatch(setAddress(true));
                        setFormData({
                            addressLine: "",
                            phone: "",
                            place: "",
                            city: "",
                            district: "",
                            pincode: "",
                            state: "",
                            country: "",
                            googleMapLink: "",
                        });
                    } else {
                        toast.error(res.message);
                    }
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                })
        } else {
            toast.error("Something went wrong, please login again and try.");
        }
    }

    return (

        <div className="min-h-screen pt-16 flex justify-center w-full bg-[var(--background)]">
            <div className="w-8/12 px-10">
                <form onSubmit={handleSubmit} className="mt-10 p-12">
                    <h4 className="text-2xl font-semibold mb-6 text-start">Lets fillout your Address</h4>
                    <div className="flex w-full flex-col md:flex-row">
                        <div className="w-full md:w-1/2 py-6 space-y-6">
                            <InputField
                                label="Address Line"
                                id="addressLine"
                                placeholder="Address"
                                type="text"
                                value={formData.addressLine}
                                onChange={handleChange}
                                required={true}
                                onHasError={handleErrorChange}
                            />
                            <InputField
                                label="Phone"
                                id="phone"
                                placeholder="+91 0000000000"
                                type="text"
                                value={formData.phone}
                                onChange={handleChange}
                                required={true}
                                onHasError={handleErrorChange}
                            />
                            <InputField
                                label="Place"
                                id="place"
                                placeholder="Place"
                                type="text"
                                value={formData.place}
                                onChange={handleChange}
                                required={true}
                                onHasError={handleErrorChange}
                            />
                            <InputField
                                label="City"
                                id="city"
                                placeholder="City"
                                type="text"
                                value={formData.city}
                                onChange={handleChange}
                                required={true}
                                onHasError={handleErrorChange}
                            />
                            <InputField
                                label="Distrcit"
                                id="district"
                                placeholder="Distrcit"
                                type="text"
                                value={formData.district}
                                onChange={handleChange}
                                required={true}
                                onHasError={handleErrorChange}
                            />
                            <InputField
                                label="Pincode"
                                id="pincode"
                                placeholder="000000"
                                type="text"
                                value={formData.pincode}
                                onChange={handleChange}
                                required={true}
                                onHasError={handleErrorChange}
                            />
                        </div>
                        <div className="w-full md:w-1/2 p-6 space-y-6">

                            <InputField
                                label="State"
                                id="state"
                                placeholder="State"
                                type="text"
                                value={formData.state}
                                onChange={handleChange}
                                required={true}
                                onHasError={handleErrorChange}
                            />
                            <InputField
                                label="Country"
                                id="country"
                                placeholder="Country"
                                type="text"
                                value={formData.country}
                                onChange={handleChange}
                                required={true}
                                onHasError={handleErrorChange}
                            />
                            <InputField
                                label="Google Map Link"
                                id="googleMapLink"
                                placeholder="https://googlemap"
                                type="text"
                                value={formData.googleMapLink}
                                onChange={handleChange}
                                required={true}
                                onHasError={handleErrorChange}
                            />
                        </div>
                    </div>
                    <div className="mt-10 flex justify-end">
                        <CustomButton props={{ loading }} />
                    </div>
                </form>
            </div>
            <div className="bg-violet-200 w-4/12 p-10">
                <h3 className="p-6 text-2xl font-bold italic">Slotflow</h3>
                <div className="w-full p-6 space-y-2 flex justify-between">
                    <div className="h-2 w-4/12 bg-purple-500 mx-1 rounded-md"></div>
                    <div className="h-2 w-4/12 bg-white mx-1 rounded-md"></div>
                    <div className="h-2 w-4/12 bg-white mx-1 rounded-md"></div>
                </div>
            </div>
        </div>
    )
}

export default ProviderAddAddress