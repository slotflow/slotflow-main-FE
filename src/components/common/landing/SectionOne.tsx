import { useCallback } from 'react';
import CommonButton from '../CommonButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { heroSectionButtons } from '@/utils/constants';
import { AppDispatch, RootState } from '@/utils/redux/appStore';
import heroImage1 from '../../../assets/heroImages/heroSectionOneImg1.png';
import heroImage2 from '../../../assets/heroImages/heroSectionOneImg2.png';
import { HandleRoleSelectionFunction } from '@/utils/interface/commonInterface';
import { setsignInForm, setSignUpForm } from '@/utils/redux/slices/signFormSlice';

const SectionOne = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const themeMode = useSelector((store: RootState) => store.state.lightTheme);

    const handleRoleSelection = useCallback<HandleRoleSelectionFunction>(
        (url: string) => {
            dispatch(setSignUpForm(false));
            dispatch(setsignInForm(true));
            navigate(url)
        },
        [dispatch, navigate]
    );

    return (
        <section id="home" className="w-full bg-[var(--background)] space-x-2 transition-colors duration-300 ease-in-out">
            <div className='mx-auto flex justify-between items-center max-w-7xl px-4 lg:px-0 h-screen'>
                <div className='w-5/12'>
                    <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">Your Time, Your Flow Appointments Made Easy.</h1>
                    <p className="mt-8 text-lg font-medium text-pretty sm:text-xl/8">Whether you're a coach, doctor, or stylist, SlotFlow simplifies how your clients book you </p>
                    <div className="mt-10 flex gap-x-6">
                        {heroSectionButtons.map(button => (
                            <CommonButton key={button.text} className='bg-[var(--mainColor)] text-white hover:bg-indigo-400' text={button.text} onClick={() => handleRoleSelection(button.href)} />
                        ))}
                    </div>
                </div>
                <div className='w-6/12  h-full flex items-center'>
                    <div className=''>
                        <img
                            className='rounded-lg border-2 hover:border-[var(--mainColor)]'
                            src={themeMode ? heroImage1 : heroImage2}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionOne