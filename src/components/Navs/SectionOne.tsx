import { AppDispatch } from '@/utils/redux/appStore';
import { setsignInForm, setSignUpForm } from '@/utils/redux/slices/signFormSlice';
import { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RoleButton from './RoleButton';

const SectionOne = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleRoleSelection = useCallback(
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