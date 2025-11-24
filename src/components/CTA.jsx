import React, { useState } from 'react';

const CTA = ({ chatHistory, kapEligibility, pricingData, theme }) => {
    const [email, setEmail] = useState('');
    const isLight = theme === 'light';
    const borderColor = isLight ? 'border-black/10' : 'border-white/10';
    const inputBg = isLight ? 'bg-white' : 'bg-black';
    const inputBorder = isLight ? 'border-black/30' : 'border-white/30';
    const inputText = isLight ? 'text-black' : 'text-white';
    const inputPlaceholder = isLight ? 'placeholder:text-black/30' : 'placeholder:text-white/30';
    const inputFocus = isLight ? 'focus:border-black' : 'focus:border-white';
    const btnBorder = isLight ? 'border-black' : 'border-white';
    const btnText = isLight ? 'text-black hover:text-white' : 'text-white hover:text-black';
    const btnBg = isLight ? 'bg-black' : 'bg-white';

    const handleSend = (e) => {
        e.preventDefault();

        const subject = "Demande de devis AUTOMAT";

        let body = `Email de contact : ${email}\n\n`;

        // Chat History
        body += `--- HISTORIQUE CHAT ---\n`;
        if (chatHistory && chatHistory.length > 0) {
            chatHistory.forEach(msg => {
                body += `[${msg.role}]: ${msg.text}\n`;
            });
        } else {
            body += "Aucun historique de chat.\n";
        }
        body += `\n`;

        // Kap Numerik Eligibility
        body += `--- ÉLIGIBILITÉ KAP NUMÉRIK ---\n`;
        body += `Statut : ${kapEligibility || 'Non testé'}\n\n`;

        // Pricing Data
        body += `--- ESTIMATION SYSTÈME ---\n`;
        if (pricingData) {
            body += `Mode de financement : ${pricingData.mode}\n`;
            body += `Total Standard : ${pricingData.total}€\n`;

            if (pricingData.mode === 'kap') {
                body += `Aide estimée : ${pricingData.details.kapAid}€\n`;
                body += `Reste à charge : ${pricingData.details.kapRemaining}€\n`;
            } else if (pricingData.mode === 'waas') {
                body += `Apport initial : ${pricingData.details.waasUpfront}€\n`;
                body += `Mensualité : ${pricingData.details.waasMonthly}€ / mois (24 mois)\n`;
            }

            body += `\nModules sélectionnés :\n`;
            if (pricingData.selectedItems && pricingData.selectedItems.length > 0) {
                pricingData.selectedItems.forEach(item => {
                    body += `- ${item.name} (${item.price}€)\n`;
                });
            } else {
                body += "Aucun module sélectionné.\n";
            }
        }

        window.location.href = `mailto:benjamin.lacaze@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <section className={`py-32 border-t flex flex-col items-center text-center transition-colors duration-500 ${borderColor}`}>
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-medium mb-6">Activez AUTOMAT.</h2>
                <p className="opacity-70 max-w-md mx-auto mb-8 leading-relaxed">
                    Selectionnez vos besoins ci-dessus, et entrez votre mail ci-dessous pour obtenir un devis.
                </p>

                <form onSubmit={handleSend} className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="votremail@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={`w-full border px-6 py-4 text-center focus:outline-none transition-colors ${inputBg} ${inputBorder} ${inputText} ${inputPlaceholder} ${inputFocus}`}
                    />
                    <button
                        type="submit"
                        className={`group relative px-8 py-4 overflow-hidden border transition-colors duration-300 w-full ${btnBorder} ${btnText}`}
                    >
                        <span className={`absolute inset-0 w-full h-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out ${btnBg}`}></span>
                        <span className="relative text-sm uppercase tracking-widest font-medium">[ Envoyer un signal ]</span>
                    </button>
                </form>
            </div>
        </section>
    );
};

export default CTA;
