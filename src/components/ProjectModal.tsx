import { X, Eye, Code2 } from 'lucide-react';
import type { Project } from './ProjectCard';

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

// Helper to get tag color styles (reused from ProjectCard - ideally refactor to util)
const getTagColor = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes('flutter') || t.includes('dart') || t.includes('react') || t.includes('js') || t.includes('javascript') || t.includes('node')) {
        return 'bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-300';
    }
    if (t.includes('iot') || t.includes('esp32')) {
        return 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-300';
    }
    if (t.includes('python') || t.includes('django') || t.includes('flask')) {
        return 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-300';
    }

    return 'bg-slate-500/10 border border-slate-500/20 text-slate-600 dark:text-slate-300'; // Default
};

import { createPortal } from 'react-dom';

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    if (!isOpen || !project) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[length:var(--bg-overlay,rgba(0,0,0,0.75))] backdrop-blur-sm p-4 animate-fade-in"
            style={{ backgroundColor: 'var(--bg-overlay)' }}
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl bg-card border border-border-color rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()} // Prevent close on card click
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Header Image */}
                <div className="h-48 sm:h-64 w-full bg-slate-800 shrink-0">
                    <div
                        className="h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${project.image_url}')` }}
                    ></div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-text-main">{project.title}</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.tags && project.tags.map((tag, index) => (
                                <span key={index} className={`inline-flex items-center rounded px-2.5 py-1 text-xs font-semibold ${getTagColor(tag)}`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <p className="text-text-muted leading-relaxed text-base whitespace-pre-line">
                        {project.description}
                    </p>

                    <div className="flex gap-4 mt-auto pt-4 border-t border-border-color">
                        {project.demo_link && (
                            <a
                                href={project.demo_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] active:scale-95"
                            >
                                <Eye size={18} />
                                Live Demo
                            </a>
                        )}
                        {project.repo_link && (
                            <a
                                href={project.repo_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border-color bg-transparent py-3 text-sm font-semibold text-text-main transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
                            >
                                <Code2 size={18} />
                                Source Code
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
