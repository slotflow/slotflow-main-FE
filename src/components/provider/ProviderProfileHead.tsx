import { useState } from "react";
import { Camera } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { updateProviderProfileImage } from "@/utils/apis/provider.api";
import { toast } from "react-toastify";
import { setProfileImage } from "@/utils/redux/slices/authSlice";

const ProviderProfileHead = () => {
    
    const dispatch = useDispatch<AppDispatch>();
    const authUser = useSelector((store: RootState) => store.auth.authUser);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const isUpdatingProfile = false;
    
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file: File | undefined = e.target.files?.[0];
      if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);

    const formData = new FormData();
    formData.append("profileImage", file);
  
    await dispatch(updateProviderProfileImage(formData))
    .unwrap()
    .then((res) => {
        dispatch(setProfileImage(res.profileImage));
        toast.success(res.message);
    })
    .catch((error) => {
        toast.error(error.message);
    })
    };

    return (
        <div className="w-full h-50 flex justify-center items-center bg-[var(--menuItemHoverBg)] rounded-[6px]">
            <div className="relative">
                <img className="h-32 w-32 rounded-lg" src={authUser?.profileImage ? authUser.profileImage : selectedImage ? selectedImage : '/images/avatar.png'} />
                <label
                    htmlFor="avatar-upload"
                    className={` 
                          absolute bottom-0 right-0  bg-black opacity-40
                          bg-base-content hover:scale-105
                          p-2 cursor-pointer 
                          transition-all duration-200
                          ${isUpdatingProfile
                            ? "animate-pulse pointer-events-none"
                            : ""
                        }
                        `}
                >
                    <Camera className="w-5 h-5 text-white" />
                    <input
                        type="file"
                        id="avatar-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUpdatingProfile}
                    />
                </label>
            </div>
        </div>
    )
}

export default ProviderProfileHead