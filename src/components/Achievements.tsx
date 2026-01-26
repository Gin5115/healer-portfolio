import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Award, Medal } from 'lucide-react';
import type { DetailData } from './DetailModal';

interface Achievement {
    id: number;
    title: string;
    issuer: string;
    date: string;
    description: string;
    category: string;
    image_url: string;
}

interface AchievementsProps {
    onSelect: (data: DetailData) => void;
}

export function Achievements({ onSelect }: AchievementsProps) {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAchievements() {
            try {
                const { data, error } = await supabase
                    .from('achievements')
                    .select('*')
                    .order('date', { ascending: false });

                if (error) {
                    console.error('Error fetching achievements:', error);
                } else {
                    setAchievements(data || []);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchAchievements();
    }, []);

    if (loading) return null;
    if (achievements.length === 0) return null;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
                <Award className="text-primary" size={24} />
                <h3 className="text-2xl font-bold text-text-main">Honors & Certifications</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => onSelect({
                            title: item.title,
                            subtitle: item.issuer,
                            period: item.date,
                            description: item.description,
                            proofUrl: item.image_url,
                            tags: [item.category]
                        })}
                        className="group flex flex-col gap-3 rounded-lg border border-border-color bg-card p-5 cursor-pointer hover:border-primary/50 hover:shadow-md transition-all sm:hover:translate-y-[-2px]"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-1">
                                <h4 className="text-base font-bold text-text-main leading-tight group-hover:text-primary transition-colors">
                                    {item.title}
                                </h4>
                                <span className="text-xs font-medium text-text-muted">{item.issuer}</span>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-text-muted border border-border-color whitespace-nowrap ${item.category.toLowerCase().includes('hackathon')
                                ? 'text-blue-500 bg-blue-500/10 border-blue-500/20'
                                : 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
                                }`}>
                                {item.category}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-text-muted mt-auto pt-2">
                            <Medal size={12} />
                            <span>{item.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
