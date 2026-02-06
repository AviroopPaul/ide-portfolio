/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

  const [isAdmin, setIsAdmin] = useState(() => {
     return localStorage.getItem('isAdmin') === 'true';
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const login = (password) => {
    // Simple mock auth
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const updateProfile = (newProfile) => {
    setData(prev => ({ ...prev, profile: newProfile }));
  };

  const updateSkills = (newSkills) => {
    setData(prev => ({ ...prev, skills: newSkills }));
  };

  const addProject = (project) => {
    setData(prev => ({
      ...prev,
      projects: [...(prev.projects ?? []), { ...project, id: Date.now() }],
    }));
  };

  const updateProject = (updatedProject) => {
    setData(prev => ({
      ...prev,
      projects: (prev.projects ?? []).map(p => (p.id === updatedProject.id ? updatedProject : p)),
    }));
  };

  const removeProject = (id) => {
    setData(prev => ({
      ...prev,
      projects: (prev.projects ?? []).filter(p => p.id !== id),
    }));
  };

  const resetData = () => {
      setData(initialData);
  }

  return (
    <PortfolioContext.Provider value={{ 
      data, 
      isAdmin, 
      login, 
      logout, 
      updateProfile, 
      updateSkills, 
      addProject, 
      removeProject,
      updateProject,
      resetData,
      theme,
      toggleTheme
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
