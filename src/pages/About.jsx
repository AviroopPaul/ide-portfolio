import { usePortfolio } from '../context/PortfolioContext';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const About = () => {
  const { data } = usePortfolio();
  const profile = data?.profile ?? {};
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];
  const skills = data?.skills ?? [];

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const cat = skill?.category ?? 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <div className="max-w-3xl">
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         className="space-y-10"
       >
         <h2 className="text-2xl font-bold mb-6 text-purple">about_me.md</h2>
         
         <div className="bg-card p-6 rounded border border-border">
             <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-muted">
                 {`# Bio\n\n${profile.bio ?? ''}\n\nI am currently based in ${profile.location ?? ''}.`}
             </p>
         </div>

         {experience.length > 0 && (
           <>
             <h3 className="text-xl font-bold mb-4 text-yellow">Experience</h3>
             <div className="space-y-6">
               {experience.map((job, i) => (
                 <div key={i} className="bg-card p-5 rounded border border-border">
                   <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                     <span className="font-bold text-accent">{job.title}</span>
                     <span className="text-xs text-muted">{job.period}</span>
                   </div>
                   <div className="text-sm text-muted mb-2">{job.company} · {job.location}</div>
                   <ul className="list-disc list-inside space-y-1 text-sm text-muted">
                     {(job.highlights ?? []).map((h, j) => (
                       <li key={j}>{h}</li>
                     ))}
                   </ul>
                 </div>
               ))}
             </div>
           </>
         )}

         {education.length > 0 && (
           <>
             <h3 className="text-xl font-bold mb-4 text-yellow">Education</h3>
             <div className="space-y-4">
               {education.map((ed, i) => (
                 <div key={i} className="bg-card p-4 rounded border border-border">
                   <div className="font-bold">{ed.degree}</div>
                   <div className="text-sm text-muted">{ed.institution}, {ed.location}</div>
                   <div className="text-xs text-accent mt-1">{ed.details} · {ed.period}</div>
                 </div>
               ))}
             </div>
           </>
         )}

         <h3 className="text-xl font-bold mb-4 text-yellow">Technical Skills</h3>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {Object.entries(skillsByCategory).map(([category, skills]) => (
                 <div key={category}>
                     <h4 className="text-accent mb-2 border-b border-border pb-1">{category}</h4>
                     <ul className="space-y-2">
                         {skills.map(skill => (
                             <li key={skill.name} className="flex items-center justify-between text-sm">
                                 <span>{skill.name}</span>
                                 <div className="w-24 h-1 bg-bg rounded overflow-hidden">
                                     <div 
                                       className="h-full bg-green" 
                                       style={{ width: `${skill.level}%` }}
                                     ></div>
                                 </div>
                             </li>
                         ))}
                     </ul>
                 </div>
             ))}
         </div>
       </motion.div>
    </div>
  );
};

export default About;
