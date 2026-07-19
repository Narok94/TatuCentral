import { useState } from "react";
import { motion } from "motion/react";
import { Plus, Minus, ChevronRight } from "lucide-react";

// The ordered list of apps as requested
const apps = [
  {
    id: "hagenda",
    nome: "Hagenda",
    descricao: "Sua rotina e agenda organizada",
    url: "https://hagenda.vercel.app/",
    icone: "📅",
    gradient: "from-indigo-400 to-blue-500",
    shadowColor: "rgba(59, 130, 246, 0.3)",
    textAccent: "text-indigo-600",
  },
  {
    id: "horus",
    nome: "Horus Training",
    descricao: "Treino e acompanhamento na academia",
    url: "https://horusfit.vercel.app/",
    icone: "🦅",
    gradient: "from-amber-400 to-orange-500",
    shadowColor: "rgba(249, 115, 22, 0.3)",
    textAccent: "text-amber-600",
  },
  {
    id: "desafio90",
    nome: "Desafio 90",
    descricao: "Seu acompanhamento diário",
    url: "https://desafio90d.vercel.app/",
    icone: "🔥",
    gradient: "from-orange-500 to-red-500",
    shadowColor: "rgba(239, 68, 68, 0.3)",
    textAccent: "text-red-600",
  },
  {
    id: "tatu",
    nome: "Tatu",
    descricao: "Gestão financeira pessoal simples",
    url: "https://contas2-0.vercel.app/",
    icone: "💰",
    gradient: "from-emerald-400 to-teal-500",
    shadowColor: "rgba(16, 185, 129, 0.3)",
    textAccent: "text-emerald-600",
  },
];

// Inline styles to isolate native colored emojis from custom fonts
const emojiStyle = {
  fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
};

