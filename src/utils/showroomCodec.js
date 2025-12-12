import pako from 'pako';

// ID du Gist qui sert d'index pour tous les liens
const INDEX_GIST_ID = 'showroom_index';

/**
 * Récupère l'index des liens depuis le Gist dédié
 */
export const getLinksIndex = async (token) => {
  try {
    // Cherche le gist d'index parmi nos gists
    const response = await fetch('https://api.github.com/gists', {
      headers: {
        'Authorization': `token ${token}`,
      }
    });

    if (!response.ok) return [];

    const gists = await response.json();
    const indexGist = gists.find(g => g.description?.includes('[AUTOMAT-INDEX]'));

    if (!indexGist) return [];

    // Récupère le contenu
    const gistResponse = await fetch(`https://api.github.com/gists/${indexGist.id}`);
    const gistData = await gistResponse.json();

    if (gistData.files?.['links.json']) {
      return JSON.parse(gistData.files['links.json'].content);
    }
    return [];
  } catch (error) {
    console.error('Erreur récupération index:', error);
    return [];
  }
};

/**
 * Sauvegarde l'index des liens dans le Gist dédié
 */
export const saveLinksIndex = async (links, token) => {
  try {
    // Cherche si le gist d'index existe
    const response = await fetch('https://api.github.com/gists', {
      headers: {
        'Authorization': `token ${token}`,
      }
    });

    const gists = await response.json();
    const indexGist = gists.find(g => g.description?.includes('[AUTOMAT-INDEX]'));

    const gistData = {
      description: '[AUTOMAT-INDEX] Index des maquettes Showroom',
      public: false,
      files: {
        'links.json': {
          content: JSON.stringify(links, null, 2)
        }
      }
    };

    if (indexGist) {
      // Met à jour le gist existant
      await fetch(`https://api.github.com/gists/${indexGist.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ files: gistData.files })
      });
    } else {
      // Crée un nouveau gist d'index
      await fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gistData)
      });
    }
  } catch (error) {
    console.error('Erreur sauvegarde index:', error);
  }
};

/**
 * Crée un Gist GitHub avec le code React
 * Retourne l'ID du gist créé
 */
export const createGist = async (code, title, token) => {
  const response = await fetch('https://api.github.com/gists', {
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: `AUTOMAT Showroom - ${title || 'Maquette'} (expire dans 10 jours)`,
      public: false, // Gist secret (non listé mais accessible via URL)
      files: {
        'maquette.jsx': {
          content: code
        },
        'metadata.json': {
          content: JSON.stringify({
            title: title || 'Maquette',
            created: Date.now(),
            expires: Date.now() + (10 * 24 * 60 * 60 * 1000) // 10 jours
          }, null, 2)
        }
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('GitHub API Error:', response.status, errorData);
    throw new Error(`Erreur GitHub (${response.status}): ${errorData.message || 'Échec de la création du Gist'}`);
  }

  const data = await response.json();
  return data.id;
};

/**
 * Récupère le contenu d'un Gist
 */
export const getGist = async (gistId) => {
  const response = await fetch(`https://api.github.com/gists/${gistId}`);

  if (!response.ok) {
    throw new Error('Gist introuvable');
  }

  const data = await response.json();

  const codeFile = data.files['maquette.jsx'];
  const metadataFile = data.files['metadata.json'];

  if (!codeFile || !metadataFile) {
    throw new Error('Gist invalide');
  }

  const metadata = JSON.parse(metadataFile.content);

  return {
    code: codeFile.content,
    title: metadata.title,
    created: metadata.created,
    expires: metadata.expires
  };
};

/**
 * Encode les données dans une URL (fallback pour petits codes)
 */
export const encodeShowroomData = (code, title) => {
  const data = {
    code,
    title: title || 'Maquette',
    created: Date.now(),
    expires: Date.now() + (10 * 24 * 60 * 60 * 1000) // 10 jours
  };
  const json = JSON.stringify(data);
  const compressed = pako.deflate(json);
  return btoa(String.fromCharCode(...compressed));
};

/**
 * Décode les données depuis l'URL
 */
export const decodeShowroomData = (encoded) => {
  try {
    const binary = atob(encoded);
    const bytes = new Uint8Array([...binary].map(c => c.charCodeAt(0)));
    const decompressed = pako.inflate(bytes, { to: 'string' });
    return JSON.parse(decompressed);
  } catch (e) {
    console.error('Decode error:', e);
    return null;
  }
};

/**
 * Vérifie si un lien a expiré
 */
export const isExpired = (data) => {
  if (!data || !data.expires) return true;
  return Date.now() > data.expires;
};

/**
 * Formate la date d'expiration
 */
export const formatExpiryDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

/**
 * Calcule les jours restants
 */
export const getDaysRemaining = (expiresTimestamp) => {
  const remaining = expiresTimestamp - Date.now();
  return Math.max(0, Math.ceil(remaining / (24 * 60 * 60 * 1000)));
};
