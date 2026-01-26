import type { ReactNode } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ParticleBackground } from '../components/ParticleBackground';

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="relative flex h-screen w-full overflow-hidden">
            <ParticleBackground />
            <div className="relative z-10 flex h-full w-full">
                <Sidebar />
                <main className="flex-1 h-full overflow-y-auto overflow-x-hidden relative">
                    <div className="w-full min-h-full p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
