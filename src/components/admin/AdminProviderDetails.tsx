import { Provider } from "@/utils/interface";
import { useQuery } from "@tanstack/react-query";
import DataFetchingError from "../common/DataFetchingError";
import { fetchProviderDetails } from "@/utils/apis/adminProvider.api";
import ShimmerProfileDetails from "../shimmers/ShimmerProfileDetails";

type ProviderIdOnly = Pick<Provider, '_id'>;
interface AdminProviderDetailsProps extends ProviderIdOnly {
    onError: (hasError: boolean) => void;
}

const AdminProviderDetails: React.FC<AdminProviderDetailsProps> = ({ _id, onError }) => {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['provider', _id],
        queryFn: () => fetchProviderDetails(_id)
    })

    if (isError){
        onError(true);
        return (
            <DataFetchingError message={error.message} />
        )
    } 

    if (isLoading){
        onError(false);
        return (
            <div className="w-full mx-auto mt-8 md:flex justify-center flex-grow">
            <ShimmerProfileDetails row={4} />
            <ShimmerProfileDetails row={3} />
        </div>
    )
} 

    return (
        <div className="w-full mx-auto mt-8 md:flex justify-center flex-grow">
            <div className=" p-4 space-y-3 flex-1">
                <h4 className="font-semibold text-xl">General Information</h4>
                <div>
                    <label className="text-sm flex items-center my-1 text-[var(--textTwo)]">Username</label>
                    <p className="py-1">{data.fullName}</p>
                </div>
                <div>
                    <label className="text-sm flex items-center my-1 text-[var(--textTwo)]">Email</label>
                    <p className="py-1">{data.email}</p>
                </div>
                <div>
                    <label className="text-sm flex items-center my-1 text-[var(--textTwo)]">Phone number</label>
                    <p className="py-1">{data.phone}</p>
                </div>
                <div>
                    <label className="text-sm flex items-center my-1 text-[var(--textTwo)]">Joined on</label>
                    <p className="py-1">{data.createdAt}</p>
                </div>
            </div>

            <div className="md:w-1/2 p-4 space-y-3 flex-1">
                <h4 className="font-semibold text-xl">Verification & Status</h4>
                <div>
                    <label className="text-sm flex items-center my-1 text-[var(--textTwo)]">Email verification</label>
                    <p className="py-1">{data.isEmailVerified}</p>
                </div>
                <div>
                    <label className="text-sm flex items-center my-1 text-[var(--textTwo)]">Accound status</label>
                    <p className="py-1">{data.isBlocked}</p>
                </div>
                <div>
                    <label className="text-sm flex items-center my-1 text-[var(--textTwo)]">Admin verifiction</label>
                    <p className="py-1">{data.isAdminVerified}</p>
                </div>
            </div>
        </div>
    )
}

export default AdminProviderDetails