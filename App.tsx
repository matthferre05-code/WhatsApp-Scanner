
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MainCard } from './components/MainCard';
import { Footer } from './components/Footer';
import { ScanningAnimation } from './components/ScanningAnimation';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { WarningPage } from './components/WarningPage';
import { AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  // Lógica para interceptar o botão de voltar
  useEffect(() => {
    // Adiciona uma entrada no histórico para podermos detectar o "voltar"
    window.history.pushState({ page: 1 }, "", "");

    const handlePopState = (event: PopStateEvent) => {
      // Quando o usuário tenta voltar, mostramos a página de alerta
      setShowWarning(true);
      // Coloca ele de volta no histórico para que a próxima tentativa também seja interceptada
      window.history.pushState({ page: 1 }, "", "");
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleStartSearch = (number: string) => {
    setPhoneNumber(number);
    setState(AppState.SCANNING);
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }
  };

  const handleScanningComplete = () => {
    setState(AppState.ANALYZING);
  };

  const handleAnalysisComplete = () => {
    setState(AppState.COMPLETED);
  };

  const handleConfirmWarning = () => {
    setShowWarning(false);
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }
    // Redireciona para o checkout da PerfectPay
    window.open('https://go.perfectpay.com.br/PPU38CQ69SE', '_self');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center px-4 py-8 overflow-x-hidden relative">
      
      {/* PÁGINA DE ALERTA (MODAL OVERLAY) */}
      {showWarning && <WarningPage onConfirm={handleConfirmWarning} />}

      {state === AppState.IDLE && (
        <div className="w-full max-w-md space-y-8 animate-in fade-in duration-700">
          <Header />
          
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center leading-tight">
              Descubra <span className="text-[#25D366] text-green-glow">TUDO</span> que ele(a) esconde no WhatsApp
            </h1>

            <div className="bg-[#1a1505] border border-yellow-600/30 rounded-2xl p-4 alert-glow flex items-center justify-center gap-3">
              <span className="text-yellow-500 text-xl">⚠️</span>
              <p className="text-sm text-yellow-100 font-medium">
                Você tem direito a <span className="text-yellow-500 font-bold">1 consulta gratuita.</span>
              </p>
            </div>

            <MainCard onStart={handleStartSearch} />
          </div>

          <Footer />
        </div>
      )}

      {state === AppState.SCANNING && (
        <ScanningAnimation 
          phoneNumber={phoneNumber} 
          onComplete={handleScanningComplete} 
        />
      )}

      {state === AppState.ANALYZING && (
        <AnalysisDashboard 
          phoneNumber={phoneNumber}
          onComplete={handleAnalysisComplete}
        />
      )}

      {state === AppState.COMPLETED && (
        <div className="w-full max-w-md text-center space-y-6 animate-in zoom-in duration-500">
          <Header />
          <div className="bg-[#121212] border border-[#25D366]/30 rounded-3xl p-8 space-y-6">
            <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-[#25D366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Relatório Gerado!</h2>
            <p className="text-gray-400">
              O acesso às conversas de <span className="text-[#25D366] font-mono">{phoneNumber}</span> está liberado no servidor seguro.
            </p>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).fbq) {
                  (window as any).fbq('track', 'InitiateCheckout');
                }
                window.open('https://go.perfectpay.com.br/PPU38CQ69SE', '_self');
              }}
              className="w-full whatsapp-gradient py-4 rounded-xl font-bold text-lg shadow-lg hover:brightness-110 transition-all active:scale-95"
            >
              DESBLOQUEAR ACESSO AGORA
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;