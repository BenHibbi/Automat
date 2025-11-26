# Configuration EmailJS pour AUTOMAT

## 📧 Pourquoi EmailJS ?

EmailJS permet d'envoyer des emails directement depuis le navigateur sans backend. C'est gratuit jusqu'à 200 emails/mois.

## 🚀 Configuration (5 minutes)

### 1. Créer un compte EmailJS

1. Va sur [emailjs.com](https://www.emailjs.com/)
2. Clique sur "Sign Up" et crée un compte gratuit

### 2. Configurer un service email

1. Dans le dashboard, va dans **Email Services**
2. Clique sur **Add New Service**
3. Choisis **Gmail** (ou ton provider)
4. Connecte ton compte Gmail `benjamin.lacaze@gmail.com`
5. Note le **Service ID** (ex: `service_abc123`)

### 3. Créer les templates d'email

#### Template 1 : Audit Gratuit

1. Va dans **Email Templates**
2. Clique sur **Create New Template**
3. Nomme-le : `audit_request`
4. Configure le template :

```
Subject: 🔍 Nouvelle demande d'audit - {{website_url}}

From: {{from_email}}
To: benjamin.lacaze@gmail.com

Bonjour Benjamin,

Nouvelle demande d'audit gratuit !

📧 Email du client : {{from_email}}
🌐 Site à auditer : {{website_url}}

Message :
{{message}}

---
Envoyé depuis AUTOMAT
```

5. Note le **Template ID** (ex: `template_audit123`)

#### Template 2 : Signal / Devis

1. Crée un nouveau template
2. Nomme-le : `signal_request`
3. Configure le template :

```
Subject: 🚀 Nouveau signal - Demande de devis

To: benjamin.lacaze@gmail.com

Bonjour Benjamin,

Un nouveau client a envoyé un signal !

📧 Email : {{contact_email}}
📅 Date : {{timestamp}}

=== CONVERSATION ===
{{chat_history}}

=== PRICING ===
{{pricing_data}}

=== KAP NUMÉRIK ===
{{kap_eligibility}}

---
Envoyé depuis AUTOMAT
```

4. Note le **Template ID** (ex: `template_signal123`)

### 4. Récupérer la Public Key

1. Va dans **Account** → **General**
2. Copie la **Public Key** (ex: `abc123xyz`)

### 5. Mettre à jour le fichier .env

Ouvre le fichier `.env` et remplace les valeurs :

```bash
VITE_GEMINI_API_KEY=AIzaSyD815MmDBYptMt1nEZ5SBMSkX6ZgSi_dfk

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_abc123          # ← Ton Service ID
VITE_EMAILJS_TEMPLATE_ID_AUDIT=template_audit123 # ← Template Audit
VITE_EMAILJS_TEMPLATE_ID_SIGNAL=template_signal123 # ← Template Signal
VITE_EMAILJS_PUBLIC_KEY=abc123xyz               # ← Ta Public Key
```

### 6. Redémarrer le serveur

```bash
# Arrête le serveur (Ctrl+C)
npm run dev
```

## ✅ Test

1. Va sur `http://localhost:5173`
2. Remplis le formulaire "Audit gratuit"
3. Clique sur "Envoyer"
4. Tu devrais recevoir un email sur `benjamin.lacaze@gmail.com`

## 🔄 Fallback automatique

Si EmailJS n'est pas configuré ou échoue, le système utilise automatiquement `mailto:` comme avant. Aucune perte de fonctionnalité !

## 📊 Limites gratuites

- **200 emails/mois** gratuits
- Au-delà : 7$/mois pour 1000 emails

## 🛠️ Variables disponibles

### Template Audit
- `{{from_email}}` - Email du client
- `{{website_url}}` - URL du site à auditer
- `{{message}}` - Message formaté

### Template Signal
- `{{contact_email}}` - Email du client
- `{{chat_history}}` - Historique de conversation
- `{{pricing_data}}` - Données de pricing
- `{{kap_eligibility}}` - Éligibilité Kap Numérik
- `{{timestamp}}` - Date/heure

---

**Note** : Ne commit JAMAIS le fichier `.env` avec tes vraies clés ! Il est déjà dans `.gitignore`.
