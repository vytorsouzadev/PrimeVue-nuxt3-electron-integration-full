import { defineStore } from 'pinia';

// List of valid PrimeVue theme names for reference
const VALID_PRIMEVUE_THEMES = [
  // Light themes
  'lara-light-blue',
  'lara-light-indigo',
  'lara-light-purple',
  'lara-light-teal',
  'lara-light-amber',
  'lara-light-red',
  'lara-light-green',
  'lara-light-cyan',
  'lara-light-lime',
  'lara-light-orange',
  'lara-light-pink',
  'lara-light-yellow',
  // Add others as needed
   // Dark themes
   'lara-dark-blue',
   'lara-dark-indigo',
   'lara-dark-purple',
   'lara-dark-teal',
   'lara-dark-amber',
   'lara-dark-red',
   'lara-dark-green',
   'lara-dark-cyan',
   'lara-dark-lime',
   'lara-dark-orange',
   'lara-dark-pink',
   'lara-dark-yellow',
   
   // Other PrimeVue themes
   'saga-blue',
   'saga-green',
   'saga-orange',
   'saga-purple',
   'vela-blue',
   'vela-green',
   'vela-orange',
   'vela-purple',
   'arya-blue',
   'arya-green',
   'arya-orange',
   'arya-purple',
   
   // Material themes
   'md-light-indigo',
   'md-light-deeppurple',
   'md-dark-indigo',
   'md-dark-deeppurple',
   
   // Bootstrap themes
   'bootstrap4-light-blue',
   'bootstrap4-light-purple',
   'bootstrap4-dark-blue',
   'bootstrap4-dark-purple',
];

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
     
      // Nova opção: Purple
      {
        id: 'purple',
        name: 'Purple',
        primevueTheme: 'lara-light-purple',
        background: '#ffffff',
        selectedBackground: '#F5F3FF',
        textColor: '#1F2937',
        linkColor: '#8B5CF6',
        linkHoverColor: '#7C3AED',
        isDark: false
      },
   
      // Nova opção: Amber
      {
        id: 'amber',
        name: 'Amber',
        primevueTheme: 'lara-light-amber',
        background: '#ffffff',
        selectedBackground: '#FFFBEB',
        textColor: '#1F2937',
        linkColor: '#F59E0B',
        linkHoverColor: '#D97706',
        isDark: false
      },
      // Nova opção: Red
      {
        id: 'red',
        name: 'Red',
        primevueTheme: 'lara-light-red',
        background: '#ffffff',
        selectedBackground: '#FEF2F2',
        textColor: '#1F2937',
        linkColor: '#EF4444',
        linkHoverColor: '#DC2626',
        isDark: false
      },

        // Light themes - additional options
  
  // Emerald (similar to teal but with different hues)
  {
    id: 'emerald',
    name: 'Emerald',
    primevueTheme: 'lara-light-teal', // closest match in PrimeVue
    background: '#ffffff',
    selectedBackground: '#ECFDF5', 
    textColor: '#1F2937',
    linkColor: '#10B981', // emerald-500
    linkHoverColor: '#059669', // emerald-600
    isDark: false
  },
  
  // Lime theme
  {
    id: 'lime',
    name: 'Lime',
    primevueTheme: 'lara-light-lime',
    background: '#ffffff',
    selectedBackground: '#F7FEE7',
    textColor: '#1F2937',
    linkColor: '#84CC16', // lime-500
    linkHoverColor: '#65A30D', // lime-600
    isDark: false
  },
  
  // Orange theme
  {
    id: 'orange',
    name: 'Orange',
    primevueTheme: 'lara-light-orange',
    background: '#ffffff',
    selectedBackground: '#FFF7ED',
    textColor: '#1F2937',
    linkColor: '#F97316', // orange-500
    linkHoverColor: '#EA580C', // orange-600
    isDark: false
  },
  
  // Yellow theme
  {
    id: 'yellow',
    name: 'Yellow',
    primevueTheme: 'lara-light-yellow',
    background: '#ffffff',
    selectedBackground: '#FEFCE8',
    textColor: '#1F2937',
    linkColor: '#EAB308', // yellow-500
    linkHoverColor: '#CA8A04', // yellow-600
    isDark: false
  },
  
  // Cyan theme
  {
    id: 'cyan',
    name: 'Cyan',
    primevueTheme: 'lara-light-cyan',
    background: '#ffffff',
    selectedBackground: '#ECFEFF',
    textColor: '#1F2937',
    linkColor: '#06B6D4', // cyan-500
    linkHoverColor: '#0891B2', // cyan-600
    isDark: false
  },
  
  // Sky theme
  {
    id: 'sky',
    name: 'Sky',
    primevueTheme: 'lara-light-blue', // closest match
    background: '#ffffff',
    selectedBackground: '#F0F9FF',
    textColor: '#1F2937',
    linkColor: '#0EA5E9', // sky-500
    linkHoverColor: '#0284C7', // sky-600
    isDark: false
  },
  
  // Pink theme
  {
    id: 'pink',
    name: 'Pink',
    primevueTheme: 'lara-light-pink',
    background: '#ffffff',
    selectedBackground: '#FDF2F8',
    textColor: '#1F2937',
    linkColor: '#EC4899', // pink-500
    linkHoverColor: '#DB2777', // pink-600
    isDark: false
  },
  
  // Rose theme
  {
    id: 'rose',
    name: 'Rose',
    primevueTheme: 'lara-light-pink', // closest match
    background: '#ffffff',
    selectedBackground: '#FFF1F2',
    textColor: '#1F2937',
    linkColor: '#F43F5E', // rose-500
    linkHoverColor: '#E11D48', // rose-600
    isDark: false
  },
      // Nova opção: Dark Red
      {
        id: 'dark-red',
        name: 'Dark Red',
        primevueTheme: 'lara-dark-red',
        background: '#1A1A1A',
        selectedBackground: '#991B1B',
        textColor: '#FFFFFF',
        linkColor: '#F87171',
        linkHoverColor: '#FCA5A5',
        isDark: true
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
         // Nova opção: Dark Purple
         {
          id: 'dark-purple',
          name: 'Dark Purple',
          primevueTheme: 'lara-dark-purple',
          background: '#1E1E1E',
          selectedBackground: '#5B21B6',
          textColor: '#FFFFFF',
          linkColor: '#A78BFA',
          linkHoverColor: '#C4B5FD',
          isDark: true
        }
    ],
    currentThemeId: 'blue',
    themeLoaded: false
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
      
      // Set flag to indicate theme change is in progress
      this.themeLoaded = false;
      
      // Alterar para o tema PrimeVue correspondente se definido
      if (theme.primevueTheme) {
        this.loadPrimeVueTheme(theme.primevueTheme)
          .then(() => {
            // Mark theme as loaded
            this.themeLoaded = true;
          })
          .catch(error => {
            console.error('Error loading PrimeVue theme:', error);
            // Try to load a fallback theme if the specified one fails
            this.loadPrimeVueTheme(theme.isDark ? 'lara-dark-blue' : 'lara-light-blue')
              .then(() => {
                this.themeLoaded = true;
              });
          });
      }
      
      // Add/remove dark mode class on body
      if (theme.isDark) {
        document.documentElement.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
      }
    },
    
    // Improved method to load PrimeVue themes with proper error handling
    async loadPrimeVueTheme(themeName) {
      return new Promise((resolve, reject) => {
        try {
          // Check if theme name is valid
          if (!VALID_PRIMEVUE_THEMES.includes(themeName)) {
            console.warn(`Theme "${themeName}" may not be a valid PrimeVue theme. Continuing anyway.`);
          }
          
          // Remover qualquer tema PrimeVue existente
          const existingLinks = document.querySelectorAll('link[data-primevue-theme]');
          existingLinks.forEach(link => link.remove());
          
          // Adicionar o novo tema
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = `https://cdn.jsdelivr.net/npm/primevue@3/resources/themes/${themeName}/theme.css`;
          link.setAttribute('data-primevue-theme', themeName);
          
          // Set event handlers to detect when the theme is loaded
          link.onload = () => resolve(true);
          link.onerror = (err) => {
            console.error(`Failed to load theme: ${themeName}`, err);
            reject(err);
          };
          
          document.head.appendChild(link);
        } catch (error) {
          console.error('Erro ao carregar tema PrimeVue:', error);
          reject(error);
        }
      });
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