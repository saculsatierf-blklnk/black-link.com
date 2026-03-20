"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProjectContextType {
  clinicName: string;
  setClinicName: (name: string) => void;
  location: string;
  setLocation: (loc: string) => void;
  ceoName: string;
  setCeoName: (name: string) => void;
  instagram: string;
  setInstagram: (link: string) => void;
  contactNumber: string;
  setContactNumber: (number: string) => void;
  selectedProtocols: string[];
  toggleProtocol: (id: string) => void;
  addCustomProtocol: (protocolo: string) => void;
  expansionPillars: string[];
  toggleExpansion: (id: string) => void;
  typography: string;
  setTypography: (font: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  isUnlocked: boolean;
  unlockSite: () => void;
  resetExperience: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [clinicName, setClinicName] = useState('');
  const [location, setLocation] = useState('');
  const [ceoName, setCeoName] = useState('');
  const [instagram, setInstagram] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
  const [expansionPillars, setExpansionPillars] = useState<string[]>([]);
  const [typography, setTypography] = useState('dominio'); // Set inicial
  const [theme, setTheme] = useState('obsidian');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = sessionStorage.getItem('blacklink_dna_session');
    if (saved) {
      const data = JSON.parse(saved);
      setClinicName(data.clinicName || '');
      setLocation(data.location || '');
      setCeoName(data.ceoName || '');
      setInstagram(data.instagram || '');
      setContactNumber(data.contactNumber || '');
      setSelectedProtocols(data.selectedProtocols || []);
      setExpansionPillars(data.expansionPillars || []);
      setTypography(data.typography || 'dominio');
      setTheme(data.theme || 'obsidian');
      setIsUnlocked(data.isUnlocked || false);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    // Matriz de Poder Tipográfico
    const fontSets: Record<string, { heading: string, body: string }> = {
      dominio: { heading: '"Oswald", sans-serif', body: '"Inter", sans-serif' },
      heranca: { heading: '"DM Serif Display", serif', body: '"Montserrat", sans-serif' },
      precisao: { heading: '"Playfair Display", serif', body: '"Open Sans", sans-serif' },
      ruptura: { heading: '"Bebas Neue", sans-serif', body: '"Geist", sans-serif' },
      soberania: { heading: '"Cormorant Garamond", serif', body: '"Lato", sans-serif' },
      vanguarda: { heading: '"Syne", sans-serif', body: '"Outfit", sans-serif' }
    };
    
    if (fontSets[typography]) {
      root.style.setProperty('--font-heading-tool', fontSets[typography].heading);
      root.style.setProperty('--font-body-tool', fontSets[typography].body);
    }

    const themes: Record<string, { base: string, surface: string, main: string, muted: string, accent: string }> = {
      obsidian: { base: '#030303', surface: '#0a0a0a', main: '#e5e7eb', muted: 'rgba(255, 255, 255, 0.4)', accent: '#C5A059' },
      chrome: { base: '#080808', surface: '#121212', main: '#f8fafc', muted: 'rgba(248, 250, 252, 0.4)', accent: '#E2E8F0' },
      alabaster: { base: '#F9F7F2', surface: '#F2EFE9', main: '#1A1A1A', muted: 'rgba(26, 26, 26, 0.5)', accent: '#8E6D45' },
      emerald: { base: '#05120B', surface: '#081c11', main: '#F0F0F0', muted: 'rgba(240, 240, 240, 0.4)', accent: '#E2E2E2' },
      royal: { base: '#0A0F1A', surface: '#0f172a', main: '#FFFFFF', muted: 'rgba(255, 255, 255, 0.4)', accent: '#C0C0C0' },
      vantablack: { base: '#000000', surface: '#050505', main: '#a1a1aa', muted: 'rgba(161, 161, 170, 0.4)', accent: '#ffffff' }
    };

    if (themes[theme]) {
      root.style.setProperty('--bg-base', themes[theme].base);
      root.style.setProperty('--bg-surface', themes[theme].surface);
      root.style.setProperty('--text-main', themes[theme].main);
      root.style.setProperty('--text-muted', themes[theme].muted);
      root.style.setProperty('--color-accent', themes[theme].accent);
    }
  }, [typography, theme]);

  const toggleProtocol = (id: string) => {
    setSelectedProtocols(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const addCustomProtocol = (protocolo: string) => {
    const limpo = protocolo.trim();
    if (limpo && !selectedProtocols.includes(limpo)) {
      setSelectedProtocols(prev => [...prev, limpo]);
    }
  };

  const toggleExpansion = (id: string) => {
    setExpansionPillars(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const unlockSite = () => {
    setIsUnlocked(true);
    sessionStorage.setItem('blacklink_dna_session', JSON.stringify({
      clinicName, location, ceoName, instagram, contactNumber, selectedProtocols, expansionPillars, typography, theme, isUnlocked: true
    }));
  };

  const resetExperience = () => {
    sessionStorage.removeItem('blacklink_dna_session');
    setClinicName(''); setLocation(''); setCeoName(''); setInstagram(''); setContactNumber('');
    setSelectedProtocols([]); setExpansionPillars([]);
    setIsUnlocked(false);
  };

  if (!mounted) return null;

  return (
    <ProjectContext.Provider value={{ 
      clinicName, setClinicName, location, setLocation, ceoName, setCeoName, instagram, setInstagram, contactNumber, setContactNumber,
      selectedProtocols, toggleProtocol, addCustomProtocol, expansionPillars, toggleExpansion, typography, setTypography, theme, setTheme,
      isUnlocked, unlockSite, resetExperience 
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('O contexto deve ser usado dentro do provedor');
  return context;
};
