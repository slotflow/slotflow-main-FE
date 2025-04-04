import React from 'react';
import { CommonButtonProps } from '@/utils/interface/commonInterface';

const CommonButton: React.FC<CommonButtonProps> = ({ onClick, text, type }) => {
  return (
    <button
      onClick={onClick}
      className={`type-${type} py-1 px-2 md:py-2 md:px-6 text-xs sm:text-xs md:text-sm lg:text-[16px] border border-[var(--mainColor)] rounded-md shadow-md hover:bg-[var(--mainColor)] hover:text-white cursor-pointer`}
    >
      {text}
    </button>
  )
}

export default CommonButton