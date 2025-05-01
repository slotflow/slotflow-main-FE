import { memo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { copyToClipboard } from "@/utils/helper";
import DataFetchingError from "../common/DataFetchingError";
import { userFetchProviderDetails } from "@/utils/apis/user.api";
import InfoDisplayComponent from "../common/InfoDisplayComponent";
import ShimmerProfileDetails from "../shimmers/ShimmerProfileDetails";
import { UserProviderProfileDetailsProps } from "@/utils/interface/userInterface";

const UserProviderProfileDetails: React.FC<UserProviderProfileDetailsProps> = memo(({ _id, setProfileImage }) => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => userFetchProviderDetails(_id),
        queryKey: ["Provider", _id],
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (data) {
            setProfileImage(data.profileImage);
        }
    }, [data, setProfileImage]);
        
    if (isError) {
        return (
            <DataFetchingError message={error.message} />
        )
    }

    if (isLoading) {
        return (
            <div className="w-full mx-auto md:flex justify-start flex-grow bg">
                <ShimmerProfileDetails row={4} />
            </div>
        )
    }

    if (!data) {
        return <DataFetchingError message="No details found." />;
    }


    return (
        <div className="w-full mx-auto py-6 rounded-lg">
            <table className="table-auto border-collapse border border-[var(--boxBorder)] w-full">
                <tbody>
                    <InfoDisplayComponent label="Username" value={data?.username} />
                    <InfoDisplayComponent label="Email" value={data?.email} copyToClipboard={copyToClipboard} />
                    <InfoDisplayComponent label="Phone Number" value={data?.phone || 'Not yet added'} copyToClipboard={copyToClipboard} />
                    <InfoDisplayComponent label="Slotflow Trsuted" value={data?.trustedBySlotflow} isBoolean={true} />
                </tbody>
            </table>
        </div>
    )
})

export default UserProviderProfileDetails