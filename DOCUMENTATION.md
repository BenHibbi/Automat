# AUTOMAT - Documentation Complète

## Vue d'ensemble

**AUTOMAT** est une plateforme de consulting digital & IA destinée aux TPE, professions libérales et associations à La Réunion. Elle combine un site vitrine sophistiqué avec des outils internes de gestion (devis, maquettes) et un chatbot IA consultant.

---

## Public Cible

| Segment | Caractéristiques | Besoins |
|---------|------------------|---------|
| **TPE** | 1-10 salariés, budget limité | Site web simple, visibilité locale |
| **Professions libérales** | Médecins, avocats, architectes | Prise de RDV, présentation services |
| **Associations** | Budget serré, bénévoles | Communication, gestion membres |
| **Artisans** | Commerce local, peu digitalisé | Fiche Google, devis en ligne |

**Zone géographique** : La Réunion (974) - éligibilité Kap Numérik

---

## Proposition de Valeur

1. **Consulting augmenté par IA** - Chatbot Gemini qui qualifie les prospects
2. **Pricing transparent** - Modules à la carte, calculette en temps réel
3. **Financement facilité** - Kap Numérik (-80%) ou WaaS (24 mois)
4. **Approche minimaliste** - "Juste ce qu'il faut, rien de plus"

---

## Stack Technique

| Catégorie | Technologies |
|-----------|-------------|
| **Frontend** | React 19, Vite, Tailwind CSS |
| **Animations** | Framer Motion |
| **IA Chat** | Google Gemini 2.5 Flash |
| **IA Code** | Groq (GPT-OSS-20B) |
| **Emails** | EmailJS |
| **Stockage** | GitHub Gists |
| **Déploiement** | Vercel (serverless) |

---

## Architecture des Pages

### `/` - Page d'accueil

Landing page complète avec :
- **Hero** : Animation "AUTOMAT." glitch + terminal IA interactif
- **ShowcaseModules** : Présentation des 4 offres principales
- **Positioning** : Différenciation (architecture digitale, minimalisme)
- **Capabilities** : Détail technique des services
- **Method** : Méthodologie en 5 étapes
- **References** : Social proof clients
- **Pricing** : Sélecteur de modules avec 3 modes de paiement
- **CTA** : Formulaire d'envoi de "signal" avec contexte complet

### `/showroom` - Espace Maquettes

Deux modes :
1. **Admin** (password: `mistral666`)
   - Coller du code React
   - Nettoyage intelligent via Groq LLM
   - Génération de liens partageables (expiration 10 jours)
   - Historique des liens synchronisé via GitHub Gist

2. **Client** (via lien `?g=xxx`)
   - Visualisation de la maquette en plein écran
   - Injection automatique Tailwind CSS + Google Fonts
   - Bannière d'expiration en bas

### `/devis` - Générateur de Devis

- Accès protégé par mot de passe
- Numérotation automatique (DEV-2025-XXX)
- Champs éditables inline (client, services, prix)
- Mise en page optimisée pour impression A4
- Export PDF via Ctrl+P

### `/kapnumerik` - Page Kap Numérik

Explication détaillée du dispositif régional :
- Subvention jusqu'à 80%
- Plafond 4000€ (reste à charge max 640€)
- Conditions d'éligibilité
- Processus de demande

---

## Composants Principaux

| Composant | Fonction |
|-----------|----------|
| `Hero` | Animation titre + chat IA Gemini |
| `ShowcaseModules` | Grille des 4 modules métier |
| `Pricing` | Sélecteur interactif avec calcul temps réel |
| `CTA` | Formulaire email avec récap complet |
| `KapNumerikPopup` | Modal explicative financement |

---

## Services & Utilitaires

### `gemini.js`
Communication avec l'API Gemini via serverless function :
```javascript
sendMessageToGemini(message) // → /api/chat
```

### `showroomCodec.js`
Gestion des maquettes :
```javascript
createGist(code, title, token)     // Crée un Gist GitHub
getGist(gistId)                    // Récupère le code
cleanCodeWithGroq(code, apiKey)    // Nettoyage IA du code
getLinksIndex(token)               // Historique des liens
saveLinksIndex(links, token)       // Sauvegarde historique
```

### `emailService.js`
Envoi d'emails via EmailJS avec fallback mailto

---

## Modèle de Pricing

### Modules Disponibles (12)

