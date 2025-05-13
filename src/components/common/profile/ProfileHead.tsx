import { useState } from "react";
import { toast } from "react-toastify";
import { Camera, Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AuthState } from "@/utils/interface/sliceInterface";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { UpdateUserProfileImageApiResponse } from "@/utils/interface/api/userApiInterface";
import { ProviderUpdateProfileImageApiResponse } from "@/utils/interface/api/providerApiInterface";
import { ProfileHeaderComponentProps } from "@/utils/interface/componentInterface/commonComponentInterface";

const ProfileHead: React.FC<ProfileHeaderComponentProps> = ({
    updateProfileImageApiFunction,
    updation,
    profileImage
}) => {

    const dispatch = useDispatch<AppDispatch>();
    const { authUser, profileImageUpdating }: AuthState = useSelector((store: RootState) => store.auth);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);

        const formData = new FormData();
        formData.append("profileImage", file);

        if (updation && updateProfileImageApiFunction) {
            await dispatch(updateProfileImageApiFunction(formData))
                .unwrap()
                .then((res: ProviderUpdateProfileImageApiResponse | UpdateUserProfileImageApiResponse) => {
                    toast.success(res.message);
                })
                .catch(() => {
                    toast.error("Profile image updating error");
                })
        }
    };

    return (
        <div className="w-full h-50 flex justify-center items-center bg-[var(--menuItemHoverBg)] rounded-[6px]">
            <div className="relative">

                {updation ? (
                    <img
                    className={`h-32 w-32 rounded-lg transition-opacity ${profileImageUpdating ? "opacity-50" : "opacity-100"}`}
                    src={authUser?.profileImage ? authUser.profileImage : selectedImage ? selectedImage : "/images/avatar.png"}
                    alt="Profile"
                />
                ) : (
                    <img
                    className={`h-32 w-32 rounded-lg transition-opacity ${profileImageUpdating ? "opacity-50" : "opacity-100"}`}
                    src={profileImage || "/images/avatar.png"}
                    alt="Profile"
                />
                )}


                {(updation && profileImageUpdating) && (
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg">
                        <Loader className="w-6 h-6 text-white animate-spin" />
                    </div>
                )}

                {updation && (
                    <label
                        htmlFor="avatar-upload"
                        className={`absolute bottom-0 right-0 bg-black opacity-40 bg-base-content hover:scale-105 p-2 cursor-pointer transition-all duration-200 ${profileImageUpdating ? "cursor-not-allowed opacity-30" : "opacity-100"}`}
                    >
                        <Camera className="w-5 h-5 text-white" />
                        <input
                            type="file"
                            id="avatar-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={profileImageUpdating}
                        />
                    </label>
                )}

            </div>
        </div>
    )
}

export default ProfileHead