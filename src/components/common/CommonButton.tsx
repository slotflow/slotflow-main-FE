import React from 'react';
import { CommonButtonProps } from '@/utils/interface/commonInterface';

const CommonButton: React.FC<CommonButtonProps> = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="py-1 px-2 md:py-1 text-xs sm:text-xs md:text-sm lg:text-lg border border-[var(--mainColor)] rounded-md shadow-md hover:bg-[var(--mainColor)] hover:text-white cursor-pointer"
    >
      {text}
    </button>
  )
}

export default CommonButton