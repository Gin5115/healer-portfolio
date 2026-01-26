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

export function DetailModal({ isOpen, onClose, data }: DetailModalProps) {
    if (!isOpen || !data) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[length:var(--bg-overlay,rgba(0,0,0,0.75))] backdrop-blur-sm p-4 animate-fade-in"
            style={{ backgroundColor: 'var(--bg-overlay)' }}
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl bg-card border border-border-color rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-text-main hover:bg-primary/10 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="p-6 md:p-8 border-b border-border-color bg-slate-50/50 dark:bg-slate-900/20">
                    <div className="flex flex-col gap-2 pr-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-text-main">{data.title}</h2>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-text-muted">
                            <span className="font-semibold text-primary">{data.subtitle}</span>
                            <span className="hidden sm:inline">•</span>
                            <div className="flex items-center gap-1.5 text-sm">
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
                                <span key={index} className={`inline-flex items-center rounded px-2.5 py-1 text-xs font-semibold ${getTagColor(tag)}`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Detailed Description */}
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-text-main leading-relaxed whitespace-pre-line text-base">
                            {data.detailed_description || data.description}
                        </p>
                    </div>

                    {/* Proof / Verification */}
                    {data.proofUrl && (
                        <div className="flex flex-col gap-3 pt-4 border-t border-border-color">
                            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider">Credential / Proof</h3>
                            <div className="relative group rounded-lg overflow-hidden border border-border-color bg-slate-100 dark:bg-slate-800">
                                <img
                                    src={data.proofUrl}
                                    alt="Proof of achievement"
                                    className="w-full h-auto max-h-[300px] object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <a
                                href={data.proofUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="self-start text-xs font-bold text-primary hover:underline flex items-center gap-1"
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
