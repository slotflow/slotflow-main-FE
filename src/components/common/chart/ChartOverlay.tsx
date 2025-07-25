import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/redux/appStore';

interface ChartOverlay {
    stringOne: string;
}

const ChartOverlay: React.FC<ChartOverlay> = ({
    stringOne
}) => {

    const themeMode = useSelector((store: RootState) => store.state.lightTheme);

    return (
        <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-xs ${themeMode ? "bg-white/70" : "bg-black/70"}`}>
            <div className="text-center">
                <div className="text-lg font-semibold mb-2">Upgrade Required</div>
                <div className="text-sm text-muted-foreground mb-4">This chart is available on {stringOne} plan and above</div>
                <button className="px-4 py-1 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition">
                    Upgrade Plan
                </button>
            </div>
        </div>
    )
}

export default ChartOverlay