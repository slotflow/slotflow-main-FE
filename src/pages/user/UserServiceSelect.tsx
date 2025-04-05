import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { addService } from "@/utils/redux/slices/userSlice";
import CommonButton from "@/components/common/CommonButton";
import { fetchServices } from "@/utils/apis/adminService.api";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import DataFetchingError from "@/components/common/DataFetchingError";
import { toast } from "react-toastify";
import { userSearchServiceProviders } from "@/utils/apis/user.api";

interface Service {
    _id: string;
    serviceName: string;
    isBlocked: boolean;
}

const UserServiceSelect = () => {

    const dispatch = useDispatch<AppDispatch>();
    const selectedServices = useSelector((state: RootState) => state.user.selectedServices);

    const handleServiceToggle = (serviceId: string) => {
        if (selectedServices.includes(serviceId)) {
            dispatch(addService(selectedServices.filter((id) => id !== serviceId)));
        } else {
            dispatch(addService([...selectedServices, serviceId]));
        }
    };

    const handleSubmitSelectedServices = async () => {
        const response = await userSearchServiceProviders(selectedServices);
        toast.success(response.message);
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["services"],
        queryFn: fetchServices,
    });

    return (
        <div className="px-6 h-screen flex flex-col">
            <h2 className="text-2xl font-semibold mb-10">What are you looking for ?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {isError ? (
                    <DataFetchingError message={error.message} />
                ) : isLoading ? (
                    <div>Loading</div>
                ) : data ? (
                    data.map((service: Service) => (
                        <div
                            key={service._id}
                            className={`p-3 rounded-md border-2 cursor-pointer text-center ${selectedServices.includes(((service._id)))
                                ? "border-[var(--mainColor)]"
                                : "border-gray-300"
                                }`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleServiceToggle(service._id)
                            }}
                        >
                            {service.serviceName}
                        </div>
                    ))
                ) : (
                    <DataFetchingError message="No services found." />
                )}
            </div>
            <div className="flex justify-end mt-6">
               <CommonButton text={"Next"} onClick={handleSubmitSelectedServices}/>
            </div>
        </div>
    );
};

export default UserServiceSelect;