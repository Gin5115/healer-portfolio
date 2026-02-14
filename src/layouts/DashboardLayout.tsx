import type { ReactNode } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ParticleBackground } from '../components/ParticleBackground';

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen bg-background text-text-main font-sans selection:bg-primary/30 overflow-x-hidden">
            <ParticleBackground />

            <Sidebar />

            <main className="flex-1 min-h-screen p-0 transition-all duration-300 relative z-10 w-full md:ml-[240px]">
                <div className="w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
