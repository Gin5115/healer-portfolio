import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Briefcase, GraduationCap, Calendar, Cpu, ArrowRight } from 'lucide-react';
import { TechStack } from '../components/TechStack';
import { DetailModal, type DetailData } from '../components/DetailModal';

interface Education {
    id: number;
    degree: string;
    institution: string;
    period: string;
    score: string;
    details: string;
    detailed_description: string;
    proof_url?: string;
}

interface Experience {
    id: number;
    role: string;
    company: string;
    period: string;
    description: string;
    type: string;
    detailed_description: string;
    skills_used: string[];
    proof_url?: string;
}

export function About() {
    const [education, setEducation] = useState<Education[]>([]);
    const [experience, setExperience] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<DetailData | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const [eduRes, expRes] = await Promise.all([
                    supabase.from('education').select('*, detailed_description, proof_url').order('id', { ascending: true }),
                    supabase.from('experience').select('*, detailed_description, skills_used, proof_url').order('id', { ascending: true }),
                ]);

                if (eduRes.error) console.error('Error fetching education:', eduRes.error);
                else setEducation(eduRes.data || []);

                if (expRes.error) console.error('Error fetching experience:', expRes.error);
                else setExperience(expRes.data || []);

            } catch (err) {
                console.error('Unexpected error:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-text-main text-center py-12">Loading profile details...</div>;
    }

    const openEducationModal = (edu: Education) => {
        setSelectedItem({
            title: edu.degree,
            subtitle: edu.institution,
            period: edu.period,
            description: edu.details,
            detailed_description: edu.detailed_description,
            proofUrl: edu.proof_url,
            tags: []
        });
    };

    const openExperienceModal = (exp: Experience) => {
        setSelectedItem({
            title: exp.role,
            subtitle: exp.company,
            period: exp.period,
            description: exp.description,
            detailed_description: exp.detailed_description,
            tags: exp.skills_used,
            proofUrl: exp.proof_url
        });
    };

    return (
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-12 pb-12">
            {/* Intro Section */}
            <div className="flex flex-col gap-4 border-b border-border-color pb-8">
                <h2 className="text-3xl font-black text-text-main sm:text-4xl">About Me</h2>
                <p className="text-lg leading-relaxed text-text-muted">
                    I am an M.Tech Computer Science student at VIT Chennai with a passion for solving complex problems through Algorithms and Machine Learning.
                    With a strong foundation in both software development and hardware integration, I build systems that matter.
                </p>
            </div>

            {/* Education Section (Moved Top) */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <GraduationCap className="text-primary" size={24} />
                    <h3 className="text-2xl font-bold text-text-main">Education</h3>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {education.map((edu) => (
                        <div
                            key={edu.id}
                            onClick={() => openEducationModal(edu)}
                            className="group flex flex-col gap-3 rounded-xl border border-border-color bg-card p-6 shadow-sm transition-all hover:border-primary/50 cursor-pointer hover:shadow-lg hover:translate-y-[-2px]"
                        >
                            <div className="flex justify-between items-start">
                                <h4 className="text-lg font-bold text-text-main leading-tight group-hover:text-primary transition-colors">
                                    {edu.degree
                                        .replace(/IoT/i, '')
                                        .replace(/CSE/g, 'Computer Science')
                                        .replace(/\s+/g, ' ')
                                        .trim()}
                                </h4>
                                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded whitespace-nowrap">{edu.score}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium text-text-main">{edu.institution}</span>
                                <span className="text-xs text-text-muted">{edu.period}</span>
                            </div>
                            <p className="text-sm text-text-muted mt-2 border-t border-border-color pt-3 line-clamp-2">{edu.details}</p>
                            <div className="mt-auto pt-2 flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                View Details <ArrowRight size={12} className="ml-1" />
                            </div>
                        </div>
                    ))}

                    {education.length === 0 && (
                        <p className="text-text-muted text-sm italic col-span-full">No education records found.</p>
                    )}
                </div>
            </div>

            {/* Experience Section */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <Briefcase className="text-primary" size={24} />
                    <h3 className="text-2xl font-bold text-text-main">Experience</h3>
                </div>

                <div className="relative border-l border-border-color ml-3 space-y-8 pl-8 py-2">
                    {experience.map((exp) => (
                        <div
                            key={exp.id}
                            onClick={() => openExperienceModal(exp)}
                            className="group relative flex flex-col gap-2 p-4 -ml-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                        >
                            <span className="absolute -left-[23px] top-6 flex h-5 w-5 items-center justify-center rounded-full bg-card ring-4 ring-content border border-primary group-hover:bg-primary transition-colors"></span>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                <h4 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors">{exp.role}</h4>
                                <span className="flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                                    <Calendar size={12} />
                                    {exp.period}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-text-main">
                                <span className="text-text-main">{exp.company}</span>
                                <span>•</span>
                                <span>{exp.type}</span>
                            </div>
                            <p className="text-sm leading-relaxed text-text-muted mt-1 line-clamp-2">{exp.description}</p>
                            <div className="mt-1 flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                Read More <ArrowRight size={12} className="ml-1" />
                            </div>
                        </div>
                    ))}

                    {experience.length === 0 && (
                        <p className="text-text-muted text-sm italic">No experience records found.</p>
                    )}
                </div>
            </div>



            {/* Skills Section (Bottom) */}
            <TechStack />

            {/* Detail Modal */}
            <DetailModal
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                data={selectedItem}
            />
        </div>
    );
}
