import { FormEvent } from "react";

// User or Provider Address interface
export interface Address {
    _id: string;
    userId: string;
    addressLine: string;
    phone: string;
    place: string;
    city: string;
    district: string;
    pincode: string;
    state: string;
    country: string;
    googleMapLink: string;
    createdAt: string;
    updatedAt: string;
}

export type AddressFormProps = Pick<Address, "addressLine" | "phone" | "place" | "city" | "district" | "pincode" | "state" | "country" | "googleMapLink">

export interface AddAddressProps {
    formClassNames: string;
    heading: string;
    headingSize: string;
    buttonText: string;
    onSubmit: (e: FormEvent<HTMLFormElement>, formData: AddressFormProps) => void;
    setHasErrors: (hasError: boolean) => void;
}