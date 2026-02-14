import { User } from 'lucide-react';
import { TechnicalProficiency } from '../components/TechnicalProficiency';

export function About() {
    return (
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-12 pb-12">
            {/* Intro Section */}
            <div className="flex flex-col gap-4 border-b border-border-color pb-8">
                <div className="flex items-center gap-2 text-primary mb-2">
                    <User size={20} />
                    <span className="font-mono text-sm font-bold tracking-wider">// ABOUT ME</span>
                </div>
                <h2 className="text-3xl font-black text-text-main sm:text-4xl">Bio & Skills</h2>
                <p className="text-lg leading-relaxed text-text-muted">
                    I am an M.Tech Computer Science student at VIT Chennai with a passion for solving complex problems through Algorithms and Machine Learning.
                    With a strong foundation in both software development and hardware integration, I build systems that matter.
                </p>
            </div>

            {/* Skills Section */}
            <TechnicalProficiency />
        </div>
    );
}