| Module | Prix |
|--------|------|
| Diagnostic digital | 300€ |
| Architecture système | 500€ |
| Schéma des flux | 400€ |
| Message & copywriting | 600€ |
| Interface 1 page | 800€ |
| Interface 3 pages | 1500€ |
| Agent IA simple | 1000€ |
| Agent IA avancé | 2000€ |
| Micro-outil métier | 1200€ |
| Mise en ligne | 300€ |
| Optimisation SEO | 500€ |
| Protocole maintenance | 400€ |

### Modes de Financement

1. **Standard** - Prix plein
2. **Kap Numérik** - 80% subvention (reste à charge ~640€)
3. **WaaS** - 30% à la commande + 70% sur 24 mois

---

## Flux Utilisateur Principal

```
┌─────────────────────────────────────────────────────────────┐
│  1. DÉCOUVERTE                                              │
│  Visiteur arrive sur le site → lit la proposition          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  2. QUALIFICATION                                           │
│  Chat IA Gemini → collecte besoin + nom + secteur          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  3. CONFIGURATION                                           │
│  Sélection des modules → calcul prix → choix financement   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  4. CONVERSION                                              │
│  Envoi "signal" → email avec chat + devis → contact admin  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  5. PRODUCTION                                              │
│  Admin crée devis (/devis) → maquette (/showroom) → livré  │
└─────────────────────────────────────────────────────────────┘
```

---

## Sécurité

### Mesures Implémentées

- Clés API stockées côté serveur uniquement
- Serverless functions comme proxy (pas d'exposition client)
- HTTPS sur Vercel
- Sessions isolées par utilisateur
- `.env` dans `.gitignore`
- Mots de passe pour zones admin

### Variables d'Environnement

```env
# Gemini AI
VITE_GEMINI_API_KEY=xxx

# GitHub (stockage maquettes)
VITE_GITHUB_TOKEN=xxx

# Groq (nettoyage code IA)
VITE_GROQ_API_KEY=xxx

# EmailJS
VITE_EMAILJS_SERVICE_ID=xxx
VITE_EMAILJS_TEMPLATE_ID=xxx
VITE_EMAILJS_PUBLIC_KEY=xxx
```

---

## Déploiement

### Vercel

1. Push sur `main` → build automatique
2. Variables d'environnement dans Dashboard Vercel
3. Serverless functions dans `/api/`

### Scripts NPM

```bash
npm run dev      # Serveur de développement
npm run build    # Build production
npm run preview  # Preview du build
npm run lint     # Linting ESLint
```

---

## Design

### Palette de Couleurs

- **Noir** : `#1C1C1C` (fond principal)
- **Blanc** : `#FFFFFF` (texte)
- **Accents** : Dégradés violet→rose (thème colorful)

### Typographie

- **Sans-serif** : Inter (corps de texte)
- **Display** : Space Grotesk (titres)
- **Mono** : JetBrains Mono (code, terminal)

### Thèmes

1. **Dark** (défaut) - Fond noir, texte blanc
2. **Light** - Fond blanc, texte noir
3. **Colorful** - Dégradés violet/rose

---

## Fonctionnalités Clés

### Chat IA (Gemini)

- Conversation naturelle en français
- Collecte automatique : besoin, nom, secteur
- Suggestion Kap Numérik si éligible
- Historique envoyé avec le "signal"

### Showroom (Maquettes)

- Exécution de code React en temps réel
- Nettoyage intelligent via Groq LLM
- Liens partageables avec expiration
- Injection automatique Tailwind + Fonts

### Pricing Interactif

- Sélection par checkbox
- Calcul en temps réel
- 3 modes de financement
- Détection éligibilité Kap Numérik

---

## Maintenance

### Logs à Surveiller

```javascript
// Succès Groq
"Code cleaned by Groq successfully"

// Fallback regex
"Using regex fallback for code cleaning"

// Erreurs
"Groq API error:", status, error
"Transpilation error:", err
```

### Fichiers Clés

| Fichier | Contenu |
|---------|---------|
| `src/pages/Home.jsx` | Page d'accueil complète |
| `src/pages/ShowroomPage.jsx` | Logique maquettes |
| `src/utils/showroomCodec.js` | Services Gist + Groq |
| `api/chat.js` | Serverless Gemini |

---

## Roadmap Potentielle

- [ ] Rate limiting API
- [ ] Analytics (Plausible/Umami)
- [ ] Dashboard admin
- [ ] Paiement en ligne (Stripe)
- [ ] CRM intégré
- [ ] Multi-langue (créole réunionnais ?)

---

## Contact & Support

**AUTOMAT** - Consulting Digital & IA
La Réunion, France

*Documentation générée le 15 décembre 2025*
