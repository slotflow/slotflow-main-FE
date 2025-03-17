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
        console.log("formData : ",formData);
        if (user?._id) {
            dispatch(addProviderAddress({ providerId: user._id, formData }))
            .unwrap()
            .then((res) => {
                if(res.success){
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
                }else{
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
        <div className="h-screen pt-16 flex justify-center bg-[var(--background)]">
            <div className="p-2 w-11/12 md:w-10/12 lg:w-8/12 mt-10">
                <h4 className="text-2xl font-semibold mb-6 text-start">Service Address</h4>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div className="mt-10 flex justify-end">
                        <button type="submit" className="w-full md:w-1/4 rounded-md bg-[var(--mainColor)] hover:bg-[var(--mainColorHover)] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mainColor)] cursor-pointer">{loading ? "Loading" : "Next"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProviderAddAddress