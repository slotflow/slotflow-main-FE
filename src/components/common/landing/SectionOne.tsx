import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import world from '../../../assets/svgs/world2.svg';
import { useDispatch, useSelector } from "react-redux";
import { setAuthModal } from "@/utils/redux/slices/stateSlice";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import AuthSelectionModal from "@/components/common/landing/AuthSelectionModal";

const SectionOne = () => {

    const dispatch = useDispatch<AppDispatch>();
    const buttonsRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    const state = useSelector((state: RootState) => state.state);

    useEffect(() => {
        if (headingRef.current) {
            gsap.fromTo(
                headingRef.current,
                { scale: 0.5, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                }
            );
        }

        if (buttonsRef.current) {
            const buttons = buttonsRef.current.querySelectorAll("button");
            gsap.fromTo(
                buttons,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                    delay: 0.8,
                }
            );
        }
    }, []);

    const handleCloseModal = () => {
        dispatch(setAuthModal(false));
    };

    return (
        <section
            id="home"
            className="w-full bg-[var(--background)] space-x-2 transition-colors duration-300 ease-in-out"
        >
            {state.authModal && <AuthSelectionModal onClose={handleCloseModal} />}
            <div className="mx-auto flex flex-col justify-center items-center max-w-7xl px-4 lg:px-0 h-screen text-center">
                <img
                    src={world}
                    className="absolute opacity-30 h-[80%]"
                />
                <h1
                    ref={headingRef}
                    className="text-[var(--mainColor)] text-7xl md:text-9xl font-bold"
                >
                    SLOTFLOW
                </h1>
            </div>
        </section>
    );
};

export default SectionOne;
