import React from 'react';
import { Box, Layers, Cpu, Terminal } from 'lucide-react';

const Capabilities = ({ theme }) => {
    const isLight = theme === 'light';
    const borderColor = isLight ? 'border-black/10' : 'border-white/10';
    const hoverBorderColor = isLight ? 'hover:border-black/30' : 'hover:border-white/30';

    const modules = [
        {
            icon: Box,
            title: "Systèmes d’acquisition intelligents",
            items: ["architecture minimaliste", "message cristal", "parcours décisionnels", "éléments IA utiles", "conversion mesurable"]
        },
        {
            icon: Layers,
            title: "Interfaces opérationnelles",
            items: ["friction minimale", "informations lisibles", "guidage utilisateur", "logique structurée", "cohérence systémique"]
        },
        {
            icon: Cpu,
            title: "Agents IA intégrés",
            items: ["assistants décisionnels", "IA d’accueil ou de qualification", "micro-modèles internes", "logique métier encodée", "interactions naturelles"]
        },
        {
            icon: Terminal,
            title: "Outils & micro-plates-formes",
            items: ["outils internes simples", "processus améliorés", "IA comme couche analytique", "interfaces quotidiennes minimalistes", "productivité immédiate"]
        }
    ];

    return (
        <section className={`py-24 border-t transition-colors duration-500 ${borderColor}`}>
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {modules.map((mod, idx) => (
                        <div key={idx} className={`group border p-8 transition-colors duration-500 ${borderColor} ${hoverBorderColor}`}>
                            <mod.icon className="w-8 h-8 mb-6 stroke-[1.5]" />
                            <h3 className="text-lg font-medium mb-6 min-h-[3rem]">{mod.title}</h3>
                            <ul className="space-y-2">
                                {mod.items.map((item, i) => (
                                    <li key={i} className="text-xs opacity-60 font-mono flex items-start">
                                        <span className="mr-2 opacity-30">+</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Capabilities;
