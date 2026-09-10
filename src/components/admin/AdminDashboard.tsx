import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BUILDINGS, FACULTY_MEMBERS, CAMPUS_EVENTS, BUS_ROUTES } from '../../data/mockData';
import { KNOWLEDGE_CORPUS } from '../../services/ragEngine';
import { Lock, LogOut, Plus, Trash2, Edit3, ShieldCheck, Database, Server, Key, AlertCircle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
    const { role, userName, loginAsAdmin, logout } = useAuth();
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [activeAdminTab, setActiveAdminTab] = useState<'buildings' | 'faculty' | 'events' | 'knowledge'>('buildings');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (usernameInput === 'admin' && passwordInput === 'admin123') {
            loginAsAdmin('jwt-token-12389', 'Super Admin');
            setErrorMsg('');
        } else {
            setErrorMsg('Invalid Admin credentials! Use admin / admin123');
        }
    };

    if (role !== 'admin') {
        return (
            <div className="w-full max-w-md mx-auto py-12 select-none">
                <div className="glass-panel border border-slate-700/80 rounded-3xl p-8 shadow-2xl text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-sky-500/20 text-sky-400 rounded-2xl border border-sky-500/30">
                            <Lock className="w-8 h-8" />
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white tracking-tight">Admin Control Panel</h3>
                    <p className="text-xs text-slate-400 mt-1 mb-6">Enter administrative credentials to manage campus data & RAG index</p>

                    {errorMsg && (
                        <div className="p-3 mb-4 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-xl text-xs flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{errorMsg}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4 text-left">
                        <div>
                            <label className="text-xs font-bold text-slate-300 block mb-1">Admin Username</label>
                            <input
                                type="text"
                                value={usernameInput}
                                onChange={e => setUsernameInput(e.target.value)}
                                placeholder="admin"
                                className="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-sm text-white focus:outline-none focus:border-sky-500"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-300 block mb-1">Password</label>
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={e => setPasswordInput(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-sm text-white focus:outline-none focus:border-sky-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-2xl text-xs shadow-lg glow-sky transition-all mt-2"
                        >
                            Authenticate & Unlock Admin Panel
                        </button>
                    </form>

                    <p className="text-[11px] text-slate-500 mt-4">Demo Admin: <strong>admin</strong> / <strong>admin123</strong></p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 select-none">
            {/* Admin Header */}
            <div className="glass-panel border border-slate-700/80 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-white tracking-tight">Admin System Control Panel</h3>
                        <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-full border border-emerald-500/30 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> Authenticated: {userName}
                        </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">Manage buildings, faculty, campus events, and RAG knowledge base corpus</p>
                </div>

                <button
                    onClick={logout}
                    className="px-4 py-2 bg-slate-900 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-500/40 rounded-2xl text-xs font-bold transition-all flex items-center gap-2"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                </button>
            </div>

            {/* Admin Sub Tabs */}
            <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-700/80 w-fit">
                <button
                    onClick={() => setActiveAdminTab('buildings')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeAdminTab === 'buildings' ? 'bg-sky-600 text-white shadow-md glow-sky' : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    Buildings ({BUILDINGS.length})
                </button>
                <button
                    onClick={() => setActiveAdminTab('faculty')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeAdminTab === 'faculty' ? 'bg-sky-600 text-white shadow-md glow-sky' : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    Faculty ({FACULTY_MEMBERS.length})
                </button>
                <button
                    onClick={() => setActiveAdminTab('events')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeAdminTab === 'events' ? 'bg-sky-600 text-white shadow-md glow-sky' : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    Events ({CAMPUS_EVENTS.length})
                </button>
                <button
                    onClick={() => setActiveAdminTab('knowledge')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeAdminTab === 'knowledge' ? 'bg-sky-600 text-white shadow-md glow-sky' : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    RAG Knowledge Base ({KNOWLEDGE_CORPUS.length})
                </button>
            </div>

            {/* Tab Content */}
            <div className="glass-panel border border-slate-700/80 rounded-3xl p-6">
                {activeAdminTab === 'buildings' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-base font-bold text-white">Campus Building Records</h4>
                            <button className="px-3.5 py-2 bg-sky-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5">
                                <Plus className="w-4 h-4" /> Add Building
                            </button>
                        </div>

                        <div className="space-y-2">
                            {BUILDINGS.map(bldg => (
                                <div key={bldg.id} className="p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                                    <div>
                                        <span className="font-bold text-white">{bldg.name} ({bldg.code})</span>
                                        <p className="text-slate-400 text-[11px]">{bldg.category.toUpperCase()} • {bldg.floorCount} Floors</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 bg-slate-800 text-rose-400 hover:text-rose-300 rounded-lg">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeAdminTab === 'knowledge' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-base font-bold text-white flex items-center gap-2">
                                <Database className="w-5 h-5 text-sky-400" />
                                <span>Vector / Grounded RAG Knowledge Articles</span>
                            </h4>
                            <button className="px-3.5 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5">
                                <Plus className="w-4 h-4" /> Index New Article
                            </button>
                        </div>

                        <div className="space-y-3">
                            {KNOWLEDGE_CORPUS.map(kb => (
                                <div key={kb.id} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1 text-xs">
                                    <div className="flex items-center justify-between">
                                        <h5 className="font-bold text-white">{kb.title}</h5>
                                        <span className="px-2 py-0.5 bg-sky-500/20 text-sky-300 rounded-md text-[10px]">
                                            {kb.category}
                                        </span>
                                    </div>
                                    <p className="text-slate-300 line-clamp-2">{kb.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
