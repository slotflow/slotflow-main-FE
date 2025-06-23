import { toast } from "react-toastify";
import InputField from "../InputFieldWithLable";
import React, { useCallback, useState } from "react";
import { FormButton, FormHeading } from "../FormSplits";
import SelectFiledWithLabel from "../SelectFiledWithLabel";
import { useAdminPlanActions } from "@/utils/hooks/adminHooks/useAdminPlanActions";
import { AdminAddNewPlanApiRequestPayload } from "@/utils/interface/api/adminPlanApiInterface";
import { HandleChangeFunction, HandleFeatureChangeFunction } from "@/utils/interface/commonInterface";

const PlanForm:React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [hasErrors, setHasErrors] = useState<boolean>(false);
    const [formData, setFormData] = useState<AdminAddNewPlanApiRequestPayload>({
        planName: "",
        description: "",
        price: 0,
        features: ["", "", "", "", ""],
        maxBookingPerMonth: 0,
        adVisibility: false,
    });

    const handleChange = useCallback<HandleChangeFunction>((e) => {
        const { id, value, type } = e.target;
        let newValue: string | boolean | number;

        if (type === "number") {
            newValue = Number(value);
        } else {
            newValue = value;
        }

        setFormData((prev) => ({ ...prev, [id]: newValue }));
        setHasErrors(false);
    }, []);

    const handleFeatureChange = useCallback<HandleFeatureChangeFunction>((e, index) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = e.target.value;
        setFormData((prev) => ({ ...prev, features: newFeatures }));
        setHasErrors(false);
    }, [formData.features]);


    const { handleAdminPlanAdding } = useAdminPlanActions();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        if (hasErrors) {
            toast.error("Please fix the form errors.");
            return;
        }

        handleAdminPlanAdding(formData, setLoading);
        setFormData({
            planName: "",
            description: "",
            price: 0,
            features: ["", "", "", "", ""],
            maxBookingPerMonth: 0,
            adVisibility: false,
        });
    };

    const handleErrorChange = (hasError: boolean) => {
        setHasErrors(hasError);
    };

    return (
        <div className="flex p-4 flex-1 flex-col justify-center border-[1px] rounded-md">
            <FormHeading title={"Add New Plan"} />
            <div className="sm:mx-auto sm:w-full">
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
                        id="description"
                        placeholder="Description of the plan"
                        type="text"
                        value={formData.description}
                        onChange={handleChange}
                        required={true}
                        onHasError={handleErrorChange}
                    />
                    <InputField
                        label="Price"
                        id="price"
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
                    <FormButton text={"Add"} loading={loading} />
                </form>
            </div>
        </div>
    );
};

export default PlanForm;