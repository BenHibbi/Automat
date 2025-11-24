import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KapNumerikPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0); // 0 = Intro, 1-6 = Questions, 7 = Result
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const hasSeenPopup = localStorage.getItem('automat_kap_numerik_seen');
        if (!hasSeenPopup) {
            // Small delay for better UX
            const timer = setTimeout(() => setIsOpen(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const closePopup = () => {
        setIsOpen(false);
        localStorage.setItem('automat_kap_numerik_seen', 'true');
    };

    const handleAnswer = (key, value) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
        if (step < 6) {
            setStep(prev => prev + 1);
        } else {
            setStep(7); // Go to result
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(prev => prev - 1);
        else if (step === 1) setStep(0);
    };

    const getEligibilityResult = () => {
        const { type, location, employees, revenue, sector, alreadyHelped } = answers;

        // 1. Ineligibility Rules
        if (type === 'Autre') return 'ineligible';
        if (location === 'Non') return 'ineligible';

        const ineligibleSectors = [
            'Numérique / agence web / IT',
            'Agricole',
            'Pêche',
            'Promotion immobilière',
            'Activités financières / banque / assurance'
        ];
        if (ineligibleSectors.includes(sector)) return 'ineligible';

        if (employees === '20 ou plus') return 'ineligible';
        if (revenue === 'Plus de 1 000 000 €') return 'ineligible';

        // 2. Calculation
        // Tier 1: 0-9 employees, <= 500k revenue
        const isTier1Employees = ['0', '1 à 9'].includes(employees);
        const isTier1Revenue = revenue === 'Moins de 500 000 €';

        // Tier 2: 10-19 employees (Enterprise only), <= 1M revenue
        const isTier2Employees = employees === '10 à 19';
        const isEnterprise = type === 'Entreprise (TPE/PME)';
        // Revenue is valid if < 500k OR 500k-1M. Since we already filtered > 1M, any remaining revenue is valid for Tier 2 if employees match.

        let status = 'ineligible';

        if (isTier1Employees && isTier1Revenue) {
            status = 'eligible_80';
        } else if (isTier2Employees && isEnterprise) {
            // Note: Tier 2 allows up to 1M, so both <500k and 500k-1M work
            status = 'eligible_50';
        }

        // 3. Special Case Q6
        if (status !== 'ineligible') {
            if (alreadyHelped === 'Oui, pour un projet similaire') {
                return 'eligible_check';
            }
            // "Oui, pour un autre projet" is just a warning/note, but still eligible
        }

        return status;
    };

    const renderContent = () => {
        switch (step) {
            case 0: // Intro
                return (
                    <>
                        <h2 className="text-xl md:text-2xl font-medium mb-4">Voulez-vous bénéficier du dispositif Kap Numérik ?</h2>
                        <p className="text-sm text-white/70 mb-8 leading-relaxed">
                            Kap Numérik est une aide de la Région Réunion qui peut financer une grande partie de votre projet digital (site, refonte, présence en ligne, outils…). Répondez à quelques questions pour tester votre éligibilité.
                        </p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => setStep(1)}
                                className="w-full py-3 bg-white text-black text-sm font-medium uppercase tracking-wider hover:bg-white/90 transition-colors"
                            >
                                Oui, tester mon éligibilité
                            </button>
                            <button
                                onClick={closePopup}
                                className="w-full py-3 border border-white/20 text-white/50 text-xs uppercase tracking-widest hover:text-white hover:border-white/50 transition-colors"
                            >
                                Non merci
                            </button>
                        </div>
                    </>
                );

            case 1: // Q1 Type
                return (
                    <QuestionStep
                        question="Quel est votre type de structure ?"
                        options={['Entreprise (TPE/PME)', 'Association', 'Profession libérale non réglementée / assimilée', 'Autre']}
                        onAnswer={(val) => handleAnswer('type', val)}
                        currentStep={1}
                        totalSteps={6}
                        onBack={() => setStep(0)}
                    />
                );
            case 2: // Q2 Location
                return (
                    <QuestionStep
                        question="Votre structure est-elle domiciliée à La Réunion (siège social ou activité principale) ?"
                        options={['Oui', 'Non']}
                        onAnswer={(val) => handleAnswer('location', val)}
                        currentStep={2}
                        totalSteps={6}
                        onBack={handleBack}
                    />
                );
            case 3: // Q3 Employees
                return (
                    <QuestionStep
                        question="Combien de salariés compte votre structure ?"
                        options={['0', '1 à 9', '10 à 19', '20 ou plus']}
                        onAnswer={(val) => handleAnswer('employees', val)}
                        currentStep={3}
                        totalSteps={6}
                        onBack={handleBack}
                    />
                );
            case 4: // Q4 Revenue
                return (
                    <QuestionStep
                        question="Quel était votre chiffre d’affaires (ou budget annuel) l’an dernier ?"
                        options={['Moins de 500 000 €', 'Entre 500 000 € et 1 000 000 €', 'Plus de 1 000 000 €']}
                        onAnswer={(val) => handleAnswer('revenue', val)}
                        currentStep={4}
                        totalSteps={6}
                        onBack={handleBack}
                    />
                );
            case 5: // Q5 Sector
                return (
                    <QuestionStep
                        question="Quel est votre secteur d’activité principal ?"
                        options={[
                            'Numérique / agence web / IT',
                            'Agricole',
                            'Pêche',
                            'Promotion immobilière',
                            'Activités financières / banque / assurance',
                            'Audiovisuel',
                            'Commerce / restauration / services',
                            'Autre secteur'
                        ]}
                        onAnswer={(val) => handleAnswer('sector', val)}
                        currentStep={5}
                        totalSteps={6}
                        onBack={handleBack}
                    />
                );
            case 6: // Q6 Already Helped
                return (
                    <QuestionStep
                        question="Avez-vous déjà bénéficié du dispositif Kap Numérik l’an dernier pour des actions similaires ?"
                        options={['Non', 'Oui, pour un autre projet', 'Oui, pour un projet similaire', 'Je ne sais pas']}
                        onAnswer={(val) => handleAnswer('alreadyHelped', val)}
                        currentStep={6}
                        totalSteps={6}
                        onBack={handleBack}
                    />
                );
            case 7: // Result
                return <ResultStep result={eligibilityResult} answers={answers} onClose={closePopup} />;

            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closePopup}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-[#111] border border-white/10 p-8 md:p-10 shadow-2xl overflow-hidden font-mono text-white"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closePopup}
                            className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors text-xl leading-none"
                        >
                            &times;
                        </button>

                        {/* Content */}
                        <div className="relative z-10">
                            {renderContent()}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const QuestionStep = ({ question, options, onAnswer, currentStep, totalSteps, onBack }) => {
    return (
        <div className="flex flex-col h-full">
            <div className="mb-2 text-xs text-white/30 uppercase tracking-widest">
                Question {currentStep}/{totalSteps}
            </div>
            <h3 className="text-lg md:text-xl font-medium mb-8 min-h-[3.5rem]">{question}</h3>

            <div className="flex flex-col gap-3 mb-8">
                {options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => onAnswer(opt)}
                        className="w-full text-left px-4 py-3 border border-white/10 hover:border-white/50 hover:bg-white/5 transition-all text-sm text-white/80"
                    >
                        {opt}
                    </button>
                ))}
            </div>

            <div className="mt-auto pt-4 border-t border-white/5 flex justify-start">
                <button
                    onClick={onBack}
                    className="text-xs text-white/30 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-2"
                >
                    ← Retour
                </button>
            </div>
        </div>
    );
};

const ResultStep = ({ result, answers, onClose }) => {
    const isEligible = result !== 'ineligible';

    let title = "";
    let content = null;

    if (result === 'ineligible') {
        title = "Vous ne semblez pas éligible au Kap Numérik.";
        content = (
            <p className="text-sm text-white/70 mb-8 leading-relaxed">
                D’après vos réponses, vous ne rentrez pas dans les critères principaux du dispositif Kap Numérik.
                <br /><br />
                Cela ne vous empêche pas de lancer ou de refondre votre système digital : AUTOMAT peut concevoir une architecture adaptée à votre budget.
            </p>
        );
    } else if (result === 'eligible_check') {
        title = "Éligibilité à confirmer.";
        content = (
            <p className="text-sm text-white/70 mb-8 leading-relaxed">
                Vous semblez entrer dans les critères du Kap Numérik, mais vous avez déjà bénéficié du dispositif pour un projet similaire.
                <br /><br />
                La Région exige que les actions financées soient différentes d’une année sur l’autre. AUTOMAT peut vous aider à cadrer un nouveau projet éligible et à monter le dossier.
            </p>
        );
    } else {
        // eligible_80 or eligible_50
        const percentage = result === 'eligible_80' ? '80 %' : '50 %';
        const ceiling = result === 'eligible_80' ? '3 200 €' : '2 000 € HT';

        title = "Bonne nouvelle : vous semblez éligible au Kap Numérik.";
        content = (
            <div className="text-sm text-white/70 mb-8 leading-relaxed space-y-4">
                <p>
                    Sur la base des informations indiquées, votre projet pourrait être financé jusqu’à <strong className="text-white">{percentage}</strong> (dans la limite des plafonds officiels et après validation par la Région).
                </p>
                <p>
                    AUTOMAT peut vous accompagner pour :<br />
                    – le devis détaillé,<br />
                    – la définition des actions numériques,<br />
                    – le montage du dossier sur le portail de la Région.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-lg md:text-xl font-medium mb-6">{title}</h3>
            {content}

            <div className="flex flex-col gap-3">
                <button
                    onClick={onClose}
                    className="w-full py-3 bg-white text-black text-sm font-medium uppercase tracking-wider hover:bg-white/90 transition-colors"
                >
                    Commencer mon projet !
                </button>
            </div>

            {isEligible && (
                <p className="mt-6 text-[10px] text-white/20 text-center">
                    Ce simulateur est indicatif et ne vaut pas validation officielle du dispositif.
                </p>
            )}
        </div>
    );
};

export default KapNumerikPopup;
