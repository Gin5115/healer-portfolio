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
        <section id={id} className={clsx("min-h-screen py-20 relative", className)}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </section>
    );
}
