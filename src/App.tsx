import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { VoiceProvider } from './context/VoiceContext';
import { NavigationProvider } from './context/NavigationContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/common/Header';
import { NavigationSidebar, TabKey } from './components/common/NavigationSidebar';
import { QRHandoffModal } from './components/common/QRHandoffModal';
import { EmergencySOSModal } from './components/modules/EmergencySOSModal';
import { HomeModule } from './components/modules/HomeModule';
import { CampusMap2D } from './components/navigation/CampusMap2D';
import { IndoorFloorNavigator } from './components/navigation/IndoorFloorNavigator';
import { AIChatKiosk } from './components/ai/AIChatKiosk';
import { FacultyFinderModule } from './components/modules/FacultyFinderModule';
import { BusManagementModule } from './components/modules/BusManagementModule';
import { HostelModule } from './components/modules/HostelModule';
import { AdmissionsModule } from './components/modules/AdmissionsModule';
import { EventsModule } from './components/modules/EventsModule';
import { StudentParentGuideModule } from './components/modules/StudentParentGuideModule';
import { AnalyticsDashboard } from './components/modules/AnalyticsDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

const AppContent: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabKey>('home');
    const [isEmergencyModalOpen, setEmergencyModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#020b08] flex items-center justify-center p-2 sm:p-4 select-none font-sans">
            {/* PHYSICAL KIOSK DISPLAY MONITOR BEZEL FRAME */}
            <div className="w-full max-w-[1720px] h-[95vh] max-h-[980px] bg-[#001f19] border-[6px] border-[#063325] rounded-[28px] shadow-2xl shadow-emerald-950/90 flex flex-col overflow-hidden relative ring-1 ring-emerald-500/30">
                {/* Official RMK Kiosk Header */}
                <Header
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onEmergencyClick={() => setEmergencyModalOpen(true)}
                />

                {/* Main Kiosk Body */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Left Touch Kiosk Navigation Sidebar */}
                    <NavigationSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                    {/* Main Content View Area */}
                    <main className="flex-1 overflow-y-auto bg-[#001713] p-4 md:p-6 scrollbar-thin">
                        {activeTab === 'home' && <HomeModule onSelectTab={setActiveTab} />}

                        {activeTab === 'navigation' && (
                            <div className="space-y-6 max-w-7xl mx-auto">
                                <CampusMap2D />
                                <IndoorFloorNavigator />
                            </div>
                        )}

                        {activeTab === 'ai' && (
                            <div className="max-w-6xl mx-auto">
                                <AIChatKiosk onNavigateToMap={() => setActiveTab('navigation')} />
                            </div>
                        )}

                        {activeTab === 'faculty' && (
                            <div className="max-w-6xl mx-auto">
                                <FacultyFinderModule onNavigateToMap={() => setActiveTab('navigation')} />
                            </div>
                        )}

                        {activeTab === 'bus' && (
                            <div className="max-w-6xl mx-auto">
                                <BusManagementModule />
                            </div>
                        )}

                        {activeTab === 'hostel' && (
                            <div className="max-w-6xl mx-auto">
                                <HostelModule />
                            </div>
                        )}

                        {activeTab === 'admissions' && (
                            <div className="max-w-6xl mx-auto">
                                <AdmissionsModule />
                            </div>
                        )}

                        {activeTab === 'events' && (
                            <div className="max-w-6xl mx-auto">
                                <EventsModule />
                            </div>
                        )}

                        {activeTab === 'guide' && (
                            <div className="max-w-6xl mx-auto">
                                <StudentParentGuideModule />
                            </div>
                        )}

                        {activeTab === 'analytics' && (
                            <div className="max-w-6xl mx-auto">
                                <AnalyticsDashboard />
                            </div>
                        )}

                        {activeTab === 'admin' && (
                            <div className="max-w-6xl mx-auto">
                                <AdminDashboard />
                            </div>
                        )}
                    </main>
                </div>

                {/* Global Modals */}
                <QRHandoffModal />
                <EmergencySOSModal
                    isOpen={isEmergencyModalOpen}
                    onClose={() => setEmergencyModalOpen(false)}
                    onNavigateToMap={() => setActiveTab('navigation')}
                />
            </div>
        </div>
    );
};

export const App: React.FC = () => {
    return (
        <LanguageProvider>
            <VoiceProvider>
                <NavigationProvider>
                    <AuthProvider>
                        <AppContent />
                    </AuthProvider>
                </NavigationProvider>
            </VoiceProvider>
        </LanguageProvider>
    );
};

export default App;
