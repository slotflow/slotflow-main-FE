import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '@/utils/redux/appStore';
import { HandleRoleSelectionFunction } from '@/utils/interface/commonInterface';
import { setsignInForm, setSignUpForm } from '@/utils/redux/slices/signFormSlice';
// import { WomenWithCalendar } from '@/components/svgs/WomenWithCalendar';
import CommonButton from '../CommonButton';

const heroSectionButtons: { text: string, href: string}[] = [
    {
        text: "Book Appointment",
        href: "/user/login"
    },
    {
        text: "Provide Service",
        href: "/provider/login"
    },
]


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
                    <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Your Time, Your Flow Appointments Made Easy.</h1>
                    <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Whether you're a coach, doctor, or stylist, SlotFlow simplifies how your clients book you </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        {heroSectionButtons.map(button => (
                            <CommonButton className='bg-[var(--mainColor)] text-white hover:bg-indigo-400' text={button.text} onClick={() => handleRoleSelection(button.href)} />
                        ))}
                    </div>
                </div>
                <div className='w-6/12  h-full flex items-center'>
                    <div className=''>
                        <img
                            className='rounded-l-lg'
                            src={`/images/heroSectionOneImg${themeMode ? "1" : "2"}.png`}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
{/* <WomenWithCalendar /> */}

export default SectionOne