import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigation } from '../../context/NavigationContext';
import { X, Smartphone, CheckCircle, ArrowRight } from 'lucide-react';

export const QRHandoffModal: React.FC = () => {
    const { isQRModalOpen, setQRModalOpen, activeRoute, selectedBuilding } = useNavigation();

    if (!isQRModalOpen) return null;

    const mobilePayloadUrl = activeRoute
        ? `https://campus-concierge.edu/navigate?from=${activeRoute.fromNodeId}&to=${activeRoute.toNodeId}&bldg=${selectedBuilding.id}`
        : `https://campus-concierge.edu/kiosk-session?bldg=${selectedBuilding.id}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-md p-6 border rounded-3xl glass-panel bg-slate-900/90 border-slate-700/80 shadow-2xl text-center">
                <button
                    onClick={() => setQRModalOpen(false)}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/60 rounded-full transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-2xl text-sky-400">
                        <Smartphone className="w-10 h-10" />
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">Mobile Route Handoff</h3>
                <p className="mt-1 text-sm text-slate-300">
                    Scan with your phone camera to take this guided walking navigation with you on the go!
                </p>

                <div className="my-6 p-5 bg-white rounded-2xl flex items-center justify-center shadow-inner mx-auto w-fit">
                    <QRCodeSVG value={mobilePayloadUrl} size={200} level="H" includeMargin={true} />
                </div>

                {activeRoute && (
                    <div className="p-3 bg-slate-800/80 border border-slate-700/60 rounded-xl text-left text-xs text-slate-300 space-y-1 mb-6">
                        <div className="flex items-center gap-2 text-sky-400 font-semibold">
                            <CheckCircle className="w-4 h-4" />
                            <span>Route Active: {activeRoute.fromBuilding.code} → {activeRoute.toBuilding.code}</span>
                        </div>
                        <p>Distance: {activeRoute.totalDistanceMeters} meters (~{activeRoute.estimatedWalkingMinutes} min walk)</p>
                    </div>
                )}

                <button
                    onClick={() => setQRModalOpen(false)}
                    className="w-full py-3.5 px-6 font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-2xl transition-all shadow-lg glow-sky flex items-center justify-center gap-2"
                >
                    <span>Done / Close Kiosk QR</span>
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};
