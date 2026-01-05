import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Printer, Edit3, Lock, FileText, Layers, Monitor, Palette, Image, Settings } from 'lucide-react';

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
      className={`bg-transparent outline-none border-b border-dashed border-gray-300 focus:border-black transition-colors placeholder-gray-400 ${className}`}
      value={content}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

// --- EDITABLE PRICE FIELD ---
const EditablePriceField = ({ value, className }) => {
  const [content, setContent] = useState(value);

  return (
    <input
      type="text"
      className={`bg-transparent outline-none border-b border-dashed border-gray-300 focus:border-black transition-colors text-right font-bold ${className}`}
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  );
};

// --- DEVIS NUMBER GENERATOR ---
const incrementDevisNumber = () => {
  const year = new Date().getFullYear();
  const storageKey = `devis_counter_${year}`;
  let counter = parseInt(localStorage.getItem(storageKey) || '0', 10) + 1;
  localStorage.setItem(storageKey, counter.toString());
  return `DEV-${year}-${String(counter).padStart(3, '0')}`;
};

// --- ACTION SECTION ---
const ActionSection = ({ number, title, price, plafond, items, icon: Icon }) => (
  <div className="mb-4 print:mb-3">
    <div className="flex items-center justify-between border-b-2 border-black pb-1 mb-2">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={16} className="text-black" />}
        <h3 className="font-bold uppercase tracking-tight text-sm">
          ACTION {number} — {title}
        </h3>
      </div>
      <div className="text-right text-xs font-mono">
        <span className="text-gray-500">Prix:</span>
        <EditablePriceField value={price} className="w-20 ml-1 text-sm" />
        <span className="text-gray-400 ml-2">| Plafond: {plafond}</span>
      </div>
    </div>
    <ul className="space-y-1 pl-1">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-2 text-[11px] text-gray-700">
          <span className="mt-1.5 w-1 h-1 bg-black rounded-full flex-shrink-0"></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

