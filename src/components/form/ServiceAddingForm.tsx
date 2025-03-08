import { useCallback, useState } from "react";
import InputField from "./InputFieldWithLable"
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/utils/redux/appStore";


const ServiceAddingForm = () => {

  // const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
          serviceName: "",
      });
  
      const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
          setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      }, []);
      
      const handleSubmit = () => {
       
      }

  return (
    <div className="flex p-4 mt-17 flex-1 flex-col justify-center border-[1px] rounded-md">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-xl font-bold tracking-tight text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                    Add ew Service
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField
                        label="Service Name"
                        id="serviceName"
                        placeholder="Software Engineer"
                        type="text"
                        value={formData.serviceName}
                        onChange={handleChange}
                        required={true}
                    />

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[var(--mainColor)] hover:bg-[var(--mainColorHover)] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mainColor)] cursor-pointer"
                        >
                            Add
                        </button>
                    </div>
                </form>

               

            </div>
        </div>
  )
}

export default ServiceAddingForm