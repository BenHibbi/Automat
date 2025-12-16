import React from 'react';
import { motion } from 'framer-motion';
import {
    Check, ArrowRight, Clock, FileText, ShieldCheck,
    CreditCard, AlertTriangle, HelpCircle, Mail, Phone,
    FileCheck, Upload, Rocket, Wallet, RefreshCw,
    ChevronRight, ExternalLink, CheckCircle2
} from 'lucide-react';

const OnboardingPage = () => {
    const Section = ({ children, className = "", id = "" }) => (
        <section id={id} className={`py-16 px-6 md:px-12 max-w-5xl mx-auto ${className}`}>
            {children}
        </section>
    );

    const Title = ({ children, icon: Icon }) => (
        <h2 className="text-2xl md:text-3xl font-bold mb-6 font-display tracking-tight flex items-center gap-3">
            {Icon && <Icon className="w-8 h-8 text-purple-400" />}
            {children}
        </h2>
    );

    const Card = ({ children, className = "" }) => (
        <div className={`p-6 md:p-8 border border-white/10 bg-white/5 rounded-2xl backdrop-blur-sm ${className}`}>
            {children}
        </div>
    );

    const Step = ({ number, title, icon: Icon, children, highlight = false }) => (
        <div className={`relative p-6 rounded-xl border-l-4 ${highlight ? 'border-purple-500 bg-purple-500/10' : 'border-white/20 bg-white/5'} transition-all hover:bg-white/10`}>
            <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${highlight ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60'}`}>
                    {Icon ? <Icon size={20} /> : <span className="font-bold">{number}</span>}
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{title}</h3>
                    <div className="text-gray-400 text-sm leading-relaxed">{children}</div>
                </div>
            </div>
        </div>
    );

    const FAQ = ({ question, children }) => (
        <div className="border-b border-white/10 pb-6">
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <HelpCircle size={16} className="text-purple-400" />
                {question}
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed pl-6">{children}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
            {/* Header */}
            <header className="pt-20 pb-16 px-6 text-center border-b border-white/10 bg-gradient-to-b from-purple-900/30 via-purple-900/10 to-black relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono mb-6 border border-purple-500/30">
                        GUIDE CLIENT KAP NUMÉRIK
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tighter">
                        Bienvenue dans votre projet
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Merci pour votre confiance.<br />
                        <span className="text-white">Voici comment ça se passe, simplement.</span>
                    </p>
                </motion.div>
            </header>

            {/* Navigation rapide */}
            <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 py-3 px-6 overflow-x-auto">
                <div className="max-w-5xl mx-auto flex gap-4 text-xs font-mono">
                    {[
                        { label: 'Rappel', id: 'rappel' },
                        { label: 'Étapes', id: 'etapes' },
                        { label: 'Délais', id: 'delais' },
                        { label: 'Vos tâches', id: 'roles' },
                        { label: 'FAQ', id: 'faq' },
                        { label: 'Contact', id: 'contact' }
                    ].map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="px-3 py-1.5 rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all whitespace-nowrap"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>

            {/* 1. Rappel rapide */}
            <Section id="rappel">
                <Title icon={FileText}>Rappel rapide : qu'est-ce que Kap Numérik ?</Title>

                <Card className="bg-gradient-to-br from-purple-900/20 to-transparent border-purple-500/20">
                    <p className="text-lg text-gray-300 mb-6">
                        <strong className="text-white">Kap Numérik</strong> est une aide de la <strong className="text-purple-400">Région Réunion</strong> qui permet de financer une grande partie de votre projet digital (site internet, refonte, outils numériques…).
                    </p>

                    <div className="bg-black/40 rounded-xl p-6 mb-6">
                        <p className="text-white font-semibold mb-4">👉 Concrètement :</p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">Vous payez votre prestataire</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">La Région vous rembourse ensuite <strong className="text-white">jusqu'à 80%</strong> des dépenses éligibles HT (avec plafond de 3200€)</span>
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-yellow-300 font-semibold">Important</p>
                            <p className="text-yellow-200/80 text-sm">Kap Numérik est un <strong>remboursement</strong>, pas une avance.</p>
                        </div>
                    </div>
                </Card>
            </Section>

            {/* 2. Les étapes */}
            <Section id="etapes" className="bg-white/5 py-20">
                <Title icon={Rocket}>Comment se déroule votre projet</Title>
                <p className="text-gray-400 mb-8">Voici le parcours complet, dans l'ordre :</p>

                <div className="space-y-4">
                    <Step number="1" title="Signature du devis" icon={FileCheck} highlight>
                        <ul className="space-y-2 mt-2">
                            <li className="flex items-center gap-2">
                                <ChevronRight size={14} className="text-purple-400" />
                                Vous signez le devis Kap Numérik
                            </li>
                            <li className="flex items-center gap-2">
                                <ChevronRight size={14} className="text-purple-400" />
                                Le projet est cadré (contenu, périmètre, délais)
                            </li>
                        </ul>
                        <p className="mt-3 text-xs text-purple-300 font-mono">👉 À ce stade, aucun travail ne démarre encore</p>
                    </Step>

                    <Step number="2" title="Dépôt de votre demande Kap Numérik" icon={Upload}>
                        <p className="mb-3">Vous devez déposer votre dossier en ligne sur le portail officiel de la Région Réunion.</p>

                        <a
                            href="https://demarches.cr-reunion.fr/economie/kap-numerik-2023/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-colors text-sm mb-4"
                        >
                            <ExternalLink size={14} />
                            Accéder au portail Région
                        </a>

                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
                            <p className="text-red-300 text-xs font-semibold">📌 Obligatoire : Sans dépôt de dossier → pas de subvention possible.</p>
                        </div>

                        <p className="text-white text-sm font-semibold mb-2">Documents généralement demandés :</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {[
                                'Pièce d\'identité du dirigeant',
                                'RIB au nom de l\'entreprise',
                                'Devis signé',
                                'KBIS ou document équivalent',
                                'Documents comptables simples'
                            ].map((doc, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                    {doc}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-3 text-xs text-purple-300 font-mono">👉 Nous vous guidons pas à pas pour cette étape.</p>
                    </Step>

                    <Step number="3" title="Validation par la Région" icon={Clock}>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <ChevronRight size={14} className="text-yellow-400" />
                                La Région étudie votre dossier
                            </li>
                            <li className="flex items-center gap-2">
                                <ChevronRight size={14} className="text-yellow-400" />
                                Vous recevez une notification officielle d'acceptation
                            </li>
                        </ul>
                        <p className="mt-3 text-xs text-yellow-300 font-mono">📩 Seulement après cette validation, le projet peut démarrer.</p>
                    </Step>

                    <Step number="4" title="Réalisation de votre projet" icon={Rocket}>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <ChevronRight size={14} className="text-blue-400" />
                                Nous concevons et livrons votre site / solution
                            </li>
                            <li className="flex items-center gap-2">
                                <ChevronRight size={14} className="text-blue-400" />
                                Vous validez le résultat final
                            </li>
                            <li className="flex items-center gap-2">
                                <ChevronRight size={14} className="text-blue-400" />
                                Une facture est émise
                            </li>
                        </ul>
                    </Step>

                    <Step number="5" title="Paiement de la facture" icon={CreditCard}>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <ChevronRight size={14} className="text-green-400" />
                                Vous réglez la facture (virement, chèque, échéancier possible)
                            </li>
                            <li className="flex items-center gap-2">
                                <AlertTriangle size={14} className="text-red-400" />
                                <span className="text-red-300">Le paiement en espèces n'est pas autorisé</span>
                            </li>
                        </ul>
                    </Step>

                    <Step number="6" title="Demande de remboursement" icon={Wallet}>
                        <p className="mb-3">Vous déposez sur le portail :</p>
                        <ul className="space-y-2 mb-3">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 size={14} className="text-green-400" />
                                La facture acquittée
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 size={14} className="text-green-400" />
                                La preuve de paiement
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 size={14} className="text-green-400" />
                                Les livrables (site en ligne, liens, etc.)
                            </li>
                        </ul>
                        <p className="text-xs text-green-300 font-mono">👉 La Région procède ensuite au remboursement.</p>
                    </Step>
                </div>
            </Section>

            {/* 3. Délais */}
            <Section id="delais">
                <Title icon={Clock}>Délais importants à respecter</Title>

                <Card className="border-yellow-500/30 bg-yellow-500/5">
                    <div className="flex items-start gap-3 mb-6">
                        <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                        <p className="text-yellow-200 font-semibold">Kap Numérik fonctionne avec des dates strictes.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-black/30 rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2" />
                            <div>
                                <p className="text-white font-medium">Le dossier doit être déposé avant toute facture</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-black/30 rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2" />
                            <div>
                                <p className="text-white font-medium">La facture finale doit être payée avant la date limite régionale</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-black/30 rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2" />
                            <div>
                                <p className="text-white font-medium">Le remboursement n'est effectué qu'une fois le projet totalement réglé</p>
                            </div>
                        </div>
                    </div>

                    <p className="mt-6 text-sm text-purple-300 font-mono">👉 Nous vous rappelons les échéances pour éviter toute erreur.</p>
                </Card>
            </Section>

            {/* 4. Rôles */}
            <Section id="roles" className="bg-white/5 py-20">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Votre rôle */}
                    <Card className="border-blue-500/30">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                <span className="text-sm">👤</span>
                            </div>
                            Votre rôle
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">De votre côté, vous devez :</p>
                        <ul className="space-y-3">
                            {[
                                'Fournir les documents demandés',
                                'Déposer votre dossier Kap Numérik (avec notre aide)',
                                'Régler la facture une fois le projet livré',
                                'Déposer les pièces finales pour le remboursement'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 text-xs text-blue-300 font-mono">👉 Aucune compétence technique requise.</p>
                    </Card>

                    {/* Notre rôle */}
                    <Card className="border-purple-500/30 bg-purple-500/5">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                                <span className="text-sm">🤖</span>
                            </div>
                            Notre rôle
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">Nous nous occupons de :</p>
                        <ul className="space-y-3">
                            {[
                                'La conception et réalisation du projet',
                                'Un devis conforme Kap Numérik',
                                'L\'accompagnement administratif',
                                'Les livrables conformes aux exigences de la Région',
                                'L\'assistance jusqu\'au remboursement'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </Section>

            {/* 5. FAQ */}
            <Section id="faq">
                <Title icon={HelpCircle}>Questions fréquentes</Title>

                <div className="space-y-6">
                    <FAQ question="Est-ce que je reçois l'argent directement ?">
                        <strong>Non.</strong> Vous payez d'abord la prestation, puis la Région vous rembourse.
                    </FAQ>

                    <FAQ question="Puis-je payer en plusieurs fois ?">
                        <strong>Oui</strong>, un échéancier est possible, tant que la facture est entièrement réglée avant la demande de remboursement.
                    </FAQ>

                    <FAQ question="Et si mon dossier est refusé ?">
                        Nous vérifions l'éligibilité <strong>avant</strong> le lancement, pour éviter ce cas.
                    </FAQ>

                    <FAQ question="Est-ce compliqué ?">
                        <strong>Non.</strong> Notre objectif est que vous n'ayez qu'à suivre les étapes, sans stress.
                    </FAQ>
                </div>
            </Section>

            {/* 6. Contact */}
            <Section id="contact" className="pb-24">
                <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/20 border-purple-500/20 text-center">
                    <h3 className="text-2xl font-bold mb-4">Contact & accompagnement</h3>
                    <p className="text-gray-400 mb-8">Pour toute question :</p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                        <a
                            href="mailto:benjamin.lacaze@gmail.com"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                        >
                            <Mail size={18} />
                            benjamin.lacaze@gmail.com
                        </a>
                        <a
                            href="tel:0693615712"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                        >
                            <Phone size={18} />
                            06 93 61 57 12
                        </a>
                    </div>

                    <div className="border-t border-white/10 pt-8">
                        <p className="text-gray-400 mb-4">Nous sommes là pour que votre projet Kap Numérik soit :</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {[
                                { label: 'Simple', icon: '✔' },
                                { label: 'Sécurisé', icon: '✔' },
                                { label: 'Rentable', icon: '✔' },
                                { label: 'Sans perte de temps', icon: '✔' }
                            ].map((item, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-300 text-sm"
                                >
                                    <span className="text-green-400">{item.icon}</span>
                                    {item.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </Card>
            </Section>

            {/* Footer */}
            <footer className="py-8 text-center text-white/20 text-xs font-mono uppercase tracking-widest border-t border-white/10">
                © 2024 AUTOMAT. Guide d'onboarding Kap Numérik.
            </footer>
        </div>
    );
};

export default OnboardingPage;
