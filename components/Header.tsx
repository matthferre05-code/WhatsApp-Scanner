
import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full animate-in fade-in duration-500">
      <div className="flex items-center gap-3">
        {/* Logo com fundo transparente e brilho verde nas bordas conforme solicitado */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#25D366] rounded-full blur-[8px] opacity-20"></div>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
            alt="WhatsApp Logo" 
            className="w-10 h-10 relative z-10 drop-shadow-[0_0_5px_rgba(37,211,102,0.8)]"
          />
        </div>
        
        <div className="flex flex-col items-start -space-y-1">
          <h1 className="text-[#25D366] text-xl md:text-2xl font-black tracking-tight leading-tight">
            WhatsApp Scanner
          </h1>
          <p className="text-gray-500 text-[10px] md:text-[11px] font-bold tracking-tight opacity-80">
            Busca avançada de informações
          </p>
        </div>
      </div>
    </div>
  );
};
