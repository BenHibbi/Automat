# 🔒 Sécurisation de l'API Gemini

## ⚠️ Problème Identifié

Chrome a détecté un problème de sécurité car la clé API Gemini était **exposée côté client** dans le code JavaScript. Toute personne inspectant le code source pouvait voir et voler votre clé API.

## ✅ Solution Implémentée

### Architecture Sécurisée

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────┐
│   Browser   │ ──────> │ Vercel Function  │ ──────> │   Gemini    │
│  (Public)   │         │   /api/chat.js   │         │     API     │
└─────────────┘         │   (Secure)       │         └─────────────┘
                        └──────────────────┘
                               ↑
                        Clé API cachée ici
```

### Fichiers Modifiés

1. **`/api/chat.js`** (NOUVEAU)
   - Serverless function Vercel
   - Garde la clé API côté serveur (sécurisé)
   - Gère les sessions de chat
   - Expose uniquement un endpoint `/api/chat`

2. **`/src/utils/gemini.js`** (REFACTORISÉ)
   - Ne contient plus la clé API
   - Appelle `/api/chat` au lieu de Gemini directement
   - Utilise `sessionStorage` pour maintenir les sessions

3. **`/vercel.json`** (MIS À JOUR)
   - Route `/api/*` vers les serverless functions
   - Préserve le routing SPA pour le reste

## 🚀 Déploiement sur Vercel

### 1. Variables d'Environnement

Dans votre dashboard Vercel :
1. Allez dans **Settings** → **Environment Variables**
2. Ajoutez : `VITE_GEMINI_API_KEY` = `votre_clé_api`
3. Ajoutez les autres clés si nécessaire (EmailJS, etc.)

### 2. Redéploiement

```bash
# Option 1: Push vers Git (déploiement auto)
git add .
git commit -m "🔒 Sécurisation API Gemini via serverless function"
git push

# Option 2: Déploiement manuel
vercel --prod
```

## 🧪 Test Local

Pour tester localement avec la nouvelle architecture :

```bash
# Installer Vercel CLI si nécessaire
npm i -g vercel

# Lancer en mode dev (simule les serverless functions)
vercel dev
```

Puis ouvrez `http://localhost:3000`

## 🔐 Sécurité Renforcée

### Avant ❌
- Clé API visible dans le bundle JavaScript
- N'importe qui peut la copier et l'utiliser
- Chrome détecte cela comme un risque

### Après ✅
- Clé API stockée uniquement côté serveur
- Impossible d'accéder à la clé depuis le navigateur
- Sessions isolées par utilisateur
- CORS configuré correctement

## 📝 Notes Importantes

1. **Sessions** : Les sessions sont stockées en mémoire. Sur un "cold start" Vercel, elles sont réinitialisées. Pour une solution production robuste, envisagez Redis ou une base de données.

2. **Rate Limiting** : Considérez ajouter un rate limiting pour éviter les abus.

3. **Monitoring** : Surveillez les logs Vercel pour détecter toute utilisation anormale.

## 🆘 Troubleshooting

### Erreur "API configuration error"
→ Vérifiez que `VITE_GEMINI_API_KEY` est bien définie dans les variables d'environnement Vercel

### Erreur CORS
→ Vérifiez que votre domaine est bien configuré dans Vercel

### Chat ne fonctionne pas localement
→ Utilisez `vercel dev` au lieu de `npm run dev` pour tester les serverless functions
