
import React, { useState, useEffect, useRef } from 'react';
import { LogEntry } from '../types';

interface Props {
  phoneNumber: string;
  onComplete: () => void;
}

const LOG_MESSAGES = [
  "Iniciando tunelamento via protocolo SSL/TLS 1.3...",
  "Buscando vulnerabilidade no servidor central...",
  "Interceptando tokens de autenticação temporários...",
  "Acessando banco de dados de mensagens (WhatsApp API)...",
  "Sincronizando chats (4.2GB de dados detectados)...",
  "Descriptografando mídias e áudios recentes...",
  "Recuperando 412 mensagens apagadas da lixeira...",
  "Mapeando localização via torres de celular (ERB)...",
  "Gerando chave de acesso para o painel de visualização...",
  "Finalizando clonagem segura..."
];

export const ScanningAnimation: React.FC<Props> = ({ phoneNumber, onComplete }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState({ mb: 0, pkts: 0 });
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < LOG_MESSAGES.length) {
        const newLog: LogEntry = {
          message: LOG_MESSAGES[currentLogIndex],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
        setLogs(prev => [...prev, newLog]);
        setProgress(Math.min(((currentLogIndex + 1) / LOG_MESSAGES.length) * 100, 100));
        setMetrics({
          mb: Math.floor(Math.random() * 4500),
          pkts: Math.floor(Math.random() * 15000)
        });
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 1100);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Circunferência para r=70: 2 * PI * 70 = 439.82
  const strokeDasharray = 440;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * progress) / 100;

  return (
    <div className="w-full max-w-lg min-h-screen flex flex-col justify-center items-center gap-6 px-6 py-12">
      {/* Progresso Circular Responsivo */}
      <div className="relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64">
        <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(37,211,102,0.3)]" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="#1a1a1a"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="#25D366"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-linear"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-4xl md:text-6xl font-black text-white tracking-tighter">{Math.floor(progress)}%</span>
          <span className="text-[10px] md:text-xs text-[#25D366] font-bold uppercase tracking-[0.3em] animate-pulse">Scanning</span>
        </div>
      </div>

      <div className="text-center space-y-3 w-full">
        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Interceptando Dados</h2>
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#25D366]/10 rounded-2xl border border-[#25D366]/30 shadow-lg">
           <div className="w-3 h-3 bg-[#25D366] rounded-full animate-ping"></div>
           <p className="text-[#25D366] font-mono text-base font-black tracking-wider">{phoneNumber}</p>
        </div>
      </div>

      {/* Métricas de Interceptação */}
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="bg-[#121212] border border-white/5 p-4 rounded-2xl shadow-xl flex flex-col items-center">
          <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Bytes Capturados</p>
          <p className="text-white text-xl font-black">{(metrics.mb / 1024).toFixed(2)} GB</p>
        </div>
        <div className="bg-[#121212] border border-white/5 p-4 rounded-2xl shadow-xl flex flex-col items-center">
          <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Relatórios</p>
          <p className="text-white text-xl font-black">{metrics.pkts.toLocaleString()}</p>
        </div>
      </div>

      {/* Log de Terminal Profissional */}
      <div 
        ref={logContainerRef}
        className="w-full bg-black/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 h-56 overflow-y-auto font-mono text-[12px] space-y-3 shadow-2xl custom-scrollbar"
      >
        {logs.map((log, i) => (
          <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <span className="text-[#25D366] opacity-40 font-bold">[{log.timestamp}]</span>
            <span className={i === logs.length - 1 ? "text-[#25D366] font-bold" : "text-gray-300"}>
              <span className="mr-2">{i === logs.length - 1 ? "➜" : "✔"}</span>
              {log.message}
            </span>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-500 text-[11px] font-black uppercase tracking-[0.2em] animate-pulse">
        Conexão Criptografada Ponto-a-Ponto Estabelecida
      </p>
    </div>
  );
};
