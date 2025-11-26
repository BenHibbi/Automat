# 🚀 Guide de Déploiement AUTOMAT

## 📋 Pré-requis

- Compte Vercel (gratuit)
- Projet Git (GitHub, GitLab, ou Bitbucket)
- Clé API Gemini

## 🔧 Configuration Vercel

### 1. Connecter votre projet à Vercel

```bash
# Option A: Via le dashboard Vercel
# 1. Allez sur vercel.com
# 2. Cliquez "New Project"
# 3. Importez votre repo Git
# 4. Vercel détectera automatiquement Vite

# Option B: Via CLI (optionnel)
npm i -g vercel
vercel
```

### 2. Configurer les Variables d'Environnement

Dans le dashboard Vercel → Settings → Environment Variables, ajoutez :

| Variable | Valeur | Environnement |
|----------|--------|---------------|
| `VITE_GEMINI_API_KEY` | Votre clé API Gemini | Production, Preview, Development |
| `VITE_EMAILJS_PUBLIC_KEY` | Votre clé EmailJS (optionnel) | Production, Preview, Development |
| `VITE_EMAILJS_SERVICE_ID` | Votre service ID EmailJS (optionnel) | Production, Preview, Development |
| `VITE_EMAILJS_TEMPLATE_ID_SIGNAL` | Votre template ID EmailJS (optionnel) | Production, Preview, Development |

⚠️ **Important** : Cochez les 3 environnements (Production, Preview, Development) pour chaque variable.

### 3. Configuration Build

Vercel devrait détecter automatiquement :
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

Si ce n'est pas le cas, configurez manuellement dans Settings → General.

### 4. Déployer

```bash
# Automatique: Push vers Git
git add .
git commit -m "🚀 Deploy to production"
git push

# Vercel déploiera automatiquement
```

## 🧪 Test Local avec Serverless Functions

Pour tester les serverless functions localement :

```bash
# Installer Vercel CLI
npm i -g vercel

# Lancer en mode dev (simule Vercel)
vercel dev

# Ou utiliser le port 3000
vercel dev --listen 3000
```

**Alternative sans Vercel CLI** : Les serverless functions ne fonctionneront pas en local avec `npm run dev`. Vous devez déployer sur Vercel pour les tester, ou utiliser `vercel dev`.

## 📊 Vérification Post-Déploiement

### 1. Tester le Chat
- Ouvrez votre site déployé
- Testez le chat avec Gemini
- Vérifiez qu'il n'y a plus d'alerte Chrome

### 2. Vérifier les Logs
- Dashboard Vercel → Deployments → [Votre déploiement] → Functions
- Vérifiez que `/api/chat` s'exécute sans erreur

### 3. Inspecter la Sécurité
- Ouvrez DevTools (F12)
- Onglet Network → Envoyez un message dans le chat
- Vérifiez que la requête va vers `/api/chat` et non directement vers Gemini
- Inspectez le code source : la clé API ne doit PAS apparaître

## 🔒 Checklist Sécurité

- [ ] `.env` est dans `.gitignore`
- [ ] Clé API Gemini configurée dans Vercel (pas dans le code)
- [ ] Le chat utilise `/api/chat` et non l'API directe
- [ ] Aucune clé API visible dans le bundle JavaScript
- [ ] HTTPS activé (automatique sur Vercel)
- [ ] Chrome ne montre plus d'alerte de sécurité

## 🆘 Problèmes Courants

### "API configuration error"
**Cause** : Variable d'environnement manquante
**Solution** : Vérifiez que `VITE_GEMINI_API_KEY` est bien configurée dans Vercel

### Chat ne répond pas
**Cause** : Serverless function ne s'exécute pas
**Solution** : 
1. Vérifiez les logs Vercel
2. Assurez-vous que le dossier `/api` est bien déployé
3. Testez l'endpoint : `https://votre-site.vercel.app/api/chat` (devrait retourner "Method not allowed")

### CORS Error
**Cause** : Configuration CORS
**Solution** : Vérifiez que `api/chat.js` a bien les headers CORS (déjà configuré)

### Erreur 500 sur /api/chat
**Cause** : Erreur dans la serverless function
**Solution** : Consultez les logs dans Vercel Dashboard → Functions

## 🔄 Workflow de Développement

```bash
# 1. Développement local (sans serverless functions)
npm run dev

# 2. Test avec serverless functions
vercel dev

# 3. Commit et push
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push

# 4. Vercel déploie automatiquement
# 5. Vérifiez sur https://votre-projet.vercel.app
```

## 📈 Optimisations Futures

1. **Rate Limiting** : Limiter le nombre de requêtes par IP
2. **Session Persistence** : Utiliser Redis pour garder les sessions
3. **Analytics** : Tracker les conversations pour améliorer le prompt
4. **Cache** : Mettre en cache les réponses fréquentes
5. **Monitoring** : Alertes sur erreurs API

## 🎯 Résultat Attendu

✅ Site déployé sur Vercel  
✅ Chat fonctionnel avec Gemini  
✅ Clé API sécurisée côté serveur  
✅ Aucune alerte de sécurité Chrome  
✅ HTTPS activé  
✅ Performances optimales  
