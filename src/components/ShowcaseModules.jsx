import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Search, Sun, Calendar } from 'lucide-react';

const ShowcaseModules = ({ theme }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const isLight = theme === 'light';
    const borderColor = isLight ? 'border-black/10' : 'border-white/10';
    const containerBg = isLight ? 'bg-white border-black/10' : 'bg-[#0a0a0a] border-white/10';
    const navColor = isLight ? 'text-black/50 hover:text-black' : 'text-white/50 hover:text-white';
    const indicatorActive = isLight ? 'bg-black' : 'bg-white';
    const indicatorInactive = isLight ? 'bg-black/20' : 'bg-white/20';

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % 3);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + 3) % 3);
    };

    return (
        <section className={`py-24 border-t transition-colors duration-500 relative overflow-hidden ${borderColor}`}>
            <div className="container mx-auto px-6 md:px-12">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-medium mb-4">Showcase Modules</h2>
                    <p className="opacity-70">Des interfaces conçues pour la performance.</p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 p-2 transition-colors hidden md:block ${navColor}`}
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-2 transition-colors hidden md:block ${navColor}`}
                    >
                        <ChevronRight size={32} />
                    </button>

                    {/* Carousel Content */}
                    <div className={`border rounded-2xl overflow-hidden relative min-h-[500px] md:min-h-[400px] transition-colors duration-500 ${containerBg}`}>
                        <AnimatePresence mode="wait">
                            {currentIndex === 0 && <SolarCalculatorSlide key="solar" theme={theme} />}
                            {currentIndex === 1 && <SmartBookingSlide key="booking" theme={theme} />}
                            {currentIndex === 2 && <AISearchSlide key="search" theme={theme} />}
                        </AnimatePresence>
                    </div>

                    {/* Indicators */}
                    <div className="flex justify-center gap-2 mt-6">
                        {[0, 1, 2].map((idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? `${indicatorActive} w-6` : indicatorInactive
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- SLIDE 1: SOLAR CALCULATOR ---
const SolarCalculatorSlide = ({ theme }) => {
    const [bill, setBill] = useState(150);
    const gain = Math.floor(bill * 12 * 0.4 * 20);
    const isLight = theme === 'light';
    const uiBg = isLight ? 'bg-white border-black/10' : 'bg-black border-white/10';
    const labelColor = isLight ? 'text-black/60' : 'text-white/60';
    const inputBg = isLight ? 'bg-black/5' : 'bg-white/10';
    const tagBg = isLight ? 'bg-black/5 border-black/10' : 'bg-white/5 border-white/10';
    const btnClass = isLight ? 'bg-black text-white hover:bg-black/90' : 'bg-white text-black hover:bg-white/90';

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full p-8 md:p-12 flex flex-col md:flex-row items-center gap-12"
        >
            {/* UI Demo */}
            <div className={`w-full md:w-1/2 border rounded-xl p-6 relative overflow-hidden group transition-colors duration-500 ${uiBg}`}>
                <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Sun size={48} />
                </div>

                <div className="space-y-8 relative z-10">
                    <div>
                        <label className={`block text-sm mb-4 font-mono ${labelColor}`}>Facture élec. mensuelle</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="50"
                                max="500"
                                value={bill}
                                onChange={(e) => setBill(Number(e.target.value))}
                                className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-current ${inputBg}`}
                            />
                            <span className="font-mono text-xl w-16 text-right">{bill}€</span>
                        </div>
                    </div>

                    <div className={`pt-4 border-t ${isLight ? 'border-black/10' : 'border-white/10'}`}>
                        <p className={`text-sm mb-2 font-mono ${labelColor}`}>Gain potentiel (20 ans)</p>
                        <motion.div
                            key={gain}
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.1, 1] }}
                            className="text-4xl md:text-5xl font-bold text-[#4ADE80] drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]"
                        >
                            {gain.toLocaleString()}€
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 space-y-4">
                <div className={`inline-block px-3 py-1 border rounded-full text-xs font-mono text-[#4ADE80] ${tagBg}`}>
                    LEAD CAPTURE SYSTEM
                </div>
                <h3 className="text-2xl md:text-3xl font-medium">Pour les installateurs solaires.</h3>
                <p className="opacity-70 leading-relaxed">
                    Transformez des visiteurs passifs en leads qualifiés grâce à une projection immédiate de valeur. Une interface interactive qui engage l'utilisateur dès la première seconde.
                </p>
                <button className={`mt-4 px-6 py-3 font-medium text-sm transition-colors rounded-sm ${btnClass}`}>
                    Voir la démo
                </button>
            </div>
        </motion.div>
    );
};

// --- SLIDE 2: SMART BOOKING ---
const SmartBookingSlide = ({ theme }) => {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const slots = ["09:00", "10:30", "14:00", "16:30"];
    const isLight = theme === 'light';
    const uiBg = isLight ? 'bg-white border-black/10' : 'bg-black border-white/10';
    const slotSelected = isLight ? 'bg-black text-white border-black' : 'bg-white text-black border-white';
    const slotUnselected = isLight ? 'bg-black/5 border-black/10 text-black hover:bg-black/10' : 'bg-white/5 border-white/10 text-white hover:bg-white/10';
    const tagBg = isLight ? 'bg-black/5 border-black/10' : 'bg-white/5 border-white/10';
    const btnClass = isLight ? 'bg-black text-white hover:bg-black/90' : 'bg-white text-black hover:bg-white/90';

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full p-8 md:p-12 flex flex-col md:flex-row items-center gap-12"
        >
            {/* UI Demo */}
            <div className={`w-full md:w-1/2 border rounded-xl p-6 relative min-h-[300px] flex flex-col justify-center transition-colors duration-500 ${uiBg}`}>
                <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Calendar size={48} />
                </div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                    {slots.map((slot, idx) => (
                        <motion.button
                            key={idx}
                            onClick={() => setSelectedSlot(idx)}
                            layout
                            className={`p-4 rounded-lg border text-center transition-all relative overflow-hidden ${selectedSlot === idx ? `${slotSelected} col-span-2` : slotUnselected
                                } ${selectedSlot !== null && selectedSlot !== idx ? 'hidden' : ''}`}
                        >
                            <motion.span layout className="font-mono text-lg block">
                                {selectedSlot === idx ? 'Confirmé' : slot}
                            </motion.span>

                            {selectedSlot === idx && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                >
                                    <Check size={20} />
                                </motion.div>
                            )}
                        </motion.button>
                    ))}

                    {selectedSlot !== null && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={(e) => { e.stopPropagation(); setSelectedSlot(null); }}
                            className="text-xs opacity-40 hover:opacity-100 mt-4 mx-auto block"
                        >
                            Choisir un autre créneau
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 space-y-4">
                <div className={`inline-block px-3 py-1 border rounded-full text-xs font-mono text-blue-400 ${tagBg}`}>
                    FRICTIONLESS BOOKING
                </div>
                <h3 className="text-2xl md:text-3xl font-medium">Pour les pros du service.</h3>
                <p className="opacity-70 leading-relaxed">
                    Éliminez les frictions à la prise de rendez-vous. Une expérience fluide qui confirme l'engagement en un clic, augmentant drastiquement vos taux de conversion.
                </p>
                <button className={`mt-4 px-6 py-3 font-medium text-sm transition-colors rounded-sm ${btnClass}`}>
                    Voir la démo
                </button>
            </div>
        </motion.div>
    );
};

// --- SLIDE 3: AI SEARCH ---
const AISearchSlide = ({ theme }) => {
    const [text, setText] = useState("");
    const fullText = "Villa piscine St-Gilles...";
    const [showResults, setShowResults] = useState(false);
    const isLight = theme === 'light';
    const uiBg = isLight ? 'bg-white border-black/10' : 'bg-black border-white/10';
    const searchBarBg = isLight ? 'bg-black/5 border-black/20' : 'bg-white/5 border-white/20';
    const resultBg = isLight ? 'bg-black/5 border-black/5 hover:bg-black/10' : 'bg-white/5 border-white/5 hover:bg-white/10';
    const skeletonBg = isLight ? 'bg-black/10' : 'bg-white/10';
    const tagBg = isLight ? 'bg-black/5 border-black/10' : 'bg-white/5 border-white/10';
    const btnClass = isLight ? 'bg-black text-white hover:bg-black/90' : 'bg-white text-black hover:bg-white/90';

    useEffect(() => {
        let i = 0;
        setText("");
        setShowResults(false);

        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setText(prev => prev + fullText.charAt(i));
                i++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => setShowResults(true), 300);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full p-8 md:p-12 flex flex-col md:flex-row items-center gap-12"
        >
            {/* UI Demo */}
            <div className={`w-full md:w-1/2 border rounded-xl p-6 relative min-h-[300px] flex flex-col transition-colors duration-500 ${uiBg}`}>
                <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Search size={48} />
                </div>

                <div className="relative z-10 w-full">
                    {/* Search Bar */}
                    <div className={`flex items-center gap-3 border rounded-lg px-4 py-3 mb-6 ${searchBarBg}`}>
                        <Search size={18} className="opacity-50" />
                        <span className="font-mono text-sm opacity-90">
                            {text}<span className="animate-pulse">|</span>
                        </span>
                    </div>

                    {/* Results */}
                    <div className="space-y-3">
                        <AnimatePresence>
                            {showResults && [1, 2, 3].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`flex items-center gap-4 p-2 rounded-lg border transition-colors ${resultBg}`}
                                >
                                    <div className={`w-12 h-12 rounded-md shrink-0 animate-pulse ${skeletonBg}`}></div>
                                    <div className="flex-1 space-y-2">
                                        <div className={`h-2 w-3/4 rounded-full ${skeletonBg}`}></div>
                                        <div className={`h-2 w-1/2 rounded-full ${skeletonBg}`}></div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 space-y-4">
                <div className={`inline-block px-3 py-1 border rounded-full text-xs font-mono text-purple-400 ${tagBg}`}>
                    NEURAL CATALOG
                </div>
                <h3 className="text-2xl md:text-3xl font-medium">Pour l'E-commerce & Immo.</h3>
                <p className="opacity-70 leading-relaxed">
                    Une recherche intelligente qui comprend l'intention. Proposez instantanément les résultats les plus pertinents pour raccourcir le parcours d'achat.
                </p>
                <button className={`mt-4 px-6 py-3 font-medium text-sm transition-colors rounded-sm ${btnClass}`}>
                    Voir la démo
                </button>
            </div>
        </motion.div>
    );
};

export default ShowcaseModules;
