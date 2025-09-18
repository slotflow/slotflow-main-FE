import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { PhoneInput } from '../form/phone-input';
import NotificationBox from './NotificationBox';
import { ChevronRight, Info } from 'lucide-react';
import { RootState } from '@/utils/redux/appStore';
import { useQueryClient } from '@tanstack/react-query';
import InputField from '@/components/form/InputFieldWithLable';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { Address } from '@/utils/interface/entityInterface/addressInterface';

export type AddressFormProps = Pick<Address, "_id" | "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">

export interface AddAddressProps {
    formClassNames: string;
    heading: string;
    headingSize: string;
    buttonText: string;
    onSubmit: (e: FormEvent<HTMLFormElement>, formData: AddressFormProps) => void;
    setHasErrors: (hasError: boolean) => void;
}

const AddAddress: React.FC<AddAddressProps> = ({ formClassNames, heading, headingSize, buttonText, onSubmit, setHasErrors }) => {

    const queryClient = useQueryClient();
    const { dataUpdating } = useSelector((store: RootState) => store.auth);
    const [formData, setFormData] = useState<AddressFormProps>({
        _id: "",
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

    useEffect(() => {
        const cachedData = queryClient.getQueryData<AddressFormProps>(["userAddress"]);
        if (!cachedData) return;
        setFormData(cachedData);
    }, [queryClient]);

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
        <form onSubmit={handleSubmit} className={`${formClassNames} py-6`}>
            <h4 className={`${headingSize} font-semibold text-start px-6`}>{heading}</h4>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
                <div className="flex-1 space-y-4 md:space-y-6 px-6 pt-6 md:p-6">
                    <InputField
                        label="Address Line"
                        id="addressLine"
                        placeholder="Address"
                        type="text"
                        value={formData.addressLine}
                        onChange={handleChange}
                        required
                        onHasError={handleErrorChange}
                    />
                    <div className="space-y-2">
                        <label className="block text-xs md:text-sm font-medium text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
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
                        required
                        onHasError={handleErrorChange}
                    />
                    <InputField
                        label="City"
                        id="city"
                        placeholder="City"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        onHasError={handleErrorChange}
                    />
                    <InputField
                        label="District"
                        id="district"
                        placeholder="District"
                        type="text"
                        value={formData.district}
                        onChange={handleChange}
                        required
                        onHasError={handleErrorChange}
                    />
                    <InputField
                        label="Pincode"
                        id="pincode"
                        placeholder="000000"
                        type="text"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        onHasError={handleErrorChange}
                    />
                    <InputField
                        label="State"
                        id="state"
                        placeholder="State"
                        type="text"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        onHasError={handleErrorChange}
                    />
                    <InputField
                        label="Country"
                        id="country"
                        placeholder="Country"
                        type="text"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        onHasError={handleErrorChange}
                    />
                </div>

                <div className="flex-1 space-y-4 md:space-y-6 px-6 md:px-0 md:p-6">
                    <InputField
                        label="Google Map Link"
                        id="googleMapLink"
                        placeholder="https://googlemap"
                        type="text"
                        value={formData.googleMapLink}
                        onChange={handleChange}
                        required
                        onHasError={handleErrorChange}
                    />
                    <NotificationBox
                        icon={Info}
                        heading="Google Maps Selection Unavailable"
                        message={`Currently, we don’t support selecting your location directly from Google Maps.  
Please open Google Maps, click on "Share" → "Embed a map", copy the iframe **src** URL,  
and paste it in the field below.`}
                    />
                </div>
            </div>

            <div className="flex justify-center md:justify-end mt-4 md:mt-6">
                <Button
                    type="submit"
                    variant="outline"
                    className="w-10/12 md:w-2/12 text-xs md:text-sm cursor-pointer hover:bg-[var(--mainColor)] hover:text-white border-[var(--mainColor)] flex items-center gap-2"
                >
                    {dataUpdating ? "Loading" : buttonText} <ChevronRight />
                </Button>
            </div>
        </form>

    )
}

export default AddAddress