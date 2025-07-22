import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import React, { ReactElement, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeftCircle, Moon, Sun } from 'lucide-react';
import { toggleTheme } from '@/utils/redux/slices/stateSlice';
import { AppDispatch, RootState } from '@/utils/redux/appStore';
import { gsapBigSvgYDirectionAnimation } from '@/utils/constants';

interface LeftSideBoxProps {
    svg?: ReactElement;
    animateSvg?: boolean;
}

const LeftSideBox: React.FC<LeftSideBoxProps> = ({
    svg,
    animateSvg = false,
}) => {

    const dispatch = useDispatch<AppDispatch>();
    const svgRef = useRef<HTMLDivElement>(null);
    const themeMode: boolean = useSelector((store: RootState) => store.state.lightTheme);
    const navigate = useNavigate();


    const changeTheme = (): void => {
        dispatch(toggleTheme());
    }

    const handleGotoBack = (): void => {
        navigate("/");
    }

    useEffect(() => {
        if (animateSvg && svgRef.current) {
            gsap.to(svgRef.current, gsapBigSvgYDirectionAnimation);
        }
    }, [animateSvg]);

    useEffect(() => {
        if (themeMode) {
          document.documentElement.classList.remove('dark');
        } else {
          document.documentElement.classList.add('dark');
        }
      }, [themeMode]);

    return (
        <div className="md:w-1/2 h-full flex flex-col bg-purple-200 dark:bg-purple-300">

            <div className="p-2">
                <div className={`flex h-16 items-center justify-between`}>
                    <div className='w-3/12'>
                        <h4 className="text-[var(--mainColor)] text-3xl font-bold italic hover:bg-[var(--mainColor)] hover:text-white px-2 rounded-lg cursor-pointer">Slotflow</h4>
                    </div>
                    <div className='w-3/12 flex justify-end'>
                        {!themeMode ?
                            <div className="relative flex rounded-full cursor-pointer mx-3 text-white" onClick={changeTheme}>
                                <Sun />
                            </div>
                            :
                            <div className="relative flex rounded-full cursor-pointer mx-3 text-white" onClick={changeTheme}>
                                <Moon />
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center flex-grow" ref={svgRef} >
                {svg}
            </div>

            <div className='p-4'>
                <ArrowLeftCircle className='cursor-pointer text-white' onClick={handleGotoBack}/>
            </div>
        </div>
    );
};

export default LeftSideBox;
