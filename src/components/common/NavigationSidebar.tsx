import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
    Home,
    MapPin,
    Bot,
    Users,
    Bus,
    BedDouble,
    GraduationCap,
    Calendar,
    BookOpen
} from 'lucide-react';

export type TabKey =
    | 'home'
    | 'navigation'
    | 'ai'
    | 'faculty'
    | 'bus'
    | 'hostel'
    | 'admissions'
    | 'events'
    | 'guide'
    | 'analytics'
    | 'admin';

interface SidebarProps {
    activeTab: TabKey;
    setActiveTab: (tab: TabKey) => void;
}

export const NavigationSidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    const { t } = useLanguage();

    const navItems: { key: TabKey; label: string; icon: React.ElementType }[] = [
        { key: 'home', label: 'Home Overview', icon: Home },
        { key: 'navigation', label: 'Campus Map & 3D Route', icon: MapPin },
        { key: 'ai', label: 'AI Assistant', icon: Bot },
        { key: 'faculty', label: 'Faculty Finder', icon: Users },
        { key: 'bus', label: 'Bus Routes & Live Status', icon: Bus },
        { key: 'hostel', label: 'Hostel & Mess Menu', icon: BedDouble },
        { key: 'admissions', label: 'Admissions & Courses', icon: GraduationCap },
        { key: 'events', label: 'Events & Hackathons', icon: Calendar },
        { key: 'guide', label: 'Student & Parent Guide', icon: BookOpen }
    ];

    return (
        <aside className="w-64 bg-[#051811] border-r border-emerald-950 p-4 flex flex-col justify-between select-none shadow-2xl z-20">
            <div className="space-y-1.5 overflow-y-auto pr-1 max-h-[calc(100vh-140px)] scrollbar-thin">
                <span className="text-[10px] font-extrabold text-emerald-400/70 uppercase tracking-widest px-3 block mb-3">
                    KIOSK NAVIGATION
                </span>

                {navItems.map(item => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.key;

                    return (
                        <button
                            key={item.key}
                            onClick={() => setActiveTab(item.key)}
                            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all ${isActive
                                    ? 'bg-[#0f382a] text-white border border-emerald-500/40 shadow-lg shadow-emerald-950/60'
                                    : 'text-slate-200 hover:text-white hover:bg-[#09261c] border border-transparent'
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-sky-300' : 'text-sky-400'}`} />
                            <span className="truncate">{item.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Footer Kiosk Info Box */}
            <div className="pt-4 border-t border-emerald-900/40">
                <div className="p-3.5 bg-[#03110b] rounded-2xl border border-emerald-900/80 text-center shadow-inner">
                    <p className="font-extrabold text-xs text-white">Main Gate Touch Kiosk</p>
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">24/7 Self-Service System</span>
                </div>
            </div>
        </aside>
    );
};
