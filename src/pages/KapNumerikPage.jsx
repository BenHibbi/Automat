import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Clock, CreditCard, FileText, ShieldCheck, Zap } from 'lucide-react';

const KapNumerikPage = () => {
    const theme = 'dark'; // Default to dark for this standalone page or make it dynamic later

    const getThemeClasses = () => {
        return 'bg-black text-white selection:bg-white selection:text-black';
    };

    const Section = ({ children, className = "" }) => (
        <section className={`py-16 px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
            {children}
        </section>
    );

    const Title = ({ children }) => (
        <h2 className="text-3xl md:text-4xl font-bold mb-8 font-display tracking-tight">{children}</h2>
    );

    const Card = ({ children, className = "" }) => (
        <div className={`p-8 border border-white/10 bg-white/5 rounded-2xl backdrop-blur-sm ${className}`}>
            {children}
        </div>
    );

    return (
        <div className={`min-h-screen ${getThemeClasses()} font-sans`}>
            {/* Header */}
            <header className="pt-24 pb-12 px-6 text-center border-b border-white/10 bg-gradient-to-b from-purple-900/20 to-black">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono mb-4 border border-purple-500/30">
                        DISPOSITIF RÉGIONAL
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
                        KAP NUMÉRIK – OFFRE AUTOMAT
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Votre projet digital, financé à <span className="text-white font-semibold">80% par la Région</span> + facilité de paiement pour vous accompagner.
                    </p>
                </motion.div>
            </header>

            {/* 1. Le dispositif */}
            <Section>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-6xl font-bold text-white/5 absolute -ml-4 -mt-4 select-none">1</span>
                        <Title>Le dispositif Kap Numérik</Title>
                        <p className="text-lg text-gray-300 mb-6">
                            Kap Numérik est une aide publique qui finance <strong className="text-white">80% de votre projet digital</strong> (plafond 3 200 €).
                        </p>
                        <p className="text-gray-400 mb-6">
                            Il s’adresse aux TPE, professions libérales non réglementées, entreprises individuelles et associations domiciliées à La Réunion.
                        </p>
                        <div className="space-y-3">
                            <p className="font-semibold text-white">AUTOMAT vous accompagne pour :</p>
                            <ul className="space-y-2 text-gray-300">
                                {['Le choix de l’offre adaptée', 'La préparation du devis', 'La création du dossier sur la plateforme', 'Le suivi jusqu’au remboursement'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-purple-400" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <Card className="bg-gradient-to-br from-purple-900/10 to-transparent border-purple-500/20">
                        <div className="text-center py-8">
                            <p className="text-sm text-purple-300 uppercase tracking-widest mb-2">Subvention</p>
                            <p className="text-6xl font-bold text-white mb-2">80%</p>
                            <p className="text-gray-400">Pris en charge par la Région</p>
                        </div>
                    </Card>
                </div>
            </Section>

            {/* 2. Notre offre */}
            <Section className="bg-white/5">
                <span className="text-6xl font-bold text-white/5 absolute -mt-12 select-none">2</span>
                <div className="text-center mb-12">
                    <Title>Notre offre Kap Numérik : 3 200 € HT</Title>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                'Diagnostic digital',
                                'Architecture de votre système',
                                'Conception & interface',
                                'Développement du site',
                                'Mise en ligne',
                                'Formation express',
                                'Rapport technique complet',
                                'Intégration mentions légales & conformité'
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-black/40 rounded-lg border border-white/5">
                                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                                    <span className="text-gray-200">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Card className="flex flex-col justify-center bg-black/60 border-purple-500/30">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                <span className="text-gray-400">Montant retenu</span>
                                <span className="text-xl font-bold">3 200 €</span>
                            </div>
                            <div className="flex justify-between items-center text-purple-300">
                                <span>Remboursement (80%)</span>
                                <span className="text-xl font-bold">+ 2 560 €</span>
                            </div>
                            <div className="pt-4 mt-4 border-t border-white/10">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Reste à charge</span>
                                    <span className="text-3xl font-bold text-white">640 €</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </Section>

            {/* 3. Facilité de paiement */}
            <Section>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <Card className="order-2 md:order-1 border-green-500/20 bg-green-900/5">
                        <div className="text-center">
                            <CreditCard className="w-12 h-12 text-green-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-6">Paiement en 3 ou 4 fois sans frais</h3>
                            <div className="flex justify-center gap-8 mb-6">
                                <div>
                                    <p className="text-3xl font-bold text-white">4 × 800 €</p>
                                </div>
                                <div className="flex items-center text-gray-500">ou</div>
                                <div>
                                    <p className="text-3xl font-bold text-white">3 × 1 067 €</p>
                                </div>
                            </div>
                            <p className="text-sm text-green-300/80">100% légale • N'affecte pas la subvention</p>
                        </div>
                    </Card>
                    <div className="order-1 md:order-2">
                        <span className="text-6xl font-bold text-white/5 absolute -ml-4 -mt-4 select-none">3</span>
                        <Title>Facilité de paiement AUTOMAT</Title>
                        <p className="text-lg text-gray-300 mb-6">
                            Pour vous accompagner sur la trésorerie au moment du lancement, nous proposons un paiement échelonné.
                        </p>
                        <p className="text-gray-400">
                            Le paiement échelonné n’affecte pas la subvention. Il vous permet simplement d’étaler la dépense en attendant le remboursement de la Région.
                        </p>
                    </div>
                </div>
            </Section>

            {/* 4. Les 6 étapes */}
            <Section className="bg-white/5">
                <span className="text-6xl font-bold text-white/5 absolute -mt-12 select-none">4</span>
                <Title>Comment se déroule la prise en charge ?</Title>

                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    {[
                        {
                            step: "1",
                            title: "Diagnostic & devis",
                            time: "24–48h",
                            cost: "0 €",
                            desc: "Nous analysons votre besoin et préparons votre devis conforme.",
                            color: "border-purple-500/50"
                        },
                        {
                            step: "2",
                            title: "Dépôt de la demande",
                            time: "10–20 min",
                            cost: "0 €",
                            desc: "Vous déposez devis et pièces sur la plateforme Région.",
                            color: "border-purple-500/50"
                        },
                        {
                            step: "3",
                            title: "Validation Région",
                            time: "4 à 8 semaines",
                            cost: "-",
                            desc: "Commission et notification d'acceptation. Dès l'accord, on démarre.",
                            color: "border-yellow-500/50"
                        },
                        {
                            step: "4",
                            title: "Réalisation du projet",
                            time: "2 à 4 semaines",
                            cost: "-",
                            desc: "Production, interface, intégration, mise en ligne et livrables.",
                            color: "border-blue-500/50"
                        },
                        {
                            step: "5",
                            title: "Paiement (facilité)",
                            time: "Immédiat ou 3x/4x",
                            cost: "3 200 €",
                            desc: "Facture acquittée nécessaire pour le remboursement.",
                            color: "border-green-500/50"
                        },
                        {
                            step: "6",
                            title: "Remboursement",
                            time: "4 à 12 semaines",
                            cost: "+ 2 560 €",
                            desc: "La Région vous verse 80% du montant directement.",
                            color: "border-white/50"
                        }
                    ].map((s, i) => (
                        <div key={i} className={`p-6 bg-black/40 rounded-xl border-l-4 ${s.color} relative overflow-hidden group hover:bg-white/5 transition-colors`}>
                            <span className="absolute top-4 right-4 text-4xl font-bold text-white/5 group-hover:text-white/10 transition-colors">{s.step}</span>
                            <h4 className="text-xl font-bold mb-2">{s.title}</h4>
                            <div className="flex gap-4 text-xs font-mono text-gray-400 mb-4">
                                <span className="flex items-center gap-1"><Clock size={12} /> {s.time}</span>
                                {s.cost !== "-" && <span className="text-white">{s.cost}</span>}
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* 5. Résumé simple */}
            <Section>
                <div className="max-w-2xl mx-auto">
                    <span className="text-6xl font-bold text-white/5 absolute -ml-12 -mt-4 select-none hidden md:block">5</span>
                    <Title>Résumé financier</Title>
                    <div className="overflow-hidden rounded-xl border border-white/10">
                        <table className="w-full text-left border-collapse">
                            <tbody className="divide-y divide-white/10">
                                <tr className="bg-white/5">
                                    <td className="p-4 text-gray-300">Coût du projet</td>
                                    <td className="p-4 text-right font-bold text-xl">3 200 €</td>
                                </tr>
                                <tr className="bg-green-900/10">
                                    <td className="p-4 text-green-300">Remboursement Région (80%)</td>
                                    <td className="p-4 text-right font-bold text-xl text-green-400">+ 2 560 €</td>
                                </tr>
                                <tr className="bg-white/10">
                                    <td className="p-4 font-bold text-white">Coût final pour vous</td>
                                    <td className="p-4 text-right font-bold text-2xl text-white">640 €</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-gray-400 text-sm">Paiement possible</td>
                                    <td className="p-4 text-right text-sm text-gray-300">3× ou 4× sans frais</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Section>

            {/* 6. Pourquoi AUTOMAT */}
            <Section className="bg-gradient-to-b from-black to-purple-900/20">
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <span className="text-6xl font-bold text-white/5 absolute -ml-4 -mt-4 select-none">6</span>
                        <Title>Pourquoi AUTOMAT ?</Title>
                        <p className="text-lg text-gray-300 mb-6">
                            AUTOMAT n’est pas une simple agence web. Nous sommes un atelier de conception de systèmes digitaux avec IA.
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                'Architecture digitale',
                                'Design minimaliste & performant',
                                'Automatisations',
                                'IA légère intégrée',
                                'Optimisation business',
                                'Maintenance & évolutions'
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <Zap className="w-4 h-4 text-yellow-400" />
                                    <span className="text-gray-200">{item}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 p-4 border border-white/10 rounded-lg bg-white/5">
                            <p className="text-white font-medium">👉 Notre objectif :</p>
                            <p className="text-gray-400">Vous construire un outil utile, moderne et prêt à faire croître votre activité.</p>
                        </div>
                    </div>
                    <div className="relative">
                        {/* Abstract visual representation */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-3xl opacity-30 animate-pulse" />
                        <div className="relative h-full min-h-[300px] border border-white/10 rounded-2xl bg-black/50 backdrop-blur flex items-center justify-center p-8">
                            <div className="text-center space-y-4">
                                <div className="inline-block p-4 rounded-full bg-white/5 border border-white/10">
                                    <ShieldCheck className="w-12 h-12 text-white" />
                                </div>
                                <h4 className="text-xl font-bold">Qualité Premium</h4>
                                <p className="text-sm text-gray-400">Standards élevés de design et de code.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* 7. Bonus */}
            <Section>
                <span className="text-6xl font-bold text-white/5 absolute -mt-12 select-none">7</span>
                <Title>Bonus optionnels (non subventionnés)</Title>
                <p className="text-gray-400 mb-8">Après votre remboursement, vous pouvez ajouter ces services facultatifs :</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['Chatbot IA', 'Automatisation WhatsApp/Email', 'Pack acquisition', 'Maintenance', 'Pages supplémentaires', 'Mini-SaaS métier'].map((item, i) => (
                        <div key={i} className="p-4 border border-white/10 rounded-lg text-center hover:bg-white/5 transition-colors cursor-default">
                            <span className="text-sm text-gray-300">{item}</span>
                        </div>
                    ))}
                </div>
            </Section>

            {/* 8. En résumé & CTA */}
            <Section className="pb-32">
                <div className="bg-white text-black rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-8">Prêt à lancer votre projet ?</h2>

                        <div className="grid md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto mb-12">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2"><Check className="text-green-600" /> Dossier Kap Numérik pris en charge</li>
                                <li className="flex items-center gap-2"><Check className="text-green-600" /> Offre 3 200 € éligible à 80%</li>
                                <li className="flex items-center gap-2"><Check className="text-green-600" /> Paiement en 3× ou 4×</li>
                            </ul>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2"><Check className="text-green-600" /> Remboursement Région → 2 560 €</li>
                                <li className="flex items-center gap-2"><Check className="text-green-600" /> Coût final pour vous : 640 €</li>
                                <li className="flex items-center gap-2"><Check className="text-green-600" /> Accompagnement complet de A à Z</li>
                            </ul>
                        </div>

                        <a
                            href="http://automat.agency"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-900 transition-transform hover:scale-105"
                        >
                            Démarrer mon dossier
                            <ArrowRight className="w-5 h-5" />
                        </a>
                        <p className="mt-4 text-sm text-gray-500">Réponse sous 24h</p>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-16 -mb-16" />
                </div>
            </Section>

            <footer className="py-8 text-center text-white/20 text-xs font-mono uppercase tracking-widest border-t border-white/10">
                © 2024 AUTOMAT. Kap Numérik Page.
            </footer>
        </div>
    );
};

export default KapNumerikPage;
