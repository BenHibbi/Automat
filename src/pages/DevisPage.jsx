import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Printer, Edit3, Smartphone, Globe, Shield, Zap, Layout, Lock } from 'lucide-react';

// --- PASSWORD SCREEN ---
const PasswordScreen = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'mistral666') {
      sessionStorage.setItem('devis_auth', 'true');
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
            Espace Devis
          </h1>
          <p className="text-white/40 text-xs uppercase tracking-widest">
            Accès restreint
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
          AUTOMAT — Générateur de devis
        </p>
      </motion.div>
    </div>
  );
};

// --- EDITABLE FIELD ---
const EditableField = ({ value, placeholder, className, multiline = false }) => {
  const [content, setContent] = useState(value);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  if (multiline) {
    return (
      <textarea
        className={`bg-transparent outline-none resize-none border-b border-dashed border-gray-300 focus:border-black transition-colors placeholder-gray-400 w-full ${className}`}
        value={content}
        onChange={handleChange}
        placeholder={placeholder}
        rows={3}
      />
    );
  }

  return (
    <input
      type="text"
      className={`bg-transparent outline-none border-b border-dashed border-gray-300 focus:border-black transition-colors placeholder-gray-400 w-full ${className}`}
      value={content}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

// --- SERVICE SECTION ---
const ServiceSection = ({ number, title, items, icon: Icon }) => (
  <div className="border-t border-black py-2 grid grid-cols-1 md:grid-cols-12 gap-2 print:py-1.5 print:gap-1 break-inside-avoid">
    <div className="md:col-span-1 print:col-span-1">
      <span className="font-mono text-[9px] text-gray-500">0{number}</span>
    </div>
    <div className="md:col-span-3 print:col-span-3">
      <div className="flex items-center gap-1">
        {Icon && <Icon size={12} className="text-black" />}
        <h3 className="font-bold uppercase tracking-tight text-[10px]">{title}</h3>
      </div>
    </div>
    <div className="md:col-span-8 print:col-span-8">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0.5">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-1 text-[10px] text-gray-700">
            <span className="mt-1 w-1 h-1 bg-black rounded-full flex-shrink-0"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// --- DEVIS NUMBER GENERATOR ---
const getCurrentDevisNumber = () => {
  const year = new Date().getFullYear();
  const storageKey = `devis_counter_${year}`;
  let counter = parseInt(localStorage.getItem(storageKey) || '0', 10);
  if (counter === 0) counter = 1; // Premier devis de l'année
  return `DEV-${year}-${String(counter).padStart(3, '0')}`;
};

const incrementDevisNumber = () => {
  const year = new Date().getFullYear();
  const storageKey = `devis_counter_${year}`;
  let counter = parseInt(localStorage.getItem(storageKey) || '0', 10) + 1;
  localStorage.setItem(storageKey, counter.toString());
  return `DEV-${year}-${String(counter).padStart(3, '0')}`;
};

// --- DEVIS GENERATOR ---
const DevisGenerator = () => {
  const [invoiceDate, setInvoiceDate] = useState(new Date().toLocaleDateString('fr-FR'));
  const [devisNumber, setDevisNumber] = useState(() => {
    // Affiche le numéro actuel sans incrémenter
    const year = new Date().getFullYear();
    const storageKey = `devis_counter_${year}`;
    let counter = parseInt(localStorage.getItem(storageKey) || '0', 10);
    if (counter === 0) {
      // Premier devis, on initialise à 1
      localStorage.setItem(storageKey, '1');
      counter = 1;
    }
    return `DEV-${year}-${String(counter).padStart(3, '0')}`;
  });
  const componentRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const handleNewDevis = () => {
    // Incrémente et génère un nouveau numéro
    const newNumber = incrementDevisNumber();
    setDevisNumber(newNumber);
    setInvoiceDate(new Date().toLocaleDateString('fr-FR'));
    // Recharge la page pour réinitialiser tous les champs
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] py-10 print:bg-white print:p-0 font-sans text-black">

      {/* UI COMMANDS (Hidden on Print) */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-black text-white px-6 py-3 rounded-none font-mono text-sm uppercase tracking-wider hover:bg-gray-800 transition-all flex items-center gap-3 shadow-xl"
        >
          <Printer size={16} />
          IMPRIMER / PDF
        </button>
        <button
          onClick={handleNewDevis}
          className="bg-white text-black border border-black px-6 py-3 rounded-none font-mono text-sm uppercase tracking-wider hover:bg-gray-100 transition-all flex items-center gap-3 shadow-xl"
        >
          + NOUVEAU DEVIS
        </button>
        <div className="bg-white p-4 text-xs font-mono border border-gray-200 shadow-xl max-w-xs">
          <p className="mb-2 font-bold flex items-center gap-2">
            <Edit3 size={12} /> MODE ÉDITEUR
          </p>
          <p className="text-gray-500 mb-2">
            Cliquez directement sur les textes soulignés en pointillés pour modifier les infos client.
          </p>
        </div>
      </div>

      {/* DOCUMENT PAGE (A4 Ratio) */}
      <div
        ref={componentRef}
        className="mx-auto max-w-[21cm] bg-white p-[0.8cm] shadow-2xl print:shadow-none print:max-w-none print:w-[210mm] print:h-[297mm] print:m-0 print:p-[5mm] print:overflow-hidden flex flex-col"
      >

        {/* HEADER */}
        <header className="mb-4">
          <div className="flex justify-between items-start border-b-2 border-black pb-2 mb-3">
            <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase">Devis.</h1>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* PRESTATAIRE */}
            <div>
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">Émetteur</p>
              <h2 className="font-bold text-sm uppercase">Benjamin Lacaze</h2>
              <div className="text-xs text-gray-600 mt-1 leading-relaxed">
                <p>Creative Designer & Developer</p>
                <p>SIRET : En cours d'immatriculation</p>
                <EditableField value="benjamin.lacaze@gmail.com" placeholder="Email" className="mt-1 text-xs" />
                <EditableField value="06 93 61 57 12" placeholder="Téléphone" className="text-xs" />
                <EditableField value="Saint-Leu, La Réunion" placeholder="Adresse" className="text-xs" />
              </div>
            </div>

            {/* CLIENT (Editable) */}
            <div>
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">Client</p>
              <EditableField
                value="NOM DE L'ENTREPRISE"
                className="font-bold text-sm uppercase text-black w-full mb-1"
                placeholder="Nom du client"
              />
              <div className="text-xs text-gray-600 leading-relaxed">
                <EditableField value="Adresse complète du client" placeholder="Adresse" className="text-xs" />
                <EditableField value="Code Postal / Ville" placeholder="Ville" className="text-xs" />
                <EditableField value="N° SIRET : 000 000 000 00000" placeholder="SIRET Client" className="text-xs" />
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] border-t border-gray-100 pt-1">
                  <div>
                    <span className="text-gray-400">N°:</span>
                    <span className="ml-1 font-medium">{devisNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">DATE:</span>
                    <input
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                      className="bg-transparent w-20 ml-1 outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-gray-400">VALIDITÉ:</span>
                    <span className="ml-1">30 Jours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* BODY */}
        <main>
          <div className="mb-2">
            <h2 className="text-lg font-bold uppercase tracking-tight mb-0.5">Refonte Site Vitrine</h2>
            <p className="text-gray-600 text-[10px]">
              Création ou refonte complète d'un site internet vitrine. Prestation conforme au dispositif Kap Numérik.
            </p>
          </div>

          <div className="flex flex-col gap-0">
            <ServiceSection
              number="1"
              title="Conception & Structure"
              icon={Layout}
              items={[
                "Définition de l'arborescence (5 à 7 pages)",
                "Création des gabarits de pages (Wireframing)",
                "Design responsive (Mobile / Tablette / Desktop)",
                "Direction artistique UX/UI"
              ]}
            />

            <ServiceSection
              number="2"
              title="Développement & Intégration"
              icon={Smartphone}
              items={[
                "Intégration des contenus fournis",
                "Mise en page professionnelle & Typographie",
                "Installation modules : Contact, Carte, Services",
                "Optimisation des performances (Vitesse)"
              ]}
            />

            <ServiceSection
              number="3"
              title="Optimisation SEO"
              icon={Globe}
              items={[
                "Structure Hn & Balises Meta optimisées",
                "Configuration technique référencement naturel",
                "Indexation Google Search Console",
                "Optimisation sémantique de base"
              ]}
            />

            <ServiceSection
              number="4"
              title="Hébergement & Déploiement"
              icon={Shield}
              items={[
                "Configuration nom de domaine",
                "Installation certificat SSL (Sécurité HTTPS)",
                "Mise en ligne serveur sécurisé",
                "Tests techniques pré-lancement"
              ]}
            />

            <ServiceSection
              number="5"
              title="Formation Autonomie"
              icon={Zap}
              items={[
                "Session de prise en main (1 heure)",
                "Guide de mise à jour autonome",
                "Bonnes pratiques de gestion"
              ]}
            />
          </div>
        </main>

        {/* FOOTER & TOTALS */}
        <footer className="mt-2 break-inside-avoid">
          {/* ESTIMATION DUREE */}
          <div className="flex items-center gap-4 text-[9px] font-mono text-gray-500 mb-2 border-b border-gray-200 pb-1">
            <span className="uppercase tracking-widest">Délai estimé:</span>
            <span>7 à 15 jours (selon validation contenus)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="text-[9px] text-gray-500 space-y-0">
              <p className="font-bold text-black uppercase mb-0.5 text-[10px]">Conditions de règlement</p>
              <p>Paiement par virement bancaire. Acompte 30% au démarrage.</p>
              <p>Solde à la livraison. TVA non applicable, art. 293 B du CGI.</p>
            </div>

            <div className="bg-black text-white p-3">
              <div className="flex justify-between items-center text-[10px] opacity-80">
                <span>Total HT</span>
                <span>3 200,00 €</span>
              </div>
              <div className="flex justify-between items-center text-[10px] opacity-80 mb-2">
                <span>TVA (0%)</span>
                <span>0,00 €</span>
              </div>
              <div className="flex justify-between items-end border-t border-white/20 pt-1">
                <span className="font-mono text-[10px] uppercase tracking-widest">Net à payer</span>
                <span className="text-xl font-bold tracking-tight">3 200 €</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-end pb-1">
            <div className="w-1/3 border-t border-black pt-1">
              <p className="text-[8px] uppercase font-bold tracking-widest">Signature Prestataire</p>
              <p className="mt-3 text-[9px] italic">Benjamin Lacaze</p>
            </div>
            <div className="w-1/3 border-t border-black pt-1">
              <p className="text-[8px] uppercase font-bold tracking-widest">Bon pour accord (Date & Signature)</p>
            </div>
          </div>
        </footer>

      </div>

      {/* Background decoration for screen view */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03] print:hidden"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
const DevisPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('devis_auth') === 'true'
  );

  if (!isAuthenticated) {
    return <PasswordScreen onSuccess={() => setIsAuthenticated(true)} />;
  }

  return <DevisGenerator />;
};

export default DevisPage;
