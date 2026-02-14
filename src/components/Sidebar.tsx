import { useState, useEffect } from 'react';
import { Home, FolderOpen, User, Mail, FileText, Moon, Sun, Github, Linkedin, Zap, Award, Menu, X, Briefcase } from 'lucide-react';
import { supabase } from '../lib/supabase';
import clsx from 'clsx';

export function Sidebar() {
    const [theme, setTheme] = useState<'classic' | 'neon' | 'light'>('neon');
    const [activeSection, setActiveSection] = useState('home');
    const [visitorCount, setVisitorCount] = useState<number>(0);
    const [profile, setProfile] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);

    // Initialize theme
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Fetch Data
    useEffect(() => {
        async function initData() {
            try {
                const { data: profileData } = await supabase.from('profile_settings').select('*').single();
                if (profileData) setProfile(profileData);

                const hasVisited = sessionStorage.getItem('visited_session');
                if (hasVisited) {
                    const { data } = await supabase.from('site_stats').select('visitor_count').single();
                    if (data) setVisitorCount(data.visitor_count);
                } else {
                    const { data } = await supabase.rpc('increment_visitor_count');
                    if (data) {
                        setVisitorCount(data);
                        sessionStorage.setItem('visited_session', 'true');
                    }
                }
            } catch (err) {
                console.error('Error initializing sidebar data:', err);
            }
        }
        initData();
    }, []);

    // Scroll Spy
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, {
            // Trigger when the element is in the middle 40% of the screen
            rootMargin: '-30% 0px -30% 0px'
        });

        ['home', 'about', 'background', 'projects', 'recognitions', 'contact'].forEach(id => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -20; // Optional offset if needed
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });
            setIsOpen(false);
            setActiveSection(id); // Immediate UI update
        }
    };

    const toggleTheme = () => {
        setTheme(current => {
            if (current === 'classic') return 'neon';
            if (current === 'neon') return 'light';
            return 'classic';
        });
    };

    const navItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'about', label: 'About', icon: User },
        { id: 'background', label: 'Background', icon: Briefcase },
        { id: 'projects', label: 'Projects', icon: FolderOpen },
        { id: 'recognitions', label: 'Recognitions', icon: Award },
        { id: 'contact', label: 'Contact', icon: Mail },
    ];

    const getThemeIcon = () => {
        switch (theme) {
            case 'classic': return <Zap size={14} className="text-primary fill-current" />; // Next: Neon
            case 'neon': return <Sun size={14} className="text-yellow-500 fill-current" />; // Next: Light
            case 'light': return <Moon size={14} className="text-text-muted fill-current" />; // Next: Dark
        }
    };

    const getThemeLabel = () => {
        switch (theme) {
            case 'classic': return 'Switch to Neon';
            case 'neon': return 'Switch to Light';
            case 'light': return 'Switch to Dark';
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 right-4 z-50 p-2 bg-card border border-border-color rounded-md shadow-md md:hidden text-text-main hover:text-primary transition-colors"
                aria-label="Toggle Menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-30 backdrop-blur-sm md:hidden animate-fade-in"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={clsx(
                    "fixed inset-y-0 left-0 z-40 w-[240px] bg-sidebar border-r border-border-color transition-transform duration-300 ease-in-out h-screen overflow-hidden md:translate-x-0 flex flex-col",
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="flex flex-col h-full p-4 overflow-y-auto custom-scrollbar">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-5 mb-6 flex-shrink-0">
                        {/* Avatar & Info */}
                        <div className="flex flex-col items-center gap-3 text-center">
                            <div className="relative group cursor-pointer">
                                <div
                                    className="h-20 w-20 rounded-full bg-cover bg-center ring-4 ring-border-color shadow-xl transition-all duration-300 group-hover:ring-primary/50"
                                    style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=Sathish+Kumar&background=3b82f6&color=fff&bold=true')" }}
                                ></div>
                                <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-sidebar flex items-center justify-center">
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                </span>
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <h1 className="text-lg font-bold leading-tight text-text-main tracking-tight font-sans">Sathishkumar R</h1>
                                <p className="text-xs font-mono text-primary font-medium tracking-wide">ENGINEER</p>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex flex-col items-center gap-2 w-full">
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-hover border border-border-color shadow-sm group hover:border-primary/30 transition-all w-fit">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted group-hover:text-text-main transition-colors">
                                    {profile?.status_text || 'Open to Work'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-1.5 flex-grow">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={clsx(
                                    "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group overflow-hidden",
                                    activeSection === item.id
                                        ? "bg-primary/10 text-primary"
                                        : "text-text-muted hover:text-text-main hover:bg-white/5"
                                )}
                            >
                                <item.icon size={18} className={clsx("transition-transform duration-300 group-hover:scale-110", activeSection === item.id && "animate-pulse")} />
                                <span className="text-sm font-semibold tracking-wide">{item.label}</span>

                                {activeSection === item.id && (
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-primary rounded-l-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* Footer / Actions */}
                    <div className="mt-auto pt-4 flex flex-col gap-3">
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-white shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-95 hover:shadow-primary/40"
                        >
                            <FileText size={16} />
                            <span className="tracking-wide">DOWNLOAD CV</span>
                        </a>

                        {/* Socials Link Row */}
                        <div className="flex justify-center gap-5 pb-2">
                            <a href="https://github.com/SathishKumar5115" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors hover:scale-110"><Github size={18} /></a>
                            <a href="https://www.linkedin.com/in/sathishkumar-r-981510246/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors hover:scale-110"><Linkedin size={18} /></a>
                        </div>

                        {/* Separator */}
                        <div className="h-px w-full bg-border-color my-2"></div>

                        {/* Systems Operational Badge */}
                        <div className="flex items-center justify-center gap-2 py-1">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[9px] font-bold tracking-widest text-text-muted uppercase">SYSTEMS OPERATIONAL</span>
                        </div>

                        {/* Visits Card */}
                        <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-card border border-border-color shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-500">
                                    <User size={14} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-text-main leading-none">
                                        {visitorCount > 0 ? visitorCount.toLocaleString() : '...'}
                                    </span>
                                    <span className="text-[9px] font-medium text-text-muted uppercase tracking-wider">Visits</span>
                                </div>
                            </div>
                        </div>

                        {/* Theme Toggle Button (Simple) */}
                        <button
                            onClick={toggleTheme}
                            className="flex items-center justify-center gap-2 w-full p-2.5 rounded-lg bg-card border border-border-color hover:border-primary/50 hover:bg-card-hover transition-all group"
                        >
                            {getThemeIcon()}
                            <span className="text-[10px] font-bold text-text-muted group-hover:text-text-main uppercase tracking-wider">
                                {getThemeLabel()}
                            </span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
