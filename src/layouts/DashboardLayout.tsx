import type { ReactNode } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ParticleBackground } from '../components/ParticleBackground';

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen bg-content text-text-main font-sans selection:bg-primary/30 overflow-x-hidden">
            <ParticleBackground />

            <Sidebar />

            <main className="flex-1 min-h-screen p-4 md:p-8 transition-all duration-300 relative z-10 w-full">
                <div className="container mx-auto max-w-6xl animate-fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
}
