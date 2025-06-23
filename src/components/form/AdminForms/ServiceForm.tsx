import { toast } from "react-toastify";
import InputField from "../InputFieldWithLable";
import React, { useCallback, useState } from "react";
import { FormButton, FormHeading } from "../FormSplits";
import { HandleChangeFunction } from "@/utils/interface/commonInterface";
import { Service } from "@/utils/interface/entityInterface/appServiceInterface";
import { useAdminServiceActions } from "@/utils/hooks/adminHooks/useAdminServiceActions";

const ServiceAddingForm:React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrors, setHasErrors] = useState<boolean>(false);
  const [formData, setFormData] = useState<{appServiceName : Service["serviceName"] }>({
    appServiceName: "",
  });

  const handleChange = useCallback<HandleChangeFunction>((e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setHasErrors(false);
  }, []);

  const { handleAdminServiceAdding } = useAdminServiceActions();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    if(hasErrors){
      toast.error("Please fix the form errors.");
      setLoading(false);
      return;
    }
    handleAdminServiceAdding(formData.appServiceName, setLoading);
    setFormData({ appServiceName: '' });
  };

  const handleErrorChange = (hasError: boolean) => {
    setHasErrors(hasError);
  };

  return (
    <div className="flex p-4 flex-1 flex-col justify-center border-[1px] rounded-md">
      <FormHeading title={"Add New Service"} />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Service Name"
            id="appServiceName"
            placeholder="Software Engineer"
            type="text"
            value={formData.appServiceName}
            onChange={handleChange}
            required={true}
            onHasError={handleErrorChange}
          />
          <FormButton text={"Add"} loading={loading} />
        </form>
      </div>
    </div>
  )
}

export default ServiceAddingForm