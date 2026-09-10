import React from 'react';

export const CampusMap2D: React.FC = () => {
    return (
        <div className="w-full h-[800px] rounded-2xl overflow-hidden border border-emerald-800/80 shadow-2xl bg-[#0E3B22]">
            <iframe
                src="/rmk_campus_router.html"
                title="RMK Campus Navigation & Wayfinding Router"
                className="w-full h-full border-0"
            />
        </div>
    );
};
