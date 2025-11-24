import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo_final_v2.png';

const Pricing = ({ onPricingUpdate, theme }) => {
    const isLight = theme === 'light';
    const borderColor = isLight ? 'border-black/10' : 'border-white/10';
    const subTextColor = isLight ? 'text-black/50' : 'text-white/50';
    const listBorderColor = isLight ? 'border-black/10' : 'border-[#333]';
    const hoverBg = isLight ? 'hover:bg-black/5' : 'hover:bg-white/5';
    const checkboxBorder = isLight ? 'border-black/30' : 'border-white/30';
    const checkboxSelectedBg = isLight ? 'bg-black border-black' : 'bg-white border-white';
    const checkboxCheckColor = isLight ? 'bg-white' : 'bg-black';
    const selectedTextColor = isLight ? 'text-black' : 'text-white';
    const unselectedTextColor = isLight ? 'text-black/70' : 'text-white/70';
    const priceColor = isLight ? 'text-black/30' : 'text-white/30';
    const summaryBg = isLight ? 'bg-black/5 border-black/10' : 'bg-white/5 border-[#333]';
    const activeBtnClass = isLight ? 'bg-black text-white border-black' : 'bg-white text-black border-white';
    const inactiveBtnClass = isLight ? 'bg-transparent text-black/50 border-black/20 hover:border-black/50' : 'bg-transparent text-white/50 border-white/20 hover:border-white/50';

    const modules = [
        { id: 1, name: "Diagnostic", price: 300 },
        { id: 2, name: "Architecture système", price: 600 },
        { id: 3, name: "Schéma des flux", price: 300 },
        { id: 4, name: "Message central", price: 300 },
        { id: 5, name: "Interface (1 page)", price: 400 },
        { id: 6, name: "Interface (3 pages)", price: 1200 },
        { id: 7, name: "Agent IA simple", price: 500 },
        { id: 8, name: "Agent IA avancé", price: 1200 },
        { id: 9, name: "Micro-outil métier", price: 2000 },
        { id: 10, name: "Mise en ligne", price: 200 },
        { id: 11, name: "Optimisation post-lancement", price: 300 },
        { id: 12, name: "Protocole d’évolution", price: 400 },
    ];

    const [selected, setSelected] = useState({});
    const [financingMode, setFinancingMode] = useState('standard'); // 'standard', 'kap', 'waas'

    const toggleModule = (id) => {
        setSelected(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const total = modules.reduce((sum, module) => {
        return sum + (selected[module.id] ? module.price : 0);
    }, 0);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
    };

    // Calculation Logic
    const kapAid = Math.min(total * 0.8, 3200);
    const kapRemaining = total - kapAid;

    const waasUpfront = total * 0.3;
    const waasMonthly = (total * 0.7) / 24;

    useEffect(() => {
        if (onPricingUpdate) {
            onPricingUpdate({
                selectedItems: modules.filter(m => selected[m.id]),
                total,
                mode: financingMode,
                details: {
                    kapAid: financingMode === 'kap' ? kapAid : 0,
                    kapRemaining: financingMode === 'kap' ? kapRemaining : total,
                    waasUpfront: financingMode === 'waas' ? waasUpfront : 0,
                    waasMonthly: financingMode === 'waas' ? waasMonthly : 0
                }
            });
        }
    }, [selected, financingMode, total, onPricingUpdate]);

    return (
        <section className={`py-24 border-t font-mono relative overflow-hidden transition-colors duration-500 ${borderColor}`}>
            {/* Background Element */}
            <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                <img src={logo} alt="" className="w-[800px] h-[800px] object-contain" />
            </div>

            <div className="container mx-auto px-6 md:px-12 max-w-[800px] relative z-10">

                {/* Header */}
                <div className="mb-16 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-medium mb-4">Sélectionnez les modules de votre système</h2>
                    <p className={`text-sm max-w-lg ${subTextColor}`}>
                        AUTOMAT calcule une estimation automatique en fonction de vos besoins.
                        <br />
                        Ce n’est pas un devis, mais un ordre de grandeur.
                    </p>
                </div>

                {/* Modules List */}
                <div className={`border-t ${listBorderColor}`}>
                    {modules.map((module) => (
                        <div
                            key={module.id}
                            onClick={() => toggleModule(module.id)}
                            className={`group flex items-center justify-between py-4 border-b cursor-pointer transition-colors select-none ${listBorderColor} ${hoverBg}`}
                        >
                            <div className="flex items-center gap-4">
                                {/* Checkbox */}
                                <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selected[module.id] ? checkboxSelectedBg : `${checkboxBorder} group-hover:border-current`}`}>
                                    {selected[module.id] && (
                                        <div className={`w-2 h-2 ${checkboxCheckColor}`}></div>
                                    )}
                                </div>
                                <span className={`text-sm transition-colors ${selected[module.id] ? selectedTextColor : `${unselectedTextColor} group-hover:text-current`}`}>
                                    {module.name}
                                </span>
                            </div>
                            <span className={`text-sm ${priceColor}`}>
                                {formatPrice(module.price)}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Summary Block */}
                <div className={`mt-16 p-8 border flex flex-col items-center justify-center text-center relative ${summaryBg}`}>

                    {/* Financing Toggles */}
                    <div className="flex gap-4 mb-8">
                        <button
                            onClick={() => setFinancingMode(financingMode === 'kap' ? 'standard' : 'kap')}
                            className={`px-4 py-2 text-xs uppercase tracking-wider border transition-all ${financingMode === 'kap' ? activeBtnClass : inactiveBtnClass}`}
                        >
                            Kap Numérik (-80%)
                        </button>
                        <button
                            onClick={() => setFinancingMode(financingMode === 'waas' ? 'standard' : 'waas')}
                            className={`px-4 py-2 text-xs uppercase tracking-wider border transition-all ${financingMode === 'waas' ? activeBtnClass : inactiveBtnClass}`}
                        >
                            Mode WaaS (Mensuel)
                        </button>
                    </div>

                    <span className={`text-xs tracking-widest mb-2 uppercase ${subTextColor}`}>Estimation Actuelle</span>

                    {/* Standard Display */}
                    {financingMode === 'standard' && (
                        <motion.div
                            key="standard"
                            initial={{ scale: 0.95, opacity: 0.8 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-5xl md:text-6xl font-light mb-2"
                        >
                            {formatPrice(total)}
                        </motion.div>
                    )}

                    {/* Kap Numérik Display */}
                    {financingMode === 'kap' && (
                        <motion.div
                            key="kap"
                            initial={{ scale: 0.95, opacity: 0.8 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center"
                        >
                            <span className={`text-xl line-through mb-1 ${priceColor}`}>{formatPrice(total)}</span>
                            <span className="text-5xl md:text-6xl font-light mb-2">{formatPrice(kapRemaining)}</span>
                            <span className="text-xs text-[#00FF94] uppercase tracking-wider mb-1">
                                Subvention estimée : -80% (max 3200€)
                            </span>
                        </motion.div>
                    )}

                    {/* WaaS Display */}
                    {financingMode === 'waas' && (
                        <motion.div
                            key="waas"
                            initial={{ scale: 0.95, opacity: 0.8 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center"
                        >
                            <span className="text-4xl md:text-5xl font-light mb-2">
                                {formatPrice(waasMonthly)} <span className={`text-lg ${subTextColor}`}>/ mois</span>
                            </span>
                            <span className={`text-xs uppercase tracking-wider ${subTextColor}`}>
                                pendant 24 mois
                            </span>
                            <div className={`mt-4 pt-4 border-t w-full flex justify-center ${borderColor}`}>
                                <span className={`text-xs ${unselectedTextColor}`}>
                                    Apport initial : {formatPrice(waasUpfront)}
                                </span>
                            </div>
                        </motion.div>
                    )}

                    <span className={`text-xs mt-4 ${priceColor}`}>ceci n’est pas un devis</span>
                </div>

            </div>
        </section>
    );
};

export default Pricing;
