import { useState, type FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

export function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            if (!formData.name || !formData.email || !formData.message) {
                throw new Error('All fields are required.');
            }

            const { error } = await supabase
                .from('messages')
                .insert([{
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                }]);

            if (error) throw error;

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);

        } catch (err: any) {
            console.error('Error sending message:', err);
            setStatus('error');
            setErrorMessage(err.message || 'Failed to send message.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto w-full flex flex-col items-center justify-center py-12">
            <div className="w-full max-w-lg flex flex-col gap-8">

                <div className="text-center flex flex-col gap-3">
                    <div className="inline-flex mx-auto items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-2 shadow-lg shadow-primary/20">
                        <Mail size={32} />
                    </div>
                    <h2 className="text-4xl font-black text-text-main tracking-tight">Get In Touch</h2>
                    <p className="text-text-muted max-w-sm mx-auto">
                        Have a question or want to work together? Leave me a message!
                    </p>

                    <div className="flex items-center justify-center gap-4 mt-4">
                        <a
                            href="https://github.com/SathishKumar5115"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border-color hover:border-primary/50 hover:bg-card-hover hover:text-text-main transition-all text-text-muted font-bold text-sm group"
                        >
                            <span className="font-mono group-hover:text-primary transition-colors">GitHub</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/sathishkumar-r-981510246/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border-color hover:border-primary/50 hover:bg-card-hover hover:text-text-main transition-all text-text-muted font-bold text-sm group"
                        >
                            <span className="font-mono group-hover:text-primary transition-colors">LinkedIn</span>
                        </a>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-card p-8 rounded-2xl border border-border-color shadow-2xl backdrop-blur-sm">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-xs font-bold text-text-muted uppercase tracking-widest font-mono pl-1">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            className="w-full rounded-lg bg-background/50 border border-border-color px-4 py-3 text-text-main placeholder-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all hover:bg-background"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            disabled={status === 'submitting'}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs font-bold text-text-muted uppercase tracking-widest font-mono pl-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            className="w-full rounded-lg bg-background/50 border border-border-color px-4 py-3 text-text-main placeholder-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all hover:bg-background"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={status === 'submitting'}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-xs font-bold text-text-muted uppercase tracking-widest font-mono pl-1">Message</label>
                        <textarea
                            id="message"
                            placeholder="How can I help you?"
                            rows={5}
                            className="w-full rounded-lg bg-background/50 border border-border-color px-4 py-3 text-text-main placeholder-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none hover:bg-background"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            disabled={status === 'submitting'}
                        />
                    </div>

                    {status === 'error' && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-200 text-sm border border-red-500/20">
                            <AlertCircle size={16} />
                            {errorMessage}
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-200 text-sm border border-green-500/20">
                            <CheckCircle size={16} />
                            Message sent successfully!
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="mt-2 flex items-center justify-center gap-2 w-full rounded-lg bg-primary py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-blue-600 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {status === 'submitting' ? 'Sending...' : (
                            <>
                                Send Message
                                <Send size={18} />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
