import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { sendMessageToGemini } from '../utils/gemini';

const GlitchText = ({ theme }) => {
    const [text, setText] = useState('AUTOMAT.');
    const originalText = 'AUTOMAT.';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

    useEffect(() => {
        const interval = setInterval(() => {
            const times = Math.floor(Math.random() * 3) + 1; // 1 to 3 glitches

            for (let i = 0; i < times; i++) {
                setTimeout(() => {
                    const index = Math.floor(Math.random() * originalText.length);
                    const char = chars[Math.floor(Math.random() * chars.length)];
                    const newArr = originalText.split('');
                    newArr[index] = char;
                    setText(newArr.join(''));
                }, i * 80);
            }

            setTimeout(() => {
                setText(originalText);
            }, times * 80 + 50);

        }, 2000 + Math.random() * 3000); // Random interval between 2s and 5s

        return () => clearInterval(interval);
    }, []);

    return (
        <h1 className={`text-6xl md:text-9xl font-bold tracking-tighter mb-2 font-mono ${theme === 'light' ? 'text-black' : 'text-white'}`}>
            {text}
        </h1>
    );
};

const Hero = ({ onChatUpdate, theme, setTheme }) => {
    // ... (keep existing state)
    const [messages, setMessages] = useState([
        { role: 'model', text: "Bonjour, je suis là pour vous aider à concevoir une stratégie web & IA adaptée à votre budget.\n\nQu'est ce qui vous intéresse ?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };

    useEffect(() => {
        scrollToBottom();
        if (onChatUpdate) {
            onChatUpdate(messages);
        }
    }, [messages, onChatUpdate]);

    const processMessage = async (text) => {
        setMessages(prev => [...prev, { role: 'user', text: text }]);
        setIsLoading(true);

        const response = await sendMessageToGemini(text);

        setMessages(prev => [...prev, { role: 'model', text: response }]);
        setIsLoading(false);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        await processMessage(userMessage);
    };

    const handleOptionClick = async (text) => {
        await processMessage(text);
    };

    const isLight = theme === 'light';
    const terminalBg = isLight ? 'bg-white/90 border-black/20 text-black' : 'bg-black/90 border-white/20 text-white';
    const terminalHeaderBorder = isLight ? 'border-black/10 text-black/50' : 'border-white/10 text-white/50';
    const userMsgColor = isLight ? 'text-black/70' : 'text-white/70';
    const botMsgColor = isLight ? 'text-black' : 'text-automat-text'; // automat-text is likely gray/white, need check
    const inputBorder = isLight ? 'border-black/20 focus:border-black placeholder:text-black/20' : 'border-white/20 focus:border-white placeholder:text-white/20';
    const optionBtn = isLight ? 'border-black/20 text-black/70 hover:bg-black/5 hover:text-black hover:border-black/50' : 'border-white/20 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/50';

    return (
        <section className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-500">
            {/* Background Grid */}
            <div className={`absolute inset-0 bg-grid-pattern bg-[size:40px_40px] pointer-events-none ${theme === 'light' ? 'opacity-5' : 'opacity-20'}`}></div>

            {/* Header */}
            <div className="z-10 flex flex-col items-center mb-12 text-center">
                <GlitchText theme={theme} />
                <h2 className="text-xs tracking-[0.3em] opacity-70 uppercase font-mono">Intelligent Systems</h2>
            </div>

            {/* Chat Terminal */}
            <div className={`z-10 w-full max-w-2xl border p-6 md:p-8 font-mono text-sm md:text-base shadow-2xl relative flex flex-col h-[600px] backdrop-blur-sm transition-colors duration-500 ${terminalBg}`}>
                {/* Terminal Header */}
                <div className={`flex justify-between items-center mb-4 text-xs border-b pb-2 flex-shrink-0 ${terminalHeaderBorder}`}>
                    <span>AUTOMAT/AGENT ▶︎ online</span>
                    <span>v2.0.4</span>
                </div>

                {/* Terminal Content (Chat History) */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 scrollbar-thin scrollbar-thumb-current scrollbar-track-transparent">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] ${msg.role === 'user' ? `${userMsgColor} text-right` : botMsgColor}`}>
                                <span className="whitespace-pre-wrap leading-relaxed">{msg.text}</span>
                            </div>
                        </div>
                    ))}

                    {/* Welcome Options */}
                    {messages.length === 1 && !isLoading && (
                        <div className="flex flex-col gap-2 mt-4 ml-0 md:ml-4">
                            {[
                                "Site & Design (Vitrine, Refonte, E-shop)",
                                "IA & Automatisation (Gagner du temps)",
                                "Je ne suis pas sûr (Aidez-moi à définir mon besoin)"
                            ].map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionClick(option)}
                                    className={`text-left px-4 py-2 border transition-all text-xs md:text-sm font-mono w-fit ${optionBtn}`}
                                >
                                    {`> ${option}`}
                                </button>
                            ))}
                        </div>
                    )}

                    {isLoading && (
                        <div className={`${botMsgColor} flex items-center gap-2`}>
                            <span>Analyse</span>
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-1 h-3 bg-current"
                            />
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Field */}
                <form onSubmit={handleSend} className="relative mt-auto flex-shrink-0">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 opacity-50">{'>'}</span>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Décrivez votre système idéal…"
                        className={`w-full bg-transparent border-b py-2 pl-6 focus:outline-none transition-colors ${inputBorder}`}
                        disabled={isLoading}
                    />
                </form>
                <div className="text-[10px] opacity-30 uppercase tracking-wider mt-2">
                    AUTOMAT analyse, structure et propose — en temps réel.
                </div>
            </div>

            {/* Audit Form */}
            <div className="z-10 mt-12 flex flex-col items-center gap-6 w-full max-w-5xl">
                <div className={`px-4 py-2 text-xs uppercase tracking-[0.2em] font-bold ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    Audit gratuit
                </div>
                <form
                    className="flex flex-col md:flex-row gap-3 w-full items-center justify-center"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const url = formData.get('url');
                        const email = formData.get('email');
                        const subject = `Demande d'audit gratuit : ${url}`;
                        const body = `Site à auditer : ${url}\nEmail de contact : ${email}`;
                        window.location.href = `mailto:benjamin.lacaze@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    }}
                >
                    <span className="text-xs opacity-50 font-mono uppercase tracking-wider whitespace-nowrap mr-2 hidden md:inline-block">
                        L'adresse de votre site ici -&gt;
                    </span>
                    <input
                        name="url"
                        type="text"
                        placeholder="www.xxx.com"
                        required
                        className={`w-full md:w-64 border px-4 py-3 text-xs md:text-sm focus:outline-none transition-colors ${theme === 'light' ? 'bg-white border-black/20 text-black placeholder:text-black/30 focus:border-black' : 'bg-black border-white/30 text-white placeholder:text-white/30 focus:border-white'}`}
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="votremail@mail.com"
                        required
                        className={`w-full md:w-64 border px-4 py-3 text-xs md:text-sm focus:outline-none transition-colors ${theme === 'light' ? 'bg-white border-black/20 text-black placeholder:text-black/30 focus:border-black' : 'bg-black border-white/30 text-white placeholder:text-white/30 focus:border-white'}`}
                    />
                    <button
                        type="submit"
                        className={`w-full md:w-auto px-8 py-3 text-xs uppercase tracking-widest font-medium transition-colors whitespace-nowrap ${theme === 'light' ? 'bg-black text-white hover:bg-black/80' : 'bg-white text-black hover:bg-white/90'}`}
                    >
                        Envoyer
                    </button>
                </form>
            </div>

            {/* Theme Switcher */}
            <div className="z-10 mt-12 flex gap-6">
                <button
                    onClick={() => setTheme('dark')}
                    className={`w-8 h-8 rounded-full bg-black border border-white/20 transition-transform hover:scale-110 ${theme === 'dark' ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''}`}
                    aria-label="Dark Mode"
                />
                <button
                    onClick={() => setTheme('light')}
                    className={`w-8 h-8 rounded-full bg-white border border-black/20 transition-transform hover:scale-110 ${theme === 'light' ? 'ring-2 ring-black ring-offset-2 ring-offset-white' : ''}`}
                    aria-label="Light Mode"
                />
                <button
                    onClick={() => setTheme('colorful')}
                    className={`w-8 h-8 rounded-full bg-gradient-to-br from-[#2E1065] via-[#4C1D95] to-[#BE185D] border border-white/20 transition-transform hover:scale-110 ${theme === 'colorful' ? 'ring-2 ring-white ring-offset-2 ring-offset-[#4C1D95]' : ''}`}
                    aria-label="Colorful Mode"
                />
            </div>
        </section>
    );
};

export default Hero;
