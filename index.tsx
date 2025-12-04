import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const Gate = () => {
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      const aistudio = (window as any).aistudio;
      if (aistudio && await aistudio.hasSelectedApiKey()) {
        setHasKey(true);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    const aistudio = (window as any).aistudio;
    if (aistudio) {
        await aistudio.openSelectKey();
        // Assume success to prevent race conditions as per guidelines
        setHasKey(true);
    }
  };

  if (hasKey) {
    return <App />;
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-sky-200 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md w-full pop-in border-4 border-sky-400">
        <h1 className="text-4xl font-black text-blue-500 mb-2 drop-shadow-sm">Renkli Dünya</h1>
        <div className="text-6xl mb-6 mt-4">🎨</div>
        
        <p className="text-gray-600 mb-8 text-lg font-bold">
          Oyuna başlamak için anahtar gerekli.
        </p>
        
        <button
          onClick={handleSelectKey}
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-[0_6px_0_rgb(21,128,61)] active:translate-y-1 active:shadow-none transition-all w-full mb-6"
        >
          Anahtar Seç
        </button>
        
        <div className="text-xs text-gray-400 border-t pt-4">
           Bu oyun gelişmiş Gemini Pro modellerini kullanır.<br/>
           <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline text-blue-400 hover:text-blue-600">
             Faturalandırma Bilgisi
           </a>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Gate />
  </React.StrictMode>
);