export default function App() {
  // Safe state for tracking Desafio 90 day progress with local storage persistence
  const [currentDay, setCurrentDay] = useState(() => {
    try {
      const saved = localStorage.getItem("desafio90_current_day");
      return saved ? Math.max(1, Math.min(90, parseInt(saved, 10))) : 45;
    } catch {
      return 45;
    }
  });

  const updateDay = (newDay: number) => {
    setCurrentDay(newDay);
    try {
      localStorage.setItem("desafio90_current_day", newDay.toString());
    } catch (e) {
      console.warn("Storage not available:", e);
    }
  };

  // Dynamic greeting based on the user's current local hour
  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr >= 5 && hr < 12) {
      return { text: "Bom dia", emoji: "☀️" };
    } else if (hr >= 12 && hr < 18) {
      return { text: "Boa tarde", emoji: "👋" };
    } else {
      return { text: "Boa noite", emoji: "✨" };
    }
  };

  const greeting = getGreeting();
  const challengeProgressPercent = (currentDay / 90) * 100;

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#FAF9FF] text-zinc-800 font-sans overflow-x-hidden flex flex-col justify-between"
         style={{
           paddingTop: 'calc(max(env(safe-area-inset-top), 1.5rem) + 0.5rem)',
           paddingBottom: 'calc(max(env(safe-area-inset-bottom), 1.5rem) + 0.5rem)'
         }}>
      
      {/* Dynamic Ambient Background Blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-15%] w-[85%] h-[40%] rounded-full bg-indigo-100/50 blur-[60px]" />
        <div className="absolute top-[35%] right-[-15%] w-[70%] h-[35%] rounded-full bg-pink-100/40 blur-[55px]" />
        <div className="absolute bottom-[-5%] left-[10%] w-[80%] h-[30%] rounded-full bg-purple-100/50 blur-[60px]" />
      </div>

      <div className="relative z-10 max-w-md mx-auto w-full px-5 flex-1 flex flex-col justify-start">
        
        {/* Header Section */}
        <header className="mb-6 mt-1 flex justify-between items-center px-1">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 font-display flex items-center gap-1.5">
              {greeting.text}{" "}
              <span style={emojiStyle} className="inline-block animate-bounce-slow">
                {greeting.emoji}
              </span>
            </h1>
            <p className="text-zinc-500 text-sm font-medium mt-0.5">
              Sua central de produtividade
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-zinc-100">
            <span style={emojiStyle} className="text-xl">⚡</span>
          </div>
        </header>

        {/* Desafio 90 Progress Widget */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 bg-white rounded-[1.75rem] p-5 shadow-[0_10px_25px_-5px_rgba(124,58,237,0.06)] border border-purple-100/50 flex flex-col gap-3.5 relative overflow-hidden group"
        >
          {/* Decorative colored glow on the background of the widget */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-tr from-orange-400/10 to-red-500/10 blur-xl pointer-events-none" />

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100">
                <span style={emojiStyle} className="text-lg">🔥</span>
              </div>
              <div>
                <h3 className="font-display font-semibold text-[1.05rem] text-zinc-900 leading-none">
                  Desafio 90 Dias
                </h3>
                <p className="text-xs text-zinc-500 mt-1 font-medium">
                  Seu progresso atual
                </p>
              </div>
            </div>

            {/* Micro Interaction: Increment / Decrement Day */}
            <div className="flex items-center gap-1 bg-zinc-50 border border-zinc-100 p-1 rounded-xl">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateDay(Math.max(1, currentDay - 1));
                }}
                disabled={currentDay <= 1}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white active:scale-90 text-zinc-600 hover:text-zinc-900 disabled:opacity-40 disabled:pointer-events-none transition-all duration-200"
                aria-label="Diminuir dia"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-semibold px-2 text-zinc-800 font-display min-w-[3rem] text-center">
                Dia {currentDay}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateDay(Math.min(90, currentDay + 1));
                }}
                disabled={currentDay >= 90}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white active:scale-90 text-zinc-600 hover:text-zinc-900 disabled:opacity-40 disabled:pointer-events-none transition-all duration-200"
                aria-label="Aumentar dia"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5 mt-0.5">
            <div className="w-full bg-zinc-100 rounded-full h-3 overflow-hidden p-[2px]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-red-500"
                initial={{ width: 0 }}
                animate={{ width: `${challengeProgressPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between items-center text-[0.78rem] text-zinc-400 font-medium">
              <span>Início</span>
              <span className="text-orange-500 font-bold font-display">
                {Math.round(challengeProgressPercent)}% Concluído
              </span>
              <span>Dia 90</span>
            </div>
          </div>
        </motion.div>

        {/* Section title */}
        <div className="mb-4 px-1 flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Meus Atalhos
          </span>
          <span className="text-[0.7rem] bg-indigo-50 border border-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-semibold">
            {apps.length} Apps Ativos
          </span>
        </div>

        {/* Apps List Section */}
        <main className="flex-1 flex flex-col gap-4">
          {apps.map((app, index) => (
            <motion.a
              key={app.id}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="group relative block w-full bg-white rounded-[1.75rem] p-4.5 pr-6 
                         border border-zinc-100 hover:border-zinc-200/80
                         transition-all duration-300 active:bg-zinc-50/50"
              style={{
                boxShadow: `0 12px 30px -10px rgba(0, 0, 0, 0.03), 0 4px 12px -5px ${app.shadowColor}`,
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4.5 flex-1 min-w-0">
                  {/* Styled Gradient Blob for Emoji Icon */}
                  <div
                    className={`flex items-center justify-center w-[3.75rem] h-[3.75rem] rounded-[1.25rem] text-2xl bg-gradient-to-tr ${app.gradient} text-white shadow-lg shrink-0 transition-transform duration-300 group-hover:scale-105`}
                    style={{
                      boxShadow: `0 8px 16px -4px ${app.shadowColor}`,
                    }}
                  >
                    <span style={emojiStyle}>{app.icone}</span>
                  </div>

                  {/* App Text Metadata */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-zinc-900 font-display leading-tight flex items-center gap-1.5">
                      {app.nome}
                    </h2>
                    <p className="text-[0.82rem] text-zinc-500 font-medium leading-snug mt-1 line-clamp-1">
                      {app.descricao}
                    </p>
                  </div>
                </div>

                {/* Right Arrow Chevron indicator */}
                <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center border border-zinc-100 text-zinc-400 group-hover:text-zinc-700 group-hover:bg-zinc-100/50 group-hover:translate-x-0.5 transition-all shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </main>
      </div>

      {/* Elegant, minimalist bottom footer info */}
      <footer className="w-full text-center mt-8 z-10">
        <p className="text-[0.7rem] text-zinc-400 font-medium tracking-wide">
          Dispositivo otimizado para iOS • Toque para abrir no Safari
        </p>
      </footer>
    </div>
  );
}
