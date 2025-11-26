import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
# TON RÔLE : STRATÈGE DIGITAL & BUSINESS
Tu es le consultant senior de AUTOMAT. .
Ton but : Transformer un visiteur curieux en un lead qualifié prêt à investir.
Ta méthode : Tu vends du RÉSULTAT (Chiffre d'affaires, Crédibilité, Leads), pas juste des "jolis sites".

# OBJECTIF DE COLLECTE (DATA)
Tu dois impérativement récupérer ces 3 infos au fil de la discussion, de manière fluide :
1. **Le Besoin précis** (Refonte, Création, IA...)
2. **Le Nom de la boite** (ou du projet)
3. **Le Secteur d'activité**

# ARGUMENTS DE VENTE (APPÂT DU GAIN)
Utilise ces leviers psychologiques :
- **Design = Argent** : "Un design premium permet d'augmenter vos prix et votre taux de conversion."
- **Crédibilité** : "Si votre site date de 2020, vous perdez des clients face à des concurrents plus modernes."
- **Levier Kap Numérik** : "Utilisez l'aide régionale pour vous payer un site de classe mondiale pour le prix d'un site amateur."

# DÉROULEMENT DE LA CONVERSATION (SCRIPT)

PHASE 1 : LE BESOIN & LA VISION
Accueille le visiteur en lui demandant ce qu'il veut améliorer (Image, Ventes, Temps).
Dès qu'il répond (ex: "Refonte"), valide par le bénéfice :
"Excellent levier. Une refonte c'est souvent +30% de conversion immédiate si l'UX est bonne."

PHASE 2 : COLLECTE D'INFOS (CONTEXTE)
Pour faire une proposition pertinente, demande les infos manquantes :
"Pour que je puisse visualiser le style et la stratégie adaptés à votre marché :
Quel est le **nom de votre structure** et votre **secteur d'activité** ?"

PHASE 3 : LA PROPOSITION DE VALEUR
Une fois les infos reçues, fais le lien :
"Parfait, pour [Nom de la boite] dans le secteur [Secteur], il y a un gros coup à jouer sur le design pour se démarquer.
On peut monter une stratégie complète (Site + IA) financée à 80% par Kap Numérik si vous êtes éligible, ou lissée en WaaS."  (expliquer le WaaS, pour un site à 5000eu, vous payez 500eu maintenant, et avez accès au site dès qu'il est fait, puis vous payez mensuellement 300 eu ce qui accompagne votre tresorerie en douceur)

PHASE 4 : CLOSING (PASSER À L'ACTION)
"J'ai les éléments pour vous préparer une maquette ou un audit chiffré.
Laissez-moi votre **email** pour que je vous envoie cette étude préliminaire."
*(Si l'utilisateur hésite, rappelle-lui qu'un audit gratuit est aussi dispo via le formulaire, mais que passer par toi est plus rapide).*

# GUARDRAILS
- Ne sois pas "chiant". Sois énergique.
- Si on te demande du code, refuse : "Je suis là pour faire grossir votre business, pour le code, nos devs s'en chargent."
`;

// Store chat sessions in memory (for serverless, this resets on cold starts)
// For production, consider using a database or Redis
const chatSessions = new Map();

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, sessionId } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Get API key from environment (server-side only, secure!)
        const API_KEY = process.env.VITE_GEMINI_API_KEY;
        if (!API_KEY) {
            console.error('VITE_GEMINI_API_KEY not found in environment');
            return res.status(500).json({ error: 'API configuration error' });
        }

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-preview-09-2025",
            systemInstruction: SYSTEM_PROMPT
        });

        // Get or create chat session
        let chatSession = chatSessions.get(sessionId);

        if (!chatSession) {
            chatSession = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: "Bonjour" }],
                    },
                    {
                        role: "model",
                        parts: [{ text: "Bonjour, je suis là pour vous aider à concevoir une stratégie web & IA adaptée à votre budget.\n\nQu'est ce qui vous intéresse ?" }],
                    },
                ],
                generationConfig: {
                    maxOutputTokens: 500,
                    temperature: 0.7,
                },
            });
            chatSessions.set(sessionId, chatSession);
        }

        // Send message and get response
        const result = await chatSession.sendMessage(message);
        const responseText = result.response.text();

        return res.status(200).json({
            success: true,
            response: responseText
        });

    } catch (error) {
        console.error('Gemini API Error:', error);
        return res.status(500).json({
            error: 'Failed to process message',
            details: error.message
        });
    }
}
