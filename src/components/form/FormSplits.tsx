import React from "react";
import { AuthFormsButtonProps, AuthFormsHeadingProps } from "@/utils/interface/commonInterface";

export const FormHeading: React.FC<AuthFormsHeadingProps> = React.memo(({ title }) => {
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                {title}
            </h2>
        </div>
    )
})

export const FormButton: React.FC<AuthFormsButtonProps> = React.memo(({ text, loading = false }) => {
    return (
        <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-[var(--mainColor)] hover:bg-[var(--mainColorHover)] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mainColor)] cursor-pointer"
        >
            {loading ? "Loading" : text}
        </button>
    )
})
