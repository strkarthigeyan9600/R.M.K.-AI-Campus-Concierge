import React from 'react';
import { TabKey } from './NavigationSidebar';
import { ShieldAlert, CloudSun, Clock } from 'lucide-react';

interface HeaderProps {
    activeTab: TabKey;
    setActiveTab: (tab: TabKey) => void;
    onEmergencyClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onEmergencyClick }) => {
    return (
        <header className="w-full px-6 py-3 bg-[#009677] text-white flex items-center justify-between z-30 select-none shadow-md border-b border-[#008066]">
            {/* Top-Left: RMK Logo Crest & Official Institution Name */}
            <div
                onClick={() => setActiveTab('home')}
                className="flex items-center gap-3.5 cursor-pointer transition-transform hover:scale-[1.01]"
                title="Return to RMK Campus Concierge Home"
            >
                <img
                    src="/assets/rmk_logo.png"
                    alt="R.M.K. Engineering College Logo"
                    className="h-16 w-auto object-contain max-h-[68px] filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] shrink-0"
                />
                <div className="flex flex-col justify-center text-white font-sans select-none">
                    <span className="font-extrabold text-[16px] sm:text-[18px] tracking-tight uppercase text-white leading-[1.1]">
                        R.M.K.
                    </span>
                    <span className="font-extrabold text-[16px] sm:text-[18px] tracking-tight uppercase text-white leading-[1.1]">
                        ENGINEERING
                    </span>
                    <span className="font-extrabold text-[16px] sm:text-[18px] tracking-tight uppercase text-white leading-[1.1]">
                        COLLEGE
                    </span>
                    <span className="font-bold text-[10px] sm:text-[11px] tracking-wide text-white/95 leading-tight mt-0.5">
                        (AN AUTONOMOUS INSTITUTION)
                    </span>
                </div>
            </div>

            {/* Top-Right: Weather, Clock & Emergency SOS Button (MENU Button removed per user request) */}
            <div className="flex items-center gap-3">
                {/* Weather Widget */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#008066]/70 border border-white/20 rounded-xl text-xs">
                    <CloudSun className="w-4 h-4 text-amber-300 shrink-0" />
                    <div>
                        <span className="font-bold text-white block text-[11px] leading-tight">31°C / Sunny</span>
                        <span className="text-[9px] text-emerald-100">RSM Nagar Plaza</span>
                    </div>
                </div>

                {/* Digital Clock */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#008066]/70 border border-white/20 rounded-xl text-xs">
                    <Clock className="w-4 h-4 text-amber-300 shrink-0" />
                    <div>
                        <span className="font-bold text-white font-mono text-xs block leading-tight">07:25 PM</span>
                        <span className="text-[9px] text-emerald-100">Kavaraipettai, TN</span>
                    </div>
                </div>

                {/* Emergency SOS Button */}
                <button
                    onClick={onEmergencyClick}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 border border-rose-400/40 cursor-pointer"
                >
                    <ShieldAlert className="w-4 h-4" />
                    <span>EMERGENCY SOS</span>
                </button>
            </div>
        </header>
    );
};
