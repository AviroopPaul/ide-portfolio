// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import {
  ArrowRight, FileText, User, FileJson, Terminal, ExternalLink, Sparkles, Code, X, Linkedin, Github,
  Layers, Zap, Server, Database, Box, Boxes, Cloud, Link2, Workflow, Bot, Brain, Cpu, Video,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const { data } = usePortfolio();
  const navigate = useNavigate();
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  const profile = data?.profile ?? {};
  const fullStackIconMap = {
    'React.js': Layers,
    'Next.js': Zap,
    'Python': Code,
    'FastAPI': Server,
    'PostgreSQL': Database,
    'MongoDB': Database,
    'Docker': Box,
    'Kubernetes': Boxes,
    'Google Cloud Platform': Cloud,
  };
  const aiLlmIconMap = {
    'LangChain': Link2,
    'LangGraph': Workflow,
    'Google ADK': Bot,
    'Gemini API': Sparkles,
    'OpenAI API': Brain,
    'LiteLLM': Cpu,
    'LiveKit': Video,
    'LLMs': Brain,
  };
  const fullStackList = Array.isArray(data?.fullStackCapabilities)
    ? data.fullStackCapabilities
    : (data?.skills ?? []).filter(s => s?.category === 'Frontend' || s?.category === 'Data & Infra').map(s => s?.name).filter(Boolean);
  const aiLlmList = Array.isArray(data?.aiLlmExpertise)
    ? data.aiLlmExpertise
    : (data?.skills ?? []).filter(s => s?.category === 'Backend & AI' || s?.category === 'Languages').map(s => s?.name).filter(Boolean);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setPhotoModalOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const sections = [
    { id: 'projects', label: 'Work & Projects', desc: 'Full Stack + AI apps', icon: <FileJson className="text-yellow" />, path: '/projects' },
    { id: 'about', label: 'Tech Stack', desc: 'Skills & Experience', icon: <User className="text-purple" />, path: '/about' },
    { id: 'contact', label: 'Connect', desc: 'Let\'s collaborate', icon: <Terminal className="text-green" />, path: '/contact' },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row gap-8 items-center md:items-start border-b border-border pb-8"
      >
        <button
          type="button"
          onClick={() => setPhotoModalOpen(true)}
          className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full bg-card border-4 border-accent/20 flex items-center justify-center overflow-hidden shadow-xl relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg"
        >
          <img
            src="/good_pic_reduced.jpg"
            alt={profile.name ?? 'Profile'}
            className="w-full h-full object-cover object-[center_70%] group-hover:scale-110 transition-transform duration-500"
          />
        </button>

        <div className="text-center md:text-left space-y-4">
            <div>
                <h1 className="text-2xl md:text-4xl font-bold mb-2 tracking-tight">
                {profile.name ?? ''}
                </h1>
                <h2 className="text-base md:text-xl text-accent font-mono flex items-center justify-center md:justify-start gap-2">
                {profile.role ?? ''}
                </h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-muted max-w-xl">
                 {profile.bio ?? ''}
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                {profile.linkedin && (
                  <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-card border border-border rounded hover:border-accent hover:text-accent transition-colors flex items-center gap-2 text-sm">
                      <Linkedin size={16} /> LinkedIn
                  </a>
                )}
                {profile.github && (
                  <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-card border border-border rounded hover:border-accent hover:text-accent transition-colors flex items-center gap-2 text-sm">
                      <Github size={16} /> GitHub
                  </a>
                )}
                {profile.resume && (
                <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="resume-neon-btn relative inline-flex items-center gap-2 text-sm px-4 py-2 rounded bg-card">
                  <svg className="resume-border-svg" viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden>
                    <defs>
                      <linearGradient id="resume-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00d4ff" />
                        <stop offset="25%" stopColor="#38bdf8" />
                        <stop offset="50%" stopColor="#1e40af" />
                        <stop offset="75%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#00d4ff" />
                      </linearGradient>
                      <filter id="resume-glow">
                        <feGaussianBlur stdDeviation="0.5" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <rect className="resume-border-path" x="1" y="1" width="98" height="34" rx="4" ry="4" fill="none" stroke="url(#resume-gradient)" strokeWidth="2" filter="url(#resume-glow)" />
                  </svg>
                  <span className="relative z-10 flex items-center gap-2">
                    <FileText size={16} /> Resume
                  </span>
                </a>
            )}
            </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {photoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80"
            onClick={() => setPhotoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden bg-card border border-border shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/good_pic_reduced.jpg"
                alt={profile.name ?? 'Profile'}
                className="w-full h-full object-cover object-[center_70%]"
              />
              <button
                type="button"
                onClick={() => setPhotoModalOpen(false)}
                className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4 text-muted">
            <FileText size={20} />
            <span className="font-bold uppercase tracking-wider text-sm">README.md</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sections.map((section) => (
                <button 
                    key={section.id}
                    onClick={() => navigate(section.path)}
                    className="group text-left bg-card p-6 rounded-lg border border-border hover:border-accent hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <div className="mb-4 p-3 bg-bg rounded-md w-fit group-hover:bg-accent/10 transition-colors">
                            {section.icon}
                        </div>
                        <h3 className="text-base md:text-lg font-bold mb-1 group-hover:text-accent transition-colors flex items-center gap-2">
                            {section.label} <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </h3>
                        <p className="text-xs text-muted leading-relaxed">{section.desc}</p>
                    </div>
                </button>
            ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border pt-8">
          <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted flex items-center gap-2">
                  <Code size={16} className="text-purple" /> Full Stack Capabilities
              </h3>
              <div className="grid grid-cols-2 gap-2">
                  {fullStackList.map(name => {
                    const Icon = fullStackIconMap[name] ?? Code;
                    return (
                      <div key={name} className="bg-card p-2 rounded text-xs border border-border hover:border-purple/30 transition-colors flex items-center gap-2">
                        <Icon size={14} className="shrink-0 text-purple/80" />
                        <span>{name}</span>
                      </div>
                    );
                  })}
              </div>
          </div>
          <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted flex items-center gap-2">
                  <Sparkles size={16} className="text-accent" /> AI Expertise
              </h3>
              <div className="grid grid-cols-2 gap-2">
                  {aiLlmList.map(name => {
                    const Icon = aiLlmIconMap[name] ?? Sparkles;
                    return (
                      <div key={name} className="bg-card p-2 rounded text-xs border border-border hover:border-accent/30 transition-colors flex items-center gap-2">
                        <Icon size={14} className="shrink-0 text-accent/80" />
                        <span>{name}</span>
                      </div>
                    );
                  })}
              </div>
          </div>
      </div>
    </div>
  );
};

export default Home;
