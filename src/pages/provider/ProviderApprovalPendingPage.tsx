import { toast } from 'react-toastify';
import WomenLaptop from '@/components/svgs/WomenLaptop';
import { FormEvent, useCallback, useState } from "react";
import CommonButton from '@/components/common/CommonButton';
import InputField from '@/components/form/InputFieldWithLable';
import { approvalMessages } from '@/utils/constants';

const ProviderApprovalPendingPage = () => {

    const [hasErrors, setHasErrors] = useState(false);
    const [formData, setFormData] = useState({
        query: "",
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        setHasErrors(false);
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
            <div className="md:w-1/2 flex justify-center items-center md:p-20">
                <WomenLaptop />
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
                <div className="p-8 rounded-lg text-center max-w-md">
                    <h1 className="text-2xl font-bold mb-4 text-[var(--mainColor)]">{approvalMessages.heading}</h1>
                    <p className="mb-4">{approvalMessages.message1}</p>
                    <p className="mb-4">{approvalMessages.message2}</p>
                    <p className="mt-4 text-sm">{approvalMessages.footerNote}</p>
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
                        <CommonButton text={"Submit"} type={"submit"}/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProviderApprovalPendingPage