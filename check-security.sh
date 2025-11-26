#!/bin/bash

echo "🔍 AUTOMAT - Vérification de Sécurité"
echo "======================================"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Vérifier que .env est dans .gitignore
echo "1. Vérification .gitignore..."
if grep -q "^\.env$" .gitignore; then
    echo -e "${GREEN}✅ .env est bien dans .gitignore${NC}"
else
    echo -e "${RED}❌ .env n'est PAS dans .gitignore - DANGER!${NC}"
fi

# 2. Vérifier que le fichier API existe
echo ""
echo "2. Vérification serverless function..."
if [ -f "api/chat.js" ]; then
    echo -e "${GREEN}✅ /api/chat.js existe${NC}"
else
    echo -e "${RED}❌ /api/chat.js manquant${NC}"
fi

# 3. Vérifier que gemini.js n'expose pas la clé
echo ""
echo "3. Vérification gemini.js (pas de clé exposée)..."
if grep -q "VITE_GEMINI_API_KEY" src/utils/gemini.js; then
    echo -e "${RED}❌ DANGER: gemini.js contient encore une référence à la clé API!${NC}"
else
    echo -e "${GREEN}✅ gemini.js ne contient pas de référence directe à la clé${NC}"
fi

# 4. Vérifier que .env existe
echo ""
echo "4. Vérification .env local..."
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ .env existe${NC}"
    if grep -q "VITE_GEMINI_API_KEY" .env; then
        echo -e "${GREEN}✅ VITE_GEMINI_API_KEY est définie${NC}"
    else
        echo -e "${YELLOW}⚠️  VITE_GEMINI_API_KEY manquante dans .env${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  .env n'existe pas (normal si déjà déployé)${NC}"
fi

# 5. Vérifier la structure du projet
echo ""
echo "5. Vérification structure du projet..."
REQUIRED_FILES=("vercel.json" "package.json" "src/utils/gemini.js" "api/chat.js")
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file manquant${NC}"
    fi
done

# 6. Vérifier que le bundle ne contient pas la clé (si dist existe)
echo ""
echo "6. Vérification du build..."
if [ -d "dist" ]; then
    if grep -r "AIza" dist/ 2>/dev/null | grep -v ".map"; then
        echo -e "${RED}❌ DANGER: Une clé API semble présente dans le build!${NC}"
    else
        echo -e "${GREEN}✅ Aucune clé API détectée dans le build${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Dossier dist/ n'existe pas (lancez 'npm run build')${NC}"
fi

echo ""
echo "======================================"
echo "✨ Vérification terminée"
echo ""
echo "📝 Prochaines étapes:"
echo "  1. Configurez les variables d'environnement sur Vercel"
echo "  2. Déployez avec: git push"
echo "  3. Testez le chat sur votre site en production"
echo ""
