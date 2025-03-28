import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import InputField from "../InputFieldWithLable";
import { RootState } from "@/utils/redux/appStore";
import { FormButton, FormHeading } from "../FormSplits";
import { HandleChangeFunction } from "@/utils/interface/commonInterface";
import { useAdminServiceActions } from "@/utils/hooks/useAdminServiceActions";

const ServiceAddingForm = () => {

  const adminFormloading: boolean = useSelector((store: RootState) => store.admin.adminFormloading);
  const [formData, setFormData] = useState<{appServiceName: string}>({
    appServiceName: "",
  });
  const [hasErrors, setHasErrors] = useState<boolean>(false);

  const handleChange = useCallback<HandleChangeFunction>((e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setHasErrors(false);
  }, []);

  const { handleServiceAdding } = useAdminServiceActions();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if(hasErrors){
      toast.error("Please fix the form errors.");
      return;
    }
    handleServiceAdding(formData.appServiceName);
    setFormData({ appServiceName: '' });
  };

  const handleErrorChange = (hasError: boolean) => {
    setHasErrors(hasError);
  };

  return (
    <div className="flex p-4 mt-17 flex-1 flex-col justify-center border-[1px] rounded-md">
      <FormHeading title={"Add New Service"} />
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
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
          <FormButton text={"Add"} loading={adminFormloading} />
        </form>
      </div>
    </div>
  )
}

export default ServiceAddingForm