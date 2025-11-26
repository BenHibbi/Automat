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

    const handleSend = async (e) => {
        e.preventDefault();

        // Import emailService dynamically
        const { sendSignalEmail } = await import('../utils/emailService');

        // Add email to pricing data
        const enrichedPricingData = {
            ...pricingData,
            contactEmail: email
        };

        const result = await sendSignalEmail(chatHistory, kapEligibility, enrichedPricingData);

        if (result.success && result.method === 'emailjs') {
            alert('✅ Signal envoyé avec succès ! Nous vous recontacterons rapidement.');
            setEmail('');
        }
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
