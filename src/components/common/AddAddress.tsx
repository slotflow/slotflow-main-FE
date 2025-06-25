import { useSelector } from 'react-redux';
import { PhoneInput } from '../form/phone-input';
import { RootState } from '@/utils/redux/appStore';
import CommonButton from '@/components/common/CommonButton';
import InputField from '@/components/form/InputFieldWithLable';
import React, { FormEvent, useCallback, useState } from 'react';
import { Address } from '@/utils/interface/entityInterface/addressInterface';

export type AddressFormProps = Pick<Address, "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">

export interface AddAddressProps {
    formClassNames: string;
    heading: string;
    headingSize: string;
    buttonText: string;
    onSubmit: (e: FormEvent<HTMLFormElement>, formData: AddressFormProps) => void;
    setHasErrors: (hasError: boolean) => void;
}

const AddAddress: React.FC<AddAddressProps> = ({ formClassNames, heading, headingSize, buttonText, onSubmit, setHasErrors }) => {

    const { dataUpdating } = useSelector((store: RootState) => store.auth)
    const [formData, setFormData] = useState<AddressFormProps>({
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
        onSubmit(e, formData);
    };


    return (
        <form onSubmit={handleSubmit} className={`${formClassNames}`}>
            <h4 className={`${headingSize} font-semibold text-start px-6`}>{heading}</h4>
            <div className="flex w-full flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-6 space-y-6">
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
                    <div className="space-y-2">
                        <label className="block text-xs md:text-sm/6 font-medium text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                            Phone
                        </label>
                        <PhoneInput
                            value={formData.phone}
                            onChange={(value) => {
                                setFormData((prev) => ({ ...prev, phone: value || "" }));
                                setHasErrors(false);
                            }}
                            defaultCountry="IN"
                            international
                            placeholder="Enter your phone number"
                            className="w-full"
                            required
                        />
                    </div>
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
            <div className="flex justify-end mr-6">
                <CommonButton text={dataUpdating ? "Loading" : buttonText} type={"submit"} />
            </div>
        </form>

    )
}

export default AddAddress