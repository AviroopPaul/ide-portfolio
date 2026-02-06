import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommandPalette({ isOpen, onClose, items }) {
  const [query, setQuery] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  const filtered = items.filter((item) => {
    const text = `${item.label} ${item.name || ''} ${item.path || ''}`.toLowerCase();
    return text.includes(query.trim().toLowerCase());
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setHighlightIndex(0);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setHighlightIndex((i) => Math.min(Math.max(0, i), filtered.length - 1));
  }, [filtered.length, query]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === 'Enter' && filtered[highlightIndex]) {
        e.preventDefault();
        selectItem(filtered[highlightIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, filtered, highlightIndex]);

  const selectItem = (item) => {
    if (item.path) {
      navigate(item.path);
    }
    if (item.onSelect) {
      item.onSelect();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-xl rounded-2xl bg-card border border-border shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search row */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <Search size={20} className="text-muted shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="flex-1 bg-transparent border-0 text-text text-base placeholder:text-muted focus:outline-none focus:ring-0"
              autoComplete="off"
            />
            <kbd className="hidden sm:inline text-[10px] text-muted bg-bg/80 px-2 py-1 rounded border border-border">
              ⌘ + K
            </kbd>
          </div>

          {/* Tiles */}
          <div className="p-4 max-h-[50vh] overflow-y-auto" ref={listRef}>
            {filtered.length === 0 ? (
              <p className="text-sm text-muted text-center py-6">No results</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {filtered.map((item, index) => (
                  <button
                    key={item.path || item.id || index}
                    type="button"
                    onClick={() => selectItem(item)}
                    onMouseEnter={() => setHighlightIndex(index)}
                    className={`group flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all text-left min-h-[80px] ${
                      index === highlightIndex
                        ? 'bg-accent/15 border-accent/50 text-accent'
                        : 'bg-bg/50 border-border text-text hover:bg-bg hover:border-muted'
                    }`}
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-card border border-border text-muted group-hover:text-accent">
                      {item.icon}
                    </span>
                    <span className="text-xs font-medium text-center leading-tight">
                      {item.label || item.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
