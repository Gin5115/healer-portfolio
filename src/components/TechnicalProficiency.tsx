import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Cpu } from 'lucide-react';
// Use Simple Icons (Si) for consistent brand logos
import {
    SiReact, SiNodedotjs, SiPython, SiDocker, SiPostgresql, SiJavascript, SiAmazonwebservices,
    SiTailwindcss, SiTypescript, SiFlutter, SiDjango, SiTensorflow, SiPytorch,
    SiFirebase, SiPostman, SiDart, SiCplusplus, SiLinux, SiNextdotjs, SiGnubash
} from 'react-icons/si';
// Fallback icon
import { TbCpu } from 'react-icons/tb';

interface Skill {
    id: number;
    name: string;
    category: string;
    percentage: number;
    proficiency_level: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';
    icon_name: string;
}

export function TechnicalProficiency() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSkills() {
            try {
                const { data, error } = await supabase
                    .from('skills')
                    .select('*')
                    .order('category', { ascending: true })
                    .order('percentage', { ascending: false });

                if (error) throw error;
                setSkills(data || []);
            } catch (err) {
                console.error('Error fetching skills:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchSkills();
    }, []);

    const getIcon = (iconName: string) => {
        // Brand colors for icons
        const iconColors: Record<string, string> = {
            'SiReact': 'text-[#61DAFB]',
            'SiNodedotjs': 'text-[#339933]',
            'SiNextdotjs': 'text-text-main', // Next.js is black/white
            'SiPython': 'text-[#3776AB]',
            'SiDocker': 'text-[#2496ED]',
            'SiPostgresql': 'text-[#4169E1]',
            'SiJavascript': 'text-[#F7DF1E]',
            'SiAmazonwebservices': 'text-[#FF9900]',
            'SiTailwindcss': 'text-[#06B6D4]',
            'SiTypescript': 'text-[#3178C6]',
            'SiFlutter': 'text-[#02569B]',
            'SiDjango': 'text-[#092E20]',
            'SiTensorflow': 'text-[#FF6F00]',
            'SiPytorch': 'text-[#EE4C2C]',
            'SiFirebase': 'text-[#FFCA28]',
            'SiPostman': 'text-[#FF6C37]',
            'SiDart': 'text-[#0175C2]',
            'SiCplusplus': 'text-[#00599C]',
            'SiLinux': 'text-[#FCC624]',
            'SiGnubash': 'text-[#4EAA25]',
        };

        const colorClass = iconColors[iconName] || 'text-text-main';
        const iconParams = { className: `w-full h-full ${colorClass}` };

        const iconMap: Record<string, any> = {
            'SiReact': SiReact,
            'SiNodedotjs': SiNodedotjs,
            'SiNextdotjs': SiNextdotjs,
            'SiPython': SiPython,
            'SiDocker': SiDocker,
            'SiPostgresql': SiPostgresql,
            'SiJavascript': SiJavascript,
            'SiAmazonwebservices': SiAmazonwebservices,
            'SiTailwindcss': SiTailwindcss,
            'SiTypescript': SiTypescript,
            'SiFlutter': SiFlutter,
            'SiDjango': SiDjango,
            'SiTensorflow': SiTensorflow,
            'SiPytorch': SiPytorch,
            'SiFirebase': SiFirebase,
            'SiPostman': SiPostman,
            'SiDart': SiDart,
            'SiCplusplus': SiCplusplus,
            'SiLinux': SiLinux,
            'SiGnubash': SiGnubash,
        };

        const IconComponent = iconMap[iconName] || TbCpu;
        return <IconComponent {...iconParams} />;
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Expert':
            case 'Advanced': return 'text-primary bg-primary';
            case 'Intermediate': return 'text-blue-400 bg-blue-400'; // Brighter blue/cyan
            case 'Beginner': return 'text-blue-300 bg-blue-300';
            default: return 'text-primary bg-primary';
        }
    };

    const getLevelTextColor = (level: string) => {
        switch (level) {
            case 'Expert':
            case 'Advanced': return 'text-primary font-bold shadow-sm'; // Neon/Brand color
            case 'Intermediate': return 'text-blue-300 font-bold'; // Brighter secondary
            case 'Beginner': return 'text-blue-200 font-bold';
            default: return 'text-primary';
        }
    };

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    if (loading) return <div className="text-text-muted text-center py-8">Loading proficiency...</div>;

    return (
        <div className="flex flex-col gap-8 w-full">
            {/* Header & Legend */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Cpu className="text-primary" size={24} />
                    <h3 className="text-2xl font-bold text-text-main">Technical Proficiency</h3>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 text-xs font-mono font-bold tracking-wider">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--color-accent-rgb),0.6)]"></span>
                        <span className="text-text-main">EXPERT</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        <span className="text-text-muted">INTERMEDIATE</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-300"></span>
                        <span className="text-text-muted">BEGINNER</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-10">
                {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                    <div key={category} className="flex flex-col gap-4">
                        <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">{category}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {categorySkills.map((skill) => {
                                const levelColor = getLevelTextColor(skill.proficiency_level);
                                const trackColor = getLevelColor(skill.proficiency_level).split(' ')[1]; // Extract bg class

                                return (
                                    <div key={skill.id} className="relative overflow-hidden rounded-xl bg-card/50 backdrop-blur-sm border border-border-color p-4 hover:border-primary/30 transition-all group">
                                        {/* Top Row */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 p-2 rounded-lg bg-card border border-border-color shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                                    {getIcon(skill.icon_name)}
                                                </div>
                                                <span className="font-bold text-text-main tracking-wide group-hover:text-primary transition-colors">{skill.name}</span>
                                            </div>
                                            <span className={`text-[10px] font-bold font-mono uppercase tracking-wider ${levelColor}`}>
                                                {skill.proficiency_level === 'Advanced' ? 'EXPERT' : skill.proficiency_level}
                                            </span>
                                        </div>

                                        {/* Bottom Row - Progress */}
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 rounded-full bg-card-hover/80 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${trackColor} transition-all duration-1000 ease-out`}
                                                    style={{ width: `${skill.percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-mono font-bold text-text-muted">{skill.percentage}%</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {skills.length === 0 && (
                <div className="text-center text-text-muted italic py-4">No skills data available.</div>
            )}
        </div>
    );
}
