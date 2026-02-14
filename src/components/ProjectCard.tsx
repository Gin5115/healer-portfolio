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
export function ProjectCard({ title, description, tags, image_url, demo_link, repo_link, onClick }: Project) {
    return (
        <article
            className="group relative flex flex-col overflow-hidden rounded-xl border border-border-color bg-[var(--bg-project-card)] backdrop-blur-md shadow-md transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:bg-[var(--bg-project-card)] hover:brightness-110 cursor-pointer hover:-translate-y-1"
            onClick={onClick}
        >
            <div className="aspect-video w-full overflow-hidden bg-primary/5 border-b border-border-color">
                <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${image_url}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-1 flex-col p-5 gap-3">
                <div className="flex-1 flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors line-clamp-1">{title}</h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-text-muted">{description}</p>
                </div>

                <div className="flex flex-wrap gap-2 my-2">
                    {tags && tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="inline-flex items-center rounded-md px-2 py-1 text-[10px] font-mono font-medium border bg-primary/10 border-primary/20 text-primary">
                            {tag}
                        </span>
                    ))}
                    {tags && tags.length > 3 && (
                        <span className="inline-flex items-center rounded-md px-2 py-1 text-[10px] font-mono font-medium border border-border-color text-text-muted bg-card">
                            +{tags.length - 3}
                        </span>
                    )}
                </div>

                <div className="mt-auto flex gap-2 pt-2 relative z-30">
                    {demo_link && (
                        <a
                            href={demo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-primary/20 bg-primary/5 text-xs font-bold text-primary shadow-sm hover:bg-primary/10 hover:border-primary/40 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            <Eye size={14} />
                            View Project
                        </a>
                    )}
                    {repo_link && (
                        <a
                            href={repo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-primary/20 bg-primary/5 text-xs font-bold text-primary shadow-sm hover:bg-primary/10 hover:border-primary/40 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            <Code2 size={14} />
                            View Code
                        </a>
                    )}
                    {!demo_link && !repo_link && (
                        <button className="w-full py-2 text-xs font-bold text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                            View Details <Eye size={14} />
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}
