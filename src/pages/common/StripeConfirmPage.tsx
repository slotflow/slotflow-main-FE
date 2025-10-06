import React from 'react';
import { useEffect } from "react";
import { toast } from 'react-toastify';

const StripeConfirmPage: React.FC<{ status: boolean }> = ({
    status
}) => {

    useEffect(() => {
        if (status) {
            toast.success("Your Stripe account is connected!");
        } else {
            toast.error("Stripe onboarding expired. Please try again.");
        }
    }, [status]);

    return status ? (
        <h2>Stripe connected successfully 🎉</h2>
    ) : (
        <h2>Please reconnect your Stripe account</h2>
    )
}

export default StripeConfirmPage;

