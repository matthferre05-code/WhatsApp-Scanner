
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <div className="bg-[#25D366]/10 p-1 rounded-md">
        <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
      </div>
      <p className="text-[10px] md:text-xs text-gray-500 font-medium tracking-tight">
        100% Seguro e Anônimo - Ninguém saberá que você usou
      </p>
    </div>
  );
};
