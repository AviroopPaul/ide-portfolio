import { Sparkles, Send, Bot, PanelRightClose, Command, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const MIN_WIDTH = 320;
const DEFAULT_WIDTH = 400;
const MAX_WIDTH = 600;
const CHAT_STORAGE_KEY = 'avexa-chat-history';

const defaultWelcome = [
  { role: 'assistant', content: 'Hi! I\'m AVEXA, Aviroop\'s AI agent. Ask me anything about him—his work, experience, or projects.' }
];

/** Turn raw URLs in text into markdown links so they render clickable. Skips URLs already inside ]( ). */
function linkifyRawUrls(text) {
  if (typeof text !== 'string') return text;
  return text.replace(/(^|[\s])(https?:\/\/[^\s)\]'"]+)/g, (_, before, url) => `${before}[${url}](${url})`);
}

function getStoredChatHistory() {
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return defaultWelcome;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0 && parsed.every(m => m && typeof m?.role === 'string' && typeof m?.content === 'string')) {
      return parsed;
    }
  } catch (_) {}
  return defaultWelcome;
}

export default function AIChatPanel({ isOpen, onClose, portfolioData }) {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState(getStoredChatHistory);
  const [isTyping, setIsTyping] = useState(false);
  const [panelWidth, setPanelWidth] = useState(DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Resize logic: drag left edge of panel
  useEffect(() => {
    if (!isResizing) return;
    const onMove = (e) => {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setPanelWidth(newWidth);
      }
    };
    const onUp = () => setIsResizing(false);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { role: 'user', content: chatInput };
    setChatHistory(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    // Production (Vercel): always use same-origin. Local dev: use VITE_API_URL or local Express server.
    const isLocal = typeof window !== 'undefined' && /localhost|127\.0\.0\.1/.test(window.location.origin);
    const apiUrl = isLocal
      ? (import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api/chat')
      : '/api/chat';
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatHistory, userMessage],
          portfolioData: portfolioData ?? {}
        }),
      });
      const result = await response.json();
      setChatHistory(prev => [...prev, { role: 'assistant', content: result.message }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'assistant', content: 'Sorry, I\'m having trouble connecting to my brain right now.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setChatHistory(defaultWelcome);
  };

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: panelWidth, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 300,
        opacity: { duration: 0.2 }
      }}
      className="hidden md:flex flex-col shrink-0 bg-card border-l border-border relative overflow-hidden"
    >
      {/* Content wrapper with fixed width to prevent content squishing during animation */}
      <div style={{ width: panelWidth, minWidth: panelWidth }} className="relative flex flex-col h-full overflow-hidden">
        {/* Click-outside overlay to close model modal */}
        {showModelModal && (
          <div
            className="absolute inset-0 z-40"
            onClick={() => setShowModelModal(false)}
            aria-hidden="true"
          />
        )}
        {/* Resize handle: left edge */}
        <div
          role="separator"
          aria-orientation="vertical"
          onMouseDown={() => setIsResizing(true)}
          className={`absolute left-0 top-0 bottom-0 w-1 cursor-col-resize z-10 hover:bg-accent/30 transition-colors ${isResizing ? 'bg-accent/50' : ''}`}
          title="Drag to resize"
        />

        {/* Header */}
        <div className="p-3 border-b border-border flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-md tracking-[0.2em] inline-block text-[var(--avexa)]">
                AVEXA
              </span>
              <span className="text-xs text-muted font-medium tracking-wide">AVEXA · Aviroop's AI</span>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={handleClearChat}
              className="p-1 rounded text-muted hover:text-red hover:bg-bg/50 transition-colors"
              title="Clear chat"
              aria-label="Clear chat"
            >
              <Trash2 size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-muted hover:text-text hover:bg-bg/50 transition-colors"
              title="Close panel (⌘I)"
            >
              <PanelRightClose size={16} />
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4 text-sm scroll-smooth min-h-0 editor-scroll" tabIndex={0}>
          {chatHistory.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              {msg.role === 'assistant' && (
                <span className="text-[12px] font-semibold tracking-wider text-[var(--avexa)] mb-1 ml-1">AVEXA</span>
              )}
              {msg.role === 'user' && (
                <span className="text-[12px] font-semibold tracking-wider text-muted mb-1 mr-1">You</span>
              )}
              <div className={`max-w-[90%] min-w-0 p-2 rounded-lg leading-relaxed break-words ${msg.role === 'user' ? 'bg-accent text-bg font-medium' : 'bg-bg border border-border shadow-sm'}`}>
                {msg.role === 'assistant' ? (
                  <div className="text-sm break-words [&_p]:my-1.5 [&_ul]:my-1.5 [&_ol]:my-1.5 [&_pre]:my-2 [&_code]:bg-muted/30 [&_code]:px-1 [&_code]:rounded">
                    <ReactMarkdown
                      components={{
                        a: ({ href, children, ...props }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent underline underline-offset-2 break-all cursor-pointer hover:brightness-125 hover:text-accent/90 hover:bg-accent/10 rounded px-0.5 -mx-0.5 transition-colors"
                            {...props}
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {linkifyRawUrls(msg.content)}
                    </ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-muted animate-pulse">
              <Bot size={14} />
              <span className="text-[10px] uppercase tracking-tighter">AI is thinking...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat box */}
        <div className="p-4 pt-0 shrink-0">
          <form onSubmit={handleSendMessage} className="border border-border rounded-xl bg-bg/50 flex flex-col focus-within:border-accent/50 transition-colors">
            <div className="p-3">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                placeholder="Type a message..."
                className="w-full bg-transparent border-0 rounded text-sm focus:outline-none resize-none placeholder:text-muted min-h-[60px]"
              />
            </div>
            <div className="relative flex justify-between items-center px-3 pb-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowModelModal((v) => !v)}
                  className="text-[10px] font-bold text-text tracking-widest px-2 py-0.5 rounded border border-border bg-bg cursor-pointer hover:bg-bg/80 transition-colors"
                >
                  gpt-oss-120b
                </button>
                <AnimatePresence>
                  {showModelModal && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      className="absolute bottom-full left-0 mb-2 z-50 bg-card border border-border rounded-lg shadow-xl p-3 min-w-[178px] max-w-[200px] text-left"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p className="text-xs font-medium text-text">OpenAI's gpt-oss-120b</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                type="submit"
                disabled={!chatInput.trim() || isTyping}
                className="p-2 bg-accent text-bg rounded-lg hover:brightness-110 disabled:opacity-50 transition-all shrink-0 shadow-lg shadow-accent/20"
              >
                <Send size={14} />
              </button>
            </div>
          </form>
          <div className="mt-2 flex justify-between items-center text-[10px] text-muted/60 px-1 font-medium">
            <span className="flex items-center gap-1"><Command size={10} /> + Enter to send</span>
            <span className="flex items-center gap-1"><Command size={10} /> + I to toggle</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}