import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import SideBox from '@/components/provider/SideBox';
import { approvalMessages } from '@/utils/constants';
import { FormEvent, useCallback, useState } from "react";
import InputField from '@/components/form/InputFieldWithLable';

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
        <>
            <div className="h-screen flex w-full bg-[var(--background)] text-[var(--textOne)]">
                <SideBox props={{ pageNumber: 4 }} />
                <div className="md:w-8/12 flex justify-center items-center">
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
                            <Button
                                type="submit"
                                variant="outline"
                                className="text-xs md:text-sm cursor-pointer hover:bg-[var(--mainColor)] hover:text-white border-[var(--mainColor)]"
                            >Submit</Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProviderApprovalPendingPage