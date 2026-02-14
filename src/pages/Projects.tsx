import { useEffect, useState } from 'react';
import { Search, FolderOpen } from 'lucide-react';
import { ProjectCard, type Project } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { supabase } from '../lib/supabase';

export function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('id', { ascending: true });

                if (error) {
                    console.error('Error fetching projects:', error);
                } else {
                    setProjects(data || []);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
            {/* Header Section */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-primary">
                        <FolderOpen size={20} />
                        <span className="font-mono text-sm font-bold tracking-wider">// WORK</span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-text-main sm:text-4xl">Project Repository</h2>
                    <p className="text-text-muted">Explore my latest work and coding experiments.</p>
                </div>
                {/* Search Bar */}
                <div className="relative w-full max-w-xs">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="text-text-muted" size={18} />
                    </div>
                    <input
                        className="block w-full rounded-xl bg-card border border-border-color py-3 pl-10 pr-4 text-sm text-text-main placeholder-text-muted shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all hover:bg-card-hover"
                        placeholder="Search projects..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Projects Grid */}
            {loading ? (
                <div className="text-text-main text-center py-12">Loading projects...</div>
            ) : (
                <>
                    {filteredProjects.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {filteredProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    {...project}
                                    onClick={() => setSelectedProject(project)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <p className="text-lg text-text-muted">No projects found matching "{searchQuery}"</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-4 text-sm font-bold text-primary hover:underline"
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Project Details Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );
}
