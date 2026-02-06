import { usePortfolio } from '../context/PortfolioContext';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ExternalLink, Github, Folder } from 'lucide-react';

const GITHUB_PROFILE_BASE = 'https://github.com/AviroopPaul';

/** All project content from portfolio data (initialData.projects). */
const Projects = () => {
  const { data } = usePortfolio();
  const projects = data?.projects ?? [];
  const githubProfileUrl = data?.profile?.github
    ? (data.profile.github.startsWith('http') ? data.profile.github : `https://${data.profile.github}`)
    : GITHUB_PROFILE_BASE;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Folder className="text-yellow" /> 
          <span className="text-text">~/projects</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.a
            key={project?.id ?? index}
            href={project?.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors block cursor-pointer no-underline text-inherit"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
               {project?.link && project.link !== '#' && (
                 <span
                   role="link"
                   tabIndex={0}
                   className="text-muted hover:text-text"
                   onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.link, '_blank'); }}
                   onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(project.link, '_blank'); } }}
                 >
                   <ExternalLink size={20} aria-label="Open live demo" />
                 </span>
               )}
            </div>

            <h3 className="text-xl font-bold text-accent mb-2">{project?.title ?? ''}</h3>
            <p className="text-muted mb-4 text-sm leading-relaxed">{project?.description ?? ''}</p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {(project?.tech ?? []).map(tech => (
                <span key={tech} className="text-xs px-2 py-1 bg-bg rounded text-purple">
                  {tech}
                </span>
              ))}
            </div>
          </motion.a>
        ))}

        {/* Find more on GitHub — empty tab with GitHub icon */}
        <motion.a
          href={githubProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: (projects.length || 0) * 0.1 }}
          className="group relative bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors flex flex-col items-center justify-center min-h-[180px] no-underline text-inherit"
        >
          <Github size={32} className="text-muted group-hover:text-accent mb-3 transition-colors" />
          <span className="text-accent font-medium">Find more on his Github</span>
        </motion.a>
      </div>
      
      <div className="mt-8 text-muted text-sm font-mono">
        <span className="text-green">✓</span> {projects.length} projects loaded successfully.
      </div>
    </div>
  );
};

export default Projects;
