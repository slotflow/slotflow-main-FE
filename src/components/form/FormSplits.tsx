import React from "react";
import logo from '../../assets/logos/logo-transparent.png';
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import { AuthFormsButtonProps, AuthFormsHeadingProps } from "@/utils/interface/commonInterface";

export const FormHeading: React.FC<AuthFormsHeadingProps> = React.memo(({ title, description }) => {
    return (
         <CardHeader>
            <div className='flex items-center justify-center'>
                <img src={logo} className='size-16' />
            </div>
            <CardTitle className="text-center">{title}</CardTitle>
            <CardDescription className="text-center">
                {description}
            </CardDescription>
        </CardHeader>
    )
})

export const FormButton: React.FC<AuthFormsButtonProps> = React.memo(({ text, loading = false }) => {
    return (
        <button
            type="submit"
            className="mt-5 flex w-full justify-center rounded-md bg-[var(--mainColor)] hover:bg-[var(--mainColorHover)] px-3 py-2 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mainColor)] cursor-pointer"
        >
            {loading ? "Loading" : text}
        </button>
    )
})
