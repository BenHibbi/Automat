import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo_final_v2.png';
import ref1 from '../assets/ref1.png';
import ref2 from '../assets/ref2.png';
import ref3 from '../assets/ref3.png';
import ref4 from '../assets/ref4.png';
import ref5 from '../assets/ref5.png';

const References = ({ theme }) => {
    const isLight = theme === 'light';
    const borderColor = isLight ? 'border-black/10' : 'border-white/10';
    const cardBg = isLight ? 'bg-black/5' : 'bg-white/5';
    const labelBg = isLight ? 'bg-white/50 text-black/50' : 'bg-black/50 text-white/50';
    const overlayBg = isLight ? 'bg-white/20' : 'bg-black/20';

    const projects = [ref3, ref4, ref1, ref2, ref5];

    return (
        <section className={`py-24 border-t transition-colors duration-500 relative overflow-hidden ${borderColor}`}>
            {/* Background Element */}
            <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                <img src={logo} alt="" className="w-[800px] h-[800px] object-contain" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-medium mb-4">
                        L'élégance de la fonction.<br />
                        Un design conçu pour guider, pas pour décorer.
                    </h2>
                </div>

                {/* Carousel */}
                <div className="flex overflow-x-auto gap-8 pb-8 scrollbar-hide">
                    {projects.map((img, idx) => (
                        <div key={idx} className={`min-w-[300px] md:min-w-[500px] aspect-video border flex items-center justify-center relative group overflow-hidden ${cardBg} ${borderColor}`}>
                            <img src={img} alt={`Project Reference ${idx + 1}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className={`absolute inset-0 group-hover:bg-transparent transition-colors duration-500 ${overlayBg}`}></div>
                            <span className={`absolute bottom-4 left-4 font-mono text-xs px-2 py-1 backdrop-blur-sm ${labelBg}`}>REF_SYS_0{idx + 1}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default References;
