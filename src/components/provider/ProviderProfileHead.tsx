import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/appStore";

const ProviderProfileHead = () => {

    const themeMode = useSelector((store: RootState) => store.state.lightTheme);
    const authUser = useSelector((store: RootState) => store.auth.authUser);

    return (
        <div className="w-full h-50 flex justify-center items-center bg-[var(--menuItemHoverBg)] rounded-[6px]">
            <img className={`h-32 w-32 rounded-full ${!themeMode && "invert"}`} src={authUser?.profileImage || '/images/avatar.png'} />
        </div>
    )
}

export default ProviderProfileHead