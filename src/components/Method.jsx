import React from 'react';

const Method = ({ theme }) => {
    const isLight = theme === 'light';
    const borderColor = isLight ? 'border-black/10' : 'border-white/10';
    const lineBg = isLight ? 'bg-black/10' : 'bg-white/10';
    const dotBg = isLight ? 'bg-black' : 'bg-white';
    const subTextColor = isLight ? 'text-black/40' : 'text-white/40';
    const descColor = isLight ? 'text-black/60' : 'text-white/60';
    const accentBorder = isLight ? 'border-black/20' : 'border-white/20';

    const steps = [
        { num: "01", title: "Diagnostic", desc: "Analyse du système actuel et des points d’étranglement." },
        { num: "02", title: "Architecture", desc: "Définition des modules, interfaces et intégrations IA." },
        { num: "03", title: "Modèle opératoire", desc: "Construction du protocole d’action optimal." },
        { num: "04", title: "Réalisation & calibration", desc: "Mise en service + optimisation des flux." }
    ];

    return (
        <section className={`py-24 border-t transition-colors duration-500 ${borderColor}`}>
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start relative">
                    {/* Connecting Line */}
                    <div className={`absolute top-4 left-0 w-full h-[1px] hidden md:block ${lineBg}`}></div>

                    {steps.map((step, idx) => (
                        <div key={idx} className="relative w-full md:w-1/4 pr-8 mb-12 md:mb-0">
                            <div className={`w-2 h-2 mb-6 hidden md:block relative z-10 ${dotBg}`}></div>
                            <div className={`text-xs font-mono mb-2 ${subTextColor}`}>STEP {step.num}</div>
                            <h3 className="text-xl font-medium mb-4">{step.title}</h3>
                            <p className={`text-sm leading-relaxed border-l pl-4 md:border-none md:pl-0 ${descColor} ${accentBorder}`}>
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Method;
