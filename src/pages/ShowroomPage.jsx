import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Copy, Check, Clock, AlertTriangle, Eye, Code, Link2, Trash2, ExternalLink } from 'lucide-react';
import * as Babel from '@babel/standalone';
import * as LucideIcons from 'lucide-react';
import {
  createGist,
  getGist,
  isExpired,
  formatExpiryDate,
  getDaysRemaining,
  getLinksIndex,
  saveLinksIndex
} from '../utils/showroomCodec';

// ============================================
// PASSWORD SCREEN (Admin Access)
// ============================================
const PasswordScreen = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'mistral666') {
      sessionStorage.setItem('showroom_auth', 'true');
      onSuccess();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-mono">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 border border-white/20 mb-6">
            <Lock size={24} className="text-white/50" />
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight uppercase mb-2">
            Showroom
          </h1>
          <p className="text-white/40 text-xs uppercase tracking-widest">
            Espace création de liens
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <motion.div
            animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Mot de passe"
              className={`w-full bg-transparent border ${error ? 'border-red-500' : 'border-white/20'} text-white px-4 py-4 text-center text-sm tracking-widest placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors`}
              autoFocus
            />
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs text-center mt-3 uppercase tracking-wider"
            >
              Mot de passe incorrect
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full mt-6 bg-white text-black py-4 text-xs uppercase tracking-widest font-bold hover:bg-white/90 transition-colors"
          >
            Accéder
          </button>
        </form>

        <p className="text-white/20 text-[10px] text-center mt-8 uppercase tracking-wider">
          AUTOMAT — Partage de maquettes
        </p>
      </motion.div>
    </div>
  );
};

