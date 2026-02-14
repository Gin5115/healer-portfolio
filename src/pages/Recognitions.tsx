import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Award, Medal, Trophy, Scroll, Star, ArrowRight } from 'lucide-react';
import { DetailModal } from '../components/DetailModal';
import type { DetailData } from '../components/DetailModal';

interface Achievement {
    id: number;
    title: string;
    issuer: string;
    date: string;
    description: string;
    category: string;
    image_url: string;
}

export function Recognitions() {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<DetailData | null>(null);

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

    const hackathons = achievements.filter(a => a.category.toLowerCase().includes('hackathon'));
    const certifications = achievements.filter(a => a.category.toLowerCase().includes('certificat'));
    const awards = achievements.filter(a => !a.category.toLowerCase().includes('hackathon') && !a.category.toLowerCase().includes('certificat'));

    const renderCard = (item: Achievement, icon: any) => (
        <div
            key={item.id}
            onClick={() => setSelectedItem({
                title: item.title,
                subtitle: item.issuer,
                period: item.date,
                description: item.description,
                proofUrl: item.image_url,
                tags: [item.category]
            })}
            className="group flex flex-col gap-3 rounded-lg border border-border-color bg-[var(--bg-project-card)] backdrop-blur-md p-5 cursor-pointer hover:border-primary/50 hover:shadow-lg hover:bg-card-hover transition-all duration-300 sm:hover:-translate-y-1"
        >
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <h4 className="text-base font-bold text-text-main leading-tight group-hover:text-primary transition-colors pr-2">
                        {item.title}
                    </h4>
                    <span className="text-xs font-mono text-text-muted">{item.issuer}</span>
                </div>
                {item.category.toLowerCase().includes('hackathon') && (
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 whitespace-nowrap">
                        Hackathon
                    </span>
                )}
                {item.category.toLowerCase().includes('certificat') && (
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 whitespace-nowrap">
                        Certification
                    </span>
                )}
                {!item.category.toLowerCase().includes('hackathon') && !item.category.toLowerCase().includes('certificat') && (
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 whitespace-nowrap">
                        Award
                    </span>
                )}
            </div>

            <div className="mt-auto pt-4 text-xs font-bold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 uppercase tracking-wider">
                Details <ArrowRight size={14} />
            </div>

            <div className="flex items-center gap-2 text-xs text-text-muted pt-3 border-t border-border-color/30 mt-2 font-mono">
                {icon}
                <span>{item.date}</span>
            </div>
        </div>
    );

    if (loading) {
        return <div className="text-text-main text-center py-12 animate-pulse">Loading recognitions...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-12 pb-12">
            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-border-color pb-8">
                <div className="flex items-center gap-2 text-primary mb-2">
                    <Trophy size={20} />
                    <span className="font-mono text-sm font-bold tracking-wider">// RECOGNITIONS</span>
                </div>
                <h2 className="text-3xl font-black text-text-main sm:text-4xl">
                    Recognitions
                </h2>
                <p className="text-lg leading-relaxed text-text-muted">
                    Honors, Hackathon wins, and Certifications that validate my expertise.
                </p>
            </div>

            {/* Hackathons Section */}
            {hackathons.length > 0 && (
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <Star className="text-blue-500" size={24} />
                        <h3 className="text-2xl font-bold text-text-main">Hackathons</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {hackathons.map(item => renderCard(item, <Medal size={12} />))}
                    </div>
                </div>
            )}

            {/* Awards Section */}
            {awards.length > 0 && (
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <Award className="text-yellow-500" size={24} />
                        <h3 className="text-2xl font-bold text-text-main">Awards & Honors</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {awards.map(item => renderCard(item, <Trophy size={12} />))}
                    </div>
                </div>
            )}

            {/* Certifications Section */}
            {certifications.length > 0 && (
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <Scroll className="text-emerald-500" size={24} />
                        <h3 className="text-2xl font-bold text-text-main">Certifications & Workshops</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {certifications.map(item => renderCard(item, <Scroll size={12} />))}
                    </div>
                </div>
            )}

            {achievements.length === 0 && (
                <div className="text-center text-text-muted py-12 border border-dashed border-border-color rounded-lg bg-card/50">
                    No recognitions found.
                </div>
            )}

            <DetailModal
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                data={selectedItem}
            />
        </div>
    );
}
