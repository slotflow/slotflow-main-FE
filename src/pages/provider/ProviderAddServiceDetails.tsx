import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import InputField from "@/components/form/InputFieldWithLable";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { fetchAllServices } from "../../utils/apis/provider.api";
import { addProviderServiceDetails } from "@/utils/apis/provider.api";
import SelectFiledWithLabel from "@/components/form/SelectFiledWithLabel";
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { setServiceDetails } from "@/utils/redux/slices/authSlice";
import CustomButton from "@/components/button/CustomButton";
import RightSideBox from "@/components/admin/RightSideBox";

interface Service {
  serviceName: string
}

const ProviderAddServiceDetails = () => {

  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((store: RootState) => store.auth.authUser);
  const [hasErrors, setHasErrors] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [services, setServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    serviceCategory: "",
    serviceName: "",
    serviceDescription: "",
    servicePrice: "",
    providerAdhaar: "",
    providerExperience: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
      setPreviewImage(null);
    }
  }

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [id]: newValue }));
    setHasErrors(false);
  }, []);

  const handleErrorChange = (hasError: boolean) => {
    setHasErrors(hasError);
  };

  useEffect(() => {
    dispatch(fetchAllServices())
      .unwrap()
      .then((res) => {
        if (res.success) {
          const serviceNames = res.services.map((service: Service) => service.serviceName);
          setServices(serviceNames);
        }
      })
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hasErrors) {
      toast.error("Please fix the form errors.");
      return;
    }
    setLoading(true);
    try {
      if (user?._id) {
        const formDataToSend = new FormData();
        formDataToSend.append('providerId', user._id);
        formDataToSend.append('serviceCategory', formData.serviceCategory);
        formDataToSend.append('serviceName', formData.serviceName);
        formDataToSend.append('serviceDescription', formData.serviceDescription);
        formDataToSend.append('servicePrice', formData.servicePrice);
        formDataToSend.append('providerAdhaar', formData.providerAdhaar);
        formDataToSend.append('providerExperience', formData.providerExperience);
        if (selectedImage) {
          formDataToSend.append('certificate', selectedImage);
        }
        dispatch(addProviderServiceDetails({ providerId: user._id, formData: formDataToSend }))
          .unwrap()
          .then((res) => {
            if (res.success) {
              toast.success(res.message);
              dispatch(setServiceDetails(true));
              setFormData({
                serviceCategory: "",
                serviceName: "",
                serviceDescription: "",
                servicePrice: "",
                providerAdhaar: "",
                providerExperience: "",
              });
              setSelectedImage(null);
            } else {
              toast.error(res.message);
            }
          })
      } else {
        toast.error("Something went wrong, please login again and try.");
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen pt-16 flex justify-center w-full bg-[var(--background)]">
      <div className="w-8/12 px-10">
        <form onSubmit={handleSubmit} className="mt-10 p-12">
          <h4 className="text-2xl font-semibold mb-6 text-start">Lets Fill Your Service Details</h4>
          <div className="flex w-full flex-col md:flex-row">
            <div className="w-full md:w-1/2 py-6 space-y-6">
              <SelectFiledWithLabel
                label="Service Category"
                id="serviceCategory"
                value={formData.serviceCategory}
                onChange={handleChange}
                options={services}
                required={true}
                onHasError={handleErrorChange}
              />
              <InputField
                label="Service Name"
                id="serviceName"
                placeholder="Service name"
                type="text"
                value={formData.serviceName}
                onChange={handleChange}
                required={true}
                onHasError={handleErrorChange}
              />
              <InputField
                label="Service Description"
                id="serviceDescription"
                placeholder="Service description"
                type="text"
                value={formData.serviceDescription}
                onChange={handleChange}
                required={true}
                onHasError={handleErrorChange}
              />
              <InputField
                label="Service Price"
                id="servicePrice"
                placeholder="₹ 1000"
                type="number"
                value={formData.servicePrice}
                onChange={handleChange}
                required={true}
                onHasError={handleErrorChange}
              />
              <InputField
                label="Experience In Years"
                id="providerExperience"
                placeholder="experience"
                type="text"
                value={formData.providerExperience}
                onChange={handleChange}
                required={true}
                onHasError={handleErrorChange}
              />
              <InputField
                label="Adhaar Last 6 digits"
                id="providerAdhaar"
                placeholder="Adhaar number"
                type="text"
                value={formData.providerAdhaar}
                onChange={handleChange}
                required={true}
                onHasError={handleErrorChange}
              />
            </div>

            <div className="w-full md:w-1/2 p-6 space-y-6">
            <div>
                <label className="block text-xs md:text-sm/6 font-medium text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                  Certificate
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Certificate jpg or png"
                    name="certificate"
                    type="file"
                    required={true}
                    onChange={handleImageUpload}
                    className="block w-full rounded-md bg-[var(--inputBg)] px-2 py-2 md:px-3 md:py-2 text-[var(--textOne)] outline-1 -outline-offset-1 outline-[var(--boxBorder)] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--mainColor)] text-xs  md:text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs md:text-sm/6 font-medium text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                  Certificate Preview
                </label>
                <div className="mt-2 p-2 h-64 border-2 border-[var(--boxBorder)] rounded-lg flex justify-center items-center">
                  <img
                    src={previewImage || '/images/imagePlaceholder.png'}
                    className="object-contain max-h-full max-w-full"
                    alt="Certificate Preview"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-end">
            <CustomButton props={{ loading, text: "Next" }} />
          </div>
        </form>
      </div>
      <RightSideBox props={{ pageNumber: 2 }} />
    </div>
  )
}

export default ProviderAddServiceDetails

