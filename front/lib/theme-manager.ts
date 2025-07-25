// Theme Manager for MornGPT with custom theme support
export interface CustomTheme {
  id: string
  name: string
  description: string
  author: string
  version: string
  category: 'professional' | 'creative' | 'minimal' | 'colorful' | 'custom'
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
    success: string
    warning: string
    error: string
    info: string
  }
  fonts: {
    primary: string
    secondary: string
    mono: string
  }
  borderRadius: string
  shadows: {
    small: string
    medium: string
    large: string
  }
  animations: {
    duration: string
    easing: string
  }
}

export interface ThemeExtension {
  id: string
  name: string
  description: string
  author: string
  version: string
  theme: CustomTheme
  dependencies?: string[]
  enabled: boolean
}

// Built-in themes
export const builtInThemes: CustomTheme[] = [
  {
    id: 'default-light',
    name: 'Default Light',
    description: 'Clean and modern light theme',
    author: 'MornGPT',
    version: '1.0.0',
    category: 'professional',
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#8b5cf6',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6'
    },
    fonts: {
      primary: 'Inter, system-ui, sans-serif',
      secondary: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace'
    },
    borderRadius: '0.5rem',
    shadows: {
      small: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      medium: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      large: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
    },
    animations: {
      duration: '0.2s',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  {
    id: 'default-dark',
    name: 'Default Dark',
    description: 'Elegant dark theme for night usage',
    author: 'MornGPT',
    version: '1.0.0',
    category: 'professional',
    colors: {
      primary: '#60a5fa',
      secondary: '#94a3b8',
      accent: '#a78bfa',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      border: '#334155',
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171',
      info: '#60a5fa'
    },
    fonts: {
      primary: 'Inter, system-ui, sans-serif',
      secondary: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace'
    },
    borderRadius: '0.5rem',
    shadows: {
      small: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
      medium: '0 4px 6px -1px rgb(0 0 0 / 0.4)',
      large: '0 10px 15px -3px rgb(0 0 0 / 0.4)'
    },
    animations: {
      duration: '0.2s',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    description: 'Calming ocean-inspired theme',
    author: 'MornGPT',
    version: '1.0.0',
    category: 'creative',
    colors: {
      primary: '#0ea5e9',
      secondary: '#0284c7',
      accent: '#06b6d4',
      background: '#f0f9ff',
      surface: '#e0f2fe',
      text: '#0c4a6e',
      textSecondary: '#0369a1',
      border: '#bae6fd',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626',
      info: '#0ea5e9'
    },
    fonts: {
      primary: 'Inter, system-ui, sans-serif',
      secondary: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace'
    },
    borderRadius: '0.75rem',
    shadows: {
      small: '0 1px 3px 0 rgb(14 165 233 / 0.1)',
      medium: '0 4px 6px -1px rgb(14 165 233 / 0.1)',
      large: '0 10px 15px -3px rgb(14 165 233 / 0.1)'
    },
    animations: {
      duration: '0.3s',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    description: 'Warm and energetic sunset theme',
    author: 'MornGPT',
    version: '1.0.0',
    category: 'creative',
    colors: {
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#fb923c',
      background: '#fff7ed',
      surface: '#fed7aa',
      text: '#9a3412',
      textSecondary: '#c2410c',
      border: '#fdba74',
      success: '#16a34a',
      warning: '#ca8a04',
      error: '#dc2626',
      info: '#2563eb'
    },
    fonts: {
      primary: 'Inter, system-ui, sans-serif',
      secondary: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace'
    },
    borderRadius: '1rem',
    shadows: {
      small: '0 1px 3px 0 rgb(249 115 22 / 0.1)',
      medium: '0 4px 6px -1px rgb(249 115 22 / 0.1)',
      large: '0 10px 15px -3px rgb(249 115 22 / 0.1)'
    },
    animations: {
      duration: '0.25s',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
]

export class ThemeManager {
  private static instance: ThemeManager
  private currentTheme: CustomTheme
  private customThemes: Map<string, CustomTheme> = new Map()
  private extensions: Map<string, ThemeExtension> = new Map()

  private constructor() {
    this.currentTheme = builtInThemes[0]
    this.loadCustomThemes()
    this.loadExtensions()
  }

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager()
    }
    return ThemeManager.instance
  }

  // Get all available themes
  getAllThemes(): CustomTheme[] {
    return [...builtInThemes, ...Array.from(this.customThemes.values())]
  }

  // Get theme by ID
  getTheme(id: string): CustomTheme | undefined {
    return builtInThemes.find(t => t.id === id) || this.customThemes.get(id)
  }

  // Set current theme
  setTheme(id: string): boolean {
    const theme = this.getTheme(id)
    if (theme) {
      this.currentTheme = theme
      this.applyTheme(theme)
      this.saveCurrentTheme()
      return true
    }
    return false
  }

  // Get current theme
  getCurrentTheme(): CustomTheme {
    return this.currentTheme
  }

  // Add custom theme
  addCustomTheme(theme: CustomTheme): void {
    this.customThemes.set(theme.id, theme)
    this.saveCustomThemes()
  }

  // Remove custom theme
  removeCustomTheme(id: string): boolean {
    if (this.customThemes.has(id)) {
      this.customThemes.delete(id)
      this.saveCustomThemes()
      return true
    }
    return false
  }

  // Install theme extension
  installExtension(extension: ThemeExtension): void {
    this.extensions.set(extension.id, extension)
    this.customThemes.set(extension.theme.id, extension.theme)
    this.saveExtensions()
    this.saveCustomThemes()
  }

  // Uninstall theme extension
  uninstallExtension(id: string): boolean {
    const extension = this.extensions.get(id)
    if (extension) {
      this.extensions.delete(id)
      this.customThemes.delete(extension.theme.id)
      this.saveExtensions()
      this.saveCustomThemes()
      return true
    }
    return false
  }

  // Get all extensions
  getExtensions(): ThemeExtension[] {
    return Array.from(this.extensions.values())
  }

  // Apply theme to DOM
  private applyTheme(theme: CustomTheme): void {
    const root = document.documentElement
    
    // Apply colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })

    // Apply fonts
    Object.entries(theme.fonts).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value)
    })

    // Apply other properties
    root.style.setProperty('--border-radius', theme.borderRadius)
    root.style.setProperty('--shadow-small', theme.shadows.small)
    root.style.setProperty('--shadow-medium', theme.shadows.medium)
    root.style.setProperty('--shadow-large', theme.shadows.large)
    root.style.setProperty('--animation-duration', theme.animations.duration)
    root.style.setProperty('--animation-easing', theme.animations.easing)

    // Update CSS custom properties for Tailwind
    this.updateTailwindVariables(theme)
  }

  // Update Tailwind CSS variables
  private updateTailwindVariables(theme: CustomTheme): void {
    const root = document.documentElement
    
    // Map theme colors to Tailwind variables
    const tailwindMap = {
      'primary': theme.colors.primary,
      'secondary': theme.colors.secondary,
      'accent': theme.colors.accent,
      'background': theme.colors.background,
      'surface': theme.colors.surface,
      'text': theme.colors.text,
      'text-secondary': theme.colors.textSecondary,
      'border': theme.colors.border,
      'success': theme.colors.success,
      'warning': theme.colors.warning,
      'error': theme.colors.error,
      'info': theme.colors.info
    }

    Object.entries(tailwindMap).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
  }

  // Save current theme to localStorage
  private saveCurrentTheme(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('morngpt_current_theme', this.currentTheme.id)
    }
  }

  // Load current theme from localStorage
  private loadCurrentTheme(): void {
    if (typeof window !== 'undefined') {
      const savedThemeId = localStorage.getItem('morngpt_current_theme')
      if (savedThemeId) {
        this.setTheme(savedThemeId)
      }
    }
  }

  // Save custom themes to localStorage
  private saveCustomThemes(): void {
    if (typeof window !== 'undefined') {
      const themes = Array.from(this.customThemes.values())
      localStorage.setItem('morngpt_custom_themes', JSON.stringify(themes))
    }
  }

  // Load custom themes from localStorage
  private loadCustomThemes(): void {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('morngpt_custom_themes')
      if (saved) {
        try {
          const themes: CustomTheme[] = JSON.parse(saved)
          themes.forEach(theme => {
            this.customThemes.set(theme.id, theme)
          })
        } catch (error) {
          console.error('Failed to load custom themes:', error)
        }
      }
    }
  }

  // Save extensions to localStorage
  private saveExtensions(): void {
    if (typeof window !== 'undefined') {
      const extensions = Array.from(this.extensions.values())
      localStorage.setItem('morngpt_extensions', JSON.stringify(extensions))
    }
  }

  // Load extensions from localStorage
  private loadExtensions(): void {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('morngpt_extensions')
      if (saved) {
        try {
          const extensions: ThemeExtension[] = JSON.parse(saved)
          extensions.forEach(extension => {
            this.extensions.set(extension.id, extension)
            this.customThemes.set(extension.theme.id, extension.theme)
          })
        } catch (error) {
          console.error('Failed to load extensions:', error)
        }
      }
    }
  }

  // Initialize theme manager
  initialize(): void {
    this.loadCurrentTheme()
    this.applyTheme(this.currentTheme)
  }

  // Export theme for sharing
  exportTheme(id: string): string | null {
    const theme = this.getTheme(id)
    if (theme) {
      return JSON.stringify(theme, null, 2)
    }
    return null
  }

  // Import theme from JSON
  importTheme(json: string): boolean {
    try {
      const theme: CustomTheme = JSON.parse(json)
      if (theme.id && theme.name && theme.colors) {
        this.addCustomTheme(theme)
        return true
      }
    } catch (error) {
      console.error('Failed to import theme:', error)
    }
    return false
  }
}

// Export singleton instance
export const themeManager = ThemeManager.getInstance() 