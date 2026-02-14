import { Cpu } from 'lucide-react';

export function TechStack() {
    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex items-center gap-3">
                <Cpu className="text-primary" size={24} />
                <h3 className="text-2xl font-bold text-text-main">Technical Proficiency</h3>
            </div>

            <div className="flex flex-col gap-8">
                {[
                    {
                        category: "Languages",
                        tools: [
                            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                            { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
                            { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
                            { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                            { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
                            { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
                            { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
                        ]
                    },
                    {
                        category: "Frameworks & Libraries",
                        tools: [
                            { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                            { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                            { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
                            { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
                            { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
                            { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
                            { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" }
                        ]
                    },
                    {
                        category: "Tools & Platforms",
                        tools: [
                            { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
                            { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
                            { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
                            { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
                            { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
                            { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" }
                        ]
                    }
                ].map((section, idx) => (
                    <div key={idx} className="flex flex-col gap-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-text-muted text-left">{section.category}</h4>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                            {section.tools.map((tool, tIdx) => (
                                <div key={tIdx} className="flex items-center gap-3 rounded-lg border border-border-color bg-card p-3 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:bg-card-hover group">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-primary/5 p-1 group-hover:bg-primary/10 transition-colors">
                                        <img src={tool.icon} alt={tool.name} className="h-full w-full object-contain" />
                                    </div>
                                    <span className="text-sm font-semibold text-text-main group-hover:text-primary transition-colors">{tool.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
