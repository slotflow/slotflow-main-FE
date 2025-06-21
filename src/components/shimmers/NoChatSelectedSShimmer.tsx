import React from 'react';
import { shimmerMessages } from '@/utils/constants';


const NoChatSelectedSShimmer: React.FC = () => {
    return (
        <div className="flex-1 overflow-y-auto p-4 w-9/12">
            <div className="flex flex-col space-y-1">
                {shimmerMessages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex justify-${msg.align}`}
                    >
                        <div
                            className={`rounded-lg p-2 max-w-xs ${msg.height} ${msg.width} shimmer`}
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NoChatSelectedSShimmer