import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { QrCode, MapPin, Bot, BookOpen, GraduationCap, ArrowRight, RefreshCw, Compass } from 'lucide-react';
import { TabKey } from '../common/NavigationSidebar';

interface HomeModuleProps {
    onSelectTab: (tab: TabKey) => void;
}

const RMK_PHOTOS = [
    '/assets/rmk_photo_1.png',
    '/assets/rmk_photo_2.png',
    '/assets/rmk_photo_3.png'
];

export const HomeModule: React.FC<HomeModuleProps> = ({ onSelectTab }) => {
    const { setQRModalOpen, clearRoute } = useNavigation();
    const [currentPhotoIdx, setCurrentPhotoIdx] = useState<number>(0);
    const [resetTimer, setResetTimer] = useState<number>(45);

    // Photo carousel background crossfade (6-8s interval)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPhotoIdx(prev => (prev + 1) % RMK_PHOTOS.length);
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    // 45-Second Public Kiosk Reset Timer
    useEffect(() => {
        const timerInterval = setInterval(() => {
            setResetTimer(prev => {
                if (prev <= 1) {
                    // Reset user session for public kiosk
                    clearRoute();
                    return 45;
                }
                return prev - 1;
            });
        }, 1000);

        // Global user interaction listener to reset timer
        const handleUserInteraction = () => {
            setResetTimer(45);
        };

        window.addEventListener('click', handleUserInteraction);
        window.addEventListener('touchstart', handleUserInteraction);
        window.addEventListener('keydown', handleUserInteraction);

        return () => {
            clearInterval(timerInterval);
            window.removeEventListener('click', handleUserInteraction);
            window.removeEventListener('touchstart', handleUserInteraction);
            window.removeEventListener('keydown', handleUserInteraction);
        };
    }, [clearRoute]);

    return (
        <div className="relative w-full min-h-[calc(100vh-130px)] rounded-3xl overflow-hidden flex flex-col justify-between p-6 select-none shadow-2xl">
            {/* FULL SCREEN PHOTO CAROUSEL BACKGROUND WITH DARK RMK GREEN OVERLAY */}
            <div className="absolute inset-0 z-0">
                {RMK_PHOTOS.map((photo, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${idx === currentPhotoIdx ? 'opacity-100' : 'opacity-0'
                            }`}
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 75, 62, 0.76), rgba(0, 32, 26, 0.84)), url(${photo})`
                        }}
                    />
                ))}
            </div>

            {/* MAIN HERO CONTENT & 4 OPTIONS */}
            <div className="relative z-10 space-y-6 max-w-5xl mx-auto w-full pt-4">

                {/* QR QUICK ACCESS BUTTON */}
                <div className="flex justify-center">
                    <button
                        onClick={() => setQRModalOpen(true)}
                        className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/30 backdrop-blur-md text-xs font-black tracking-wider uppercase flex items-center gap-2 transition-all shadow-lg active:scale-95 group"
                    >
                        <QrCode className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
                        <span>▦ SCAN QR FOR QUICK ACCESS</span>
                    </button>
                </div>

                {/* HERO WELCOME HEADINGS */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight font-serif drop-shadow-md">
                        Welcome to R.M.K. Engineering College
                    </h1>
                    <h2 className="text-xl md:text-2xl font-extrabold text-amber-300 tracking-wide uppercase">
                        AI Campus Concierge
                    </h2>
                    <p className="text-lg md:text-xl font-bold text-white/90">
                        How Can We Help You?
                    </p>
                    <p className="text-xs text-emerald-200/80 font-medium">
                        Your smart guide to the RMK campus
                    </p>
                </div>

                {/* FOUR MAIN OPTIONS (2x2 GRID CARDS) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    {/* CARD 1: CAMPUS PATHFINDER */}
                    <div
                        onClick={() => onSelectTab('navigation')}
                        className="p-6 rmk-translucent-card rounded-3xl cursor-pointer flex flex-col justify-between group shadow-2xl"
                    >
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="p-3.5 bg-[#009677]/30 border border-emerald-400/40 text-emerald-300 rounded-2xl">
                                    <MapPin className="w-7 h-7" />
                                </div>
                                <span className="text-xs font-black text-amber-300 tracking-widest uppercase">01</span>
                            </div>
                            <h3 className="text-xl font-black text-white mt-4 tracking-tight flex items-center gap-2">
                                <span>🗺️ CAMPUS PATHFINDER</span>
                            </h3>
                            <p className="text-xs text-slate-200/90 mt-1.5 leading-relaxed font-medium">
                                Find buildings, departments, laboratories and campus facilities with interactive 2D map pathfinding.
                            </p>
                        </div>

                        <div className="mt-6 flex items-center justify-between pt-3 border-t border-white/10">
                            <span className="text-xs font-black text-white group-hover:text-amber-300 transition-colors uppercase tracking-wider">
                                EXPLORE CAMPUS
                            </span>
                            <ArrowRight className="w-4 h-4 text-emerald-300 arrow-icon transition-transform" />
                        </div>
                    </div>

                    {/* CARD 2: ASK RMK AI */}
                    <div
                        onClick={() => onSelectTab('ai')}
                        className="p-6 rmk-translucent-card rounded-3xl cursor-pointer flex flex-col justify-between group shadow-2xl"
                    >
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="p-3.5 bg-amber-500/20 border border-amber-400/40 text-amber-300 rounded-2xl">
                                    <Bot className="w-7 h-7" />
                                </div>
                                <span className="text-xs font-black text-amber-300 tracking-widest uppercase">02</span>
                            </div>
                            <h3 className="text-xl font-black text-white mt-4 tracking-tight flex items-center gap-2">
                                <span>🤖 ASK RMK AI</span>
                            </h3>
                            <p className="text-xs text-slate-200/90 mt-1.5 leading-relaxed font-medium">
                                Ask our intelligent campus assistant for instant information, department locations, and directions.
                            </p>
                        </div>

                        <div className="mt-6 flex items-center justify-between pt-3 border-t border-white/10">
                            <span className="text-xs font-black text-white group-hover:text-amber-300 transition-colors uppercase tracking-wider">
                                ASK RMK AI
                            </span>
                            <ArrowRight className="w-4 h-4 text-amber-300 arrow-icon transition-transform" />
                        </div>
                    </div>

                    {/* CARD 3: CAMPUS FACILITIES */}
                    <div
                        onClick={() => onSelectTab('navigation')}
                        className="p-6 rmk-translucent-card rounded-3xl cursor-pointer flex flex-col justify-between group shadow-2xl"
                    >
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="p-3.5 bg-[#009677]/30 border border-emerald-400/40 text-emerald-300 rounded-2xl">
                                    <BookOpen className="w-7 h-7" />
                                </div>
                                <span className="text-xs font-black text-amber-300 tracking-widest uppercase">03</span>
                            </div>
                            <h3 className="text-xl font-black text-white mt-4 tracking-tight flex items-center gap-2">
                                <span>🏫 CAMPUS FACILITIES</span>
                            </h3>
                            <p className="text-xs text-slate-200/90 mt-1.5 leading-relaxed font-medium">
                                Explore the library, central computer centre, hostels, auditorium, sports complex and campus services.
                            </p>
                        </div>

                        <div className="mt-6 flex items-center justify-between pt-3 border-t border-white/10">
                            <span className="text-xs font-black text-white group-hover:text-amber-300 transition-colors uppercase tracking-wider">
                                EXPLORE FACILITIES
                            </span>
                            <ArrowRight className="w-4 h-4 text-emerald-300 arrow-icon transition-transform" />
                        </div>
                    </div>

                    {/* CARD 4: ADMISSIONS & GUIDES */}
                    <div
                        onClick={() => onSelectTab('admissions')}
                        className="p-6 rmk-translucent-card rounded-3xl cursor-pointer flex flex-col justify-between group shadow-2xl"
                    >
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="p-3.5 bg-amber-500/20 border border-amber-400/40 text-amber-300 rounded-2xl">
                                    <GraduationCap className="w-7 h-7" />
                                </div>
                                <span className="text-xs font-black text-amber-300 tracking-widest uppercase">04</span>
                            </div>
                            <h3 className="text-xl font-black text-white mt-4 tracking-tight flex items-center gap-2">
                                <span>🎓 ADMISSIONS & GUIDES</span>
                            </h3>
                            <p className="text-xs text-slate-200/90 mt-1.5 leading-relaxed font-medium">
                                Explore admissions, academic programs, campus information and visitor navigation guides.
                            </p>
                        </div>

                        <div className="mt-6 flex items-center justify-between pt-3 border-t border-white/10">
                            <span className="text-xs font-black text-white group-hover:text-amber-300 transition-colors uppercase tracking-wider">
                                VIEW GUIDES
                            </span>
                            <ArrowRight className="w-4 h-4 text-amber-300 arrow-icon transition-transform" />
                        </div>
                    </div>
                </div>
            </div>

            {/* HOW DOES THIS WORK? (3 SIMPLE STEPS) & RESET TIMER */}
            <div className="relative z-10 max-w-5xl mx-auto w-full pt-6 pb-2 space-y-4">
                <div className="text-center">
                    <h3 className="text-base font-extrabold text-white uppercase tracking-wider">
                        How Does This Work?
                    </h3>
                    <p className="text-[11px] text-amber-300 font-extrabold tracking-widest uppercase mt-0.5">
                        3 SIMPLE STEPS TO GET STARTED
                    </p>
                </div>

                {/* THREE CLEAN COLUMNS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10">
                        <span className="text-base font-black text-emerald-400 block">01</span>
                        <h4 className="text-xs font-extrabold text-white mt-0.5 uppercase">Choose an Option</h4>
                        <p className="text-[11px] text-slate-200 mt-1">Select a campus service or ask RMK AI.</p>
                    </div>

                    <div className="p-3 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10">
                        <span className="text-base font-black text-amber-400 block">02</span>
                        <h4 className="text-xs font-extrabold text-white mt-0.5 uppercase">Explore Campus</h4>
                        <p className="text-[11px] text-slate-200 mt-1">Find places, facilities and walking directions.</p>
                    </div>

                    <div className="p-3 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10">
                        <span className="text-base font-black text-emerald-400 block">03</span>
                        <h4 className="text-xs font-extrabold text-white mt-0.5 uppercase">Scan & Continue</h4>
                        <p className="text-[11px] text-slate-200 mt-1">Take your route or information on your phone.</p>
                    </div>
                </div>

                {/* BOTTOM CONTROL BAR: CAROUSEL DOTS & RESET TIMER */}
                <div className="flex items-center justify-between pt-2">
                    {/* Carousel Dots */}
                    <div className="flex items-center gap-1.5">
                        {RMK_PHOTOS.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentPhotoIdx(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${idx === currentPhotoIdx ? 'bg-amber-300 w-5' : 'bg-white/40 hover:bg-white/70'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Reset Timer Pill */}
                    <div className="px-3.5 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/20 text-[11px] text-white font-mono font-bold flex items-center gap-2 shadow-lg">
                        <RefreshCw className="w-3 h-3 text-emerald-400 animate-spin-slow" />
                        <span>Screen resets in {resetTimer}s</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
