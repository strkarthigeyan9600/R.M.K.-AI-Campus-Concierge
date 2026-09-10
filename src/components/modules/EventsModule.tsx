import React from 'react';
import { CAMPUS_EVENTS } from '../../data/mockData';
import { Calendar, Trophy, Briefcase, MapPin, User, CheckCircle2 } from 'lucide-react';

export const EventsModule: React.FC = () => {
    return (
        <div className="space-y-6 select-none">
            <div className="glass-panel border border-slate-700/80 rounded-3xl p-6">
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-purple-400" />
                    <span>Campus Events & Hackathons Calendar</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Seminars, workshops, placement drives, and cultural festivals</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CAMPUS_EVENTS.map(evt => (
                    <div key={evt.id} className="glass-panel border border-slate-700/80 rounded-3xl p-6 flex flex-col justify-between glass-card-hover">
                        <div>
                            <div className="flex items-center justify-between">
                                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 font-bold rounded-xl border border-purple-500/30 text-xs">
                                    {evt.category}
                                </span>
                                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-bold">
                                    Registration: {evt.registrationStatus}
                                </span>
                            </div>

                            <h4 className="text-lg font-bold text-white mt-3">{evt.title}</h4>
                            <p className="text-xs text-slate-300 mt-2 leading-relaxed">{evt.description}</p>

                            <div className="mt-4 space-y-2 text-xs text-slate-300">
                                <div className="flex items-center gap-2 p-2 bg-slate-900/80 rounded-xl border border-slate-800">
                                    <Calendar className="w-4 h-4 text-sky-400 shrink-0" />
                                    <span>{evt.date}</span>
                                </div>
                                <div className="flex items-center gap-2 p-2 bg-slate-900/80 rounded-xl border border-slate-800">
                                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>{evt.location}</span>
                                </div>
                                {evt.speaker && (
                                    <div className="flex items-center gap-2 p-2 bg-slate-900/80 rounded-xl border border-slate-800">
                                        <User className="w-4 h-4 text-amber-400 shrink-0" />
                                        <span>Keynote Speaker: {evt.speaker}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button className="mt-6 w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Add to Schedule / Register</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
