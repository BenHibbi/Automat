import React, { useState } from 'react';
import Hero from '../components/Hero';
import ShowcaseModules from '../components/ShowcaseModules';
import Positioning from '../components/Positioning';
import Capabilities from '../components/Capabilities';
import Method from '../components/Method';
import References from '../components/References';
import Pricing from '../components/Pricing';
import CTA from '../components/CTA';
import KapNumerikPopup from '../components/KapNumerikPopup';

function Home() {
    const [chatHistory, setChatHistory] = useState([]);
    const [kapEligibility, setKapEligibility] = useState(null);
    const [pricingData, setPricingData] = useState({
        selectedItems: [],
        total: 0,
        mode: 'standard',
        details: {}
    });

    const [theme, setTheme] = useState('dark');

    const getThemeClasses = () => {
        switch (theme) {
            case 'light': return 'bg-white text-black selection:bg-black selection:text-white';
            case 'colorful': return 'bg-gradient-to-br from-[#2E1065] via-[#4C1D95] to-[#BE185D] text-white selection:bg-white selection:text-[#BE185D]';
            default: return 'bg-black text-white selection:bg-white selection:text-black';
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 ${getThemeClasses()}`}>
            <KapNumerikPopup onEligibilityChange={setKapEligibility} />
            <Hero onChatUpdate={setChatHistory} theme={theme} setTheme={setTheme} />
            <ShowcaseModules theme={theme} />
            <Positioning theme={theme} />
            <Capabilities theme={theme} />
            <Method theme={theme} />
            <References theme={theme} />
            <Pricing onPricingUpdate={setPricingData} theme={theme} />
            <CTA
                chatHistory={chatHistory}
                kapEligibility={kapEligibility}
                pricingData={pricingData}
                theme={theme}
            />

            <footer className={`py-8 border-t text-center text-[10px] font-mono uppercase tracking-widest transition-colors duration-500 ${theme === 'light' ? 'border-black/10 text-black/20' : 'border-white/10 text-white/20'}`}>
                © 2024 AUTOMAT. Artificial Systems.
            </footer>
        </div>
    );
}

export default Home;
