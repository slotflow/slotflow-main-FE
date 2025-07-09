import React from 'react';
import { X } from 'lucide-react';
import { useSelector } from 'react-redux';
import CommonButton from '../common/CommonButton';
import { RootState } from '@/utils/redux/appStore';

interface FilterRightSideBarProps {
    onClose: () => void;
}

const FilterRightSideBar: React.FC<FilterRightSideBarProps> = ({ onClose }) => {

    const filterSideBarOpen: boolean = useSelector((store: RootState) => store.state.filterSideBarOpen);
    return (
        <div className={` ${filterSideBarOpen ? 'w-[20%]' : 'w-[0%]'} overflow-y-scroll no-scrollbar border-l-2 transition-all duration-300 flex flex-col absolute right-0 top-0 bg-[var(--background)] h-full border-t-2`}>
            <div className='p-4'>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button onClick={onClose} className="cursor-pointer">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    <CommonButton text='Filter One' />
                    <CommonButton text='Filter Two' />
                    <CommonButton text='Filter Three' />
                    <CommonButton text='Filter Four' />
                </div>
            </div>
        </div>
    );
};

export default FilterRightSideBar;
