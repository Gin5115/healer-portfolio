import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface SectionWrapperProps {
    children: ReactNode;
    id: string;
    className?: string;
}

export function SectionWrapper({ children, id, className }: SectionWrapperProps) {
    return (
        <section id={id} className={clsx("relative w-full min-h-screen flex items-center", className)}>
            <div className="max-w-5xl mx-auto px-6 lg:px-12 py-20 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="w-full"
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
}
