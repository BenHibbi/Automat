// Secure client-side Gemini service
// Now uses serverless function to keep API key secure

// Generate a unique session ID for this user
const getSessionId = () => {
    let sessionId = sessionStorage.getItem('gemini_session_id');
    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('gemini_session_id', sessionId);
    }
    return sessionId;
};

export const sendMessageToGemini = async (message) => {
    try {
        const sessionId = getSessionId();

        // Call our secure serverless function instead of directly calling Gemini
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                sessionId
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            return "Désolé, une erreur système est survenue. Veuillez réessayer.";
        }

        const data = await response.json();
        return data.response;

    } catch (error) {
        console.error("Gemini Error:", error);
        return "Désolé, une erreur de connexion est survenue. Vérifiez votre connexion internet.";
    }
};
