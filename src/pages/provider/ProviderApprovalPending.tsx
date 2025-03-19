import gsap from 'gsap';
import { toast } from 'react-toastify';
import CustomButton from '@/components/button/CustomButton';
import InputField from '@/components/form/InputFieldWithLable';
import { gsapBigSvgYDirectionAnimation } from '@/utils/constants';
import ManWorkingOnLaptop from "@/components/svgs/ManWorkingOnLaptop";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

const ProviderApprovalPending = () => {

    const manRef = useRef(null);
    const [hasErrors, setHasErrors] = useState(false);
    const [formData, setFormData] = useState({
        query: "",
    });


    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        setHasErrors(false);
    }, []);

    useEffect(() => {
        gsap.to(manRef.current,gsapBigSvgYDirectionAnimation);
    }, []);

    const handleErrorChange = (hasError: boolean) => {
        setHasErrors(hasError);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (hasErrors) {
            toast.error("Please fix the form errors.");
            return;
        }
    }

    return (
        <div className="min-h-screen pt-16 flex flex-col md:flex-row justify-center items-center w-full bg-[var(--background)] text-[var(--textOne)]">
            <div className="md:w-1/2 flex justify-center items-center md:p-20" ref={manRef}>
                <ManWorkingOnLaptop />
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
                <div className="p-8 rounded-lg text-center max-w-md">
                    <h1 className="text-2xl font-bold mb-4 text-[var(--mainColor)]">Approval in Progress</h1>
                    <p className="mb-4">Thank you for your patience. Your request is currently being reviewed. We will notify you as soon as the process is complete.</p>
                    <p className="mb-4">We will notify you via email.</p>
                    <p className="mt-4 text-sm">If you have any queries, please contact us.</p>
                    <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
                        <InputField
                            id="providerQuery"
                            placeholder="Enter your query here"
                            type="text"
                            value={formData.query}
                            onChange={handleChange}
                            required={true}
                            onHasError={handleErrorChange}
                        />
                        <CustomButton props={{ loading: false, text: "Submit" }} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProviderApprovalPending