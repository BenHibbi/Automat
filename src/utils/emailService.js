import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const initEmailJS = () => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey && publicKey !== 'your_public_key') {
        emailjs.init(publicKey);
    }
};


// Send signal email with pricing data
export const sendSignalEmail = async (chatHistory, kapEligibility, pricingData) => {
    initEmailJS();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_SIGNAL;

    // Format the data for email
    const chatSummary = chatHistory.map(msg => `${msg.role}: ${msg.text}`).join('\n\n');
    const pricingSummary = `
Total: ${pricingData.total}€
Mode: ${pricingData.mode}
Items sélectionnés: ${pricingData.selectedItems.join(', ')}
Détails: ${JSON.stringify(pricingData.details, null, 2)}
  `.trim();

    const kapInfo = kapEligibility ? `Éligible Kap Numérik: ${kapEligibility}` : 'Non vérifié';

    // Fallback to mailto if EmailJS is not configured
    if (!serviceId || !templateId || serviceId === 'your_service_id') {
        const subject = 'Nouveau signal - Demande de devis AUTOMAT';
        const body = `
=== CONVERSATION ===
${chatSummary}

=== PRICING ===
${pricingSummary}

=== KAP NUMÉRIK ===
${kapInfo}
    `.trim();

        window.location.href = `mailto:benjamin.lacaze@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        return { success: true, method: 'mailto' };
    }

    try {
        const response = await emailjs.send(
            serviceId,
            templateId,
            {
                to_email: 'benjamin.lacaze@gmail.com',
                chat_history: chatSummary,
                pricing_data: pricingSummary,
                kap_eligibility: kapInfo,
                timestamp: new Date().toLocaleString('fr-FR')
            }
        );

        return { success: true, method: 'emailjs', response };
    } catch (error) {
        console.error('EmailJS Error:', error);
        // Fallback to mailto on error
        const subject = 'Nouveau signal - Demande de devis AUTOMAT';
        const body = `
=== CONVERSATION ===
${chatSummary}

=== PRICING ===
${pricingSummary}

=== KAP NUMÉRIK ===
${kapInfo}
    `.trim();

        window.location.href = `mailto:benjamin.lacaze@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        return { success: false, error, method: 'mailto-fallback' };
    }
};
