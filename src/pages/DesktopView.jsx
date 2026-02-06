import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Wifi, Volume2, Battery,
  Folder, FolderOpen, Trash2, Github, BookOpen, HardDrive, FileText,
} from 'lucide-react';

const DOCK_ITEMS = [
  { label: 'Documents', Icon: Folder },
  { label: 'Projects', Icon: FolderOpen },
  { label: 'README', Icon: FileText },
  { label: 'Trash', Icon: Trash2 },
  { label: 'GitHub', Icon: Github },
  { label: 'Profile', Icon: BookOpen },
  { label: 'Drive', Icon: HardDrive },
];

export default function DesktopView({ onOpenIDE }) {
  const [clock, setClock] = useState(() => new Date());

  useEffect(() => {
    const tid = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(tid);
  }, []);

  return (
    <div
      className="absolute inset-0 z-[100] flex flex-col overflow-hidden"
      role="application"
      aria-label="Avexa IDE desktop"
    >
      {/* Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-neutral-900"
        style={{ backgroundImage: 'url(/wallpaper.jpg)' }}
      />

      {/* Top status bar (Mac menu bar style) */}
      <header
        className="relative z-10 flex items-center justify-between px-5 h-7 shrink-0 backdrop-blur-xl bg-white/10 border-b border-white/10 text-white/95 text-[13px] font-medium"
        aria-label="Menu bar"
      >
        <div className="flex items-center gap-6">
          <span className="font-semibold tracking-tight">Avexa</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="tabular-nums" suppressHydrationWarning>
            {clock.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: false })}
          </span>
          <span className="text-white/80 text-[12px]" suppressHydrationWarning>
            {clock.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
          <Wifi size={14} className="text-white/80" aria-hidden />
          <Volume2 size={14} className="text-white/80" aria-hidden />
          <Battery size={16} className="text-white/80" aria-hidden />
        </div>
      </header>

      {/* Desktop: only our app icon (opens IDE) */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col pt-4 pl-5">
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, type: 'spring', stiffness: 200 }}
          className="flex flex-col items-center gap-2 p-3 rounded-lg w-fit text-white/95 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent"
          onClick={onOpenIDE}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpenIDE(); } }}
          aria-label="Open Avexa IDE"
        >
          <img src="/ap-favicon-cropped.png" alt="" className="w-14 h-14 drop-shadow-lg" />
          <span className="text-xs font-medium text-center leading-tight drop-shadow-sm">Avexa IDE</span>
        </motion.button>
      </div>

      {/* Dock: icons only, no labels (Avexa IDE is on desktop) */}
      <footer className="relative z-10 flex justify-center pb-3 px-4">
        <div className="flex items-center gap-0.5 px-2 py-1.5 rounded-2xl backdrop-blur-xl bg-white/15 border border-white/20 shadow-2xl">
          {DOCK_ITEMS.map(({ label, Icon }, i) => (
            <motion.div
              key={label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.03, type: 'spring', stiffness: 200 }}
              className="flex items-center justify-center p-1 rounded-lg text-white/90 hover:text-white hover:bg-white/20 transition-all duration-200 cursor-default select-none"
              role="img"
              aria-label={label}
            >
              <div className="w-9 h-9 rounded-md bg-white/20 flex items-center justify-center drop-shadow">
                <Icon size={18} className="text-white/95" strokeWidth={1.5} />
              </div>
            </motion.div>
          ))}
        </div>
      </footer>
    </div>
  );
}
