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

        <div className={` ${filterSideBarOpen ? 'w-[15%]' : 'w-[0%]'} overflow-y-scroll no-scrollbar border-l-2 transition-all duration-300 flex flex-col`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={onClose}>
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
    );
};

export default FilterRightSideBar;
