"use client";

import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/appStore";
import { IconBrandGoogle } from "@tabler/icons-react";
import { lightTheme, darkTheme } from "@/utils/theme";

export function Form() {

    const [loginForm, setLoginForm] = useState<boolean>(true);   
    const otpForm = useSelector((store : RootState) => store.state?.otpForm);
    const themeMode = useSelector((store : RootState) => store.state?.lightTheme);
    const theme = themeMode ? lightTheme : darkTheme;
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    const handleRegister = () => {
        setLoginForm(!loginForm);
    }

    return (
        <div className={`max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-md relative`}>
            <h2 className="font-bold text-xl" style={{ color: theme.textOne }}>
                {otpForm ? "Verify Email" : loginForm ? "Sign In" : "Sign Up"}
            </h2>
            <form className="my-8" onSubmit={handleSubmit}>
               {otpForm ? 
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="otp">Otp</Label>
                    <Input id="otp" placeholder="_ _ _ _ _ _" type="text" />
                </LabelInputContainer>
                : 
                <>
                {!loginForm && (
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="username">Fullname</Label>
                        <Input id="username" placeholder="midunKPaniker" type="text" />
                    </LabelInputContainer>
                )}
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="midhun@gmail.com" type="email" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <div className=" flex justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Label htmlFor="forgotPassword" className="text-[#635bff]">Forgot password?</Label>
                    </div>
                    <Input id="password" placeholder="••••••••" type="password" />
                </LabelInputContainer>
                </>
                }

                <button className="relative group/btn flex items-center justify-center gap-2 px-4 w-full rounded-md h-10 font-medium shadow-input bg-black cursor-pointer" type="submit">
                    <span className="text-white dark:text-neutral-300 text-sm">
                       {otpForm ? "Verify OTP" : loginForm ? "Sign In" : "Sign Up"}
                    </span>
                    <BottomGradient />
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                {!otpForm && 
                <div className="flex flex-col space-y-4">
                    <button className="relative group/btn flex items-center justify-center gap-2 px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] cursor-pointer">
                        <IconBrandGoogle className="h-4 w-4 text-black dark:text-neutral-300" />
                        <span className="text-black dark:text-neutral-300 text-sm">
                            Google
                        </span>
                        <BottomGradient />
                    </button>
                </div>
                }

                <p className="text-sm text-black text-center mt-10">
                    {otpForm ? 
                        <span className="font-semibold cursor-pointer hover:underline">Resend OTP</span>
                    :
                    <>
                        New to <span className="text-[#635bff] font-semibold">Slotflow</span>? <span className="underline font-semibold cursor-pointer" onClick={handleRegister}>{loginForm ? "Sign Up" : "Sign In"}</span>
                    </>
                    }
                </p>

            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-[#635bff] to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-[#635bff] to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
