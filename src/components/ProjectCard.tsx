import { Eye, Code2 } from 'lucide-react';

export interface Project {
    id: number;
    created_at: string;
    title: string;
    description: string;
    image_url: string;
    tags: string[];
    category: string;
    demo_link: string | null;
    repo_link: string | null;
    onClick?: () => void;
}

// Helper to get tag color styles
// Helper to get tag color styles
const getTagColor = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes('flutter') || t.includes('dart') || t.includes('react') || t.includes('js') || t.includes('javascript') || t.includes('node')) {
        return 'bg-blue-500/10 border border-blue-500/20 text-blue-500';
    }
    if (t.includes('iot') || t.includes('esp32')) {
        return 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-500';
    }
    if (t.includes('python') || t.includes('django') || t.includes('flask')) {
        return 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-500';
    }

    return 'bg-slate-500/10 border border-slate-500/20 text-text-muted'; // Default
};

export function ProjectCard({ title, description, tags, image_url, demo_link, repo_link, onClick }: Project) {
    return (
        <article
            className="group relative flex flex-col overflow-hidden rounded-xl border border-border-color bg-card shadow-md transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
            onClick={onClick}
        >
            <div className="aspect-video w-full overflow-hidden bg-primary/5">
                <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${image_url}')` }}
                ></div>
            </div>
            <div className="flex flex-1 flex-col p-5">
                <div className="mb-4 flex-1">
                    <h3 className="mb-2 text-lg font-bold text-text-main group-hover:text-primary transition-colors">{title}</h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-text-muted">{description}</p>
                    <button className="mt-2 text-xs font-bold text-primary hover:text-blue-400 transition-colors">
                        Read More →
                    </button>
                </div>
                <div className="mb-6 flex flex-wrap gap-2">
                    {tags && tags.map((tag, index) => (
                        <span key={index} className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${getTagColor(tag)}`}>
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex gap-3">
                    {demo_link && (
                        <a
                            href={demo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
                        >
                            <Eye size={18} />
                            Live Demo
                        </a>
                    )}
                    {repo_link && (
                        <a
                            href={repo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border-color bg-transparent py-2 text-sm font-semibold text-text-main transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
                        >
                            <Code2 size={18} />
                            Code
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}
