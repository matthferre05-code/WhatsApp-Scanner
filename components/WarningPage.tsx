
import React from 'react';

interface WarningPageProps {
  onConfirm: () => void;
}

export const WarningPage: React.FC<WarningPageProps> = ({ onConfirm }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-y-auto flex flex-col items-center px-4 py-6 animate-in fade-in duration-300">
      <div className="w-full max-w-md space-y-4">
        
        {/* CABEÇALHO VERMELHO DE ALERTA */}
        <div className="bg-red-600 rounded-[2.5rem] p-8 text-center relative overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.3)]">
          <div className="absolute top-4 right-4 bg-yellow-400 text-black text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-tighter">
            URGENTE
          </div>
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/20">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-white text-2xl font-black leading-none uppercase tracking-tight mb-4">
            O NÚMERO VAI RECEBER UM ALERTA!
          </h2>
          <p className="text-white text-sm font-bold leading-tight">
            Dizendo que <span className="underline decoration-2">VOCÊ</span> está MONITORANDO ELE!
          </p>
        </div>

        {/* BOX AMARELO CUIDADO */}
        <div className="bg-[#1a1a0a] border-2 border-yellow-600 rounded-3xl p-6 text-center">
          <h3 className="text-yellow-500 text-base font-black uppercase mb-2">CUIDADO!</h3>
          <p className="text-yellow-100 text-xs font-medium leading-relaxed">
            Na versão gratuita o número investigado pode receber uma notificação falando que você está investigando ele.
          </p>
        </div>

        {/* BOX CINZA INSTRUÇÃO */}
        <div className="bg-[#121212] rounded-3xl p-6 text-center border border-white/5">
          <h3 className="text-white text-base font-black mb-2">Não deixe isso acontecer!</h3>
          <p className="text-gray-400 text-xs font-medium leading-relaxed">
            Assine a versão paga e não deixe que o número receba notificação.
          </p>
        </div>

        {/* BOX LISTA DE RECURSOS */}
        <div className="bg-[#121212] rounded-3xl p-6 border border-white/5 space-y-4">
          <h3 className="text-white text-sm font-black leading-tight">
            Continue monitorando SEM que ela seja notificada:
          </h3>
          <ul className="space-y-3">
            {[
              "Conversas e mensagens",
              "Prints e fotos apagadas",
              "Localização em tempo real",
              "Todo conteúdo que quiser"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm font-bold">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* PREÇO E BOTÃO FINAL */}
        <div className="text-center pt-4 space-y-4 pb-10">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Acesse por apenas</p>
          <div className="text-green-500 text-4xl font-black tracking-tighter">
            R$ 12,00
          </div>
          <button 
            onClick={onConfirm}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black text-lg uppercase tracking-tighter shadow-[0_10px_40px_rgba(220,38,38,0.4)] active:scale-95 transition-all"
          >
            ATIVAR MODO ANÔNIMO
          </button>
        </div>

      </div>
    </div>
  );
};
