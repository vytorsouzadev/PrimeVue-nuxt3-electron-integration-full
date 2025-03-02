import { defineStore } from 'pinia';

export interface ThemeConfig {
  id: string;
  name: string;
  primevueTheme?: string; // Tema oficial do PrimeVue
  background: string;
  selectedBackground: string;
  textColor: string;
  linkColor: string;
  linkHoverColor: string;
  isDark: boolean;
}

export const useThemeStore = defineStore('theme', {
  state: () => ({
    themes: [
      // Tema Indigo (semelhante ao Tailwind/NuxtUI)
      {
        id: 'indigo',
        name: 'Indigo',
        primevueTheme: 'lara-light-indigo',
        background: '#ffffff',
        selectedBackground: '#EEF2FF',
        textColor: '#1F2937',
        linkColor: '#4F46E5',
        linkHoverColor: '#4338CA',
        isDark: false
      },
      // Tema Azul (PrimeVue default)
      {
        id: 'blue',
        name: 'Blue',
        primevueTheme: 'lara-light-blue',
        background: '#ffffff',
        selectedBackground: '#EFF6FF',
        textColor: '#1E293B',
        linkColor: '#3B82F6',
        linkHoverColor: '#2563EB',
        isDark: false
      },
      // Tema Verde (Nuxt)
      {
        id: 'green',
        name: 'Green',
        primevueTheme: 'lara-light-teal',
        background: '#ffffff',
        selectedBackground: '#ECFDF5',
        textColor: '#1F2937',
        linkColor: '#10B981',
        linkHoverColor: '#059669',
        isDark: false
      },
      // Tema Dark Indigo
      {
        id: 'dark-indigo',
        name: 'Dark Indigo',
        primevueTheme: 'lara-dark-indigo',
        background: '#1E1E1E',
        selectedBackground: '#312E81',
        textColor: '#FFFFFF',
        linkColor: '#818CF8',
        linkHoverColor: '#A5B4FC',
        isDark: true
      },
      // Tema Dark Blue (PrimeVue dark)
      {
        id: 'dark-blue',
        name: 'Dark Blue',
        primevueTheme: 'lara-dark-blue',
        background: '#0F172A',
        selectedBackground: '#1E3A8A',
        textColor: '#FFFFFF',
        linkColor: '#60A5FA',
        linkHoverColor: '#93C5FD',
        isDark: true
      },
      // Seus outros temas...
    ],
    currentThemeId: 'blue'
  }),
  
  getters: {
    currentTheme: (state) => state.themes.find(theme => theme.id === state.currentThemeId) || state.themes[1]
  },
  
  actions: {
    setTheme(themeId: string) {
      // Check if theme exists
      const themeExists = this.themes.some(theme => theme.id === themeId);
      if (!themeExists) {
        console.error(`Theme with id "${themeId}" not found. Using default theme.`);
        this.currentThemeId = 'blue';
        return;
      }
      
      this.currentThemeId = themeId;
      this.applyTheme();
      
      // Save preference to localStorage
      localStorage.setItem('app-theme', themeId);
    },
    
    applyTheme() {
      const theme = this.currentTheme;
      
      // Set CSS variables
      document.documentElement.style.setProperty('--app-background', theme.background);
      document.documentElement.style.setProperty('--app-selected-background', theme.selectedBackground);
      document.documentElement.style.setProperty('--app-text-color', theme.textColor);
      document.documentElement.style.setProperty('--app-link-color', theme.linkColor);
      document.documentElement.style.setProperty('--app-link-hover-color', theme.linkHoverColor);
      
      // Alterar para o tema PrimeVue correspondente se definido
      if (theme.primevueTheme) {
        this.loadPrimeVueTheme(theme.primevueTheme);
      }
      
      // Add/remove dark mode class on body
      if (theme.isDark) {
        document.documentElement.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
      }
    },
    
    // Método para carregar temas oficiais do PrimeVue dinamicamente
    async loadPrimeVueTheme(themeName) {
      try {
        // Remover qualquer tema PrimeVue existente
        const existingLinks = document.querySelectorAll('link[data-primevue-theme]');
        existingLinks.forEach(link => link.remove());
        
        // Adicionar o novo tema
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://cdn.jsdelivr.net/npm/primevue@3/resources/themes/${themeName}/theme.css`;
        link.setAttribute('data-primevue-theme', themeName);
        document.head.appendChild(link);
      } catch (error) {
        console.error('Erro ao carregar tema PrimeVue:', error);
      }
    },
    
    addCustomTheme(theme: ThemeConfig) {
      // Make sure ID doesn't already exist
      if (this.themes.some(t => t.id === theme.id)) {
        console.error(`Theme with id "${theme.id}" already exists.`);
        return false;
      }
      
      this.themes.push(theme);
      return true;
    },
    
    initTheme() {
      // Check localStorage for saved theme
      const savedTheme = localStorage.getItem('app-theme');
      if (savedTheme && this.themes.some(theme => theme.id === savedTheme)) {
        this.currentThemeId = savedTheme;
      } else {
        // Se não houver tema salvo, use a preferência do sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.currentThemeId = prefersDark ? 'dark-blue' : 'blue';
      }
      
      this.applyTheme();
      
      // Adicione um listener para mudanças na preferência do sistema
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('app-theme')) {
          this.currentThemeId = e.matches ? 'dark-blue' : 'blue';
          this.applyTheme();
        }
      });
    }
  }
});
