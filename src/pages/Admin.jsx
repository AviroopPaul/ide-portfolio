import { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Save, Plus, Trash, Edit2 } from 'lucide-react';

const Admin = () => {
  const { data, isAdmin, logout, updateProfile, addProject, removeProject, updateProject, resetData } = usePortfolio();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  // Local state for forms
  const [profileForm, setProfileForm] = useState(data.profile);
  const [projectForm, setProjectForm] = useState({ title: '', description: '', tech: '', link: '', github: '' });
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    setProfileForm(data.profile);
  }, [data.profile]);

  if (!isAdmin) {
    navigate('/login');
    return null;
  }

  const handleProfileSave = () => {
    updateProfile(profileForm);
    alert('Profile updated!');
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const techArray = projectForm.tech.split(',').map(t => t.trim()).filter(t => t);
    
    if (editingProject) {
        updateProject({ ...projectForm, id: editingProject.id, tech: techArray });
        setEditingProject(null);
    } else {
        addProject({ ...projectForm, tech: techArray });
    }
    setProjectForm({ title: '', description: '', tech: '', link: '', github: '' });
  };

  const handleEditClick = (project) => {
      setEditingProject(project);
      setProjectForm({ ...project, tech: (project.tech ?? []).join(', ') });
      setActiveTab('projects');
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple">admin.config</h2>
        <div className="flex gap-2">
            <button onClick={resetData} className="px-3 py-1 text-sm border border-red text-red rounded hover:bg-red hover:text-bg">Reset Data</button>
            <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-2 px-3 py-1 bg-card border border-border rounded hover:text-red">
            <LogOut size={16} /> Logout
            </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b border-border">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 border-b-2 ${activeTab === 'profile' ? 'border-accent text-accent' : 'border-transparent text-muted'}`}
        >
          Profile
        </button>
        <button 
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 border-b-2 ${activeTab === 'projects' ? 'border-accent text-accent' : 'border-transparent text-muted'}`}
        >
          Projects
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="max-w-2xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm text-muted mb-1">Name</label>
                <input 
                    value={profileForm.name ?? ''} 
                    onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                    className="w-full bg-card border border-border p-2 rounded text-text" 
                />
            </div>
             <div>
                <label className="block text-sm text-muted mb-1">Role</label>
                <input 
                    value={profileForm.role ?? ''} 
                    onChange={e => setProfileForm({...profileForm, role: e.target.value})}
                    className="w-full bg-card border border-border p-2 rounded text-text" 
                />
            </div>
            <div className="md:col-span-2">
                <label className="block text-sm text-muted mb-1">Bio</label>
                <textarea 
                    value={profileForm.bio ?? ''} 
                    onChange={e => setProfileForm({...profileForm, bio: e.target.value})}
                    className="w-full bg-card border border-border p-2 rounded text-text h-32" 
                />
            </div>
             <div>
                <label className="block text-sm text-muted mb-1">Email</label>
                <input 
                    value={profileForm.email ?? ''} 
                    onChange={e => setProfileForm({...profileForm, email: e.target.value})}
                    className="w-full bg-card border border-border p-2 rounded text-text" 
                />
            </div>
             <div>
                <label className="block text-sm text-muted mb-1">Phone</label>
                <input 
                    value={profileForm.phone ?? ''} 
                    onChange={e => setProfileForm({...profileForm, phone: e.target.value})}
                    className="w-full bg-card border border-border p-2 rounded text-text" 
                />
            </div>
             <div>
                <label className="block text-sm text-muted mb-1">Website</label>
                <input 
                    value={profileForm.website ?? ''} 
                    onChange={e => setProfileForm({...profileForm, website: e.target.value})}
                    className="w-full bg-card border border-border p-2 rounded text-text" 
                />
            </div>
             <div>
                <label className="block text-sm text-muted mb-1">Location</label>
                <input 
                    value={profileForm.location ?? ''} 
                    onChange={e => setProfileForm({...profileForm, location: e.target.value})}
                    className="w-full bg-card border border-border p-2 rounded text-text" 
                />
            </div>
             <div>
                <label className="block text-sm text-muted mb-1">GitHub (Display)</label>
                <input 
                    value={profileForm.github ?? ''} 
                    onChange={e => setProfileForm({...profileForm, github: e.target.value})}
                    className="w-full bg-card border border-border p-2 rounded text-text" 
                />
            </div>
             <div>
                <label className="block text-sm text-muted mb-1">LinkedIn (Display)</label>
                <input 
                    value={profileForm.linkedin ?? ''} 
                    onChange={e => setProfileForm({...profileForm, linkedin: e.target.value})}
                    className="w-full bg-card border border-border p-2 rounded text-text" 
                />
            </div>
          </div>
          <button onClick={handleProfileSave} className="flex items-center gap-2 bg-green text-bg px-4 py-2 rounded font-bold hover:brightness-110">
            <Save size={16} /> Save Profile
          </button>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
                <h3 className="font-bold text-yellow">{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                <form onSubmit={handleProjectSubmit} className="space-y-4 bg-card p-4 rounded border border-border">
                    <input 
                        placeholder="Title" 
                        value={projectForm.title}
                        onChange={e => setProjectForm({...projectForm, title: e.target.value})}
                        className="w-full bg-bg p-2 rounded border border-border"
                        required
                    />
                    <textarea 
                        placeholder="Description" 
                        value={projectForm.description}
                        onChange={e => setProjectForm({...projectForm, description: e.target.value})}
                        className="w-full bg-bg p-2 rounded border border-border"
                        required
                    />
                    <input 
                        placeholder="Tech Stack (comma separated)" 
                        value={projectForm.tech}
                        onChange={e => setProjectForm({...projectForm, tech: e.target.value})}
                        className="w-full bg-bg p-2 rounded border border-border"
                    />
                     <div className="grid grid-cols-2 gap-2">
                         <input 
                            placeholder="GitHub Link" 
                            value={projectForm.github}
                            onChange={e => setProjectForm({...projectForm, github: e.target.value})}
                            className="w-full bg-bg p-2 rounded border border-border"
                        />
                         <input 
                            placeholder="Live Link" 
                            value={projectForm.link}
                            onChange={e => setProjectForm({...projectForm, link: e.target.value})}
                            className="w-full bg-bg p-2 rounded border border-border"
                        />
                     </div>
                    <div className="flex gap-2">
                        <button type="submit" className="flex-1 bg-accent text-bg py-2 rounded font-bold hover:brightness-110 flex items-center justify-center gap-2">
                            {editingProject ? <Save size={16}/> : <Plus size={16}/>} {editingProject ? 'Update' : 'Add'}
                        </button>
                        {editingProject && (
                            <button type="button" onClick={() => { setEditingProject(null); setProjectForm({ title: '', description: '', tech: '', link: '', github: '' }); }} className="px-4 py-2 bg-muted/20 rounded hover:bg-muted/40">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="space-y-4">
                <h3 className="font-bold text-text">Existing Projects</h3>
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                    {(data.projects ?? []).map(project => (
                        <div key={project.id} className="bg-card p-3 rounded border border-border flex justify-between items-start">
                            <div>
                                <div className="font-bold">{project.title}</div>
                                <div className="text-xs text-muted truncate max-w-[200px]">{project.description}</div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEditClick(project)} className="text-accent hover:text-white"><Edit2 size={16} /></button>
                                <button onClick={() => removeProject(project.id)} className="text-red hover:text-white"><Trash size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Admin;