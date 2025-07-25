/**
 * Copyright © 2025 Yuxuan Zhou. All rights reserved.
 * 
 * This file is part of the MornGPT Homepage application.
 * Unauthorized copying, distribution, or use is strictly prohibited.
 */

"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Switch } from "@/components/ui/switch"
import {
  TrendingUp,
  Briefcase,
  Code,
  Shield,
  Heart,
  Bot,
  Home,
  Users,
  GraduationCap,
  Plane,
  Search,
  Shirt,
  UtensilsCrossed,
  Palette,
  ShieldCheck,
  Sparkles,
  Globe,
  ChevronDown,
  Send,
  Settings,
  Paperclip,
  MessageSquare,
  ChevronRight,
  Plus,
  Folder,
  FolderOpen,
  Trash2,
  Edit3,
  Check,
  X,
  ChevronLeft,
  Menu,
  Zap,
  Brain,
  Lightbulb,
  Target,
  LogIn,
  UserPlus,
  LogOut,
  User,
  Crown,
  CreditCard,
  Lock,
  Eye,
  EyeOff,
  Copy,
  History,
  MapPin,
  Sun,
  Moon,
  Share,
  Download,
  Star,
  ChevronUp,
  Bell,
  PaletteIcon,
  HelpCircle,
  ShieldIcon,
  Key,
  Mail,
  Phone,
  Calendar,
  Globe2,
  Volume2,
  VolumeX,
  Save,
  AlertTriangle,
} from "lucide-react"

const mornGPTCategories = [
  {
    id: "a",
    name: "Growth Advisory",
    icon: TrendingUp,
    description: "Business development and market analysis",
    color: "bg-blue-500",
  },
  {
    id: "b",
    name: "Interview/Job",
    icon: Briefcase,
    description: "Career development and interview prep",
    color: "bg-green-500",
  },
  { id: "c", name: "AI Coder", icon: Code, description: "Advanced coding assistant", color: "bg-purple-500" },
  { id: "d", name: "Content Detection", icon: Shield, description: "Fake content verification", color: "bg-red-500" },
  { id: "e", name: "Medical Advice", icon: Heart, description: "Health consultation AI", color: "bg-pink-500" },
  {
    id: "h",
    name: "Multi-GPT",
    icon: Bot,
    description: "Orchestrates multiple AI models to solve complex problems by breaking them into specialized tasks",
    color: "bg-indigo-500",
  },
  { id: "o", name: "Housing", icon: Home, description: "Real estate and accommodation", color: "bg-orange-500" },
  {
    id: "p",
    name: "Person Matching",
    icon: Users,
    description: "Professional and personal matching",
    color: "bg-cyan-500",
  },
  {
    id: "q",
    name: "AI Teacher",
    icon: GraduationCap,
    description: "Personalized learning system",
    color: "bg-yellow-500",
  },
  { id: "r", name: "Travel Planning", icon: Plane, description: "Intelligent travel assistance", color: "bg-teal-500" },
  { id: "s", name: "Product Search", icon: Search, description: "Smart product recommendations", color: "bg-gray-500" },
  { id: "t", name: "Fashion", icon: Shirt, description: "Personalized styling advice", color: "bg-rose-500" },
  {
    id: "u",
    name: "Food & Dining",
    icon: UtensilsCrossed,
    description: "Restaurant and food discovery",
    color: "bg-amber-500",
  },
  {
    id: "w",
    name: "Content Generation",
    icon: Palette,
    description: "Creative content creation",
    color: "bg-violet-500",
  },
  { id: "z", name: "AI Protection", icon: ShieldCheck, description: "AI safety and security", color: "bg-slate-500" },
]

const externalModels = [
  { name: "GPT-3.5 Turbo", provider: "OpenAI", description: "Fast and efficient for most tasks", type: "free" },
  { name: "Claude 3 Haiku", provider: "Anthropic", description: "Quick responses with good reasoning", type: "free" },
  { name: "Gemini Flash", provider: "Google", description: "Multimodal capabilities", type: "free" },
  { name: "Llama 3.1 8B", provider: "Meta", description: "Open source and customizable", type: "free" },
  { name: "Mistral 7B", provider: "Mistral AI", description: "Efficient European model", type: "free" },
  { name: "Phi-3 Mini", provider: "Microsoft", description: "Compact but powerful", type: "free" },
  { name: "CodeLlama", provider: "Meta", description: "Specialized for coding tasks", type: "free" },
  {
    name: "GPT-4o Mini",
    provider: "OpenAI",
    price: "$0.15/1M tokens",
    description: "Affordable GPT-4 level performance",
    type: "popular",
  },
  {
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    price: "$3/1M tokens",
    description: "Best reasoning and analysis",
    type: "popular",
  },
  {
    name: "Gemini 1.5 Pro",
    provider: "Google",
    price: "$1.25/1M tokens",
    description: "Large context window",
    type: "popular",
  },
  {
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    price: "$10/1M tokens",
    description: "Most capable OpenAI model",
    type: "popular",
  },
  {
    name: "Claude 3 Opus",
    provider: "Anthropic",
    price: "$15/1M tokens",
    description: "Highest quality responses",
    type: "popular",
  },
]

const pricingPlans = [
  {
    name: "Basic",
    price: "$9.99",
    period: "month",
    features: ["Access to all MornGPT models", "100 Multi-GPT queries/month", "Basic support", "Chat history"],
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "month",
    features: [
      "Everything in Basic",
      "Unlimited Multi-GPT usage",
      "Priority access to new models",
      "Advanced analytics",
      "24/7 priority support",
      "Export conversations",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$49.99",
    period: "month",
    features: [
      "Everything in Pro",
      "Custom model training",
      "API access",
      "Team collaboration",
      "Advanced security",
      "Dedicated support",
    ],
  },
]

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  model?: string
  isMultiGPT?: boolean
  subTasks?: Array<{
    task: string
    model: string
    response: string
  }>
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  model: string
  modelType: string
  category: string
  lastUpdated: Date
  isModelLocked: boolean
}

interface AppUser {
  id: string
  email: string
  name: string
  isPro: boolean
  avatar?: string
  phone?: string
  bio?: string
  location?: string
  website?: string
  timezone?: string
  settings?: {
    theme: "light" | "dark" | "auto"
    language: string
    notifications: boolean
    soundEnabled: boolean
    autoSave: boolean
  }
}

interface BookmarkedMessage {
  id: string
  messageId: string
  chatId: string
  title: string
  content: string
  timestamp: Date
  customName?: string
}

