import { Link, useLocation } from 'react-router-dom';
import {
  Terminal, User, Code, Settings, FileJson, FileText,
  LogIn, Moon, Sun, Sparkles, Search, X
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { AnimatePresence, motion } from 'framer-motion';
import AIChatPanel from './AIChatPanel';
import CommandPalette from './CommandPalette';
import DesktopView from '../pages/DesktopView';

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const { isAdmin, theme, toggleTheme, data } = usePortfolio();
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isChatPanelOpen, setIsChatPanelOpen] = useState(false);
  const [isAppClosed, setIsAppClosed] = useState(false);

  const navItems = [
    { path: '/', name: 'README.md', icon: <FileText size={18} />, label: 'Home' },
    { path: '/projects', name: 'projects.json', icon: <FileJson size={18} />, label: 'Projects' },
    { path: '/about', name: 'profile.log', icon: <User size={18} />, label: 'About' },
    { path: '/contact', name: 'contact.sh', icon: <Terminal size={18} />, label: 'Contact' },
  ];

  // Hidden navigation items for admin/login
  const hiddenNavItems = isAdmin 
    ? [{ path: '/admin', name: 'admin.config', icon: <Settings size={18} />, label: 'Admin' }]
    : [{ path: '/login', name: 'auth.key', icon: <LogIn size={18} />, label: 'Login' }];

  const commandPaletteItems = useMemo(() => {
    const places = [...navItems, ...hiddenNavItems].map((item) => ({
      ...item,
      icon: item.icon,
    }));
    const actions = [
      {
        id: 'theme',
        label: theme === 'dark' ? 'Light mode' : 'Dark mode',
        icon: theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />,
        onSelect: toggleTheme,
      },
      {
        id: 'chat',
        label: isChatPanelOpen ? 'Close AI Chat' : 'Open AI Chat',
        icon: <Sparkles size={20} />,
        onSelect: () => setIsChatPanelOpen((prev) => !prev),
      },
    ];
    return [...places, ...actions];
  }, [navItems, hiddenNavItems, theme, toggleTheme, isChatPanelOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCmdOpen(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'i') {
        e.preventDefault();
        setIsChatPanelOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsCmdOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Programmatically open chat on first load
    const timer = setTimeout(() => {
      setIsChatPanelOpen(true);
    }, 1200);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-bg text-text font-mono selection:bg-accent selection:text-bg transition-colors duration-300 relative">
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        items={commandPaletteItems}
      />

      <AnimatePresence mode="wait">
        {isAppClosed ? (
          <motion.div
            key="closed-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <DesktopView onOpenIDE={() => setIsAppClosed(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="app-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col min-h-0 overflow-hidden"
          >
      {/* Full-width Title Bar (topmost header) - Mac traffic lights always visible */}
      <div className="w-full h-8 bg-card border-b border-border flex items-center shrink-0 select-none pl-4 pr-4">
        <div className="flex gap-1.5 shrink-0 mr-4 opacity-100" aria-hidden="true">
          <button
            type="button"
            onClick={() => setIsAppClosed(true)}
            className="w-3 h-3 rounded-full bg-red hover:brightness-110 transition-colors cursor-pointer focus:outline-none"
            title="Close (minimize to icon)"
            aria-label="Close to icon"
          />
          <div className="w-3 h-3 rounded-full bg-yellow hover:brightness-110 transition-colors cursor-pointer" title="Minimize" />
          <div className="w-3 h-3 rounded-full bg-green hover:brightness-110 transition-colors cursor-pointer" title="Maximize" />
        </div>
        <div className="flex-1 text-center text-[11px] text-muted font-medium tracking-wide truncate">
          portfolio_aviroop
        </div>
        <div className="w-[76px] shrink-0" />
      </div>

      {/* Row: Activity Bar + Main Container */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        {/* Activity Bar (left sidebar, below header) */}
        <div className="hidden md:flex flex-col w-16 bg-card border-r border-border items-center py-4 gap-6 z-50 shrink-0">
          <div className="hidden md:block w-10 h-10 rounded-full bg-muted/20 border border-border overflow-hidden mb-2 relative group cursor-pointer">
            <img
              src="/good_pic_reduced.jpg"
              alt={data.profile.name}
              className="w-full h-full object-cover object-[center_70%] group-hover:opacity-90 transition-opacity"
            />
          </div>

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`p-2 rounded transition-all duration-200 border-l-2 ${pathname === item.path ? 'border-accent text-accent bg-bg' : 'border-transparent text-muted hover:text-text hover:bg-bg/50'}`}
              title={item.label}
            >
              {item.icon}
            </Link>
          ))}

          <div className="mt-auto mb-4 flex flex-col gap-6 items-center">
            <button onClick={toggleTheme} className="text-muted hover:text-accent transition-colors">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Settings size={20} className="text-muted hover:text-text cursor-pointer" />
          </div>
        </div>

        {/* Main Container Area (no title bar; starts with tabs) */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
        {/* Top Bar (editor tabs/header) */}
        <div className="flex bg-bg border-b border-border justify-between items-center pr-2 shrink-0 h-11">
            <div className="flex items-center flex-1 min-w-0 h-full">
              <div className="flex overflow-x-auto no-scrollbar min-w-0 h-full">
              {navItems.map((item) => (
                  <Link 
                  key={item.path}
                  to={item.path}
                  className={`
                      flex items-center gap-2 px-4 h-full border-r border-border min-w-max text-sm transition-colors group
                      ${pathname === item.path ? 'bg-card text-text border-t-2 border-t-accent' : 'bg-bg text-muted hover:bg-card/50'}
                  `}
                  >
                  <span className={`${pathname === item.path ? 'text-accent' : ''}`}>{item.icon}</span>
                  <span>{item.name}</span>
                  <X size={12} className={`ml-1 opacity-0 group-hover:opacity-100 hover:bg-muted/20 rounded p-0.5 transition-all ${pathname === item.path ? 'opacity-40' : ''}`} />
                  </Link>
              ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCmdOpen(true)}
              className="hidden lg:flex items-center gap-2 shrink-0 min-w-[150px] max-w-[280px] mx-2 px-2.5 py-1 rounded-md bg-bg/50 text-muted hover:text-text hover:bg-card/50 hover:border-muted transition-colors text-xs"
              title="Search (⌘ + K)"
            >
              <Search size={14} className="shrink-0" />
              <span className="truncate">Search...</span>
              <kbd className="ml-auto text-[10px] bg-card border border-border rounded px-2 py-1 shrink-0">⌘ + K</kbd>
            </button>

            <div className="flex items-center gap-2 shrink-0 ml-2">
                <button
                  onClick={() => setIsChatPanelOpen(prev => !prev)}
                  className={`p-2 rounded transition-colors border border-transparent relative ${isChatPanelOpen ? 'bg-accent/15 text-accent border-accent/30' : 'text-muted hover:text-text hover:bg-card/50'}`}
                  title="Toggle AI Chat (⌘I)"
                >
                  <Sparkles size={18} />
                </button>
            </div>
        </div>

        {/* Content row: main content + AI panel (inside editor, same header/footer) */}
        <div className="flex-1 flex min-h-0">
          {/* Main content */}
          <div className="flex-1 min-w-0 overflow-y-auto p-4 md:p-8 bg-bg editor-scroll" tabIndex={0}>
            <div className="max-w-5xl mx-auto">
              {children}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isChatPanelOpen && (
              <AIChatPanel
                key="ai-chat"
                isOpen={isChatPanelOpen}
                onClose={() => setIsChatPanelOpen(false)}
                portfolioData={data}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Status Bar (editor footer) */}
        <div className="bg-accent text-bg px-4 py-1 text-xs flex justify-between items-center font-bold shrink-0">
            <div className="flex gap-4">
                <span className="flex items-center gap-1"><Code size={12}/> master*</span>
            </div>
            <div className="flex gap-4">
                <span>JavaScript</span>
                <span>Python</span>
                <span>UTF-8</span>
                <span>avirooppaul.online</span>
            </div>
        </div>
        </div>
      </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
