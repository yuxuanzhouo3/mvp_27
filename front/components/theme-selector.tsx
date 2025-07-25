'use client'

import React, { useState, useEffect } from 'react'
import { ChevronDown, Palette, Download, Upload, Plus, Trash2, Star, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import { 
  themeManager, 
  CustomTheme, 
  ThemeExtension, 
  builtInThemes 
} from '@/lib/theme-manager'

interface ThemeSelectorProps {
  currentTheme?: string
  onThemeChange?: (themeId: string) => void
  className?: string
}

export function ThemeSelector({ currentTheme, onThemeChange, className }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState(currentTheme || 'default-light')
  const [allThemes, setAllThemes] = useState<CustomTheme[]>([])
  const [extensions, setExtensions] = useState<ThemeExtension[]>([])
  const [showThemeCreator, setShowThemeCreator] = useState(false)
  const [showExtensionManager, setShowExtensionManager] = useState(false)

  useEffect(() => {
    // Initialize theme manager
    themeManager.initialize()
    
    // Load themes and extensions
    setAllThemes(themeManager.getAllThemes())
    setExtensions(themeManager.getExtensions())
    
    // Set current theme
    const current = themeManager.getCurrentTheme()
    setSelectedTheme(current.id)
  }, [])

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId)
    setIsOpen(false)
    
    if (themeManager.setTheme(themeId)) {
      onThemeChange?.(themeId)
    }
  }

  const getCurrentTheme = () => {
    return themeManager.getTheme(selectedTheme) || builtInThemes[0]
  }

  const getThemePreview = (theme: CustomTheme) => {
    return (
      <div 
        className="w-16 h-10 rounded-md border-2 border-gray-200 dark:border-gray-700 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: theme.colors.background }}
          />
        </div>
      </div>
    )
  }

  const exportTheme = (themeId: string) => {
    const themeJson = themeManager.exportTheme(themeId)
    if (themeJson) {
      const blob = new Blob([themeJson], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${themeId}.json`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        if (themeManager.importTheme(content)) {
          setAllThemes(themeManager.getAllThemes())
        }
      }
      reader.readAsText(file)
    }
  }

  const removeCustomTheme = (themeId: string) => {
    if (themeManager.removeCustomTheme(themeId)) {
      setAllThemes(themeManager.getAllThemes())
      if (selectedTheme === themeId) {
        handleThemeSelect('default-light')
      }
    }
  }

  const groupedThemes = allThemes.reduce((acc, theme) => {
    const category = theme.category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(theme)
    return acc
  }, {} as Record<string, CustomTheme[]>)

  return (
    <div className={className}>
      {/* Theme Selector Button */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between bg-white dark:bg-[#565869] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
          >
            <div className="flex items-center space-x-2">
              {getThemePreview(getCurrentTheme())}
              <span>{getCurrentTheme().name}</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-80 p-0" align="end">
          <DropdownMenuLabel className="px-4 py-2 border-b">
            <div className="flex items-center justify-between">
              <span>Select Theme</span>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowThemeCreator(true)}
                  className="h-8 px-2"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowExtensionManager(true)}
                  className="h-8 px-2"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DropdownMenuLabel>
          
          <div className="max-h-96 overflow-y-auto">
            {Object.entries(groupedThemes).map(([category, themes]) => (
              <div key={category}>
                <DropdownMenuLabel className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {category}
                </DropdownMenuLabel>
                {themes.map((theme) => (
                  <DropdownMenuItem
                    key={theme.id}
                    onClick={() => handleThemeSelect(theme.id)}
                    className="px-4 py-3 cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        {getThemePreview(theme)}
                        <div className="flex flex-col">
                          <span className="font-medium">{theme.name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {theme.description}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {theme.author !== 'MornGPT' && (
                          <Badge variant="secondary" className="text-xs">
                            Custom
                          </Badge>
                        )}
                        {selectedTheme === theme.id && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            ))}
          </div>
          
          <DropdownMenuSeparator />
          
          <div className="p-2 space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                const input = document.createElement('input')
                input.type = 'file'
                input.accept = '.json'
                input.onchange = (e) => importTheme(e as any)
                input.click()
              }}
            >
              <Upload className="h-4 w-4 mr-2" />
              Import Theme
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => exportTheme(selectedTheme)}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Current Theme
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Creator Dialog */}
      <Dialog open={showThemeCreator} onOpenChange={setShowThemeCreator}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Custom Theme</DialogTitle>
          </DialogHeader>
          <ThemeCreator onClose={() => setShowThemeCreator(false)} />
        </DialogContent>
      </Dialog>

      {/* Extension Manager Dialog */}
      <Dialog open={showExtensionManager} onOpenChange={setShowExtensionManager}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Theme Extensions</DialogTitle>
          </DialogHeader>
          <ExtensionManager 
            extensions={extensions}
            onClose={() => setShowExtensionManager(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Theme Creator Component
function ThemeCreator({ onClose }: { onClose: () => void }) {
  const [theme, setTheme] = useState<Partial<CustomTheme>>({
    id: '',
    name: '',
    description: '',
    author: '',
    version: '1.0.0',
    category: 'custom',
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
  })

  const handleSave = () => {
    if (theme.id && theme.name && theme.colors) {
      const newTheme = theme as CustomTheme
      themeManager.addCustomTheme(newTheme)
      onClose()
    }
  }

  const updateColor = (key: keyof CustomTheme['colors'], value: string) => {
    setTheme(prev => ({
      ...prev,
      colors: {
        ...prev.colors!,
        [key]: value
      }
    }))
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="theme-id">Theme ID</Label>
              <Input
                id="theme-id"
                value={theme.id}
                onChange={(e) => setTheme(prev => ({ ...prev, id: e.target.value }))}
                placeholder="my-custom-theme"
              />
            </div>
            <div>
              <Label htmlFor="theme-name">Theme Name</Label>
              <Input
                id="theme-name"
                value={theme.name}
                onChange={(e) => setTheme(prev => ({ ...prev, name: e.target.value }))}
                placeholder="My Custom Theme"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="theme-description">Description</Label>
            <Textarea
              id="theme-description"
              value={theme.description}
              onChange={(e) => setTheme(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your theme..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="theme-author">Author</Label>
              <Input
                id="theme-author"
                value={theme.author}
                onChange={(e) => setTheme(prev => ({ ...prev, author: e.target.value }))}
                placeholder="Your Name"
              />
            </div>
            <div>
              <Label htmlFor="theme-category">Category</Label>
              <select
                id="theme-category"
                value={theme.category}
                onChange={(e) => setTheme(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="professional">Professional</option>
                <option value="creative">Creative</option>
                <option value="minimal">Minimal</option>
                <option value="colorful">Colorful</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="colors" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(theme.colors || {}).map(([key, value]) => (
              <div key={key}>
                <Label htmlFor={`color-${key}`} className="capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id={`color-${key}`}
                    value={value}
                    onChange={(e) => updateColor(key as keyof CustomTheme['colors'], e.target.value)}
                    placeholder="#000000"
                  />
                  <div
                    className="w-10 h-10 rounded border"
                    style={{ backgroundColor: value }}
                  />
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="space-y-4">
          <div className="p-4 rounded-lg border" style={{ backgroundColor: theme.colors?.background }}>
            <h3 className="font-bold mb-2" style={{ color: theme.colors?.text }}>
              Theme Preview
            </h3>
            <p style={{ color: theme.colors?.textSecondary }}>
              This is how your theme will look
            </p>
            <div className="mt-4 space-y-2">
              <Button 
                style={{ backgroundColor: theme.colors?.primary, color: '#ffffff' }}
              >
                Primary Button
              </Button>
              <Button 
                variant="outline"
                style={{ 
                  borderColor: theme.colors?.border,
                  color: theme.colors?.text
                }}
              >
                Secondary Button
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!theme.id || !theme.name}>
          Save Theme
        </Button>
      </div>
    </div>
  )
}

// Extension Manager Component
function ExtensionManager({ 
  extensions, 
  onClose 
}: { 
  extensions: ThemeExtension[]
  onClose: () => void 
}) {
  const [showInstallDialog, setShowInstallDialog] = useState(false)
  const [extensionJson, setExtensionJson] = useState('')

  const installExtension = () => {
    try {
      const extension: ThemeExtension = JSON.parse(extensionJson)
      themeManager.installExtension(extension)
      onClose()
    } catch (error) {
      console.error('Failed to install extension:', error)
    }
  }

  const uninstallExtension = (id: string) => {
    themeManager.uninstallExtension(id)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Installed Extensions</h3>
        <Button onClick={() => setShowInstallDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Install Extension
        </Button>
      </div>
      
      <div className="grid gap-4">
        {extensions.map((extension) => (
          <Card key={extension.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{extension.name}</span>
                    <Badge variant="secondary">v{extension.version}</Badge>
                  </CardTitle>
                  <CardDescription>{extension.description}</CardDescription>
                  <p className="text-sm text-gray-500">by {extension.author}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => uninstallExtension(extension.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Theme:</span>
                <span className="text-sm">{extension.theme.name}</span>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {extensions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Palette className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No extensions installed</p>
            <p className="text-sm">Install theme extensions to add custom themes</p>
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button onClick={onClose}>Close</Button>
      </div>

      {/* Install Extension Dialog */}
      <Dialog open={showInstallDialog} onOpenChange={setShowInstallDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Install Extension</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="extension-json">Extension JSON</Label>
              <Textarea
                id="extension-json"
                value={extensionJson}
                onChange={(e) => setExtensionJson(e.target.value)}
                placeholder="Paste extension JSON here..."
                rows={10}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowInstallDialog(false)}>
                Cancel
              </Button>
              <Button onClick={installExtension}>
                Install
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 