import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import InputField from "../InputFieldWithLable";
import { RootState } from "@/utils/redux/appStore";
import { FormButton, FormHeading } from "../FormSplits";
import SelectFiledWithLabel from "../SelectFiledWithLabel";
import { BillingCycle } from "@/utils/interface/planInterface";
import { useAdminPlanActions } from "@/utils/hooks/useAdminPlanActions";
import { AdminAddNewPlanRequestPayload } from "@/utils/interface/api/adminPlanApiInterface";
import { HandleChangeFunction, HandleFeatureChangeFunction } from "@/utils/interface/commonInterface";

const PlanForm = () => {
    
    const adminFormloading: boolean = useSelector((store: RootState) => store.admin.adminFormloading);
    const [formData, setFormData] = useState<AdminAddNewPlanRequestPayload>({
        planName: "",
        description: "",
        price: 0,
        features: ["", "", "", "", ""],
        billingCycle: BillingCycle.Monthly,
        maxBookingPerMonth: 0,
        adVisibility: false,
    });
    const [hasErrors, setHasErrors] = useState<boolean>(false);

    const handleChange = useCallback<HandleChangeFunction>((e) => {
        const { id, value, type } = e.target;
        const newValue : string | boolean = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
        setFormData((prev) => ({ ...prev, [id]: newValue }));
        setHasErrors(false);
    }, []);

    const handleFeatureChange = useCallback<HandleFeatureChangeFunction>((e, index) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = e.target.value;
        setFormData((prev) => ({ ...prev, features: newFeatures }));
        setHasErrors(false);
    }, [formData.features]);


    const { handlePlanAdding } = useAdminPlanActions();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (hasErrors) {
            toast.error("Please fix the form errors.");
            return;
        }
        handlePlanAdding(formData)
        setFormData({
            planName: "",
            description: "",
            price: 0,
            features: ["", "", "", "", ""],
            billingCycle: BillingCycle.Monthly,
            maxBookingPerMonth: 0,
            adVisibility: false,
        });
    };

    const handleErrorChange = (hasError: boolean) => {
        setHasErrors(hasError);
    };

    return (
        <div className="flex p-4 mt-17 flex-1 flex-col justify-center border-[1px] rounded-md">
            <FormHeading title={"Add New Plan"} />
            <div className="mt-8 sm:mx-auto sm:w-full">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField
                        label="Plan Name"
                        id="planName"
                        placeholder="Premium Plan"
                        type="text"
                        value={formData.planName}
                        onChange={handleChange}
                        required={true}
                        onHasError={handleErrorChange}
                        />
                    <InputField
                        label="Description"
                        id="planDescription"
                        placeholder="Description of the plan"
                        type="text"
                        value={formData.description}
                        onChange={handleChange}
                        required={true}
                        onHasError={handleErrorChange}
                        />
                    <InputField
                        label="Price"
                        id="planPrice"
                        placeholder="99"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        required={true}
                        onHasError={handleErrorChange}
                        />
                    {formData.features.map((feature, index) => (
                        <InputField
                            key={index}
                            label={`Feature ${index + 1}`}
                            id={`features[${index}]`}
                            placeholder={`Feature ${index + 1}`}
                            type="text"
                            value={feature}
                            onChange={(e) => handleFeatureChange(e, index)}
                            required={index < 2}
                            onHasError={handleErrorChange}
                        />
                    ))}
                    <SelectFiledWithLabel
                        label="Billing Cycle"
                        id="billingCycle"
                        value={formData.billingCycle}
                        onChange={handleChange}
                        options={Object.values(BillingCycle)}
                        required={true}
                        onHasError={handleErrorChange}
                    />
                    <InputField
                        label="Max Bookings Per Month"
                        id="maxBookingPerMonth"
                        placeholder="100"
                        type="number"
                        value={formData.maxBookingPerMonth}
                        onChange={handleChange}
                        required={true}
                        onHasError={handleErrorChange}
                    />
                    <SelectFiledWithLabel
                        label="Ad Visibility"
                        id="adVisibility"
                        value={formData.adVisibility}
                        onChange={handleChange}
                        options={["true", "false"]}
                        required={true}
                        onHasError={handleErrorChange}
                    />
                    <FormButton text={"Add"} loading={adminFormloading} />
                </form>
            </div>
        </div>
    );
};

export default PlanForm;