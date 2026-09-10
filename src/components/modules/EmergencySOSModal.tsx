import React from 'react';
import { X, ShieldAlert, PhoneCall, HeartPulse, Flame, Siren, Navigation } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export const EmergencySOSModal: React.FC<{ isOpen: boolean; onClose: () => void; onNavigateToMap: () => void }> = ({
    isOpen,
    onClose,
    onNavigateToMap
}) => {
    const { setTargetDestination } = useNavigation();

    if (!isOpen) return null;

    const handleTriggerHealthCenterNav = () => {
        setTargetDestination('b-health');
        onClose();
        onNavigateToMap();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in select-none">
            <div className="relative w-full max-w-xl p-8 border-2 border-rose-500/80 rounded-3xl bg-slate-950/95 shadow-2xl text-slate-100 glow-rose">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="flex items-center gap-3 text-rose-500 mb-2">
                    <ShieldAlert className="w-10 h-10 animate-bounce" />
                    <h3 className="text-3xl font-black uppercase tracking-tight text-white">EMERGENCY SOS ALERT</h3>
                </div>
                <p className="text-xs text-rose-300 font-semibold mb-6">
                    Pressing any button below triggers immediate campus security dispatch & emergency alert.
                </p>

                {/* Emergency Hotline Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-rose-950/60 border border-rose-500/50 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Siren className="w-8 h-8 text-rose-400" />
                            <div>
                                <h4 className="font-extrabold text-white text-sm">Campus Security</h4>
                                <span className="text-xs text-rose-300 font-mono">+1 (555) 911-CAMPUS</span>
                            </div>
                        </div>
                        <PhoneCall className="w-5 h-5 text-rose-400" />
                    </div>

                    <div className="p-4 bg-rose-950/60 border border-rose-500/50 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <HeartPulse className="w-8 h-8 text-rose-400" />
                            <div>
                                <h4 className="font-extrabold text-white text-sm">24/7 Ambulance</h4>
                                <span className="text-xs text-rose-300 font-mono">+1 (555) 911-AMB</span>
                            </div>
                        </div>
                        <PhoneCall className="w-5 h-5 text-rose-400" />
                    </div>
                </div>

                {/* Direct Hospital Navigation */}
                <button
                    onClick={handleTriggerHealthCenterNav}
                    className="w-full py-4 px-6 bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-extrabold rounded-2xl text-sm flex items-center justify-center gap-3 shadow-xl glow-rose transition-all"
                >
                    <Navigation className="w-5 h-5" />
                    <span>Immediate Route to Campus Medical Center</span>
                </button>
            </div>
        </div>
    );
};
