import React from 'react';
import { motion } from 'framer-motion';

const Positioning = ({ theme }) => {
    const isLight = theme === 'light';
    const borderColor = isLight ? 'border-black/10' : 'border-white/10';
    const subTextColor = isLight ? 'text-black/50' : 'text-white/50';
    const accentBorder = isLight ? 'border-black/20' : 'border-white/20';
    const bulletColor = isLight ? 'bg-black' : 'bg-white';

    return (
        <section className={`py-24 border-t transition-colors duration-500 ${borderColor}`}>
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-medium leading-tight mb-8">
                            Votre business mérite mieux qu'une vitrine : <span className={subTextColor}>il lui faut un système.</span>
                        </h2>
                        <p className="opacity-70 text-lg leading-relaxed max-w-md">
                            Nous orchestrons le design et l'IA pour structurer votre activité. Fini le superflu. Nous nous concentrons sur ce qui fonctionne : l'acquisition et la conversion.
                            <br /><br />
                            Approche pragmatique. Résultats mesurables.
                        </p>
                    </div>

                    <div className={`border-l pl-8 md:pl-12 ${accentBorder}`}>
                        <ul className="space-y-4 font-mono text-sm tracking-wide opacity-70">
                            {[
                                "Analyse structurelle du modèle",
                                "Décomposition des flux clés",
                                "Conception d’interfaces essentielles",
                                "IA opérationnelle intégrée",
                                "Protocole d’automatisation",
                                "Cohérence message / comportement / design"
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center"
                                >
                                    <span className={`w-1.5 h-1.5 mr-4 ${bulletColor}`}></span>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Positioning;
