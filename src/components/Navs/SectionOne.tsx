import { useCallback } from 'react';
import RoleButton from './RoleButton';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '@/utils/redux/appStore';
import { HandleRoleSelectionFunction } from '@/utils/interface/commonInterface';
import { setsignInForm, setSignUpForm } from '@/utils/redux/slices/signFormSlice';


const SectionOne = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleRoleSelection = useCallback<HandleRoleSelectionFunction>(
        (url: string) => {
            dispatch(setSignUpForm(false));
            dispatch(setsignInForm(true));
            navigate(url)
        },
        [dispatch, navigate]
    );

    return (
        <div className="h-screen flex justify-center items-center bg-[var(--background)] space-x-2">
            <RoleButton onClick={() => handleRoleSelection("/user/login")}>
                Book Appointment
            </RoleButton>
            <RoleButton onClick={() => handleRoleSelection("/provider/login")}>
                Provide Service
            </RoleButton>
        </div>
    )
}

export default SectionOne