export default function MornGPTHomepage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [selectedModelType, setSelectedModelType] = useState<string>("general")
  const [prompt, setPrompt] = useState<string>("")
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false)
  const [isPromptHistoryOpen, setIsPromptHistoryOpen] = useState(false)
  const [isAskGPTOpen, setIsAskGPTOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Welcome to MornGPT",
      messages: [],
      model: "General",
      modelType: "general",
      category: "general",
      lastUpdated: new Date(),
      isModelLocked: false,
    },
  ])
  const [currentChatId, setCurrentChatId] = useState("1")
  const [expandedFolders, setExpandedFolders] = useState<string[]>(["general"])
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [uploadError, setUploadError] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  
  // File upload limits
  const MAX_FILES = 20
  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB per file
  const MAX_TOTAL_SIZE = 50 * 1024 * 1024 // 50MB total
  const ALLOWED_FILE_TYPES = [
    'text/plain',
    'text/csv',
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/json',
    'application/xml',
    'text/markdown',
    'text/html'
  ]
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [editingChatId, setEditingChatId] = useState<string>("")
  const [editingTitle, setEditingTitle] = useState<string>("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(224) // 56 * 4 = 224px (w-56)
  const [appUser, setAppUser] = useState<AppUser | null>(null)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<(typeof pricingPlans)[0] | null>(null)
  const [authMode, setAuthMode] = useState<"login" | "signup" | "reset">("login")
  const [authForm, setAuthForm] = useState({ email: "", password: "", name: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [promptHistory, setPromptHistory] = useState<string[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [bookmarkedMessages, setBookmarkedMessages] = useState<BookmarkedMessage[]>([])
  const [jumpToScrollPosition, setJumpToScrollPosition] = useState(0)
  const [promptScrollPosition, setPromptScrollPosition] = useState(0)
  const [bookmarkScrollPosition, setBookmarkScrollPosition] = useState(0)
  const [sidebarScrollPosition, setSidebarScrollPosition] = useState(0)
  const [editingBookmarkId, setEditingBookmarkId] = useState<string>("")
  const [editingBookmarkName, setEditingBookmarkName] = useState<string>("")
  
  // Enhanced user profile state
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [showLogoutConfirmDialog, setShowLogoutConfirmDialog] = useState(false)
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false)
  const [showEnhancedDeleteDialog, setShowEnhancedDeleteDialog] = useState(false)
  const [deleteAccountStep, setDeleteAccountStep] = useState<"warning" | "confirmation" | "2fa" | "final">("warning")
  const [deleteConfirmationPhrase, setDeleteConfirmationPhrase] = useState("")
  const [userConfirmationInput, setUserConfirmationInput] = useState("")
  const [twoFACode, setTwoFACode] = useState("")
  const [generatedTwoFACode, setGeneratedTwoFACode] = useState("")
  const [accountDeletionDate, setAccountDeletionDate] = useState<Date | null>(null)
  const [userProfileForm, setUserProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    website: "",
    timezone: "UTC",
    language: "en",
  })
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileSaveStatus, setProfileSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle")
  
  // Combined settings state
  const [activeSettingsTab, setActiveSettingsTab] = useState("profile")

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const jumpToScrollRef = useRef<HTMLDivElement>(null)
  const promptScrollRef = useRef<HTMLDivElement>(null)
  const bookmarkScrollRef = useRef<HTMLDivElement>(null)
  const sidebarScrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isLoading])

  // Load user data and theme from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("morngpt_user")
    const savedTheme = localStorage.getItem("morngpt_theme")

    if (savedUser) {
      const user = JSON.parse(savedUser)
      setAppUser(user)
      // Load user's chat sessions
      const savedChats = localStorage.getItem(`morngpt_chats_${user.id}`)
      if (savedChats) {
        setChatSessions(JSON.parse(savedChats))
      }
      // Load bookmarked messages
      const savedBookmarks = localStorage.getItem(`morngpt_bookmarks_${user.id}`)
      if (savedBookmarks) {
        setBookmarkedMessages(JSON.parse(savedBookmarks))
      }
      
      // Apply user's saved theme preference
      if (user.settings?.theme) {
        applyTheme(user.settings.theme)
      }
    } else if (savedTheme) {
      // Fallback to legacy theme setting
      applyTheme(savedTheme as "light" | "dark" | "auto")
    }
  }, [])

  // Save chat sessions when they change
  useEffect(() => {
    if (appUser) {
      localStorage.setItem(`morngpt_chats_${appUser.id}`, JSON.stringify(chatSessions))
    }
  }, [chatSessions, appUser])

  // Save bookmarked messages when they change
  useEffect(() => {
    if (appUser) {
      localStorage.setItem(`morngpt_bookmarks_${appUser.id}`, JSON.stringify(bookmarkedMessages))
    }
  }, [bookmarkedMessages, appUser])

  // Update prompt history when current chat changes
  useEffect(() => {
    const currentChat = chatSessions.find((c) => c.id === currentChatId)
    if (currentChat) {
      const userPrompts = currentChat.messages
        .filter((msg) => msg.role === "user")
        .map((msg) => msg.content)
        .slice(-50) // Keep last 50 prompts instead of 10
        .reverse() // Reverse to show newest first
      setPromptHistory(userPrompts)
    }
  }, [currentChatId, chatSessions])

  // Handle sidebar resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return
      const newWidth = Math.max(200, Math.min(400, e.clientX))
      setSidebarWidth(newWidth)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem("morngpt_theme", newTheme ? "dark" : "light")

    if (newTheme) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const getSelectedModelDisplay = () => {
    if (selectedModelType === "general") {
      return "General"
    }
    if (selectedModelType === "morngpt" && selectedCategory) {
      const category = mornGPTCategories.find((c) => c.id === selectedCategory)
      return `${category?.name} (${selectedCategory.toUpperCase()}1)`
    }
    if (selectedModelType === "external" && selectedModel) {
      const model = externalModels.find((m) => m.name === selectedModel)
      if (model?.type === "free") {
        return `${model?.name} (Free)`
      }
      return `${model?.name} (${model?.price})`
    }
    return "General"
  }

  const getModelIcon = () => {
    if (selectedModelType === "general") {
      return <MessageSquare className="w-3 h-3" />
    }
    if (selectedModelType === "morngpt" && selectedCategory) {
      const category = mornGPTCategories.find((c) => c.id === selectedCategory)
      const IconComponent = category?.icon || MessageSquare
      return <IconComponent className="w-3 h-3" />
    }
    if (selectedModelType === "external") {
      return <Globe className="w-3 h-3" />
    }
    return <MessageSquare className="w-3 h-3" />
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const shareMessage = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "MornGPT Response",
          text: text,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      // Fallback to copying to clipboard
      copyToClipboard(text)
    }
  }

  const downloadMessage = (text: string, messageId: string) => {
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `morngpt-response-${messageId}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const bookmarkMessage = (message: Message) => {
    if (!appUser) return

    const bookmark: BookmarkedMessage = {
      id: Date.now().toString(),
      messageId: message.id,
      chatId: currentChatId,
      title: message.content.slice(0, 50) + "...",
      content: message.content,
      timestamp: new Date(),
      customName: `Bookmark ${bookmarkedMessages.length + 1}`,
    }

    setBookmarkedMessages((prev) => [bookmark, ...prev])
  }

  const removeBookmark = (bookmarkId: string) => {
    setBookmarkedMessages((prev) => prev.filter((b) => b.id !== bookmarkId))
  }

  const isMessageBookmarked = (messageId: string) => {
    return bookmarkedMessages.some((b) => b.messageId === messageId)
  }

  const startEditingBookmark = (bookmarkId: string, currentName: string) => {
    setEditingBookmarkId(bookmarkId)
    setEditingBookmarkName(currentName)
  }

  const saveBookmarkName = () => {
    setBookmarkedMessages((prev) =>
      prev.map((bookmark) =>
        bookmark.id === editingBookmarkId ? { ...bookmark, customName: editingBookmarkName } : bookmark,
      ),
    )
    setEditingBookmarkId("")
    setEditingBookmarkName("")
  }

  const cancelBookmarkEditing = () => {
    setEditingBookmarkId("")
    setEditingBookmarkName("")
  }

  const scrollJumpToMessages = (direction: "up" | "down") => {
    if (!jumpToScrollRef.current) return
    const scrollAmount = 100
    const currentScroll = jumpToScrollRef.current.scrollTop
    const newScroll = direction === "up" ? currentScroll - scrollAmount : currentScroll + scrollAmount
    jumpToScrollRef.current.scrollTo({ top: newScroll, behavior: "smooth" })
    setJumpToScrollPosition(newScroll)
  }

  const scrollPromptHistory = (direction: "up" | "down") => {
    if (!promptScrollRef.current) return
    const scrollAmount = 100
    const currentScroll = promptScrollRef.current.scrollTop
    const newScroll = direction === "up" ? currentScroll - scrollAmount : currentScroll + scrollAmount
    promptScrollRef.current.scrollTo({ top: newScroll, behavior: "smooth" })
    setPromptScrollPosition(newScroll)
  }

  const scrollBookmarks = (direction: "up" | "down") => {
    if (!bookmarkScrollRef.current) return
    const scrollAmount = 100
    const currentScroll = bookmarkScrollRef.current.scrollTop
    const newScroll = direction === "up" ? currentScroll - scrollAmount : currentScroll + scrollAmount
    bookmarkScrollRef.current.scrollTo({ top: newScroll, behavior: "smooth" })
    setBookmarkScrollPosition(newScroll)
  }

  const scrollSidebar = (direction: "up" | "down") => {
    if (!sidebarScrollRef.current) return
    const scrollAmount = 100
    const currentScroll = sidebarScrollRef.current.scrollTop
    const newScroll = direction === "up" ? currentScroll - scrollAmount : currentScroll + scrollAmount
    sidebarScrollRef.current.scrollTo({ top: newScroll, behavior: "smooth" })
    setSidebarScrollPosition(newScroll)
  }

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    if (authMode === "reset") {
      // Simulate password reset
      alert("Password reset link sent to your email!")
      setAuthMode("login")
      return
    }

    if (authMode === "signup") {
      // Simulate signup
      const newUser: AppUser = {
        id: Date.now().toString(),
        email: authForm.email,
        name: authForm.name,
        isPro: false,
        settings: {
          theme: "light",
          language: "en",
          notifications: true,
          soundEnabled: true,
          autoSave: true,
        },
      }
      setAppUser(newUser)
      localStorage.setItem("morngpt_user", JSON.stringify(newUser))
    } else {
      // Simulate login
      const existingUser: AppUser = {
        id: "user_" + authForm.email.replace("@", "_"),
        email: authForm.email,
        name: authForm.email.split("@")[0],
        isPro: false,
        settings: {
          theme: "light",
          language: "en",
          notifications: true,
          soundEnabled: true,
          autoSave: true,
        },
      }
      setAppUser(existingUser)
      localStorage.setItem("morngpt_user", JSON.stringify(existingUser))
    }
    setShowAuthDialog(false)
    setAuthForm({ email: "", password: "", name: "" })
  }

  const handleGoogleAuth = () => {
    // Simulate Google authentication
    const googleUser: AppUser = {
      id: "google_" + Date.now(),
      email: "user@gmail.com",
      name: "Google User",
      isPro: false,
      avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c",
      settings: {
        theme: "light",
        language: "en",
        notifications: true,
        soundEnabled: true,
        autoSave: true,
      },
    }
    setAppUser(googleUser)
    localStorage.setItem("morngpt_user", JSON.stringify(googleUser))
    setShowAuthDialog(false)
  }

  const handleLogout = () => {
    console.log("handleLogout called") // Debug log
    // Clear user state
    setAppUser(null)
    localStorage.removeItem("morngpt_user")

    // Clear all user-specific data
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("morngpt_chats_") || key.startsWith("morngpt_bookmarks_")) {
        localStorage.removeItem(key)
      }
    })

    // Reset to default state
    setChatSessions([
      {
        id: "1",
        title: "Welcome to MornGPT",
        messages: [],
        model: "General",
        modelType: "general",
        category: "general",
        lastUpdated: new Date(),
        isModelLocked: false,
      },
    ])
    setCurrentChatId("1")
    setMessages([])
    setPromptHistory([])
    setBookmarkedMessages([])

    // Close any open dialogs
    setShowSettingsDialog(false)
    setShowUpgradeDialog(false)
    setShowPaymentDialog(false)

    // Show success message
    alert("Successfully logged out!")
  }

  const handleUpgradeClick = (plan: (typeof pricingPlans)[0]) => {
    setSelectedPlan(plan)
    setShowUpgradeDialog(false)
    setShowPaymentDialog(true)
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    if (appUser && selectedPlan) {
      // Simulate payment processing
      const updatedUser = { ...appUser, isPro: true }
      setAppUser(updatedUser)
      localStorage.setItem("morngpt_user", JSON.stringify(updatedUser))
      setShowPaymentDialog(false)
      alert(`Successfully upgraded to ${selectedPlan.name} plan! Welcome to MornGPT Pro!`)
    }
  }

  const updateUserSettings = (newSettings: Partial<AppUser["settings"]>) => {
    if (appUser) {
      const updatedUser = {
        ...appUser,
        settings: { 
          theme: "auto" as const,
          language: "en",
          notifications: false,
          soundEnabled: false,
          autoSave: false,
          ...appUser.settings, 
          ...newSettings 
        },
      }
      setAppUser(updatedUser)
      localStorage.setItem("morngpt_user", JSON.stringify(updatedUser))
      
      // Apply theme changes immediately
      if (newSettings?.theme) {
        applyTheme(newSettings.theme)
      }
    }
  }

  // Enhanced theme application function
  const applyTheme = (theme: "light" | "dark" | "auto") => {
    let isDark = false
    
    if (theme === "auto") {
      // Check system preference
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    } else {
      isDark = theme === "dark"
    }
    
    setIsDarkMode(isDark)
    localStorage.setItem("morngpt_theme", theme)
    
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Enhanced user profile functions
  const openProfileDialog = () => {
    if (appUser) {
      setUserProfileForm({
        name: appUser.name,
        email: appUser.email,
        phone: appUser.phone || "",
        bio: appUser.bio || "",
        location: appUser.location || "",
        website: appUser.website || "",
        timezone: appUser.timezone || "UTC",
        language: appUser.settings?.language || "en",
      })
      setShowProfileDialog(true)
    }
  }

  const saveUserProfile = async () => {
    if (!appUser) return
    
    setProfileSaveStatus("saving")
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const updatedUser = {
        ...appUser,
        name: userProfileForm.name,
        email: userProfileForm.email,
        phone: userProfileForm.phone,
        bio: userProfileForm.bio,
        location: userProfileForm.location,
        website: userProfileForm.website,
        timezone: userProfileForm.timezone,
        settings: {
          theme: "auto" as const,
          language: userProfileForm.language,
          notifications: false,
          soundEnabled: false,
          autoSave: false,
          ...appUser.settings,
        },
      }
      
      setAppUser(updatedUser)
      localStorage.setItem("morngpt_user", JSON.stringify(updatedUser))
      setProfileSaveStatus("success")
      setIsEditingProfile(false)
      
      setTimeout(() => setProfileSaveStatus("idle"), 2000)
    } catch (error) {
      setProfileSaveStatus("error")
      setTimeout(() => setProfileSaveStatus("idle"), 3000)
    }
  }

  const confirmLogout = () => {
    console.log("confirmLogout called") // Debug log
    setShowLogoutConfirmDialog(true)
  }

  const confirmDeleteAccount = () => {
    setShowDeleteAccountDialog(true)
  }

  const deleteUserAccount = () => {
    if (appUser) {
      // Clear all user data
      localStorage.removeItem("morngpt_user")
      localStorage.removeItem(`morngpt_chats_${appUser.id}`)
      localStorage.removeItem(`morngpt_bookmarks_${appUser.id}`)
      localStorage.removeItem("morngpt_theme")
      
      // Store account for 90-day restoration period
      const deletionDate = new Date()
      const restorationData = {
        user: appUser,
        chats: chatSessions,
        bookmarks: bookmarkedMessages,
        deletionDate: deletionDate.toISOString(),
        restorationDeadline: new Date(deletionDate.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString()
      }
      localStorage.setItem(`morngpt_deleted_account_${appUser.id}`, JSON.stringify(restorationData))
      
      setAppUser(null)
      setChatSessions([])
      setBookmarkedMessages([])
      setShowDeleteAccountDialog(false)
      setShowEnhancedDeleteDialog(false)
      setDeleteAccountStep("warning")
      setDeleteConfirmationPhrase("")
      setUserConfirmationInput("")
      setTwoFACode("")
      setGeneratedTwoFACode("")
      setAccountDeletionDate(null)
    }
  }

  const startEnhancedDeleteAccount = () => {
    // Generate random confirmation phrase
    const phrases = [
      "DELETE MY ACCOUNT PERMANENTLY",
      "I UNDERSTAND THIS IS IRREVERSIBLE",
      "CONFIRM ACCOUNT DELETION NOW",
      "PERMANENTLY REMOVE ALL DATA",
      "FINAL CONFIRMATION TO DELETE"
    ]
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
    setDeleteConfirmationPhrase(randomPhrase)
    setUserConfirmationInput("")
    setDeleteAccountStep("warning")
    setShowEnhancedDeleteDialog(true)
  }

  const generateTwoFACode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedTwoFACode(code)
    setTwoFACode("")
    setDeleteAccountStep("2fa")
    return code
  }

  const verifyDeleteAccount = () => {
    if (userConfirmationInput.trim() === deleteConfirmationPhrase) {
      const code = generateTwoFACode()
      // In a real app, this would be sent via email/SMS
      console.log("2FA Code for deletion:", code)
    }
  }

  const confirmFinalDeletion = () => {
    if (twoFACode === generatedTwoFACode) {
      setDeleteAccountStep("final")
      setAccountDeletionDate(new Date())
    }
  }

  const restoreAccount = () => {
    if (appUser) {
      const restorationData = localStorage.getItem(`morngpt_deleted_account_${appUser.id}`)
      if (restorationData) {
        const data = JSON.parse(restorationData)
        const deadline = new Date(data.restorationDeadline)
        if (new Date() < deadline) {
          // Restore account
          setAppUser(data.user)
          setChatSessions(data.chats)
          setBookmarkedMessages(data.bookmarks)
          localStorage.setItem("morngpt_user", JSON.stringify(data.user))
          localStorage.setItem(`morngpt_chats_${data.user.id}`, JSON.stringify(data.chats))
          localStorage.setItem(`morngpt_bookmarks_${data.user.id}`, JSON.stringify(data.bookmarks))
          localStorage.removeItem(`morngpt_deleted_account_${appUser.id}`)
          setShowEnhancedDeleteDialog(false)
          setDeleteAccountStep("warning")
          setAccountDeletionDate(null)
        }
      }
    }
  }

  const simulateMultiGPTResponse = async (userPrompt: string): Promise<Message> => {
    const subTasks = [
      {
        task: "Analyze the problem structure",
        model: "AI Coder (C1)",
        response: "Breaking down the problem into logical components...",
      },
      {
        task: "Research relevant information",
        model: "Growth Advisory (A1)",
        response: "Gathering market insights and strategic considerations...",
      },
      {
        task: "Generate creative solutions",
        model: "Content Generation (W1)",
        response: "Creating innovative approaches and alternatives...",
      },
    ]

    return {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: `Multi-GPT Deep Analysis Complete!\n\nI've orchestrated multiple specialized AI models to provide comprehensive insights for: "${userPrompt}"\n\n${subTasks
        .map((task, i) => `${i + 1}. **${task.task}** (${task.model})\n   ${task.response}`)
        .join(
          "\n\n",
        )}\n\n**Final Synthesis:** Based on the combined expertise of multiple specialized models, here's my comprehensive response with deep thinking applied to your query.`,
      timestamp: new Date(),
      model: "Multi-GPT (H1)",
      isMultiGPT: true,
      subTasks,
    }
  }

  const handleSubmit = async () => {
    if (!prompt.trim() && uploadedFiles.length === 0) return
    if (!appUser) {
      setShowAuthDialog(true)
      return
    }

    // Create message content with files
    let messageContent = prompt
    if (uploadedFiles.length > 0) {
      const fileList = uploadedFiles.map(file => 
        `${getFileIcon(file.type)} ${file.name} (${formatFileSize(file.size)})`
      ).join('\n')
      messageContent = `${prompt}\n\n📎 **Attached Files:**\n${fileList}`
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setPrompt("")
    setUploadedFiles([]) // Clear uploaded files after sending
    setIsLoading(true)

    const currentModel = getSelectedModelDisplay()
    const currentChat = chatSessions.find((c) => c.id === currentChatId)

    if (currentChat && !currentChat.isModelLocked) {
      const newChatCategory = selectedCategory || "general"
      const newChat: ChatSession = {
        id: Date.now().toString(),
        title: userMessage.content.slice(0, 30) + "...",
        messages: [userMessage],
        model: currentModel,
        modelType: selectedModelType,
        category: newChatCategory,
        lastUpdated: new Date(),
        isModelLocked: true,
      }

      setChatSessions((prev) => [newChat, ...prev.filter((c) => c.id !== currentChatId)])
      setCurrentChatId(newChat.id)

      if (!expandedFolders.includes(newChatCategory)) {
        setExpandedFolders([newChatCategory])
      }
    } else {
      setChatSessions((prev) =>
        prev.map((session) =>
          session.id === currentChatId
            ? {
                ...session,
                isModelLocked: true,
                messages: [...session.messages, userMessage],
                lastUpdated: new Date(),
              }
            : session,
        ),
      )
    }

    setTimeout(async () => {
      let aiMessage: Message

      if (selectedCategory === "h") {
        aiMessage = await simulateMultiGPTResponse(userMessage.content)
      } else {
        aiMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `I understand you're asking about: "${userMessage.content}". As ${currentModel}, I'm here to help you with this request. This is a simulated response to demonstrate the chat functionality.`,
          timestamp: new Date(),
          model: currentModel,
        }
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)

      setChatSessions((prev) =>
        prev.map((session) =>
          session.id === currentChatId
            ? {
                ...session,
                messages: [...session.messages, aiMessage],
                lastUpdated: new Date(),
              }
            : session,
        ),
      )
    }, 1500)
  }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setIsUploading(true)
    setUploadError("")

    const fileArray = Array.from(files)
    const validFiles: File[] = []
    const errors: string[] = []

    // Check file count limit
    if (uploadedFiles.length + fileArray.length > MAX_FILES) {
      errors.push(`Maximum ${MAX_FILES} files allowed`)
    }

    // Calculate current total size
    const currentTotalSize = uploadedFiles.reduce((total, file) => total + file.size, 0)
    let newFilesTotalSize = 0

    fileArray.forEach((file) => {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name} is too large (max ${MAX_FILE_SIZE / (1024 * 1024)}MB)`)
        return
      }

      // Check file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        errors.push(`${file.name} is not a supported file type`)
        return
      }

      // Check for duplicate files
      const isDuplicate = uploadedFiles.some(existingFile =>
        existingFile.name === file.name && existingFile.size === file.size
      )

      if (isDuplicate) {
        errors.push(`${file.name} is already uploaded`)
        return
      }

      newFilesTotalSize += file.size
      validFiles.push(file)
    })

    // Check total size limit
    if (currentTotalSize + newFilesTotalSize > MAX_TOTAL_SIZE) {
      errors.push(`Total size limit exceeded (max ${MAX_TOTAL_SIZE / (1024 * 1024)}MB)`)
    }

    if (errors.length > 0) {
      setUploadError(errors.join(', '))
      setTimeout(() => setUploadError(""), 5000) // Clear error after 5 seconds
    }

    if (validFiles.length > 0) {
      setUploadedFiles((prev) => [...prev, ...validFiles])
    }

    setIsUploading(false)
    event.target.value = '' // Reset input
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileType: string): string => {
    if (fileType.startsWith('image/')) return '🖼️'
    if (fileType.includes('pdf')) return '📄'
    if (fileType.includes('word') || fileType.includes('document')) return '📝'
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊'
    if (fileType.includes('text/') || fileType.includes('markdown')) return '📄'
    if (fileType.includes('json') || fileType.includes('xml')) return '⚙️'
    return '📎'
  }

  const handleModelChange = (modelType: string, category?: string, model?: string) => {
    setSelectedModelType(modelType)
    if (category) setSelectedCategory(category)
    if (model) setSelectedModel(model)
    setIsModelSelectorOpen(false)

    // Create new chat for the selected model
    const targetCategory = category || "general"
    const selectedModelDisplay =
      modelType === "general"
        ? "General"
        : modelType === "morngpt" && category
          ? `${mornGPTCategories.find((c) => c.id === category)?.name} (${category.toUpperCase()}1)`
          : modelType === "external" && model
            ? `${externalModels.find((m) => m.name === model)?.name}`
            : "General"

    const newChat: ChatSession = {
      id: Date.now().toString(),
      title: `New ${selectedModelDisplay} Chat`,
      messages: [],
      model: selectedModelDisplay,
      modelType: modelType,
      category: targetCategory,
      lastUpdated: new Date(),
      isModelLocked: false,
    }

    setChatSessions((prev) => [newChat, ...prev])
    setCurrentChatId(newChat.id)
    setMessages([])

    // Auto-collapse all folders except the target one
    setExpandedFolders([targetCategory])
  }

  const createNewChat = (category?: string, modelType?: string, model?: string) => {
    const newChat: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      model: model || "General",
      modelType: modelType || "general",
      category: category || "general",
      lastUpdated: new Date(),
      isModelLocked: false,
    }
    setChatSessions((prev) => [newChat, ...prev])
    setCurrentChatId(newChat.id)
    setMessages([])
    
    // Update selected category and model if provided
    if (category) setSelectedCategory(category)
    if (modelType) setSelectedModelType(modelType)
    if (model) setSelectedModel(model)

    // Expand the folder for the new chat's category
    setExpandedFolders([category || "general"])
  }

  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId)
    const chat = chatSessions.find((c) => c.id === chatId)
    if (chat) {
      setMessages(chat.messages)
      setSelectedModelType(chat.modelType)
      if (chat.modelType === "morngpt") {
        setSelectedCategory(chat.category)
      } else if (chat.modelType === "external") {
        setSelectedModel(chat.model.split(" (")[0])
      }

      // Auto-collapse all folders except the chat's category
      setExpandedFolders([chat.category])
    }
  }

  const deleteChat = (chatId: string) => {
    setChatSessions((prev) => prev.filter((chat) => chat.id !== chatId))
    if (currentChatId === chatId) {
      const remainingChats = chatSessions.filter((chat) => chat.id !== chatId)
      if (remainingChats.length > 0) {
        selectChat(remainingChats[0].id)
      } else {
        createNewChat()
      }
    }
  }

  const startEditingTitle = (chatId: string, currentTitle: string) => {
    setEditingChatId(chatId)
    setEditingTitle(currentTitle)
  }

  const saveTitle = () => {
    setChatSessions((prev) => prev.map((chat) => (chat.id === editingChatId ? { ...chat, title: editingTitle } : chat)))
    setEditingChatId("")
    setEditingTitle("")
  }

  const cancelEditing = () => {
    setEditingChatId("")
    setEditingTitle("")
  }

  const toggleFolder = (folder: string) => {
    setExpandedFolders((prev) => (prev.includes(folder) ? prev.filter((f) => f !== folder) : [...prev, folder]))
  }

  const filteredChats = chatSessions.filter((chat) => chat.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const groupedChats = filteredChats.reduce(
    (acc, chat) => {
      const category = chat.category || "general"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(chat)
      return acc
    },
    {} as Record<string, ChatSession[]>,
  )

  const currentChat = chatSessions.find((c) => c.id === currentChatId)
  const isModelLocked = currentChat?.isModelLocked || false

  const handleQuickAction = (action: string) => {
    let promptText = ""
    switch (action) {
      case "deep-thinking":
        promptText = "Use deep thinking and multiple AI models to analyze: "
        setSelectedModelType("morngpt")
        setSelectedCategory("h")
        break
      case "creative":
        promptText = "Generate creative and innovative ideas for: "
        setSelectedModelType("morngpt")
        setSelectedCategory("w")
        break
      case "analyze":
        promptText = "Provide detailed analysis and insights about: "
        break
      case "solve":
        promptText = "Help me solve this problem step by step: "
        break
      default:
        promptText = action + ": "
    }
    setPrompt(promptText)
  }

  const handlePromptSelect = (selectedPrompt: string) => {
    setPrompt(selectedPrompt)
    setIsPromptHistoryOpen(false)
  }

  const jumpToMessage = (messageId: string) => {
    const messageElement = document.getElementById(`message-${messageId}`)
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: "smooth", block: "center" })
      // Highlight the message briefly
      messageElement.classList.add("bg-yellow-100", "dark:bg-yellow-900/50")
      setTimeout(() => {
        messageElement.classList.remove("bg-yellow-100", "dark:bg-yellow-900/50")
      }, 2000)
    }
    setIsAskGPTOpen(false)
  }

  const jumpToBookmark = (bookmark: BookmarkedMessage) => {
    // Switch to the correct chat if needed
    if (bookmark.chatId !== currentChatId) {
      selectChat(bookmark.chatId)
    }
    // Jump to the bookmarked message
    setTimeout(() => jumpToMessage(bookmark.messageId), 100)
    setIsAskGPTOpen(false)
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + "..."
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-[#2d2d30] text-gray-900 dark:text-[#ececf1] flex">
        {/* Collapsed Sidebar Toggle - Fixed to absolute far left */}
        {sidebarCollapsed && (
          <div
            className="fixed left-0 top-0 z-50 w-12 h-full bg-white dark:bg-[#40414f] border-r border-gray-200 dark:border-[#565869] flex flex-col"
            style={{ margin: 0, padding: 0 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(false)}
              className="w-full h-12 rounded-none border-b border-gray-200 dark:border-[#565869] m-0 p-0 text-gray-900 dark:text-[#ececf1] hover:bg-gray-100 dark:hover:bg-[#565869]"
              style={{ margin: 0, padding: 0 }}
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Left Sidebar - Chat History */}
        <div
          ref={sidebarRef}
          className={`${sidebarCollapsed ? "w-0 opacity-0 pointer-events-none" : ""} bg-white dark:bg-[#40414f] border-r border-gray-200 dark:border-[#565869] flex flex-col transition-all duration-300 ${sidebarCollapsed ? "ml-12" : ""} relative h-screen`}
          style={{ width: sidebarCollapsed ? 0 : sidebarWidth }}
        >
          {!sidebarCollapsed && (
            <>
              <div className="p-4 border-b border-gray-200 dark:border-[#565869] space-y-3">
                <div className="flex items-center justify-between">
                  <Button
                    onClick={() => createNewChat()}
                    className="flex-1 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Chat</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarCollapsed(true)}
                    className="ml-2 h-10 text-gray-900 dark:text-[#ececf1] hover:bg-gray-100 dark:hover:bg-[#565869]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <Input
                    placeholder="Search chats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-8 text-sm bg-white dark:bg-[#565869] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                  />
                </div>

              </div>

              <ScrollArea className="flex-1 max-h-[calc(100vh-200px)]" ref={sidebarScrollRef}>
                <div className="p-2">
                  {/* General Folder */}
                  <div className="mb-1">
                    <ContextMenu>
                      <ContextMenuTrigger>
                        <div
                          className="flex items-center space-x-1.5 p-1.5 hover:bg-gray-100 dark:hover:bg-[#565869] rounded cursor-pointer"
                          onClick={() => toggleFolder("general")}
                        >
                          {expandedFolders.includes("general") ? (
                            <FolderOpen className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                          ) : (
                            <Folder className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                          )}
                          <span className="text-xs font-medium text-gray-900 dark:text-[#ececf1]">General</span>
                          <ChevronRight
                            className={`w-2.5 h-2.5 text-gray-400 transition-transform ${
                              expandedFolders.includes("general") ? "rotate-90" : ""
                            }`}
                          />
                        </div>
                      </ContextMenuTrigger>
                      <ContextMenuContent className="bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
                        <ContextMenuItem
                          onClick={() => createNewChat("general", "general", "General")}
                          className="text-gray-900 dark:text-[#ececf1] hover:bg-gray-100 dark:hover:bg-[#565869]"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          New Chat in General
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                    {expandedFolders.includes("general") && (
                      <div className="ml-5 space-y-0.5">
                        {(groupedChats.general || []).map((chat) => (
                          <ContextMenu key={chat.id}>
                            <ContextMenuTrigger>
                              <div
                                className={`group p-1.5 rounded cursor-pointer text-xs hover:bg-gray-100 dark:hover:bg-[#565869] ${
                                  currentChatId === chat.id
                                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                    : "text-gray-700 dark:text-gray-300"
                                }`}
                                onClick={() => selectChat(chat.id)}
                                onDoubleClick={() => startEditingTitle(chat.id, chat.title)}
                              >
                                <div className="flex items-center space-x-1.5">
                                  <MessageSquare className="w-2.5 h-2.5 shrink-0" />
                                  {editingChatId === chat.id ? (
                                    <div className="flex items-center space-x-1 flex-1">
                                      <Input
                                        value={editingTitle}
                                        onChange={(e) => setEditingTitle(e.target.value)}
                                        className="h-5 text-xs bg-white dark:bg-[#565869] text-gray-900 dark:text-[#ececf1]"
                                        onKeyDown={(e) => {
                                          if (e.key === "Enter") saveTitle()
                                          if (e.key === "Escape") cancelEditing()
                                        }}
                                        autoFocus
                                      />
                                      <Button size="sm" variant="ghost" className="h-5 w-5 p-0" onClick={saveTitle}>
                                        <Check className="w-2.5 h-2.5" />
                                      </Button>
                                      <Button size="sm" variant="ghost" className="h-5 w-5 p-0" onClick={cancelEditing}>
                                        <X className="w-2.5 h-2.5" />
                                      </Button>
                                    </div>
                                  ) : (
                                    <>
                                      <span
                                        className="truncate flex-1 text-gray-700 dark:text-gray-300"
                                        title={chat.title}
                                      >
                                        {truncateText(chat.title, Math.floor((sidebarWidth - 120) / 6))}
                                      </span>
                                      <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-0.5">
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-5 w-5 p-0 hover:bg-gray-200 dark:hover:bg-[#565869]"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            startEditingTitle(chat.id, chat.title)
                                          }}
                                        >
                                          <Edit3 className="w-2.5 h-2.5" />
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-5 w-5 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            deleteChat(chat.id)
                                          }}
                                        >
                                          <Trash2 className="w-2.5 h-2.5" />
                                        </Button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </ContextMenuTrigger>
                            <ContextMenuContent className="bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
                              <ContextMenuItem
                                onClick={() => startEditingTitle(chat.id, chat.title)}
                                className="text-gray-900 dark:text-[#ececf1] hover:bg-gray-100 dark:hover:bg-[#565869]"
                              >
                                <Edit3 className="w-4 h-4 mr-2" />
                                Rename
                              </ContextMenuItem>
                              <ContextMenuItem
                                onClick={() => deleteChat(chat.id)}
                                className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </ContextMenuItem>
                            </ContextMenuContent>
                          </ContextMenu>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Model Category Folders */}
                  {mornGPTCategories.map((category) => {
                    const categoryChats = groupedChats[category.id] || []
                    if (categoryChats.length === 0) return null

                    return (
                      <div key={category.id} className="mb-1">
                        <ContextMenu>
                          <ContextMenuTrigger>
                            <div
                              className="flex items-center space-x-1.5 p-1.5 hover:bg-gray-100 dark:hover:bg-[#565869] rounded cursor-pointer"
                              onClick={() => toggleFolder(category.id)}
                            >
                              {expandedFolders.includes(category.id) ? (
                                <FolderOpen className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                              ) : (
                                <Folder className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                              )}
                              <category.icon className="w-2.5 h-2.5" />
                              <span className="text-xs font-medium truncate text-gray-900 dark:text-[#ececf1]">
                                {category.name}
                              </span>
                              <ChevronRight
                                className={`w-2.5 h-2.5 text-gray-400 transition-transform ${
                                  expandedFolders.includes(category.id) ? "rotate-90" : ""
                                }`}
                              />
                            </div>
                          </ContextMenuTrigger>
                          <ContextMenuContent className="bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
                            <ContextMenuItem
                              onClick={() => createNewChat(category.id, "morngpt", category.name)}
                              className="text-gray-900 dark:text-[#ececf1] hover:bg-gray-100 dark:hover:bg-[#565869]"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              New Chat in {category.name}
                            </ContextMenuItem>
                          </ContextMenuContent>
                        </ContextMenu>
                        {expandedFolders.includes(category.id) && (
                          <div className="ml-5 space-y-0.5">
                            {categoryChats.map((chat) => (
                              <ContextMenu key={chat.id}>
                                <ContextMenuTrigger>
                                  <div
                                    className={`group p-1.5 rounded cursor-pointer text-xs hover:bg-gray-100 dark:hover:bg-[#565869] ${
                                      currentChatId === chat.id
                                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                        : "text-gray-700 dark:text-gray-300"
                                    }`}
                                    onClick={() => selectChat(chat.id)}
                                    onDoubleClick={() => startEditingTitle(chat.id, chat.title)}
                                  >
                                    <div className="flex items-center space-x-1.5">
                                      <MessageSquare className="w-2.5 h-2.5 shrink-0" />
                                      {editingChatId === chat.id ? (
                                        <div className="flex items-center space-x-1 flex-1">
                                          <Input
                                            value={editingTitle}
                                            onChange={(e) => setEditingTitle(e.target.value)}
                                            className="h-5 text-xs bg-white dark:bg-[#565869] text-gray-900 dark:text-[#ececf1]"
                                            onKeyDown={(e) => {
                                              if (e.key === "Enter") saveTitle()
                                              if (e.key === "Escape") cancelEditing()
                                            }}
                                            autoFocus
                                          />
                                          <Button size="sm" variant="ghost" className="h-5 w-5 p-0" onClick={saveTitle}>
                                            <Check className="w-2.5 h-2.5" />
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-5 w-5 p-0"
                                            onClick={cancelEditing}
                                          >
                                            <X className="w-2.5 h-2.5" />
                                          </Button>
                                        </div>
                                      ) : (
                                        <>
                                          <span
                                            className="truncate flex-1 text-gray-700 dark:text-gray-300"
                                            title={chat.title}
                                          >
                                            {truncateText(chat.title, Math.floor((sidebarWidth - 120) / 6))}
                                          </span>
                                          <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-0.5">
                                            <Button
                                              size="sm"
                                              variant="ghost"
                                              className="h-5 w-5 p-0 hover:bg-gray-200 dark:hover:bg-[#565869]"
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                startEditingTitle(chat.id, chat.title)
                                              }}
                                            >
                                              <Edit3 className="w-2.5 h-2.5" />
                                            </Button>
                                            <Button
                                              size="sm"
                                              variant="ghost"
                                              className="h-5 w-5 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                deleteChat(chat.id)
                                              }}
                                            >
                                              <Trash2 className="w-2.5 h-2.5" />
                                            </Button>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </ContextMenuTrigger>
                                <ContextMenuContent className="bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
                                  <ContextMenuItem
                                    onClick={() => startEditingTitle(chat.id, chat.title)}
                                    className="text-gray-900 dark:text-[#ececf1] hover:bg-gray-100 dark:hover:bg-[#565869]"
                                  >
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Rename
                                  </ContextMenuItem>
                                  <ContextMenuItem
                                    onClick={() => deleteChat(chat.id)}
                                    className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </ContextMenuItem>
                                </ContextMenuContent>
                              </ContextMenu>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>

              {/* Resize Handle */}
              <div
                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500 transition-colors"
                onMouseDown={() => setIsResizing(true)}
              />
            </>
          )}
        </div>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col ${sidebarCollapsed ? "ml-12" : ""} h-screen`}>
          {/* Header - Fixed height */}
          <header className="bg-white dark:bg-[#40414f] border-b border-gray-200 dark:border-[#565869] flex-shrink-0">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-[#ececf1]">MornGPT</h1>
                  {currentChat && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">- {currentChat.title}</span>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="text-gray-900 dark:text-[#ececf1] hover:bg-gray-100 dark:hover:bg-[#565869]"
                  >
                    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </Button>
                  {appUser ? (
                    <div className="relative">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-40 bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869] hover:bg-gray-50 dark:hover:bg-[#565869]"
                          >
                            <div className="flex items-center space-x-2">
                              {appUser.isPro && <Crown className="w-4 h-4 text-yellow-500" />}
                              <User className="w-4 h-4" />
                              <span className="truncate">{appUser.name}</span>
                              <ChevronDown className="w-3 h-3" />
                            </div>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869] p-1">
                          <div className="space-y-1">
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-gray-900 dark:text-[#ececf1] hover:bg-gray-100 dark:hover:bg-[#565869]"
                              onClick={openProfileDialog}
                            >
                              <User className="w-4 h-4 mr-2" />
                              Profile & Settings
                            </Button>
                            {!appUser.isPro && (
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-gray-900 dark:text-[#ececf1] hover:bg-gray-100 dark:hover:bg-[#565869]"
                                onClick={() => setShowUpgradeDialog(true)}
                              >
                                <Crown className="w-4 h-4 mr-2 text-yellow-500" />
                                Upgrade to Pro
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-gray-900 dark:text-[#ececf1] hover:bg-gray-100 dark:hover:bg-[#565869]"
                              onClick={confirmLogout}
                            >
                              <LogOut className="w-4 h-4 mr-2" />
                              Sign Out
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setShowAuthDialog(true)}
                      variant="outline"
                      size="sm"
                      className="bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869] hover:bg-gray-50 dark:hover:bg-[#565869]"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Chat Messages - Flexible height with scroll */}
          <div className="flex-1 overflow-hidden min-h-0">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-[#ececf1] mb-4">MornGPT</h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Advanced AI models at your fingertips</p>

                  {/* Compact Tips */}
                  <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-3 max-w-4xl mx-auto">
                    <div className="flex items-center justify-center space-x-6 text-xs text-blue-800 dark:text-blue-200">
                      <span>• Be specific about your goals</span>
                      <span>• Choose specialized MornGPT models</span>
                      <span>• Upload files with 📎</span>
                      <span>• Use Ctrl/Cmd + Enter</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <ScrollArea className="h-full" ref={scrollAreaRef}>
                <div className="p-4">
                  <div className="max-w-4xl mx-auto space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        id={`message-${message.id}`}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} transition-colors duration-500`}
                      >
                        <div
                          className={`max-w-3xl p-4 rounded-lg relative group ${
                            message.role === "user"
                              ? "bg-blue-500 text-white"
                              : "bg-white dark:bg-[#444654] border border-gray-200 dark:border-[#565869] text-gray-900 dark:text-[#ececf1]"
                          }`}
                        >
                          {message.isMultiGPT && (
                            <div className="flex items-center space-x-2 mb-3 text-indigo-600 dark:text-indigo-400">
                              <Zap className="w-4 h-4" />
                              <span className="text-sm font-medium">Multi-GPT Deep Thinking</span>
                            </div>
                          )}
                          <p className="whitespace-pre-wrap">{message.content}</p>
                          {message.model && message.role === "assistant" && (
                            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                              Powered by {message.model}
                            </div>
                          )}

                          {/* Action buttons for assistant messages */}
                          {message.role === "assistant" && (
                            <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-200 dark:border-[#565869]">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 px-2 text-xs text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-[#ececf1] hover:bg-gray-100 dark:hover:bg-[#565869]"
                                onClick={() => copyToClipboard(message.content)}
                                title="Copy response"
                              >
                                <Copy className="w-3 h-3 mr-1" />
                                Copy
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 px-2 text-xs text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-[#ececf1] hover:bg-gray-100 dark:hover:bg-[#565869]"
                                onClick={() => shareMessage(message.content)}
                                title="Share response"
                              >
                                <Share className="w-3 h-3 mr-1" />
                                Share
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 px-2 text-xs text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-[#ececf1] hover:bg-gray-100 dark:hover:bg-[#565869]"
                                onClick={() => downloadMessage(message.content, message.id)}
                                title="Download response"
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className={`h-6 px-2 text-xs ${
                                  isMessageBookmarked(message.id)
                                    ? "text-yellow-600 dark:text-yellow-400"
                                    : "text-gray-700 dark:text-gray-300"
                                } hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-[#565869]`}
                                onClick={() =>
                                  isMessageBookmarked(message.id)
                                    ? removeBookmark(
                                        bookmarkedMessages.find((b) => b.messageId === message.id)?.id || "",
                                      )
                                    : bookmarkMessage(message)
                                }
                                title={isMessageBookmarked(message.id) ? "Remove bookmark" : "Bookmark message"}
                              >
                                <Star
                                  className={`w-3 h-3 mr-1 ${isMessageBookmarked(message.id) ? "fill-current" : ""}`}
                                />
                                {isMessageBookmarked(message.id) ? "Bookmarked" : "Bookmark"}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white dark:bg-[#444654] border border-gray-200 dark:border-[#565869] text-gray-900 dark:text-[#ececf1] p-4 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 dark:border-[#ececf1]"></div>
                            <span>{selectedCategory === "h" ? "Deep thinking in progress..." : "Thinking..."}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </ScrollArea>
            )}
          </div>

          {/* Input Area - Fixed at bottom */}
          <div className="border-t border-gray-200 dark:border-[#565869] bg-white dark:bg-[#40414f] flex-shrink-0 p-4 sticky bottom-0">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <Textarea
                    placeholder={appUser ? "Message MornGPT..." : "Please login to start chatting..."}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-10 max-h-32 resize-none pr-48 text-base py-2 text-gray-900 dark:text-[#ececf1] bg-white dark:bg-[#40414f] border-gray-300 dark:border-[#565869]"
                    disabled={!appUser}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                        handleSubmit()
                      }
                    }}
                  />
                  <div className="absolute bottom-2 right-2 flex items-center space-x-1">
                    <input 
                      type="file" 
                      multiple 
                      onChange={handleFileUpload} 
                      className="hidden" 
                      id="file-upload"
                      accept={ALLOWED_FILE_TYPES.join(',')}
                      disabled={!appUser || isUploading}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-6 w-6 p-0 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#565869] transition-all duration-200 ${
                        isUploading ? 'animate-pulse' : ''
                      }`}
                                              title={
                          uploadedFiles.length >= MAX_FILES 
                            ? `Maximum ${MAX_FILES} files reached. Remove some files first.` 
                            : isUploading 
                              ? 'Uploading...' 
                              : `Upload files (max ${MAX_FILES}, ${MAX_TOTAL_SIZE / (1024 * 1024)}MB total)`
                        }
                      type="button"
                      disabled={!appUser || isUploading}
                      onClick={() => {
                        if (uploadedFiles.length >= MAX_FILES) {
                          setUploadError(`Maximum ${MAX_FILES} files reached. Please remove some files first.`)
                          setTimeout(() => setUploadError(""), 3000)
                          return
                        }
                        document.getElementById('file-upload')?.click()
                      }}
                    >
                      {isUploading ? (
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
                      ) : (
                        <Paperclip className="w-4 h-4" />
                      )}
                    </Button>

                    {/* Prompt History Button */}
                    {promptHistory.length > 0 && (
                      <Popover open={isPromptHistoryOpen} onOpenChange={setIsPromptHistoryOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#565869]"
                            title="Previous prompts"
                            disabled={!appUser}
                          >
                            <History className="w-4 h-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-80 p-2 bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]"
                          align="end"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-[#ececf1]">Recent Prompts</h4>
                              <div className="flex items-center space-x-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-5 w-5 p-0 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#565869]"
                                  onClick={() => scrollPromptHistory("up")}
                                  title="Scroll up"
                                >
                                  <ChevronUp className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-5 w-5 p-0 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#565869]"
                                  onClick={() => scrollPromptHistory("down")}
                                  title="Scroll down"
                                >
                                  <ChevronDown className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <ScrollArea className="max-h-60" ref={promptScrollRef}>
                              {promptHistory.map((historyPrompt, index) => (
                                <div
                                  key={index}
                                  className="p-2 text-xs bg-gray-50 dark:bg-[#565869] rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-[#444654] mb-1 text-gray-900 dark:text-[#ececf1]"
                                  onClick={() => handlePromptSelect(historyPrompt)}
                                  title={historyPrompt}
                                >
                                  {truncateText(historyPrompt, 60)}
                                </div>
                              ))}
                            </ScrollArea>
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}

                    {/* Ask GPT Button */}
                    {(messages.length > 0 || bookmarkedMessages.length > 0) && (
                      <Popover open={isAskGPTOpen} onOpenChange={setIsAskGPTOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#565869]"
                            title="Navigate conversation"
                            disabled={!appUser}
                          >
                            <MapPin className="w-4 h-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-80 p-2 bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]"
                          align="end"
                        >
                          <Tabs defaultValue="messages" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-2 bg-gray-100 dark:bg-[#565869]">
                              <TabsTrigger value="messages" className="text-xs text-gray-900 dark:text-[#ececf1]">
                                Messages
                              </TabsTrigger>
                              <TabsTrigger value="bookmarks" className="text-xs text-gray-900 dark:text-[#ececf1]">
                                Bookmarks
                              </TabsTrigger>
                            </TabsList>

                            <TabsContent value="messages" className="space-y-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-[#ececf1]">
                                  Jump to Message
                                </h4>
                                <div className="flex items-center space-x-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-5 w-5 p-0 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#565869]"
                                    onClick={() => scrollJumpToMessages("up")}
                                    title="Scroll up"
                                  >
                                    <ChevronUp className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-5 w-5 p-0 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#565869]"
                                    onClick={() => scrollJumpToMessages("down")}
                                    title="Scroll down"
                                  >
                                    <ChevronDown className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                              <ScrollArea className="max-h-60" ref={jumpToScrollRef}>
                                {messages
                                  .slice()
                                  .reverse()
                                  .map((message, index) => (
                                    <div
                                      key={message.id}
                                      className="p-2 text-xs bg-gray-50 dark:bg-[#565869] rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-[#444654] mb-1"
                                      onClick={() => jumpToMessage(message.id)}
                                    >
                                      <div className="flex items-center space-x-2">
                                        <span
                                          className={`w-2 h-2 rounded-full ${message.role === "user" ? "bg-blue-500" : "bg-green-500"}`}
                                        />
                                        <span className="font-medium text-gray-900 dark:text-[#ececf1]">
                                          {message.role === "user" ? "You" : "AI"}:
                                        </span>
                                      </div>
                                      <div className="truncate mt-1 text-gray-600 dark:text-gray-300">
                                        {message.content.slice(0, 60)}...
                                      </div>
                                    </div>
                                  ))}
                              </ScrollArea>
                            </TabsContent>

                            <TabsContent value="bookmarks" className="space-y-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-[#ececf1]">
                                  Bookmarked Messages
                                </h4>
                                <div className="flex items-center space-x-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-5 w-5 p-0 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#565869]"
                                    onClick={() => scrollBookmarks("up")}
                                    title="Scroll up"
                                  >
                                    <ChevronUp className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-5 w-5 p-0 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#565869]"
                                    onClick={() => scrollBookmarks("down")}
                                    title="Scroll down"
                                  >
                                    <ChevronDown className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                              <ScrollArea className="max-h-60" ref={bookmarkScrollRef}>
                                {bookmarkedMessages.length === 0 ? (
                                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-4">
                                    No bookmarked messages yet
                                  </div>
                                ) : (
                                  bookmarkedMessages.map((bookmark) => (
                                    <ContextMenu key={bookmark.id}>
                                      <ContextMenuTrigger>
                                        <div
                                          className="p-2 text-xs bg-gray-50 dark:bg-[#565869] rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-[#444654] mb-1 group"
                                          onClick={() => jumpToBookmark(bookmark)}
                                        >
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2 flex-1">
                                              <Star className="w-3 h-3 text-yellow-500 fill-current shrink-0" />
                                              {editingBookmarkId === bookmark.id ? (
                                                <div className="flex items-center space-x-1 flex-1">
                                                  <Input
                                                    value={editingBookmarkName}
                                                    onChange={(e) => setEditingBookmarkName(e.target.value)}
                                                    className="h-5 text-xs bg-white dark:bg-[#444654] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                                                    onKeyDown={(e) => {
                                                      if (e.key === "Enter") saveBookmarkName()
                                                      if (e.key === "Escape") cancelBookmarkEditing()
                                                    }}
                                                    onClick={(e) => e.stopPropagation()}
                                                    autoFocus
                                                  />
                                                  <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-4 w-4 p-0"
                                                    onClick={(e) => {
                                                      e.stopPropagation()
                                                      saveBookmarkName()
                                                    }}
                                                  >
                                                    <Check className="w-2 h-2" />
                                                  </Button>
                                                  <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-4 w-4 p-0"
                                                    onClick={(e) => {
                                                      e.stopPropagation()
                                                      cancelBookmarkEditing()
                                                    }}
                                                  >
                                                    <X className="w-2 h-2" />
                                                  </Button>
                                                </div>
                                              ) : (
                                                <span className="font-medium text-gray-900 dark:text-[#ececf1] truncate">
                                                  {bookmark.customName || bookmark.title}
                                                </span>
                                              )}
                                            </div>
                                            {editingBookmarkId !== bookmark.id && (
                                              <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 shrink-0"
                                                onClick={(e) => {
                                                  e.stopPropagation()
                                                  removeBookmark(bookmark.id)
                                                }}
                                              >
                                                <X className="w-2 h-2" />
                                              </Button>
                                            )}
                                          </div>
                                          {editingBookmarkId !== bookmark.id && (
                                            <div className="truncate mt-1 text-gray-600 dark:text-gray-300">
                                              {bookmark.content.slice(0, 60)}...
                                            </div>
                                          )}
                                        </div>
                                      </ContextMenuTrigger>
                                      <ContextMenuContent className="bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
                                        <ContextMenuItem
                                          onClick={() =>
                                            startEditingBookmark(bookmark.id, bookmark.customName || bookmark.title)
                                          }
                                          className="text-gray-900 dark:text-[#ececf1] hover:bg-gray-100 dark:hover:bg-[#565869]"
                                        >
                                          <Edit3 className="w-4 h-4 mr-2" />
                                          Rename
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                          onClick={() => removeBookmark(bookmark.id)}
                                          className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        >
                                          <Trash2 className="w-4 h-4 mr-2" />
                                          Delete
                                        </ContextMenuItem>
                                      </ContextMenuContent>
                                    </ContextMenu>
                                  ))
                                )}
                              </ScrollArea>
                            </TabsContent>
                          </Tabs>
                        </PopoverContent>
                      </Popover>
                    )}

                    {/* Model Selector */}
                    <Popover open={isModelSelectorOpen} onOpenChange={setIsModelSelectorOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 px-2 text-xs border-gray-300 dark:border-[#565869] hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1]"
                          disabled={isModelLocked || !appUser}
                          title="Select Model"
                        >
                          <div className="flex items-center space-x-1">
                            {getModelIcon()}
                            <span className="max-w-20 truncate">{getSelectedModelDisplay()}</span>
                            {!isModelLocked && appUser && <ChevronDown className="w-3 h-3" />}
                          </div>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-[600px] p-0 bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]"
                        align="end"
                      >
                        <Tabs value={selectedModelType} onValueChange={setSelectedModelType} className="w-full">
                          <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-[#565869]">
                            <TabsTrigger value="general" className="text-xs text-gray-900 dark:text-[#ececf1]">
                              <MessageSquare className="w-3 h-3 mr-1" />
                              General
                            </TabsTrigger>
                            <TabsTrigger value="morngpt" className="text-xs text-gray-900 dark:text-[#ececf1]">
                              <Sparkles className="w-3 h-3 mr-1" />
                              MornGPT
                            </TabsTrigger>
                            <TabsTrigger value="external" className="text-xs text-gray-900 dark:text-[#ececf1]">
                              <Globe className="w-3 h-3 mr-1" />
                              External
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="general" className="p-4">
                            <div
                              className="text-center cursor-pointer p-4 rounded-lg border border-gray-200 dark:border-[#565869] bg-gray-50 dark:bg-[#565869] hover:bg-gray-100 dark:hover:bg-[#444654]"
                              onClick={() => handleModelChange("general")}
                            >
                              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-500 dark:text-gray-400" />
                              <h3 className="font-medium text-gray-900 dark:text-[#ececf1] mb-1">General Model</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Multi-purpose AI assistant for general conversations and tasks
                              </p>
                            </div>
                          </TabsContent>

                          <TabsContent value="morngpt" className="p-2">
                            <div className="grid grid-cols-3 gap-1">
                              {mornGPTCategories.map((category) => {
                                const IconComponent = category.icon
                                return (
                                  <div
                                    key={category.id}
                                    className={`p-1.5 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-[#565869] border ${
                                      selectedCategory === category.id
                                        ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700"
                                        : "border-gray-200 dark:border-[#565869]"
                                    }`}
                                    onClick={() => handleModelChange("morngpt", category.id)}
                                  >
                                    <div className="flex items-center space-x-1.5">
                                      <div className={`p-0.5 rounded ${category.color} text-white`}>
                                        <IconComponent className="w-2.5 h-2.5" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-1">
                                          <p className="text-[10px] font-medium truncate text-gray-900 dark:text-[#ececf1]">
                                            {category.name}
                                          </p>
                                          <Badge variant="secondary" className="text-[8px] px-0.5 py-0 h-3">
                                            {category.id.toUpperCase()}1
                                          </Badge>
                                        </div>
                                        <p className="text-[8px] text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-1">
                                          {category.description}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </TabsContent>

                          <TabsContent value="external" className="p-2">
                            <div className="space-y-2">
                              <div>
                                <h4 className="text-[10px] font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                                  Free Models
                                </h4>
                                <div className="grid grid-cols-3 gap-1">
                                  {externalModels
                                    .filter((model) => model.type === "free")
                                    .map((model, index) => (
                                      <div
                                        key={index}
                                        className={`p-1.5 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-[#565869] border ${
                                          selectedModel === model.name
                                            ? "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700"
                                            : "border-gray-200 dark:border-[#565869]"
                                        }`}
                                        onClick={() => handleModelChange("external", undefined, model.name)}
                                      >
                                        <div className="flex items-center justify-between mb-0.5">
                                          <p className="text-[10px] font-medium truncate text-gray-900 dark:text-[#ececf1]">
                                            {model.name}
                                          </p>
                                          <Badge className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 text-[8px] px-0.5 py-0 h-3">
                                            F
                                          </Badge>
                                        </div>
                                        <p className="text-[8px] text-gray-500 dark:text-gray-400 mb-0.5 truncate">
                                          by {model.provider}
                                        </p>
                                        <p className="text-[8px] text-gray-600 dark:text-gray-300 line-clamp-1">
                                          {model.description}
                                        </p>
                                      </div>
                                    ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="text-[10px] font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1"></span>
                                  Popular Models
                                </h4>
                                <div className="grid grid-cols-3 gap-1">
                                  {externalModels
                                    .filter((model) => model.type === "popular")
                                    .map((model, index) => (
                                      <div
                                        key={index}
                                        className={`p-1.5 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-[#565869] border ${
                                          selectedModel === model.name
                                            ? "bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700"
                                            : "border-gray-200 dark:border-[#565869]"
                                        }`}
                                        onClick={() => handleModelChange("external", undefined, model.name)}
                                      >
                                        <div className="flex items-center justify-between mb-0.5">
                                          <p className="text-[10px] font-medium truncate text-gray-900 dark:text-[#ececf1]">
                                            {model.name}
                                          </p>
                                          <Badge className="bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100 text-[8px] px-0.5 py-0 h-3">
                                            P
                                          </Badge>
                                        </div>
                                        <p className="text-[8px] text-gray-500 dark:text-gray-400 mb-0.5 truncate">
                                          by {model.provider}
                                        </p>
                                        <p className="text-[8px] text-purple-600 dark:text-purple-400 mb-0.5 truncate">
                                          {model.price}
                                        </p>
                                        <p className="text-[8px] text-gray-600 dark:text-gray-300 line-clamp-1">
                                          {model.description}
                                        </p>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </PopoverContent>
                    </Popover>

                    <Button
                      size="sm"
                      onClick={handleSubmit}
                      disabled={!prompt.trim() || isLoading || !appUser}
                      className="h-6 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Upload Error Display */}
              {uploadError && (
                <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-xs text-red-600 dark:text-red-400">{uploadError}</p>
                </div>
              )}

                              {/* Uploaded Files Display */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {uploadedFiles.length}/{MAX_FILES} files ({formatFileSize(uploadedFiles.reduce((total, file) => total + file.size, 0))})
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-5 px-2 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                        onClick={() => setUploadedFiles([])}
                      >
                        Clear all
                      </Button>
                    </div>
                    <div className="grid grid-cols-10 gap-1 max-h-12 overflow-hidden">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="group relative bg-gray-50 dark:bg-[#565869] border border-gray-200 dark:border-[#565869] rounded px-1 py-0.5 text-xs flex items-center"
                          title={`${file.name} (${formatFileSize(file.size)})`}
                        >
                          <span className="text-xs mr-1">{getFileIcon(file.type)}</span>
                          <span className="text-gray-700 dark:text-gray-300 truncate text-xs">
                            {file.name.length > 8 ? file.name.substring(0, 6) + '..' : file.name}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-3 w-3 p-0 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 absolute -top-1 -right-1"
                            onClick={() => removeFile(index)}
                            title="Remove file"
                          >
                            <X className="w-2 h-2" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Enhanced Quick Actions */}
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction("deep-thinking")}
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-[#565869] hover:text-gray-900 dark:hover:text-[#ececf1] bg-white dark:bg-[#40414f] hover:bg-gray-50 dark:hover:bg-[#565869]"
                >
                  <Brain className="w-3 h-3" />
                  <span>Deep Thinking</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction("creative")}
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-[#565869] hover:text-gray-900 dark:hover:text-[#ececf1] bg-white dark:bg-[#40414f] hover:bg-gray-50 dark:hover:bg-[#565869]"
                >
                  <Lightbulb className="w-3 h-3" />
                  <span>Creative Ideas</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction("analyze")}
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-[#565869] hover:text-gray-900 dark:hover:text-[#ececf1] bg-white dark:bg-[#40414f] hover:bg-gray-50 dark:hover:bg-[#565869]"
                >
                  <Target className="w-3 h-3" />
                  <span>Analyze</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction("solve")}
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-[#565869] hover:text-gray-900 dark:hover:text-[#ececf1] bg-white dark:bg-[#40414f] hover:bg-gray-50 dark:hover:bg-[#565869]"
                >
                  <Zap className="w-3 h-3" />
                  <span>Problem Solve</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Auth Dialog */}
        <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          <DialogContent className="sm:max-w-md bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 text-gray-900 dark:text-[#ececf1]">
                {authMode === "login" ? (
                  <LogIn className="w-5 h-5" />
                ) : authMode === "signup" ? (
                  <UserPlus className="w-5 h-5" />
                ) : (
                  <Lock className="w-5 h-5" />
                )}
                <span>
                  {authMode === "login"
                    ? "Login to MornGPT"
                    : authMode === "signup"
                      ? "Sign up for MornGPT"
                      : "Reset Password"}
                </span>
              </DialogTitle>
            </DialogHeader>

            {authMode !== "reset" && (
              <Button
                onClick={handleGoogleAuth}
                variant="outline"
                className="w-full flex items-center space-x-2 mb-4 bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869] hover:bg-gray-50 dark:hover:bg-[#565869]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </Button>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200 dark:border-[#565869]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-[#40414f] px-2 text-gray-500 dark:text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {authMode === "signup" && (
                <div>
                  <Label htmlFor="name" className="text-gray-900 dark:text-[#ececf1]">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    className="bg-white dark:bg-[#565869] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                    required
                  />
                </div>
              )}
              <div>
                <Label htmlFor="email" className="text-gray-900 dark:text-[#ececf1]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  className="bg-white dark:bg-[#565869] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                  required
                />
              </div>
              {authMode !== "reset" && (
                <div>
                  <Label htmlFor="password" className="text-gray-900 dark:text-[#ececf1]">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={authForm.password}
                      onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                      className="bg-white dark:bg-[#565869] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-500 dark:text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}
              <div className="flex flex-col space-y-2">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  {authMode === "login" ? "Login" : authMode === "signup" ? "Sign Up" : "Send Reset Link"}
                </Button>
                <div className="flex justify-between text-sm">
                  {authMode === "login" && (
                    <>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setAuthMode("reset")}
                        className="p-0 h-auto text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-[#ececf1]"
                      >
                        Forgot password?
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setAuthMode("signup")}
                        className="p-0 h-auto text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-[#ececf1]"
                      >
                        Sign up
                      </Button>
                    </>
                  )}
                  {authMode === "signup" && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setAuthMode("login")}
                      className="p-0 h-auto text-sm mx-auto text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-[#ececf1]"
                    >
                      Already have an account? Login
                    </Button>
                  )}
                  {authMode === "reset" && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setAuthMode("login")}
                      className="p-0 h-auto text-sm mx-auto text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-[#ececf1]"
                    >
                      Back to login
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Settings Dialog */}
        <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
          <DialogContent className="sm:max-w-2xl bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 text-gray-900 dark:text-[#ececf1]">
                <Settings className="w-5 h-5" />
                <span>Profile & Settings</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Profile Section */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-[#565869] rounded-lg">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-[#ececf1]">{appUser?.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{appUser?.email}</p>
                  {appUser?.isPro && (
                    <Badge className="mt-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                      <Crown className="w-3 h-3 mr-1" />
                      Pro User
                    </Badge>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                >
                  Edit Profile
                </Button>
              </div>

              <Separator className="bg-gray-200 dark:bg-[#565869]" />

              {/* Settings Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Appearance */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-[#ececf1] flex items-center">
                    <PaletteIcon className="w-4 h-4 mr-2" />
                    Appearance
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</Label>
                      <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-700 dark:text-gray-300">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger className="w-24 h-8 bg-white dark:bg-[#565869] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]">
                          <span>EN</span>
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
                          <SelectItem value="en" className="text-gray-900 dark:text-[#ececf1]">
                            English
                          </SelectItem>
                          <SelectItem value="es" className="text-gray-900 dark:text-[#ececf1]">
                            Español
                          </SelectItem>
                          <SelectItem value="fr" className="text-gray-900 dark:text-[#ececf1]">
                            Français
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-[#ececf1] flex items-center">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-700 dark:text-gray-300">Push Notifications</Label>
                      <Switch
                        checked={appUser?.settings?.notifications}
                        onCheckedChange={(checked) => updateUserSettings({ notifications: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-700 dark:text-gray-300">Sound Effects</Label>
                      <Switch
                        checked={appUser?.settings?.soundEnabled}
                        onCheckedChange={(checked) => updateUserSettings({ soundEnabled: checked })}
                      />
                    </div>
                  </div>
                </div>

                {/* Privacy & Security */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-[#ececf1] flex items-center">
                    <ShieldIcon className="w-4 h-4 mr-2" />
                    Privacy & Security
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-gray-700 dark:text-gray-300">Auto-save Conversations</Label>
                      <Switch
                        checked={appUser?.settings?.autoSave}
                        onCheckedChange={(checked) => updateUserSettings({ autoSave: checked })}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </div>
                </div>

                {/* Help & Support */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-[#ececf1] flex items-center">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help & Support
                  </h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                    >
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Help Center
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-200 dark:bg-[#565869]" />

              {/* Danger Zone */}
              <div className="space-y-4">
                <h4 className="font-medium text-red-600 dark:text-red-400">Danger Zone</h4>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 dark:text-red-400 border-red-300 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
                  >
                    Clear All Data
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 dark:text-red-400 border-red-300 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Upgrade Dialog */}
        <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
          <DialogContent className="sm:max-w-4xl bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 text-gray-900 dark:text-[#ececf1]">
                <Crown className="w-5 h-5 text-yellow-500" />
                <span>Choose Your MornGPT Plan</span>
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative p-6 rounded-lg border-2 ${
                    plan.popular
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-[#565869] bg-white dark:bg-[#40414f]"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-500 text-white">Most Popular</Badge>
                    </div>
                  )}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-[#ececf1]">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-gray-900 dark:text-[#ececf1]">{plan.price}</span>
                      <span className="text-gray-500 dark:text-gray-400">/{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-900 dark:text-[#ececf1]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleUpgradeClick(plan)}
                    className={`w-full ${
                      plan.popular
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 text-white"
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Choose {plan.name}
                  </Button>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Payment Dialog */}
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent className="sm:max-w-md bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 text-gray-900 dark:text-[#ececf1]">
                <CreditCard className="w-5 h-5" />
                <span>Complete Your Purchase</span>
              </DialogTitle>
            </DialogHeader>

            {selectedPlan && (
              <div className="space-y-4">
                {/* Plan Summary */}
                <div className="p-4 bg-gray-50 dark:bg-[#565869] rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-[#ececf1]">{selectedPlan.name} Plan</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Monthly subscription</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-[#ececf1]">{selectedPlan.price}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">per month</div>
                    </div>
                  </div>
                </div>

                {/* Payment Form */}
                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber" className="text-gray-900 dark:text-[#ececf1]">
                      Card Number
                    </Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="bg-white dark:bg-[#565869] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry" className="text-gray-900 dark:text-[#ececf1]">
                        Expiry Date
                      </Label>
                      <Input
                        id="expiry"
                        type="text"
                        placeholder="MM/YY"
                        className="bg-white dark:bg-[#565869] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvc" className="text-gray-900 dark:text-[#ececf1]">
                        CVC
                      </Label>
                      <Input
                        id="cvc"
                        type="text"
                        placeholder="123"
                        className="bg-white dark:bg-[#565869] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="billingName" className="text-gray-900 dark:text-[#ececf1]">
                      Billing Name
                    </Label>
                    <Input
                      id="billingName"
                      type="text"
                      placeholder="John Doe"
                      className="bg-white dark:bg-[#565869] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="terms" required className="rounded" />
                    <Label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
                      I agree to the Terms of Service and Privacy Policy
                    </Label>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowPaymentDialog(false)}
                      className="flex-1 bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                      Pay {selectedPlan.price}
                    </Button>
                  </div>
                </form>

                <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                  <Lock className="w-3 h-3 inline mr-1" />
                  Your payment information is secure and encrypted
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Combined Profile & Settings Dialog */}
        <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869] flex flex-col">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle className="flex items-center space-x-2 text-gray-900 dark:text-[#ececf1]">
                <User className="w-5 h-5" />
                <span>Profile & Settings</span>
              </DialogTitle>
            </DialogHeader>

            <ScrollArea className="flex-1 max-h-[calc(90vh-120px)]" type="always">
              <div className="p-1" style={{ minHeight: '400px' }}>
                <Tabs value={activeSettingsTab} onValueChange={setActiveSettingsTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="profile" className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </TabsTrigger>
                    <TabsTrigger value="preferences" className="flex items-center space-x-2">
                      <Settings className="w-4 h-4" />
                      <span>Preferences</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="space-y-6">
                    {/* Profile Header */}
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-[#565869] rounded-lg">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-[#ececf1]">{appUser?.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{appUser?.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {appUser?.isPro && <Crown className="w-4 h-4 text-yellow-500" />}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {appUser?.isPro ? "Pro Member" : "Free User"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Profile Form */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-[#ececf1]">Personal Information</h4>
                        <div className="flex space-x-2">
                          {isEditingProfile && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setIsEditingProfile(false)}
                              className="text-gray-600 dark:text-gray-400"
                            >
                              Cancel
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              if (isEditingProfile) {
                                saveUserProfile()
                              } else {
                                setIsEditingProfile(true)
                              }
                            }}
                            disabled={isEditingProfile && profileSaveStatus === "saving"}
                            className="text-gray-600 dark:text-gray-400"
                          >
                            {isEditingProfile ? (
                              profileSaveStatus === "saving" ? "Saving..." : "Save"
                            ) : (
                              "Edit"
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="profileName" className="text-gray-900 dark:text-[#ececf1]">
                            Full Name
                          </Label>
                          <Input
                            id="profileName"
                            value={userProfileForm.name}
                            onChange={(e) => setUserProfileForm({ ...userProfileForm, name: e.target.value })}
                            disabled={!isEditingProfile}
                            className="bg-white dark:bg-[#565869] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                          />
                        </div>
                        <div>
                          <Label htmlFor="profileEmail" className="text-gray-900 dark:text-[#ececf1]">
                            Email Address
                          </Label>
                          <Input
                            id="profileEmail"
                            type="email"
                            value={userProfileForm.email}
                            onChange={(e) => setUserProfileForm({ ...userProfileForm, email: e.target.value })}
                            disabled={!isEditingProfile}
                            className="bg-white dark:bg-[#565869] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                          />
                        </div>
                        <div>
                          <Label htmlFor="profilePhone" className="text-gray-900 dark:text-[#ececf1]">
                            Phone Number
                          </Label>
                          <Input
                            id="profilePhone"
                            value={userProfileForm.phone}
                            onChange={(e) => setUserProfileForm({ ...userProfileForm, phone: e.target.value })}
                            disabled={!isEditingProfile}
                            className="bg-white dark:bg-[#565869] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                          />
                        </div>
                        <div>
                          <Label htmlFor="profileLanguage" className="text-gray-900 dark:text-[#ececf1]">
                            Language
                          </Label>
                          <Select
                            value={userProfileForm.language}
                            onValueChange={(value) => setUserProfileForm({ ...userProfileForm, language: value })}
                            disabled={!isEditingProfile}
                          >
                            <SelectTrigger className="bg-white dark:bg-[#565869] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]">
                              <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="es">Spanish</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                                <SelectItem value="de">German</SelectItem>
                                <SelectItem value="zh">Chinese</SelectItem>
                              </SelectContent>
                            </SelectTrigger>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="profileBio" className="text-gray-900 dark:text-[#ececf1]">
                          Bio
                        </Label>
                        <Textarea
                          id="profileBio"
                          value={userProfileForm.bio}
                          onChange={(e) => setUserProfileForm({ ...userProfileForm, bio: e.target.value })}
                          disabled={!isEditingProfile}
                          placeholder="Tell us about yourself..."
                          className="bg-white dark:bg-[#565869] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                        />
                      </div>



                      {profileSaveStatus === "success" && (
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                          <p className="text-sm text-green-600 dark:text-green-400">Profile updated successfully!</p>
                        </div>
                      )}

                      {profileSaveStatus === "error" && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                          <p className="text-sm text-red-600 dark:text-red-400">Failed to update profile. Please try again.</p>
                        </div>
                      )}
                    </div>

                    {/* Account Actions */}
                    <div className="border-t border-gray-200 dark:border-[#565869] pt-4">
                      <h4 className="font-medium text-gray-900 dark:text-[#ececf1] mb-3">Account Actions</h4>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowSettingsDialog(true)}
                          className="w-full justify-start bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Preferences & Settings
                        </Button>
                        {!appUser?.isPro && (
                          <Button
                            variant="outline"
                            onClick={() => setShowUpgradeDialog(true)}
                            className="w-full justify-start bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                          >
                            <Crown className="w-4 h-4 mr-2 text-yellow-500" />
                            Upgrade to Pro
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          onClick={confirmLogout}
                          className="w-full justify-start bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                        <Button
                          variant="outline"
                          onClick={confirmDeleteAccount}
                          className="w-full justify-start text-red-600 dark:text-red-400 border-red-300 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="preferences" className="space-y-4">
                    {/* Theme Settings */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 dark:text-[#ececf1] text-xs">Appearance</h4>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0">
                            <Label className="text-gray-900 dark:text-[#ececf1] text-xs font-normal">Theme</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">Choose your preferred theme</p>
                          </div>
                          <Select
                            value={appUser?.settings?.theme || "auto"}
                            onValueChange={(value) => {
                              updateUserSettings({ theme: value as "light" | "dark" | "auto" })
                              applyTheme(value as "light" | "dark" | "auto")
                            }}
                          >
                            <SelectTrigger className="w-32 bg-white dark:bg-[#565869] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]">
                              {appUser?.settings?.theme === "light" ? "Light" : 
                               appUser?.settings?.theme === "dark" ? "Dark" : "Auto"}
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="auto">Auto</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Notification Settings */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 dark:text-[#ececf1] text-xs">Notifications</h4>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0">
                            <Label className="text-gray-900 dark:text-[#ececf1] text-xs font-normal">Push Notifications</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">Receive notifications for new messages</p>
                          </div>
                          <Switch
                            checked={appUser?.settings?.notifications || false}
                            onCheckedChange={(checked) => updateUserSettings({ notifications: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0">
                            <Label className="text-gray-900 dark:text-[#ececf1] text-xs font-normal">Sound Effects</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">Play sounds for notifications</p>
                          </div>
                          <Switch
                            checked={appUser?.settings?.soundEnabled || false}
                            onCheckedChange={(checked) => updateUserSettings({ soundEnabled: checked })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Data Settings */}


                                          {/* Enhanced Delete Account */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900 dark:text-[#ececf1] text-xs">Account Security</h4>
                          <div className="px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded-full">
                            <span className="text-xs font-medium text-red-700 dark:text-red-300">Important</span>
                          </div>
                        </div>
                        <div className="border-t border-gray-200 dark:border-[#565869] pt-3">
                          <div className="space-y-2">
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                                  <Shield className="w-4 h-4 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                  <h5 className="font-medium text-red-900 dark:text-red-100 text-xs">Delete Account</h5>
                                  <p className="text-xs text-red-700 dark:text-red-300">Permanent account removal with 90-day restoration</p>
                                </div>
                              </div>
                              <p className="text-xs text-red-700 dark:text-red-300 mb-2 leading-tight">
                                This action will permanently delete your account and all associated data. 
                                You'll need to complete 2FA verification and write a confirmation phrase. 
                                Your data will be stored for 90 days for potential restoration.
                              </p>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={startEnhancedDeleteAccount}
                                  className="bg-white dark:bg-[#40414f] text-red-600 dark:text-red-400 border-red-300 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs"
                                >
                                  <Trash2 className="w-3 h-3 mr-1" />
                                  Delete Account
                                </Button>
                              </div>
                              <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-xs text-yellow-700 dark:text-yellow-300">
                                <strong>Security Note:</strong> Account deletion requires 2FA verification and confirmation phrase.
                              </div>
                            </div>
                            
                            {/* Account Restoration Support */}
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                              <div className="flex items-start space-x-2">
                                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                                <div>
                                  <h5 className="font-medium text-blue-900 dark:text-blue-100 text-xs mb-1">Need to Restore Your Account?</h5>
                                  <p className="text-xs text-blue-700 dark:text-blue-300 leading-tight mb-2">
                                    If you've deleted your account and need to restore it within 90 days, please contact our support team.
                                  </p>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Email:</span>
                                    <a 
                                      href="mailto:support@morngpt.com" 
                                      className="text-xs text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200"
                                    >
                                      support@morngpt.com
                                    </a>
                                  </div>
                                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                    Include your email address and deletion date for faster processing.
                                  </p>
                                </div>
                              </div>
                            </div>
                      </div>
                      
                      {/* Additional security information */}
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-start space-x-3">
                          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                          <div>
                            <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Account Security Features</h5>
                            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                              <li>• Enhanced 2FA verification for account deletion</li>
                              <li>• 90-day account restoration period</li>
                              <li>• Secure confirmation phrase requirement</li>
                              <li>• Automatic support team notification</li>
                              <li>• Data encryption and secure storage</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Extra space to ensure scrollbar appears */}
                  <div className="h-40"></div>

                    {/* Account Actions */}
                    <div className="border-t border-gray-200 dark:border-[#565869] pt-4">
                      <h4 className="font-medium text-gray-900 dark:text-[#ececf1] mb-3">Account Actions</h4>
                      <div className="space-y-2">
                        {!appUser?.isPro && (
                          <Button
                            variant="outline"
                            onClick={() => setShowUpgradeDialog(true)}
                            className="w-full justify-start bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                          >
                            <Crown className="w-4 h-4 mr-2 text-yellow-500" />
                            Upgrade to Pro
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          onClick={confirmLogout}
                          className="w-full justify-start bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                        <Button
                          variant="outline"
                          onClick={confirmDeleteAccount}
                          className="w-full justify-start text-red-600 dark:text-red-400 border-red-300 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
            </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* Logout Confirmation Dialog */}
        <Dialog open={showLogoutConfirmDialog} onOpenChange={setShowLogoutConfirmDialog}>
          <DialogContent className="sm:max-w-md bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 text-gray-900 dark:text-[#ececf1]">
                <LogOut className="w-5 h-5" />
                <span>Confirm Sign Out</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Are you sure you want to sign out? Your current session will be ended.
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowLogoutConfirmDialog(false)}
                  className="flex-1 bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setShowLogoutConfirmDialog(false)
                    handleLogout()
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Account Confirmation Dialog */}
        <Dialog open={showDeleteAccountDialog} onOpenChange={setShowDeleteAccountDialog}>
          <DialogContent className="sm:max-w-md bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                <AlertTriangle className="w-5 h-5" />
                <span>Delete Account</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <p className="text-sm text-red-600 dark:text-red-400">
                  <strong>Warning:</strong> This action cannot be undone. All your data, including chats, bookmarks, and settings will be permanently deleted.
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Are you absolutely sure you want to delete your account?
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteAccountDialog(false)}
                  className="flex-1 bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={deleteUserAccount}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Enhanced Delete Account Dialog */}
        <Dialog open={showEnhancedDeleteDialog} onOpenChange={setShowEnhancedDeleteDialog}>
          <DialogContent className="sm:max-w-lg bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                <Shield className="w-5 h-5" />
                <span>Enhanced Account Deletion</span>
              </DialogTitle>
            </DialogHeader>
            
            {deleteAccountStep === "warning" && (
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-900 dark:text-red-100 mb-2">Account Deletion Process</h4>
                      <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                        <li>• You must write a confirmation phrase exactly as shown</li>
                        <li>• Complete 2FA verification via email/SMS</li>
                        <li>• Your data will be stored for 90 days for restoration</li>
                        <li>• After 90 days, data is permanently deleted</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowEnhancedDeleteDialog(false)}
                    className="flex-1 bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setDeleteAccountStep("confirmation")}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {deleteAccountStep === "confirmation" && (
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                    <strong>Step 1:</strong> Write the following phrase exactly as shown to confirm deletion:
                  </p>
                  <div className="p-3 bg-white dark:bg-[#40414f] border border-yellow-300 dark:border-yellow-700 rounded font-mono text-sm text-gray-900 dark:text-[#ececf1]">
                    {deleteConfirmationPhrase}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmation-input" className="text-gray-900 dark:text-[#ececf1]">
                    Type the confirmation phrase:
                  </Label>
                  <Input
                    id="confirmation-input"
                    value={userConfirmationInput}
                    onChange={(e) => setUserConfirmationInput(e.target.value)}
                    placeholder="Enter the phrase exactly as shown above"
                    className="bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteAccountStep("warning")}
                    className="flex-1 bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={verifyDeleteAccount}
                    disabled={userConfirmationInput.trim() !== deleteConfirmationPhrase}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                  >
                    Verify & Continue
                  </Button>
                </div>
              </div>
            )}

            {deleteAccountStep === "2fa" && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">2FA Verification</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        A 6-digit verification code has been sent to your email/SMS. 
                        Enter it below to complete the deletion process.
                      </p>
                      <div className="mt-2 p-2 bg-white dark:bg-[#40414f] border border-blue-300 dark:border-blue-700 rounded font-mono text-sm text-gray-900 dark:text-[#ececf1]">
                        Code: {generatedTwoFACode}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="2fa-input" className="text-gray-900 dark:text-[#ececf1]">
                    6-Digit Verification Code:
                  </Label>
                  <Input
                    id="2fa-input"
                    value={twoFACode}
                    onChange={(e) => setTwoFACode(e.target.value)}
                    placeholder="000000"
                    maxLength={6}
                    className="bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteAccountStep("confirmation")}
                    className="flex-1 bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={confirmFinalDeletion}
                    disabled={twoFACode.length !== 6}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                  >
                    Verify & Delete
                  </Button>
                </div>
              </div>
            )}

            {deleteAccountStep === "final" && (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Account Deleted Successfully</h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Your account has been deleted. Your data will be stored for 90 days for potential restoration.
                      </p>
                      {accountDeletionDate && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                          Deleted on: {accountDeletionDate.toLocaleDateString()} at {accountDeletionDate.toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    <strong>Restoration Period:</strong> You can restore your account within 90 days by logging in again.
                  </p>
                </div>
                <Button
                  onClick={deleteUserAccount}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  Complete Deletion
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
