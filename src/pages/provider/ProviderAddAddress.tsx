import RightSideBox from "@/components/provider/RightSideBox";
import InputField from "@/components/form/InputFieldWithLable"
import { addProviderAddress } from "@/utils/apis/provider.api";
import { AppDispatch } from "@/utils/redux/appStore";
import { setAddress } from "@/utils/redux/slices/authSlice";
import { FormEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProviderAddAddress = () => {

    const dispatch = useDispatch<AppDispatch>()
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
        dispatch(addProviderAddress({ formData }))
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
        setLoading(false);
    }

    return (

        <div className="min-h-screen pt-16 flex justify-center w-full bg-[var(--background)]">
            <div className="w-8/12 px-10">
                <form onSubmit={handleSubmit} className="mt-10 p-12">
                    <h4 className="text-2xl font-semibold mb-6 text-start">Lets Fill Your Service Address</h4>
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
                                placeholder="0000000000"
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
                        <button
                            type="submit"
                            className="bg-[var(--mainColor)] hover:bg-[var(--mainColorHover)] text-white font-bold py-1.5 px-4 rounded cursor-pointer"
                        >
                            {loading ? "Loading" : "Next"}
                        </button>
                    </div>
                </form>
            </div>
            <RightSideBox props={{ pageNumber: 1 }} />
        </div>
    )
}

export default ProviderAddAddress