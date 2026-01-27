import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FolderOpen, User, Mail, FileText, Moon, Sun, Github, Linkedin, Users, Award, Menu, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Sidebar() {
    const [isLight, setIsLight] = useState(false);
    const [visitorCount, setVisitorCount] = useState<number>(0);
    const [profile, setProfile] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);

    // Initialize theme on mount
    useEffect(() => {
        if (isLight) {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
        }
    }, [isLight]);

    // Fetch Profile & Visitor Count
    useEffect(() => {
        async function initData() {
            try {
                // Fetch Profile Settings
                const { data: profileData } = await supabase
                    .from('profile_settings')
                    .select('*')
                    .single();

                if (profileData) setProfile(profileData);

                // Visitor Count Logic
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

    const toggleTheme = () => {
        setIsLight(!isLight);
    };

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 right-4 z-50 p-2 bg-card border border-border-color rounded-md shadow-md md:hidden text-text-main hover:text-primary transition-colors"
                aria-label="Toggle Menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Overlay Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm md:hidden animate-fade-in"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-40 w-[250px] bg-sidebar border-r border-border-color transition-transform duration-300 ease-in-out h-screen overflow-hidden
                    md:translate-x-0
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <div className="flex flex-col h-full p-6">

                    {/* 1. Profile Header Group */}
                    <div className="flex flex-col gap-3 mb-6">
                        <div className="flex items-center gap-3">
                            <div
                                className="h-12 w-12 rounded-full bg-cover bg-center ring-2 ring-primary/20 shrink-0"
                                style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=Sathish+Kumar&background=1c5cf2&color=fff&bold=true')" }}
                            ></div>
                            <div className="flex flex-col">
                                <h1 className="text-base font-bold leading-tight text-text-main">Sathishkumar R</h1>
                                <p className="text-xs font-medium text-text-muted">Engineer</p>
                            </div>
                        </div>

                        {/* Status & Learning (Grouped) */}
                        <div className="flex flex-col gap-2 mt-2 px-1">
                            <div className="text-xs font-medium text-emerald-500 flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                {profile?.status_text || 'Open to Work'}
                            </div>
                            {profile?.learning_text && (
                                <div className="text-[10px] uppercase tracking-wider text-text-muted bg-card px-2 py-1 rounded-md w-fit border border-border-color whitespace-normal break-words leading-tight">
                                    {profile.learning_text}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 2. Navigation */}
                    <nav className="flex flex-col gap-1">
                        <NavLink
                            to="/"
                            onClick={handleLinkClick}
                            className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary shadow-sm shadow-primary/5' : 'text-text-muted hover:bg-primary/5 hover:text-text-main'}`}
                        >
                            <Home size={20} /> Home
                        </NavLink>
                        <NavLink
                            to="/about"
                            onClick={handleLinkClick}
                            className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary shadow-sm shadow-primary/5' : 'text-text-muted hover:bg-primary/5 hover:text-text-main'}`}
                        >
                            <User size={20} /> About
                        </NavLink>
                        <NavLink
                            to="/projects"
                            onClick={handleLinkClick}
                            className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary shadow-sm shadow-primary/5' : 'text-text-muted hover:bg-primary/5 hover:text-text-main'}`}
                        >
                            <FolderOpen size={20} /> Projects
                        </NavLink>
                        <NavLink
                            to="/achievements"
                            onClick={handleLinkClick}
                            className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary shadow-sm shadow-primary/5' : 'text-text-muted hover:bg-primary/5 hover:text-text-main'}`}
                        >
                            <Award size={20} /> Achievements
                        </NavLink>
                        <NavLink
                            to="/contact"
                            onClick={handleLinkClick}
                            className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary shadow-sm shadow-primary/5' : 'text-text-muted hover:bg-primary/5 hover:text-text-main'}`}
                        >
                            <Mail size={20} /> Contact
                        </NavLink>
                    </nav>

                    {/* 3. The Spring (Pushes content to bottom) */}
                    <div className="mt-auto"></div>

                    {/* 4. Action Block (Resume & Socials) */}
                    <div className="flex flex-col gap-4 mt-6">
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleLinkClick}
                            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] active:scale-95"
                        >
                            <FileText size={20} /> Resume
                        </a>

                        <div className="flex justify-center gap-6 mb-2">
                            <a href="https://github.com/SathishKumar5115" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors hover:scale-110 transform"><Github size={20} /></a>
                            <a href="https://www.linkedin.com/in/sathishkumar-r-981510246/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors hover:scale-110 transform"><Linkedin size={20} /></a>
                            <a href="mailto:contact@example.com" className="text-text-muted hover:text-primary transition-colors hover:scale-110 transform"><Mail size={20} /></a>
                        </div>
                    </div>

                    {/* 5. Footer (Status, Counter, Theme) */}
                    <div className="flex flex-col gap-2 border-t border-border-color pt-6">
                        {/* Live System Status */}
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[10px] font-medium uppercase tracking-widest text-text-muted">Systems Operational</span>
                        </div>

                        {/* Modern Visitor Counter */}
                        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-card border border-border-color shadow-sm mb-3">
                            <Users size={16} className="text-primary" />
                            <div className="flex flex-col leading-none">
                                <span className="text-sm font-bold text-text-main">
                                    {visitorCount > 0 ? visitorCount.toLocaleString() : '...'}
                                </span>
                                <span className="text-[10px] font-medium text-text-muted">Visits</span>
                            </div>
                        </div>

                        {/* Theme Toggle */}
                        <button onClick={toggleTheme} className="flex items-center justify-between rounded-lg bg-card border border-border-color p-2 cursor-pointer hover:bg-primary/5 transition-colors group">
                            <div className="flex items-center gap-2">
                                {isLight ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-primary" />}
                                <span className="text-xs font-medium text-text-muted group-hover:text-text-main transition-colors">{isLight ? 'Light Mode' : 'Dark Mode'}</span>
                            </div>
                            <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${!isLight ? 'bg-primary' : 'bg-slate-500'}`}>
                                <span className={`${!isLight ? 'translate-x-5 bg-white' : 'translate-x-1 bg-white'} inline-block h-3.5 w-3.5 transform rounded-full transition-transform`}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
