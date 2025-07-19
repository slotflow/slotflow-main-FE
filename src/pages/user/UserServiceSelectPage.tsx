import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { addService } from "@/utils/redux/slices/userSlice";
import CommonButton from "@/components/common/CommonButton";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import DataFetchingError from "@/components/common/DataFetchingError";
import ServiceSelectShimmer from "@/components/shimmers/ServiceSelectShimmer";
import { userFetchAllServicesForServiceSelectPage } from "@/utils/apis/user.api";
import { UserFetchAllServicesResponse } from "@/utils/interface/api/userApiInterface";


const UserServiceSelectPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const selectedServices = useSelector((state: RootState) => state.user.selectedServices);
    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useQuery({
        queryFn: userFetchAllServicesForServiceSelectPage,
        queryKey: ["services"],
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const handleServiceToggle = (serviceId: string) => {
        const currentServices = selectedServices ?? [];
        if (currentServices.includes(serviceId)) {
            dispatch(addService(currentServices.filter((id) => id !== serviceId)));
        } else {
            dispatch(addService([...currentServices, serviceId]));
        }
    };

    const handleSubmitSelectedServices = async () => {
        navigate('/user/dashboard');
    }

    return (
        <div className="p-2 min-h-full flex flex-col">
            {data && data.length > 0 && (
                <h2 className="text-2xl font-semibold mb-10">How can we help you today?</h2>
            )}
            {isError && error ? (
                <DataFetchingError message={(error as Error).message} />
            ) : data && data?.length === 0 ? (
                <DataFetchingError message="No services found." />
            ) : data ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 min-h-full">
                    {isLoading ? (
                        <ServiceSelectShimmer />
                    ) :
                        data.map((service: UserFetchAllServicesResponse) => (
                            <div
                                key={service._id}
                                className={`p-3 rounded-md border cursor-pointer text-center ${selectedServices?.includes(((service._id)))
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
                    }
                </div>
            ) : (
                <DataFetchingError message="No services found." />
            )}
            {data && data.length > 0 && (
                <div className="flex justify-end mt-6">
                    <CommonButton text={"Next"} onClick={handleSubmitSelectedServices} />
                </div>
            )}
        </div>
    );
};

export default UserServiceSelectPage;