// ============================================
// ADMIN PANEL (Link Generator)
// ============================================
const ShowroomAdmin = () => {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewError, setPreviewError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState(null);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const token = import.meta.env.VITE_GITHUB_TOKEN;

  // Charge l'historique depuis le Gist au montage
  useEffect(() => {
    const loadHistory = async () => {
      if (!token) {
        setLoadingHistory(false);
        return;
      }
      const links = await getLinksIndex(token);
      // Filtre les liens expirés automatiquement
      const validLinks = links.filter(l => Date.now() <= l.expires);
      setHistory(validLinks);
      setLoadingHistory(false);
    };
    loadHistory();
  }, [token]);

  const handleGenerate = async () => {
    if (!code.trim()) return;

    setIsGenerating(true);
    setGenerateError(null);

    try {
      if (!token) {
        throw new Error('Token GitHub non configuré');
      }

      const gistId = await createGist(code, title, token);
      const baseUrl = window.location.origin;
      const link = `${baseUrl}/showroom?g=${gistId}`;
      setGeneratedLink(link);

      // Sauvegarde dans l'historique (Gist)
      const newLink = {
        gistId,
        title: title || 'Sans titre',
        link,
        created: Date.now(),
        expires: Date.now() + (10 * 24 * 60 * 60 * 1000)
      };
      const newHistory = [newLink, ...history].slice(0, 20);
      setHistory(newHistory);
      await saveLinksIndex(newHistory, token);
    } catch (error) {
      console.error('Erreur:', error);
      setGenerateError(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyFromHistory = async (link, gistId) => {
    await navigator.clipboard.writeText(link);
    setCopiedId(gistId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRemoveFromHistory = async (gistId) => {
    const newHistory = history.filter(h => h.gistId !== gistId);
    setHistory(newHistory);
    if (token) {
      await saveLinksIndex(newHistory, token);
    }
  };

  const expiryDate = useMemo(() => {
    return formatExpiryDate(Date.now() + (10 * 24 * 60 * 60 * 1000));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-mono">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Code size={20} className="text-white/50" />
            <h1 className="text-lg font-bold uppercase tracking-wider">Showroom</h1>
          </div>
          <span className="text-white/30 text-xs">AUTOMAT</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Code Input */}
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-white/50 mb-2 block">
                Titre de la maquette (optionnel)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Maquette Restaurant Le P'tit Bistrot"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-white/50 mb-2 block">
                Code React JSX
              </label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={`Collez votre code React ici...

import React from 'react';

const App = () => {
  return (
    <div>
      ...
    </div>
  );
};

export default App;`}
                className="w-full h-[400px] bg-white/5 border border-white/10 px-4 py-3 text-sm font-mono focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20 resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleGenerate}
                disabled={!code.trim() || isGenerating}
                className="flex-1 bg-white text-black py-4 text-xs uppercase tracking-widest font-bold hover:bg-white/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Génération...
                  </>
                ) : (
                  <>
                    <Link2 size={14} />
                    Générer le lien
                  </>
                )}
              </button>

              <button
                onClick={() => setShowPreview(!showPreview)}
                disabled={!code.trim()}
                className="px-6 py-4 border border-white/20 text-xs uppercase tracking-widest hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Eye size={14} />
                Preview
              </button>
            </div>

            {generateError && (
              <div className="bg-red-500/10 border border-red-500/30 p-4 text-red-400 text-xs">
                <strong>Erreur:</strong> {generateError}
              </div>
            )}
          </div>

          {/* Right Panel - Generated Link / Preview */}
          <div className="space-y-4">
            {generatedLink && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 p-6 space-y-4"
              >
                <div className="flex items-center gap-2 text-green-400">
                  <Check size={16} />
                  <span className="text-xs uppercase tracking-widest font-bold">Lien généré avec succès</span>
                </div>

                <div className="bg-black/50 p-4 break-all text-xs text-white/70 max-h-32 overflow-y-auto">
                  {generatedLink}
                </div>

                <button
                  onClick={handleCopy}
                  className="w-full py-3 border border-white/20 text-xs uppercase tracking-widest hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copié !' : 'Copier le lien'}
                </button>

                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <Clock size={12} />
                  <span>Expire le {expiryDate} (10 jours)</span>
                </div>
              </motion.div>
            )}

            {/* Preview Window */}
            {showPreview && code && (
              <div className="border border-white/10 bg-white rounded-lg overflow-hidden">
                <div className="bg-white/5 border-b border-white/10 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-white/30 text-xs ml-2">Aperçu</span>
                </div>
                <div className="h-[500px] overflow-auto">
                  <ReactRenderer code={code} onError={setPreviewError} />
                </div>
              </div>
            )}

            {previewError && showPreview && (
              <div className="bg-red-500/10 border border-red-500/30 p-4 text-red-400 text-xs">
                <strong>Erreur:</strong> {previewError}
              </div>
            )}

            {/* Historique des liens */}
            <div className="bg-white/5 border border-white/10 p-4">
              <h3 className="text-xs uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
                <Clock size={12} />
                Liens récents {!loadingHistory && `(${history.length})`}
              </h3>
              {loadingHistory ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                </div>
              ) : history.length === 0 ? (
                <p className="text-white/30 text-xs text-center py-4">Aucun lien généré</p>
              ) : (
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {history.map((item) => {
                    const isExpired = Date.now() > item.expires;
                    const daysLeft = Math.max(0, Math.ceil((item.expires - Date.now()) / (24 * 60 * 60 * 1000)));

                    return (
                      <div
                        key={item.gistId}
                        className={`p-3 border ${isExpired ? 'border-red-500/20 bg-red-500/5' : 'border-white/10 bg-white/5'} group`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium truncate ${isExpired ? 'text-red-400/70 line-through' : 'text-white'}`}>
                              {item.title}
                            </p>
                            <p className="text-[10px] text-white/30 mt-1">
                              {isExpired ? (
                                <span className="text-red-400/50">Expiré</span>
                              ) : (
                                <span>{daysLeft}j restant{daysLeft > 1 ? 's' : ''}</span>
                              )}
                              <span className="mx-2">•</span>
                              <span>{new Date(item.created).toLocaleDateString('fr-FR')}</span>
                            </p>
                          </div>
                          <div className="flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                            {!isExpired && (
                              <>
                                <button
                                  onClick={() => handleCopyFromHistory(item.link, item.gistId)}
                                  className="p-2 hover:bg-white/10 transition-colors"
                                  title="Copier le lien"
                                >
                                  {copiedId === item.gistId ? (
                                    <Check size={14} className="text-green-400" />
                                  ) : (
                                    <Copy size={14} />
                                  )}
                                </button>
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 hover:bg-white/10 transition-colors"
                                  title="Ouvrir"
                                >
                                  <ExternalLink size={14} />
                                </a>
                              </>
                            )}
                            <button
                              onClick={() => handleRemoveFromHistory(item.gistId)}
                              className="p-2 hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// REACT RENDERER (Transpile & Execute)
// ============================================

// Nettoie le code des imports/exports pour l'exécution en sandbox
const preprocessCode = (code) => {
  // Supprime les imports (multiline safe)
  let cleanCode = code
    // Import avec accolades: import { x, y } from 'module'
    .replace(/import\s*\{[^}]*\}\s*from\s*['"][^'"]*['"];?/g, '')
    // Import default: import X from 'module'
    .replace(/import\s+\w+\s+from\s*['"][^'"]*['"];?/g, '')
    // Import * as: import * as X from 'module'
    .replace(/import\s*\*\s*as\s+\w+\s+from\s*['"][^'"]*['"];?/g, '')
    // Import side-effect: import 'module'
    .replace(/import\s*['"][^'"]*['"];?/g, '')
    // Export default
    .replace(/export\s+default\s+/g, '')
    // Export named
    .replace(/^export\s+/gm, '');

  return cleanCode.trim();
};


const ReactRenderer = ({ code, onError }) => {
  const [Component, setComponent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!code) return;

    try {
      // Nettoie le code des imports/exports
      const cleanedCode = preprocessCode(code);

      // Transpile JSX to JS avec transformation des modules
      const transpiledCode = Babel.transform(cleanedCode, {
        presets: [
          ['react', { runtime: 'classic' }]
        ],
        plugins: [
          // Supprime les imports/exports restants après transpilation
          function removeImportsExports() {
            return {
              visitor: {
                ImportDeclaration(path) {
                  path.remove();
                },
                ExportDefaultDeclaration(path) {
                  // Remplace "export default X" par juste "X"
                  if (path.node.declaration) {
                    path.replaceWith(path.node.declaration);
                  }
                },
                ExportNamedDeclaration(path) {
                  if (path.node.declaration) {
                    path.replaceWith(path.node.declaration);
                  } else {
                    path.remove();
                  }
                }
              }
            };
          }
        ],
        filename: 'showroom.jsx'
      }).code;

      // Trouve le nom du composant principal (généralement "App" ou le dernier composant défini)
      // Ne capture que les fonctions (arrow functions avec =>) ou function declarations, pas les tableaux/objets
      const componentMatch = cleanedCode.match(/(?:const|function)\s+([A-Z]\w*)\s*(?:=\s*\(|=\s*\(\)|=\s*\([^)]*\)\s*=>|\()/g);
      const componentNames = componentMatch
        ? componentMatch.map(m => {
            const match = m.match(/(?:const|function)\s+([A-Z]\w*)/);
            return match ? match[1] : null;
          }).filter(Boolean)
        : [];
      const mainComponent = componentNames.includes('App') ? 'App' : componentNames[componentNames.length - 1] || 'App';

      // Debug: log le code transpilé pour identifier les erreurs
      console.log('Main component detected:', mainComponent);
      console.log('Transpiled code preview (first 500 chars):', transpiledCode.substring(0, 500));

      // Create a function with controlled scope
      // Utilise une IIFE pour garantir l'ordre d'exécution correct
      const createComponent = new Function(
        'React',
        'useState',
        'useEffect',
        'useMemo',
        'useCallback',
        'useRef',
        'useContext',
        'createContext',
        'Icons',
        'motion',
        'AnimatePresence',
        `
        const { ${Object.keys(LucideIcons).join(', ')} } = Icons;

        // Exécute le code transpilé
        ${transpiledCode}

        // Retourne le composant principal
        return ${mainComponent};
        `
      );

      // Execute with React, Lucide icons and framer-motion
      const ComponentResult = createComponent(
        React,
        React.useState,
        React.useEffect,
        React.useMemo,
        React.useCallback,
        React.useRef,
        React.useContext,
        React.createContext,
        LucideIcons,
        motion,
        AnimatePresence
      );

      if (ComponentResult) {
        setComponent(() => ComponentResult);
        setError(null);
        onError?.(null);
      }
    } catch (err) {
      console.error('Transpilation error:', err);
      setError(err.message);
      onError?.(err.message);
      setComponent(null);
    }
  }, [code, onError]);

  if (error) {
    return (
      <div className="p-8 text-red-600 font-mono text-sm">
        <p className="font-bold mb-2">Erreur de compilation:</p>
        <pre className="bg-red-50 p-4 rounded overflow-auto text-xs">{error}</pre>
      </div>
    );
  }

  if (!Component) {
    return (
      <div className="p-8 text-gray-400 text-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="showroom-preview">
      <Component />
    </div>
  );
};

// ============================================
// CLIENT VIEWER (View Shared Mockup)
// ============================================
const ShowroomViewer = ({ gistId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [tailwindReady, setTailwindReady] = useState(false);

  // Injecte Tailwind CSS et fonts au chargement (DOIT être avant tout return conditionnel)
  useEffect(() => {
    // Tailwind CDN
    if (!document.getElementById('tailwind-cdn')) {
      const tailwindScript = document.createElement('script');
      tailwindScript.id = 'tailwind-cdn';
      tailwindScript.src = 'https://cdn.tailwindcss.com';
      tailwindScript.onload = () => {
        // Attends que Tailwind soit vraiment initialisé
        setTimeout(() => setTailwindReady(true), 200);
      };
      document.head.appendChild(tailwindScript);
    } else {
      // Tailwind déjà chargé
      setTailwindReady(true);
    }

    // Google Fonts
    if (!document.getElementById('google-fonts-showroom')) {
      const fontsLink = document.createElement('link');
      fontsLink.id = 'google-fonts-showroom';
      fontsLink.rel = 'stylesheet';
      fontsLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(fontsLink);
    }
  }, []);

  useEffect(() => {
    const fetchGist = async () => {
      try {
        const gistData = await getGist(gistId);

        if (isExpired(gistData)) {
          setExpired(true);
          setData(gistData);
        } else {
          setData(gistData);
        }
      } catch (error) {
        console.error('Erreur fetch gist:', error);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGist();
  }, [gistId]);

  if (loading || !tailwindReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/50 text-sm font-mono"
        >
          Chargement de la maquette...
        </motion.div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
          <h1 className="text-white text-xl font-bold mb-2">Lien invalide</h1>
          <p className="text-white/50 text-sm">Ce lien de maquette n'est pas valide ou a été supprimé.</p>
        </div>
      </div>
    );
  }

  if (expired) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Clock size={48} className="text-white/30 mx-auto mb-4" />
          <h1 className="text-white text-2xl font-bold mb-2 font-mono uppercase tracking-wider">
            Lien expiré
          </h1>
          <p className="text-white/50 text-sm">
            Ce lien a expiré le {formatExpiryDate(data.expires)}
          </p>
          {data.title && (
            <p className="text-white/30 text-xs mt-4">Maquette: {data.title}</p>
          )}
        </motion.div>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining(data.expires);

  return (
    <div className="min-h-screen relative">
      {/* Rendered Mockup */}
      <ReactRenderer code={data.code} />

      {/* Info Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-white/10 px-4 py-2 flex items-center justify-between text-xs font-mono z-50">
        <div className="flex items-center gap-4">
          <span className="text-white/30 uppercase tracking-widest">AUTOMAT</span>
          {data.title && <span className="text-white/50">{data.title}</span>}
        </div>
        <div className="flex items-center gap-2 text-white/40">
          <Clock size={12} />
          <span>
            Expire dans {daysRemaining} jour{daysRemaining > 1 ? 's' : ''} ({formatExpiryDate(data.expires)})
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================
const ShowroomPage = () => {
  const [searchParams] = useSearchParams();
  const gistId = searchParams.get('g');

  // Mode Client (lien partagé)
  if (gistId) {
    return <ShowroomViewer gistId={gistId} />;
  }

  // Mode Admin (création de lien) - Protégé par mot de passe
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('showroom_auth') === 'true'
  );

  if (!isAuthenticated) {
    return <PasswordScreen onSuccess={() => setIsAuthenticated(true)} />;
  }

  return <ShowroomAdmin />;
};

export default ShowroomPage;
