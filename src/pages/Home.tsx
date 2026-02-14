import { Github, Linkedin } from 'lucide-react';

export function Home() {
    return (
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh] text-center animate-fade-in">
            {/* Hero Section */}
            <div className="flex flex-col gap-6 max-w-3xl">
                <h1 className="text-5xl font-black tracking-tight text-text-main sm:text-6xl lg:text-7xl">
                    Building Intelligent Systems with <span className="text-primary">Code & Data</span>.
                </h1>
                <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
                    Hi, I'm <span className="text-text-main font-semibold">Sathishkumar</span>. I am a Full Stack Engineer and AI Practitioner building scalable solutions.
                </p>

                <div className="flex gap-4 justify-center mt-4">
                    <button
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="rounded-lg bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95"
                    >
                        View Projects
                    </button>
                    <button
                        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                        className="rounded-lg border border-border-color bg-card px-8 py-3 text-sm font-bold text-text-main transition-colors hover:bg-slate-800/50 hover:border-primary"
                    >
                        About Me
                    </button>
                </div>

                <div className="flex justify-center gap-6 mt-2">
                    <a
                        href="https://github.com/SathishKumar5115"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-transform hover:scale-110"
                        title="GitHub"
                    >
                        <Github size={28} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/sathishkumar-r-981510246/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-transform hover:scale-110"
                        title="LinkedIn"
                    >
                        <Linkedin size={28} />
                    </a>
                </div>
            </div>
        </div>
    );
}