// --- DEVIS GENERATOR ---
const DevisGenerator = () => {
  const [invoiceDate, setInvoiceDate] = useState(new Date().toLocaleDateString('fr-FR'));
  const [devisNumber, setDevisNumber] = useState(() => {
    const year = new Date().getFullYear();
    const storageKey = `devis_counter_${year}`;
    let counter = parseInt(localStorage.getItem(storageKey) || '0', 10);
    if (counter === 0) {
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
    const newNumber = incrementDevisNumber();
    setDevisNumber(newNumber);
    setInvoiceDate(new Date().toLocaleDateString('fr-FR'));
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
            Cliquez directement sur les textes soulignés en pointillés pour modifier les infos.
          </p>
        </div>
      </div>

      {/* DOCUMENT PAGE 1 (A4) */}
      <div
        ref={componentRef}
        className="mx-auto max-w-[21cm] bg-white p-[1cm] shadow-2xl print:shadow-none print:max-w-none print:w-[210mm] print:min-h-[297mm] print:m-0 print:p-[10mm] mb-8 print:mb-0"
      >

        {/* HEADER */}
        <header className="mb-6">
          <div className="flex justify-between items-start border-b-2 border-black pb-3 mb-4">
            <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase">Devis.</h1>
              <p className="text-xs text-gray-500 font-mono mt-1">Création et digitalisation de présence en ligne</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end text-xs font-mono">
                <FileText size={14} className="text-gray-400" />
                <span className="text-gray-400">N°</span>
                <span className="font-bold">{devisNumber}</span>
              </div>
              <div className="flex items-center gap-2 justify-end text-xs font-mono mt-1">
                <span className="text-gray-400">Date:</span>
                <input
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="bg-transparent w-24 outline-none text-right"
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1">Validité: 30 jours</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* PRESTATAIRE */}
            <div>
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">Prestataire</p>
              <h2 className="font-bold text-sm uppercase">Benjamin Lacaze</h2>
              <div className="text-xs text-gray-600 mt-1 leading-relaxed">
                <p>Creative Designer & Developer</p>
                <p>SIRET : 515 146 215 00055</p>
                <EditableField value="benjamin.lacaze@gmail.com" placeholder="Email" className="mt-1 text-xs w-full" />
                <EditableField value="06 93 61 57 12" placeholder="Téléphone" className="text-xs w-full" />
                <EditableField value="Saint-Leu, La Réunion" placeholder="Adresse" className="text-xs w-full" />
              </div>
            </div>

            {/* CLIENT */}
            <div>
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">Client</p>
              <EditableField
                value="NOM DE L'ENTREPRISE"
                className="font-bold text-sm uppercase text-black w-full mb-1"
                placeholder="Nom du client"
              />
              <div className="text-xs text-gray-600 leading-relaxed">
                <EditableField value="Adresse complète du client" placeholder="Adresse" className="text-xs w-full" />
                <EditableField value="Code Postal / Ville" placeholder="Ville" className="text-xs w-full" />
                <EditableField value="N° SIRET : 000 000 000 00000" placeholder="SIRET Client" className="text-xs w-full" />
              </div>
            </div>
          </div>
        </header>

        {/* OBJET */}
        <section className="mb-6 bg-gray-50 p-4 border-l-4 border-black">
          <h2 className="font-bold uppercase text-sm mb-2 flex items-center gap-2">
            <Layers size={14} />
            Objet
          </h2>
          <p className="text-xs text-gray-700 leading-relaxed">
            Création d'un site internet vitrine professionnel et digitalisation des contenus existants afin d'assurer
            une présence en ligne claire, fonctionnelle et pérenne, conforme au dispositif <strong>Kap Numérik</strong>.
          </p>
        </section>

        {/* ACTION 1 */}
        <ActionSection
          number="1"
          title="Création site vitrine"
          price="1 200,00 €"
          plafond="1 200,00 €"
          icon={Monitor}
          items={[
            "Conception de la structure du site (format one-page ou multi-sections), incluant la définition des sections fonctionnelles (présentation, services, contenus, contact, accès rapide)",
            "Conception de l'interface graphique et de l'identité visuelle du site, adaptée à l'activité du client",
            "Développement du site en design responsive (ordinateur, tablette, mobile)",
            "Intégration des contenus fournis par le client (textes, images, logo)",
            "Mise en place des fonctionnalités essentielles : formulaire de contact, accès rapide téléphone / email",
            "Configuration du nom de domaine et du certificat de sécurité SSL (HTTPS)",
            "Hébergement du site sur serveur sécurisé",
            "Mise en ligne du site internet",
            "Formation à la prise en main du site (1 heure) et remise d'un guide d'utilisation"
          ]}
        />

        {/* ACTION 2 */}
        <ActionSection
          number="2"
          title="Digitalisation des contenus et optimisation UX/UI"
          price="2 000,00 €"
          plafond="2 000,00 €"
          icon={Palette}
          items={[
            "Travail de structuration, d'adaptation et d'optimisation des contenus afin d'améliorer la compréhension de l'offre, la lisibilité des informations et l'efficacité du site.",
            "Analyse des contenus existants (textes, documents, visuels)",
            "Adaptation des contenus au support web (réécriture légère si nécessaire, reformulation, synthèse)",
            "Organisation et hiérarchisation des informations (titres, sous-titres, sections)",
            "Structuration des contenus pour une lecture fluide et un accès rapide à l'information",
            "Optimisation de la présentation des contenus pour faciliter le parcours de consultation",
            "Optimisation SEO de base : structure des titres (Hn), balises essentielles, optimisation sémantique locale",
            "Configuration et indexation du site sur Google Search Console",
            "Vérification de la cohérence globale des contenus avant mise en production finale"
          ]}
        />

        {/* RECAP FINANCIER */}
        <section className="mt-6 print:mt-4">
          <h2 className="font-bold uppercase text-sm mb-3 flex items-center gap-2 border-b border-black pb-1">
            <Settings size={14} />
            Récapitulatif financier
          </h2>

          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2 font-bold uppercase">Désignation</th>
                <th className="text-right p-2 font-bold uppercase w-28">Prix HT</th>
                <th className="text-right p-2 font-bold uppercase w-28">Plafond</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-2">ACTION 1 — Création site vitrine</td>
                <td className="p-2 text-right font-mono">1 200,00 €</td>
                <td className="p-2 text-right font-mono text-gray-500">1 200,00 €</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-2">ACTION 2 — Digitalisation des contenus et optimisation UX/UI</td>
                <td className="p-2 text-right font-mono">2 000,00 €</td>
                <td className="p-2 text-right font-mono text-gray-500">2 000,00 €</td>
              </tr>
              <tr className="bg-gray-50 font-bold">
                <td className="p-2">TOTAL HT</td>
                <td className="p-2 text-right font-mono">3 200,00 €</td>
                <td className="p-2 text-right font-mono text-gray-500">3 200,00 €</td>
              </tr>
            </tbody>
          </table>

          <p className="text-[10px] text-gray-500 mt-3 italic">
            TVA non applicable, article 293 B du CGI.
          </p>
        </section>

      </div>

      {/* DOCUMENT PAGE 2 (A4) - CONDITIONS */}
      <div className="mx-auto max-w-[21cm] bg-white p-[1cm] shadow-2xl print:shadow-none print:max-w-none print:w-[210mm] print:min-h-[297mm] print:m-0 print:p-[10mm] print:break-before-page">

        {/* CONDITIONS */}
        <section className="mb-8">
          <h2 className="font-bold uppercase text-sm mb-4 border-b-2 border-black pb-2">
            Conditions
          </h2>

          <div className="space-y-4 text-xs text-gray-700">
            <div>
              <h3 className="font-bold text-black mb-1">Délai de réalisation</h3>
              <p>7 à 15 jours ouvrés à compter de la validation du devis et de la réception des contenus (textes, images, logo).</p>
            </div>

            <div>
              <h3 className="font-bold text-black mb-1">Modalités de paiement</h3>
              <p>Acompte de 30% à la commande. Solde à la livraison, avant mise en ligne définitive.</p>
              <p className="mt-1">Paiement par virement bancaire ou chèque.</p>
            </div>

            <div>
              <h3 className="font-bold text-black mb-1">Livrables</h3>
              <ul className="list-disc pl-4 space-y-1 mt-1">
                <li>Site internet fonctionnel accessible en ligne</li>
                <li>Accès administrateur au site</li>
                <li>Guide de prise en main PDF</li>
                <li>Formation de 1 heure (visio ou présentiel)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-black mb-1">Prérequis client</h3>
              <ul className="list-disc pl-4 space-y-1 mt-1">
                <li>Fourniture des contenus textuels</li>
                <li>Fourniture du logo en haute définition</li>
                <li>Fourniture des photos/visuels ou validation pour utilisation de banque d'images</li>
                <li>Réactivité pour les validations (72h max recommandé)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-black mb-1">Garantie et maintenance</h3>
              <p>Correction des anomalies techniques pendant 30 jours après livraison.</p>
              <p className="mt-1">Maintenance évolutive disponible sur devis séparé.</p>
            </div>
          </div>
        </section>

        {/* CONFORMITÉ KAP NUMERIK */}
        <section className="mb-8 bg-gray-50 p-5 border border-gray-200">
          <h2 className="font-bold uppercase text-sm mb-3 flex items-center gap-2">
            <Image size={14} />
            Conformité Kap Numérik
          </h2>
          <div className="text-xs text-gray-700 leading-relaxed space-y-2">
            <p>
              Ce devis est établi dans le cadre du dispositif <strong>Kap Numérik</strong>, programme d'aide
              à la transformation numérique des TPE réunionnaises porté par la Région Réunion.
            </p>
            <p>
              Les prestations décrites sont conformes aux critères d'éligibilité du dispositif et respectent
              les plafonds définis pour chaque action. Le bénéficiaire s'engage à effectuer les démarches
              administratives nécessaires à l'obtention de la subvention.
            </p>
            <p>
              En cas de non-obtention de la subvention, le client reste redevable de l'intégralité du montant
              du devis, sauf accord préalable écrit du prestataire.
            </p>
          </div>
        </section>

        {/* MENTIONS LÉGALES */}
        <section className="mb-8 text-[9px] text-gray-500 border-t border-gray-200 pt-4">
          <p className="mb-2">
            <strong>Propriété intellectuelle :</strong> Le prestataire cède au client les droits d'exploitation
            des créations réalisées dans le cadre de cette prestation, à compter du paiement intégral.
            Les fichiers sources restent la propriété du prestataire.
          </p>
          <p className="mb-2">
            <strong>Responsabilité :</strong> Le prestataire ne saurait être tenu responsable des contenus fournis
            par le client. Le client garantit disposer des droits nécessaires sur les éléments transmis.
          </p>
          <p>
            <strong>Litiges :</strong> En cas de litige, les parties s'engagent à rechercher une solution amiable.
            À défaut, le tribunal compétent sera celui de Saint-Denis de La Réunion.
          </p>
        </section>

        {/* SIGNATURES */}
        <section className="mt-auto">
          <div className="grid grid-cols-2 gap-8">
            <div className="border-t-2 border-black pt-3">
              <p className="text-[10px] uppercase font-bold tracking-widest mb-1">Signature du prestataire</p>
              <p className="text-xs text-gray-500 mb-8">Bon pour accord</p>
              <p className="text-sm italic">Benjamin Lacaze</p>
              <p className="text-xs text-gray-500 mt-1">Date : {invoiceDate}</p>
            </div>
            <div className="border-t-2 border-black pt-3">
              <p className="text-[10px] uppercase font-bold tracking-widest mb-1">Signature du client</p>
              <p className="text-xs text-gray-500 mb-8">Lu et approuvé, bon pour accord</p>
              <div className="h-12"></div>
              <p className="text-xs text-gray-500 mt-1">Date : _______________</p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-8 pt-4 border-t border-gray-200 text-center">
          <p className="text-[9px] text-gray-400">
            benjamin.lacaze@gmail.com • 06 93 61 57 12 • Saint-Leu
          </p>
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
