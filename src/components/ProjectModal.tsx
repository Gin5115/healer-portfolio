import { X, Eye, Code2 } from 'lucide-react';
import type { Project } from './ProjectCard';

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

// Helper to get tag color styles (reused from ProjectCard - ideally refactor to util)
// Removed getTagColor as we are using single color now

import { createPortal } from 'react-dom';

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    if (!isOpen || !project) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl bg-[var(--bg-modal)] border border-border-color rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()} // Prevent close on card click
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-card/80 hover:bg-card border border-border-color text-text-muted hover:text-primary transition-colors shadow-lg backdrop-blur-sm"
                >
                    <X size={20} />
                </button>

                {/* Header Image */}
                <div className="h-48 sm:h-64 w-full bg-primary/5 shrink-0 relative">
                    <div
                        className="h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${project.image_url}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-modal)] to-transparent pointer-events-none"></div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col gap-6 overflow-y-auto custom-scrollbar -mt-10 relative z-10">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <h2 className="text-2xl md:text-3xl font-black text-text-main tracking-tight">{project.title}</h2>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {project.tags && project.tags.map((tag, index) => (
                                <span key={index} className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-mono font-bold border bg-primary/10 border-primary/20 text-primary">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <p className="text-text-muted leading-relaxed text-base whitespace-pre-line">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex gap-4 mt-auto pt-6 border-t border-border-color">
                        {project.demo_link && (
                            <a
                                href={project.demo_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-95 hover:shadow-primary/40"
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
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border-color bg-card hover:bg-card-hover py-3.5 text-sm font-bold text-text-main transition-colors hover:border-primary/50 group"
                            >
                                <Code2 size={18} className="group-hover:text-primary transition-colors" />
                                <span className="group-hover:text-primary transition-colors">Source Code</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
