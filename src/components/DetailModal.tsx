import { X, Calendar, ExternalLink } from 'lucide-react';


export interface DetailData {
    title: string;
    subtitle: string;
    period: string;
    description: string;
    detailed_description?: string;
    tags?: string[];
    proofUrl?: string;
}

interface DetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: DetailData | null;
}

// Helper to get tag color styles (matching ProjectCard)
// Removed getTagColor as we are using single color now

import { createPortal } from 'react-dom';

export function DetailModal({ isOpen, onClose, data }: DetailModalProps) {
    if (!isOpen || !data) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl bg-[var(--bg-modal)] border border-border-color rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-card hover:bg-card-hover border border-border-color text-text-muted hover:text-primary transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="p-6 md:p-8 border-b border-border-color">
                    <div className="flex flex-col gap-2 pr-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-text-main font-sans tracking-tight">{data.title}</h2>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-text-muted">
                            <span className="font-semibold text-primary font-mono text-sm">{data.subtitle}</span>
                            <span className="hidden sm:inline opacity-50">•</span>
                            <div className="flex items-center gap-1.5 text-sm font-medium">
                                <Calendar size={14} />
                                {data.period}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex flex-col gap-6">
                    {/* Tags / Skills */}
                    {data.tags && data.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {data.tags.map((tag, index) => (
                                <span key={index} className="inline-flex items-center rounded px-2.5 py-1 text-xs font-mono font-medium bg-primary/10 border border-primary/20 text-primary">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Detailed Description */}
                    <div className="prose prose-invert max-w-none">
                        <p className="text-text-muted leading-relaxed whitespace-pre-line text-base">
                            {data.detailed_description || data.description}
                        </p>
                    </div>

                    {/* Proof / Verification */}
                    {data.proofUrl && (
                        <div className="flex flex-col gap-3 pt-6 border-t border-border-color">
                            <h3 className="text-xs font-bold text-text-main uppercase tracking-widest font-mono">Credential / Proof</h3>
                            <div className="relative group rounded-lg overflow-hidden border border-border-color bg-card-hover aspect-video">
                                <img
                                    src={data.proofUrl}
                                    alt="Proof of achievement"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <a
                                href={data.proofUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="self-start text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                            >
                                View Original <ExternalLink size={12} />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}
