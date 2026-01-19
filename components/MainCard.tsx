
import React, { useState } from 'react';

interface MainCardProps {
  onStart: (number: string) => void;
}

export const MainCard: React.FC<MainCardProps> = ({ onStart }) => {
  const [value, setValue] = useState('');

  const formatPhoneNumber = (val: string) => {
    const numbers = val.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.length >= 14) {
      onStart(value);
    } else {
      alert("Por favor, digite um número válido.");
    }
  };

  return (
    <div className="bg-[#121212] border border-white/10 rounded-[2.5rem] p-8 md:p-10 space-y-8 shadow-2xl">
      <h3 className="text-2xl font-black text-center tracking-tight">Digite o número abaixo</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
              alt="WA" 
              className="w-6 h-6 opacity-30 group-focus-within:opacity-100 transition-opacity"
            />
          </div>
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
            className="block w-full pl-14 pr-6 py-5 bg-[#1a1a1a] border border-white/10 rounded-2xl text-xl font-black placeholder:text-gray-700 focus:border-[#25D366]/50 transition-all text-white tracking-widest text-center"
            maxLength={15}
          />
        </div>

        <button
          type="submit"
          className="w-full whatsapp-gradient py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-xl shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:brightness-110 transition-all active:scale-95 group border-t border-white/20"
        >
          <svg className="w-7 h-7 group-hover:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          INICIAR BUSCA
        </button>
      </form>

      <div className="pt-2">
        <div className="flex items-center justify-center gap-2 py-3 bg-[#1a1a1a] rounded-xl border border-white/5">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <img key={i} className="w-6 h-6 rounded-full border-2 border-[#1a1a1a]" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user"/>
            ))}
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">
            +1.400 buscas realizadas hoje
          </p>
        </div>
      </div>
    </div>
  );
};
