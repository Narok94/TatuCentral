import { motion } from "motion/react";

const apps = [
  {
    id: "horus",
    nome: "Horus Training",
    descricao: "Treino e acompanhamento na academia",
    url: "https://horusfit.vercel.app/",
    icone: "🦅",
    cor: "#D4A017",
  },
  {
    id: "hagenda",
    nome: "Hagenda",
    descricao: "Agenda e rotina",
    url: "https://hagenda.vercel.app/",
    icone: "📅",
    cor: "#4A90D9",
  },
  {
    id: "tatu",
    nome: "Tatu",
    descricao: "Gestão financeira",
    url: "https://contas2-0.vercel.app/",
    icone: "💰",
    cor: "#14B8A6",
  },
  {
    id: "desafio90",
    nome: "Desafio 90",
    descricao: "Desafio de 90 dias",
    url: "https://desafio90d.vercel.app/",
    icone: "🔥",
    cor: "#FF6B4A",
  },
];

export default function App() {
  return (
    <div className="min-h-[100dvh] w-full bg-[#09090B] text-white font-sans selection:bg-white/20 px-5"
         style={{
           paddingTop: 'max(env(safe-area-inset-top), 2rem)',
           paddingBottom: 'max(env(safe-area-inset-bottom), 2rem)'
         }}>
      
      <div className="max-w-md mx-auto w-full h-full flex flex-col">
        <header className="mb-8 mt-2 px-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">
            Meus Apps
          </h1>
          <p className="text-zinc-500 mt-1 text-sm font-medium">
            Central de atalhos
          </p>
        </header>

        <main className="flex-1 flex flex-col gap-4">
          {apps.map((app, index) => (
            <motion.a
              key={app.id}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              whileTap={{ scale: 0.97, opacity: 0.8 }}
              className="group relative block w-full bg-zinc-900/60 hover:bg-zinc-900 
                         rounded-[1.25rem] p-4 pr-6 transition-all duration-300
                         border border-zinc-800/80 hover:border-zinc-700/80
                         shadow-sm overflow-hidden"
              style={{
                boxShadow: `0 4px 20px -10px ${app.cor}15`
              }}
            >
              {/* Subtle background glow from the accent color */}
              <div 
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-[0.12] group-hover:opacity-20 transition-opacity"
                style={{ backgroundColor: app.cor }}
              />

              <div className="relative flex items-center gap-5">
                <div 
                  className="flex items-center justify-center w-14 h-14 rounded-2xl text-2xl shadow-sm"
                  style={{ 
                    backgroundColor: `${app.cor}15`, 
                    border: `1px solid ${app.cor}30` 
                  }}
                >
                  {app.icone}
                </div>
                
                <div className="flex-1">
                  <h2 className="text-[1.05rem] font-medium text-zinc-100 mb-0.5 leading-tight">
                    {app.nome}
                  </h2>
                  <p className="text-[0.85rem] text-zinc-400 leading-snug line-clamp-2">
                    {app.descricao}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </main>
      </div>
    </div>
  );
}
