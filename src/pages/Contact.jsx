import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Github, Linkedin, MapPin, Phone, Globe } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

/** All contact content from portfolio data (initialData.profile). */
const Contact = () => {
  const { data } = usePortfolio();
  const profile = data?.profile ?? {};

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl"
    >
      <h2 className="text-2xl font-bold mb-6 text-red">contact.sh</h2>
      
      <div className="bg-bg border border-border p-4 rounded font-mono text-sm mb-8">
        <div className="text-muted">#!/bin/bash</div>
        <div className="mt-2"><span className="text-purple">echo</span> <span className="text-green">"Initiating communication protocols..."</span></div>
        <div className="mt-2"><span className="text-purple">curl</span> -X POST {profile.email ?? ''}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profile.email && (
          <a href={`mailto:${profile.email}`} className="bg-card p-4 rounded border border-border hover:border-accent transition-colors flex items-center gap-4 group">
            <div className="bg-bg p-2 rounded group-hover:bg-accent/10 transition-colors"><Mail size={24} className="text-accent"/></div>
            <div>
              <div className="text-xs text-muted">Email</div>
              <div className="font-bold">{profile.email}</div>
            </div>
          </a>
        )}

        {profile.phone && (
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="bg-card p-4 rounded border border-border hover:border-accent transition-colors flex items-center gap-4 group">
            <div className="bg-bg p-2 rounded group-hover:bg-accent/10 transition-colors"><Phone size={24} className="text-accent"/></div>
            <div>
              <div className="text-xs text-muted">Phone</div>
              <div className="font-bold">{profile.phone}</div>
            </div>
          </a>
        )}

        {profile.github && (
          <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer" className="bg-card p-4 rounded border border-border hover:border-accent transition-colors flex items-center gap-4 group">
            <div className="bg-bg p-2 rounded group-hover:bg-text/10 transition-colors"><Github size={24} className="text-text"/></div>
            <div>
              <div className="text-xs text-muted">GitHub</div>
              <div className="font-bold">{profile.github.replace('github.com/', '')}</div>
            </div>
          </a>
        )}

        {profile.linkedin && (
          <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="bg-card p-4 rounded border border-border hover:border-accent transition-colors flex items-center gap-4 group">
            <div className="bg-bg p-2 rounded group-hover:bg-accent/10 transition-colors"><Linkedin size={24} className="text-accent"/></div>
            <div>
              <div className="text-xs text-muted">LinkedIn</div>
              <div className="font-bold">{profile.linkedin.replace('linkedin.com/in/', '')}</div>
            </div>
          </a>
        )}

        {profile.website && (
          <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer" className="bg-card p-4 rounded border border-border hover:border-accent transition-colors flex items-center gap-4 group">
            <div className="bg-bg p-2 rounded group-hover:bg-accent/10 transition-colors"><Globe size={24} className="text-accent"/></div>
            <div>
              <div className="text-xs text-muted">Website</div>
              <div className="font-bold">{profile.website}</div>
            </div>
          </a>
        )}
        
        {profile.location && (
          <div className="bg-card p-4 rounded border border-border flex items-center gap-4 opacity-75">
            <div className="bg-bg p-2 rounded"><MapPin size={24} className="text-red"/></div>
            <div>
              <div className="text-xs text-muted">Location</div>
              <div className="font-bold">{profile.location}</div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Contact;
