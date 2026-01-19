
import React, { useState, useEffect } from 'react';
import { Header } from './Header';

interface Props {
  phoneNumber: string;
  onComplete: () => void;
}

export const AnalysisDashboard: React.FC<Props> = ({ phoneNumber, onComplete }) => {
  const [seconds, setSeconds] = useState(90); // 01:30
  const [showResults, setShowResults] = useState(false);
  const [expiryMinutes, setExpiryMinutes] = useState(10);

  // Mapeamento de geolocalização baseado no DDD
  const getLocationFromDDD = (phone: string) => {
    const cleanPhone = String(phone).replace(/\D/g, '');
    const ddd = cleanPhone.substring(0, 2);
    
    const dddMap: Record<string, string> = {
      '51': 'Rio Grande do Sul - Porto Alegre e Região Metropolitana',
      '54': 'Rio Grande do Sul - Região da Serra',
      '98': 'Maranhão - Região Metropolitana de São Luís',
      '11': 'São Paulo - São Paulo e Região Metropolitana',
      '21': 'Rio de Janeiro - Rio de Janeiro e Região Metropolitana',
      '31': 'Minas Gerais - Horizonte e Região Metropolitana',
      '41': 'Paraná - Curitiba e Região Metropolitana',
      '71': 'Bahia - Salvador e Região Metropolitana',
      '85': 'Ceará - Fortaleza e Região Metropolitana'
    };
    return dddMap[ddd] || 'Localização Detectada via Satélite';
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'ViewContent');
    }

    if (seconds <= 0) {
      setShowResults(true);
      return;
    }
    const timer = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
  };

  const handleFinalAction = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }
    window.open('https://go.perfectpay.com.br/PPU38CQ69SE', '_self');
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center space-y-5 animate-in fade-in duration-700 pb-20 px-4">
      
      <Header />

      {/* BANNER DE URGÊNCIA NO TOPO */}
      <div className="w-full bg-red-600 py-2 px-4 rounded-xl flex items-center justify-center gap-2 animate-pulse mb-2 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <p className="text-white text-[10px] font-black uppercase tracking-tighter">
          Conexão instável: O alvo pode notar a lentidão se você não agir rápido!
        </p>
      </div>

      {seconds > 0 && (
        <>
          <div className="text-center space-y-1 animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-[#25D366] text-xl font-black tracking-tight flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-[#25D366] rounded-full animate-ping"></span>
              CAPTALIZANDO CONVERSAS PRIVADAS...
            </h2>
            <p className="text-gray-500 text-sm font-medium">Extraindo mídias temporárias (View Once)</p>
          </div>

          <div className="w-full bg-[#0d160f] border border-[#25D366]/30 rounded-2xl py-4 flex items-center justify-center gap-3 animate-in fade-in slide-in-from-top-6 duration-500 shadow-lg">
            <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <p className="text-gray-300 text-base font-medium">
              Sincronização expira em: <span className="text-[#25D366] font-black text-xl tabular-nums">{formatTime(seconds)}</span>
            </p>
          </div>
        </>
      )}

      {seconds <= 0 && (
        <div className="text-center space-y-1 animate-in zoom-in duration-500">
          <h2 className="text-red-500 text-2xl font-black tracking-tighter uppercase leading-none">DADOS COMPROMETEDORES ENCONTRADOS</h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Sessão segura ativa por apenas 10:00</p>
        </div>
      )}

      <div className="w-full overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl bg-black relative aspect-[9/16] mt-2 animate-in fade-in duration-1000">
        <div className="wistia_responsive_padding" style={{ padding: '177.77% 0 0 0', position: 'relative' }}>
          <div className="wistia_responsive_wrapper" style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}>
            <div className={`wistia_embed wistia_async_zisfw1sade videoFoam=true`} style={{ height: '100%', position: 'relative', width: '100%' }}>
            </div>
          </div>
        </div>
      </div>

      {showResults && (
        <div className="w-full bg-[#121212]/50 border border-white/5 rounded-[2.5rem] p-5 space-y-4 shadow-xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          
          <div className="flex flex-col items-center gap-1 py-2">
             <div className="flex items-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-5 h-5"/>
                <span className="text-red-500 text-sm font-black uppercase animate-pulse">ALERTA DE SEGURANÇA</span>
             </div>
             <span className="text-gray-500 text-[10px] font-medium uppercase tracking-widest">Acesso Restrito - Nível 5</span>
          </div>

          {/* BOX DE MENSAGEM CRÍTICA - URGÊNCIA MÁXIMA */}
          <div className="bg-[#1c0f0f] border-2 border-red-600 rounded-3xl p-5 space-y-3 relative overflow-hidden group">
             <div className="absolute top-0 right-0 bg-red-600 text-white text-[8px] font-black px-2 py-1 rounded-bl-lg uppercase">Crítico</div>
             <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
                <span className="text-red-500 text-[11px] font-black uppercase tracking-tight">Conteúdo Altamente Suspeito Interceptado</span>
             </div>
             
             <div className="bg-[#121212] rounded-2xl p-4 flex flex-col gap-2 border border-red-900/30">
                <p className="text-white text-sm font-bold italic tracking-tight border-l-4 border-red-600 pl-3">
                   "Vou apagar logo para não dar nada, mas a noite a gente termina o que começou... 🔥"
                </p>
                <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase mt-1">
                   <span>Enviada há 14 minutos</span>
                   <span className="text-red-500">Apagada pelo Remetente</span>
                </div>
             </div>
          </div>

          <div className="bg-[#181818] border border-white/5 rounded-3xl p-4 flex flex-col items-center gap-2">
             <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Status do Alvo em {getLocationFromDDD(phoneNumber)}</p>
             <div className="flex items-center gap-4 w-full">
                <div className="flex-1 bg-black/40 p-3 rounded-xl border border-white/5 flex flex-col items-center">
                   <span className="text-[#25D366] text-lg font-black">ONLINE</span>
                   <span className="text-gray-600 text-[8px] uppercase font-bold">Status Atual</span>
                </div>
                <div className="flex-1 bg-black/40 p-3 rounded-xl border border-white/5 flex flex-col items-center">
                   <span className="text-red-500 text-lg font-black">ATIVO</span>
                   <span className="text-gray-600 text-[8px] uppercase font-bold">Lixeira de Chats</span>
                </div>
             </div>
          </div>

          <div className="space-y-3">
            {[
              { label: "Contatos ocultos (Arquivados/Silenciados)", value: "12", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
              { label: "Conversas Suspeitas (IA Detectou Infidelidade)", value: "15", icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.99 7.99 0 0120 13a7.99 7.99 0 01-2.343 5.657z" },
              { label: "Mensagens Apagadas (Últimas 24h)", value: "48", icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" },
              { label: "Mídias Temporárias Interceptadas", value: "34", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-[#181818] border border-white/5 p-4 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="w-10 h-10 flex items-center justify-center bg-red-600/10 rounded-xl border border-red-600/20">
                   <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                   </svg>
                </div>
                <div className="flex flex-col">
                   <span className="text-xl font-black text-white leading-none">{stat.value}</span>
                   <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight mt-1 leading-tight">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-600/10 border border-yellow-600/30 p-4 rounded-2xl flex flex-col gap-1 items-center">
             <p className="text-yellow-500 text-[9px] font-black uppercase text-center">AVISO DE AUTODESTRUIÇÃO</p>
             <p className="text-yellow-100 text-[10px] font-medium text-center">
                Por questões de segurança cibernética, este relatório será excluído permanentemente em <span className="font-bold">09:59</span> minutos.
             </p>
          </div>

          <button 
            onClick={handleFinalAction}
            className="w-full py-5 whatsapp-gradient rounded-[2.5rem] flex flex-col items-center justify-center shadow-[0_15px_45px_rgba(37,211,102,0.4)] hover:scale-[1.02] transition-all active:scale-95 text-white mt-2 group relative overflow-hidden"
          >
            <div className="shimmer absolute inset-0 opacity-20 pointer-events-none" />
            <span className="text-xs font-black uppercase tracking-tight opacity-90">SINCROZINIZAÇÃO CONCLUÍDA</span>
            <span className="text-2xl font-black uppercase tracking-tighter">VER CONVERSAS AGORA</span>
          </button>

          <div className="flex items-center justify-center gap-2 py-2 opacity-60">
             <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
             </svg>
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                Transferência Segura via WhatsApp Web Hook
             </p>
          </div>

        </div>
      )}

      <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] text-center pt-4">
         Sessão protegida por criptografia militar AES-256
      </p>

    </div>
  );
};
