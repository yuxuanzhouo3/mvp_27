"use client"

/**
 * Copyright © 2025 Yuxuan Zhou. All rights reserved.
 * 
 * This file is part of the MornGPT Homepage application.
 * Unauthorized copying, distribution, or use is strictly prohibited.
 */

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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
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
  Upload,
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
  RefreshCw,
  Receipt,
  Smartphone,
  Monitor,
  Laptop,
  Tablet,
  XCircle,
  Keyboard,
  Navigation,
  Chrome,
  Scale,
  Film,
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
  { id: "l", name: "AI Lawyer", icon: Scale, description: "Legal consultation and document review", color: "bg-emerald-500" },
  { id: "n", name: "Entertainment Advisor", icon: Film, description: "Movie, music, and entertainment recommendations", color: "bg-fuchsia-500" },
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
  { name: "Llama 3.1 70B", provider: "Meta", description: "High-performance open source model", type: "free" },
  { name: "Gemini 1.5 Flash", provider: "Google", description: "Fast multimodal processing", type: "free" },
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
  {
    name: "GPT-4o",
    provider: "OpenAI",
    price: "$5/1M tokens",
    description: "Latest multimodal model",
    type: "premium",
  },
  {
    name: "Claude 3.5 Haiku",
    provider: "Anthropic",
    price: "$0.25/1M tokens",
    description: "Fast and cost-effective",
    type: "premium",
  },
  {
    name: "Gemini 1.5 Flash",
    provider: "Google",
    price: "$0.75/1M tokens",
    description: "Fast multimodal processing",
    type: "premium",
  },
  {
    name: "GPT-4 Turbo 128K",
    provider: "OpenAI",
    price: "$12/1M tokens",
    description: "Extended context window",
    type: "premium",
  },
]

const specializedProducts = [
  // Business & Professional
  { id: "a1", name: "Growth Advisory", icon: "📈", description: "Business development and market analysis", model: "Claude 3.5 Sonnet", category: "business", url: "https://mornhub.net" },
  { id: "b1", name: "Interview/Job", icon: "💼", description: "Career development and interview prep", model: "GPT-4o Mini", category: "career", url: "https://mornhub.pics/interview" },
  { id: "l1", name: "AI Lawyer", icon: "⚖️", description: "Legal consultation and document review", model: "Claude 3.5 Sonnet", category: "legal", url: "https://mornhub.pics/lawyer" },
  
  // Technology & Development
  { id: "c1", name: "AI Coder", icon: "💻", description: "Advanced coding assistant", model: "CodeLlama", category: "development", url: "https://mornhub.pics/coder" },
  { id: "h1", name: "Multi-GPT", icon: "🤖", description: "Orchestrates multiple AI models to solve complex tasks", model: "GPT-4o Mini", category: "productivity", url: "https://mornhub.pics/multigpt" },
  { id: "w1", name: "Content Generation", icon: "🧠", description: "Creative content creation", model: "GPT-4o Mini", category: "creative", url: "https://mornhub.pics" },
  
  // Health & Security
  { id: "e1", name: "Medical Advice", icon: "❤️", description: "Health consultation AI", model: "Claude 3.5 Sonnet", category: "health", url: "https://mornhub.pics/medical" },
  { id: "d1", name: "Content Detection", icon: "🛡️", description: "Fake content verification", model: "Claude 3.5 Sonnet", category: "security", url: "https://mornhub.pics/detect" },
  { id: "z1", name: "AI Protection", icon: "🔒", description: "AI safety and security", model: "Claude 3.5 Sonnet", category: "security", url: "https://mornhub.pics/protection" },
  
  // Education & Learning
  { id: "q1", name: "AI Teacher", icon: "🎓", description: "Personalized learning system", model: "Claude 3.5 Sonnet", category: "education", url: "https://mornhub.pics/teacher" },
  
  // Lifestyle & Entertainment
  { id: "n1", name: "AI Entertainment Advisor", icon: "🎬", description: "Movie, music, and entertainment recommendations", model: "GPT-4o Mini", category: "entertainment", url: "https://mornhub.pics/entertainment" },
  { id: "o1", name: "Housing", icon: "🏠", description: "Real estate and accommodation", model: "Claude 3.5 Sonnet", category: "lifestyle", url: "https://mornhub.homes" },
  { id: "t1", name: "Fashion", icon: "👕", description: "Personalized styling advice", model: "GPT-4o Mini", category: "lifestyle", url: "https://mornhub.pics/fashion" },
  { id: "u1", name: "Food & Dining", icon: "🍽️", description: "Restaurant and food discovery", model: "Claude 3.5 Sonnet", category: "food", url: "https://mornhub.pics/food" },
  
  // Travel & Shopping
  { id: "r1", name: "Travel Planning", icon: "✈️", description: "Intelligent travel assistance", model: "GPT-4o Mini", category: "travel", url: "https://mornhub.pics/travel" },
  { id: "s1", name: "Product Search", icon: "🔍", description: "Smart product recommendations", model: "Claude 3.5 Sonnet", category: "shopping", url: "https://mornhub.pics/search" },
  
  // Social & Networking
  { id: "p1", name: "Person Matching", icon: "👥", description: "Professional and personal matching", model: "GPT-4o Mini", category: "social", url: "https://mornhub.lat" },
]

const pricingPlans = [
  {
    name: "Basic",
    price: "$9.98",
    annualPrice: "$6.99",
    period: "month",
    features: ["Access to all MornGPT models", "100 Multi-GPT queries/month", "Basic support", "Chat history", "Remove Ads"],
  },
  {
    name: "Pro",
    price: "$39.98",
    annualPrice: "$27.99",
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
    price: "$99.98",
    annualPrice: "$69.99",
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
  isPaid: boolean
  avatar?: string
  settings?: {
    theme: "light" | "dark" | "auto"
    language: string
    notifications: boolean
    soundEnabled: boolean
    autoSave: boolean
    sendHotkey?: "enter" | "shift+enter" | "ctrl+enter" | "cmd+enter"
    shortcutsEnabled?: boolean
    adsEnabled?: boolean
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
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("annual")
  const [selectedPlanInDialog, setSelectedPlanInDialog] = useState<(typeof pricingPlans)[0] | null>(null)
  const [showBillingDialog, setShowBillingDialog] = useState(false)
  const [showPaymentEditDialog, setShowPaymentEditDialog] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<(typeof pricingPlans)[0] | null>(null)
  const [autoRenewEnabled, setAutoRenewEnabled] = useState(true)
  const [nextBillingDate, setNextBillingDate] = useState("2024-12-25")
  const [paymentMethod, setPaymentMethod] = useState({
    type: "card",
    last4: "4242",
    brand: "Visa",
    expiry: "12/25"
  })
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

  const [showLogoutConfirmDialog, setShowLogoutConfirmDialog] = useState(false)
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false)
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false)
  const [showFontDialog, setShowFontDialog] = useState(false)
  const [showShortcutDialog, setShowShortcutDialog] = useState(false)
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [userProfileForm, setUserProfileForm] = useState({
    name: ""
  })
  
  // Editable shortcuts state
  const [editingShortcut, setEditingShortcut] = useState<string>("")
  const [editingShortcutValue, setEditingShortcutValue] = useState<string>("")
  const [customShortcuts, setCustomShortcuts] = useState<Record<string, string>>({})
  const [shortcutConflict, setShortcutConflict] = useState<{shortcut: string, conflictingAction: string} | null>(null)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [resetConfirmData, setResetConfirmData] = useState<{ title: string, message: string, onConfirm: () => void } | null>(null)
  
  // Download section and ads state
  const [showDownloadSection, setShowDownloadSection] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<{platform: string, variant?: string} | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("credit-card")
  const [currentPlan, setCurrentPlan] = useState<"Basic" | "Pro" | "Enterprise" | null>(null)


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
    const savedPlan = localStorage.getItem("morngpt_current_plan")
    const savedCustomShortcuts = localStorage.getItem("customShortcuts")

    if (savedUser) {
      setAppUser(JSON.parse(savedUser))
      // Load user's chat sessions
      const savedChats = localStorage.getItem(`morngpt_chats_${JSON.parse(savedUser).id}`)
      if (savedChats) {
        setChatSessions(JSON.parse(savedChats))
      }
      // Load bookmarked messages
      const savedBookmarks = localStorage.getItem(`morngpt_bookmarks_${JSON.parse(savedUser).id}`)
      if (savedBookmarks) {
        setBookmarkedMessages(JSON.parse(savedBookmarks))
      }
    }

    if (savedPlan) {
      setCurrentPlan(savedPlan as "Basic" | "Pro" | "Enterprise")
    }

    if (savedTheme === "dark") {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }

    // Load custom shortcuts
    if (savedCustomShortcuts) {
      try {
        setCustomShortcuts(JSON.parse(savedCustomShortcuts))
      } catch (error) {
        console.error("Error loading custom shortcuts:", error)
      }
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
        isPaid: false,
        settings: {
          theme: "light",
          language: "en",
          notifications: true,
          soundEnabled: true,
          autoSave: true,
          sendHotkey: "enter",
          shortcutsEnabled: true,
          adsEnabled: true,
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
        isPaid: false,
        settings: {
          theme: "light",
          language: "en",
          notifications: true,
          soundEnabled: true,
          autoSave: true,
          sendHotkey: "enter",
          shortcutsEnabled: true,
          adsEnabled: true,
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
      isPaid: false,
      avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c",
      settings: {
        theme: "light",
        language: "en",
        notifications: true,
        soundEnabled: true,
        autoSave: true,
        sendHotkey: "enter",
        shortcutsEnabled: true,
        adsEnabled: true,
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
      const updatedUser = { ...appUser, isPro: true, isPaid: true }
      setAppUser(updatedUser)
      setCurrentPlan(selectedPlan.name as "Basic" | "Pro" | "Enterprise")
      localStorage.setItem("morngpt_user", JSON.stringify(updatedUser))
      localStorage.setItem("morngpt_current_plan", selectedPlan.name)
      setShowPaymentDialog(false)
      alert(`Successfully upgraded to ${selectedPlan.name} plan! Welcome to MornGPT Pro!`)
    }
  }

  const updateUserSettings = (newSettings: Partial<AppUser["settings"]>) => {
    if (appUser) {
      const updatedUser = {
        ...appUser,
        settings: { 
          theme: "light" as const,
          language: "en",
          notifications: true,
          soundEnabled: true,
          autoSave: true,
          sendHotkey: "enter" as const,
          shortcutsEnabled: true,
          adsEnabled: false,
          ...appUser.settings, 
          ...newSettings 
        },
      }
      setAppUser(updatedUser)
      localStorage.setItem("morngpt_user", JSON.stringify(updatedUser))
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
    // Clear all user data
    localStorage.clear()
    setAppUser(null)
    setShowDeleteAccountDialog(false)
    
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
    
    alert("Account deleted successfully")
  }

  const startEditingProfile = () => {
    if (!appUser) return
    setUserProfileForm({
      name: appUser.name
    })
    setIsEditingProfile(true)
  }

  const saveUserProfile = async () => {
    if (!appUser) return

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const updatedUser = {
        ...appUser,
        name: userProfileForm.name
      }

      setAppUser(updatedUser)
      localStorage.setItem("morngpt_user", JSON.stringify(updatedUser))
      setIsEditingProfile(false)
    } catch (error) {
      console.error("Failed to save profile:", error)
    }
  }

  const cancelEditingProfile = () => {
    setIsEditingProfile(false)
    setUserProfileForm({
      name: ""
    })
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

  // Download helper functions
  const handleDownload = () => {
    if (!selectedPlatform) return
    
    // Simulate download for different platforms and variants
    const downloadUrls = {
      ios: "https://apps.apple.com/app/morngpt",
      android: "https://play.google.com/store/apps/details?id=com.morngpt.app",
      chrome: "https://chrome.google.com/webstore/detail/morngpt",
      firefox: "https://addons.mozilla.org/en-US/firefox/addon/morngpt",
      edge: "https://microsoftedge.microsoft.com/addons/detail/morngpt",
      opera: "https://addons.opera.com/en/extensions/details/morngpt",
      safari: "https://apps.apple.com/app/morngpt-safari-extension",
      macos: {
        intel: "https://morngpt.com/downloads/morngpt-macos-intel.dmg",
        m: "https://morngpt.com/downloads/morngpt-macos-m.dmg"
      },
      windows: {
        x64: "https://morngpt.com/downloads/morngpt-windows-x64.exe",
        arm64: "https://morngpt.com/downloads/morngpt-windows-arm64.exe",
        x86: "https://morngpt.com/downloads/morngpt-windows-x86.exe"
      },
      linux: {
        deb: "https://morngpt.com/downloads/morngpt-linux.deb",
        appimage: "https://morngpt.com/downloads/morngpt-linux.AppImage",
        snap: "https://snapcraft.io/morngpt",
        flatpak: "https://flathub.org/apps/com.morngpt.app",
        aur: "https://aur.archlinux.org/packages/morngpt"
      },

    }
    
    let url: string | undefined
    
    if (selectedPlatform.platform === 'macos' && selectedPlatform.variant) {
      url = downloadUrls.macos[selectedPlatform.variant as keyof typeof downloadUrls.macos]
               } else if (selectedPlatform.platform === 'windows' && selectedPlatform.variant) {
             url = downloadUrls.windows[selectedPlatform.variant as keyof typeof downloadUrls.windows]
           } else if (selectedPlatform.platform === 'linux' && selectedPlatform.variant) {
             url = downloadUrls.linux[selectedPlatform.variant as keyof typeof downloadUrls.linux]
           } else {
      url = downloadUrls[selectedPlatform.platform as keyof typeof downloadUrls] as string
    }
    
    if (url) {
      window.open(url, '_blank')
    }
    
    // Close the download dialog and reset selection
    setShowDownloadSection(false)
    setSelectedPlatform(null)
  }

  const handlePlatformSelect = (platform: string, variant?: string) => {
    // If clicking the same platform/variant, deselect it
    if (selectedPlatform?.platform === platform && selectedPlatform?.variant === variant) {
      setSelectedPlatform(null)
    } else {
      // Otherwise, select the new platform/variant
      setSelectedPlatform({ platform, variant })
    }
  }

  const handleUpgradeFromAds = () => {
    setShowDownloadSection(false)
    setShowUpgradeDialog(true)
  }

  const handleSpecializedProductSelect = (product: typeof specializedProducts[0]) => {
    // Navigate to the product URL if available
    if (product.url) {
      window.open(product.url, '_blank')
      return
    }
    
    // Fallback to creating a new chat if no URL
    const model = externalModels.find(m => m.name === product.model)
    if (model) {
      createNewChat(product.category, "general", product.model)
      const newChatId = Date.now().toString()
      const newChat: ChatSession = {
        id: newChatId,
        title: `${product.name} - ${product.description}`,
        messages: [],
        model: product.model,
        modelType: "general",
        category: product.category,
        lastUpdated: new Date(),
        isModelLocked: false
      }
      setChatSessions(prev => [newChat, ...prev])
      setCurrentChatId(newChatId)
    }
  }

  // Helper function to check if the current key combination matches the hotkey setting
  const checkHotkeyMatch = (e: React.KeyboardEvent, hotkey: string) => {
    switch (hotkey) {
      case "enter":
        return e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.metaKey
      case "shift+enter":
        return e.key === "Enter" && e.shiftKey && !e.ctrlKey && !e.metaKey
      case "ctrl+enter":
        return e.key === "Enter" && e.ctrlKey && !e.shiftKey && !e.metaKey
      case "cmd+enter":
        return e.key === "Enter" && e.metaKey && !e.shiftKey && !e.ctrlKey
      default:
        return false
    }
  }

  // Helper function to check if a keyboard event matches a custom shortcut
  const checkShortcutMatch = (e: React.KeyboardEvent, action: string) => {
    // Get the current shortcut for this action (custom or default)
    const currentShortcut = getShortcutValue(action, getDefaultShortcut(action))
    
    console.log(`Checking shortcut for ${action}:`, {
      currentShortcut,
      key: e.key,
      ctrlKey: e.ctrlKey,
      metaKey: e.metaKey,
      shiftKey: e.shiftKey
    })
    
    if (!currentShortcut) {
      console.log(`No shortcut found for action: ${action}`)
      return false
    }
    
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
    const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey
    
    // Parse the shortcut string (e.g., "Ctrl/Cmd + K")
    const parts = currentShortcut.split(' + ')
    
    // Check modifiers
    if (parts.includes('Ctrl') || parts.includes('Cmd')) {
      if (!cmdOrCtrl) return false
    }
    if (parts.includes('Shift')) {
      if (!e.shiftKey) return false
    }
    if (parts.includes('Alt')) {
      if (!e.altKey) return false
    }
    
    // Check the main key
    const mainKey = parts[parts.length - 1]
    if (mainKey === 'Escape') {
      return e.key === 'Escape'
    } else if (mainKey === 'Enter') {
      return e.key === 'Enter'
    } else if (mainKey === 'Space') {
      return e.key === ' '
    } else if (mainKey === 'Tab') {
      return e.key === 'Tab'
    } else if (mainKey.startsWith('F') && mainKey.length > 1) {
      // Function keys
      return e.key === mainKey
    } else if (mainKey === '↑') {
      return e.key === 'ArrowUp'
    } else if (mainKey === '↓') {
      return e.key === 'ArrowDown'
    } else if (mainKey === '←') {
      return e.key === 'ArrowLeft'
    } else if (mainKey === '→') {
      return e.key === 'ArrowRight'
    } else {
      // Regular keys
      return e.key.toLowerCase() === mainKey.toLowerCase()
    }
  }

  // Comprehensive keyboard shortcuts handler
  const handleGlobalKeyDown = (e: React.KeyboardEvent) => {
    console.log("Global keydown event:", {
      key: e.key,
      ctrlKey: e.ctrlKey,
      metaKey: e.metaKey,
      shiftKey: e.shiftKey,
      target: e.target,
      appUser: !!appUser,
      shortcutsEnabled: appUser?.settings?.shortcutsEnabled
    })
    
    // Only handle shortcuts if they're enabled and user is logged in
    if (!appUser?.settings?.shortcutsEnabled || !appUser) {
      console.log("Shortcuts disabled or no user")
      return
    }

    // Prevent shortcuts when typing in input fields
    const target = e.target as HTMLElement
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
      console.log("Ignoring keypress in input field")
      return
    }

    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
    const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey

                // Simple test - if you press 't', it should log
            if (e.key === 't' && !cmdOrCtrl && !e.shiftKey) {
              console.log("Test key 't' pressed - shortcuts are working!")
            }

            // Open Billing Management
            if (checkShortcutMatch(e, "Open Billing")) {
              console.log("Opening Billing Management")
              setShowBillingDialog(true)
              return
            }

            // Open Privacy Settings
            if (checkShortcutMatch(e, "Open Privacy")) {
              console.log("Opening Privacy Settings")
              setShowPrivacyDialog(true)
              return
            }

    // Navigation shortcuts
    if (checkShortcutMatch(e, "New Chat")) {
      e.preventDefault()
      createNewChat()
    }

    if (checkShortcutMatch(e, "Search Chats")) {
      e.preventDefault()
      // Focus search in sidebar
      const searchInput = document.querySelector('input[placeholder="Search chats..."]') as HTMLInputElement
      if (searchInput) {
        searchInput.focus()
      }
    }

    // Model selection shortcuts
    if (checkShortcutMatch(e, "Deep Thinking")) {
      e.preventDefault()
      handleQuickAction("deep-thinking")
    }

    if (checkShortcutMatch(e, "Creative Ideas")) {
      e.preventDefault()
      handleQuickAction("creative")
    }

    if (checkShortcutMatch(e, "Analyze")) {
      e.preventDefault()
      handleQuickAction("analyze")
    }

    if (checkShortcutMatch(e, "Problem Solve")) {
      e.preventDefault()
      handleQuickAction("solve")
    }

    // UI shortcuts
    if (checkShortcutMatch(e, "Toggle Sidebar")) {
      e.preventDefault()
      setSidebarCollapsed(!sidebarCollapsed)
    }

    if (checkShortcutMatch(e, "Toggle Theme")) {
      e.preventDefault()
      toggleTheme()
    }

    if (checkShortcutMatch(e, "Settings")) {
      e.preventDefault()
      setShowSettingsDialog(true)
    }

    // Chat management shortcuts
    if (cmdOrCtrl && e.key === 'w') {
      e.preventDefault()
      if (currentChatId !== "1") {
        deleteChat(currentChatId)
      }
    }

    // Message shortcuts
    if (checkShortcutMatch(e, "Jump to Last")) {
      e.preventDefault()
      // Jump to last message
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    if (checkShortcutMatch(e, "Jump to Top")) {
      e.preventDefault()
      // Jump to top of chat
      const chatContainer = document.querySelector('.scroll-area') as HTMLElement
      if (chatContainer) {
        chatContainer.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    // File upload shortcut
    if (checkShortcutMatch(e, "Upload Files")) {
      e.preventDefault()
      document.getElementById('file-upload')?.click()
    }

    // Downloads shortcut
    if (checkShortcutMatch(e, "Downloads")) {
      e.preventDefault()
      setShowDownloadSection(true)
    }

    // Ask GPT shortcut
    if (checkShortcutMatch(e, "Ask GPT")) {
      e.preventDefault()
      setIsAskGPTOpen(true)
    }

    // Prompt History shortcut
    if (checkShortcutMatch(e, "Prompt History")) {
      e.preventDefault()
      setIsPromptHistoryOpen(true)
    }

    // Hotkeys menu shortcut
    if (checkShortcutMatch(e, "Hotkeys Menu")) {
      e.preventDefault()
      setShowShortcutsHelp(true)
    }

    // Ask GPT shortcut
    if (cmdOrCtrl && e.key === 'g') {
      e.preventDefault()
      setIsAskGPTOpen(!isAskGPTOpen)
    }

    // Bookmarks shortcut
    if (cmdOrCtrl && e.key === 'm') {
      e.preventDefault()
      // Toggle bookmarks view
      console.log("Toggle bookmarks - implement as needed")
    }

    // Download shortcut
    if (cmdOrCtrl && e.key === 'j') {
      e.preventDefault()
      setShowDownloadSection(!showDownloadSection)
    }

    // Help shortcut
    if (cmdOrCtrl && e.key === '/') {
      e.preventDefault()
      setShowShortcutsHelp(true)
    }

    // Escape key to close dialogs
    if (checkShortcutMatch(e, "Close Dialogs")) {
      setIsModelSelectorOpen(false)
      setIsPromptHistoryOpen(false)
      setIsAskGPTOpen(false)
      setShowSettingsDialog(false)
      setShowUpgradeDialog(false)
      setShowDownloadSection(false)
      setShowShortcutsHelp(false)
    }
  }

  // Shortcut editing functions
  const startEditingShortcut = (action: string, currentValue: string) => {
    setEditingShortcut(action)
    setEditingShortcutValue(currentValue)
    setShortcutConflict(null) // Clear any previous conflict warning
  }

  const saveShortcut = (action: string) => {
    // Just clear editing state since changes are saved immediately
    setEditingShortcut("")
    setEditingShortcutValue("")
    setShortcutConflict(null) // Clear conflict warning when saving
  }

  const resetToDefaults = () => {
    setCustomShortcuts({})
    localStorage.removeItem('customShortcuts')
  }

  const resetNavigationShortcuts = () => {
    const navigationActions = [
      "New Chat", "Search Chats", "Toggle Sidebar", "Settings", 
      "Toggle Theme", "Ask GPT", "Downloads", "Hotkeys Menu", "Close Dialogs"
    ]
    const newShortcuts = { ...customShortcuts }
    navigationActions.forEach(action => {
      delete newShortcuts[action]
    })
    setCustomShortcuts(newShortcuts)
    localStorage.setItem('customShortcuts', JSON.stringify(newShortcuts))
  }

  const resetAIModelShortcuts = () => {
    const aiModelActions = ["Deep Thinking", "Creative Ideas", "Analyze", "Problem Solve"]
    const newShortcuts = { ...customShortcuts }
    aiModelActions.forEach(action => {
      delete newShortcuts[action]
    })
    setCustomShortcuts(newShortcuts)
    localStorage.setItem('customShortcuts', JSON.stringify(newShortcuts))
  }

  const resetPromptsShortcuts = () => {
    const promptsActions = ["Send Prompt", "Jump to Last", "Jump to Top", "Upload Files", "Prompt History"]
    const newShortcuts = { ...customShortcuts }
    promptsActions.forEach(action => {
      delete newShortcuts[action]
    })
    setCustomShortcuts(newShortcuts)
    localStorage.setItem('customShortcuts', JSON.stringify(newShortcuts))
  }

  const resetBillingShortcuts = () => {
    const billingActions = ["Billing Management", "Payment History", "Update Payment", "Cancel Subscription", "Download Invoice"]
    const newShortcuts = { ...customShortcuts }
    billingActions.forEach(action => {
      delete newShortcuts[action]
    })
    setCustomShortcuts(newShortcuts)
    localStorage.setItem('customShortcuts', JSON.stringify(newShortcuts))
  }

  const resetPrivacyShortcuts = () => {
    const privacyActions = ["Privacy Settings", "Data Export", "Delete Account", "Cookie Settings", "Security Settings"]
    const newShortcuts = { ...customShortcuts }
    privacyActions.forEach(action => {
      delete newShortcuts[action]
    })
    setCustomShortcuts(newShortcuts)
    localStorage.setItem('customShortcuts', JSON.stringify(newShortcuts))
  }

  const exportHotkeys = () => {
    const exportData = {
      customShortcuts,
      userSettings: appUser?.settings,
      exportDate: new Date().toISOString(),
      version: "1.0"
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mornGPT-hotkeys-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const importHotkeys = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          try {
            const importData = JSON.parse(event.target?.result as string)
            if (importData.customShortcuts) {
              setCustomShortcuts(importData.customShortcuts)
              localStorage.setItem('customShortcuts', JSON.stringify(importData.customShortcuts))
            }
            if (importData.userSettings) {
              updateUserSettings(importData.userSettings)
            }
            // Show success message
            alert('Hotkeys imported successfully!')
          } catch (error) {
            alert('Error importing hotkeys. Please check the file format.')
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const showResetConfirmation = (title: string, message: string, onConfirm: () => void) => {
    setResetConfirmData({ title, message, onConfirm })
    setShowResetConfirm(true)
  }

  const handleResetConfirm = () => {
    if (resetConfirmData) {
      resetConfirmData.onConfirm()
    }
    setShowResetConfirm(false)
    setResetConfirmData(null)
  }

  const handleResetCancel = () => {
    setShowResetConfirm(false)
    setResetConfirmData(null)
  }

  const cancelEditingShortcut = () => {
    setEditingShortcut("")
    setEditingShortcutValue("")
    setShortcutConflict(null) // Clear conflict warning when canceling
  }

  const getDefaultShortcut = (action: string) => {
    const defaultShortcuts: Record<string, string> = {
      "New Chat": "Ctrl/Cmd + K",
      "Search Chats": "Ctrl/Cmd + F",
      "Toggle Sidebar": "Ctrl/Cmd + B",
      "Settings": "Ctrl/Cmd + S",
      "Toggle Theme": "Ctrl/Cmd + D",
      "Ask GPT": "Ctrl/Cmd + G",
      "Downloads": "Ctrl/Cmd + L",
      "Hotkeys Menu": "Ctrl/Cmd + H",
              "Open Billing": "Ctrl/Cmd + Q",
      "Open Privacy": "Ctrl/Cmd + Y",
              "Close Dialogs": "Ctrl/Cmd + I",
      "Deep Thinking": "Ctrl/Cmd + 1",
      "Creative Ideas": "Ctrl/Cmd + 2",
      "Analyze": "Ctrl/Cmd + 3",
      "Problem Solve": "Ctrl/Cmd + 4",
      "Send Prompt": "Enter",
      "Jump to Last": "Ctrl/Cmd + J",
      "Jump to Top": "Ctrl/Cmd + T",
      "Upload Files": "Ctrl/Cmd + U",
      "Prompt History": "Ctrl/Cmd + P",
      "Billing Management": "Ctrl/Cmd + M",
      "Payment History": "Ctrl/Cmd + I",
      "Update Payment": "Ctrl/Cmd + O",
      "Cancel Subscription": "Ctrl/Cmd + X",
      "Download Invoice": "Ctrl/Cmd + V",
      "Privacy Settings": "Ctrl/Cmd + Y",
      "Data Export": "Ctrl/Cmd + E",
      "Delete Account": "Ctrl/Cmd + Delete",
      "Cookie Settings": "Ctrl/Cmd + C",
      "Security Settings": "Ctrl/Cmd + Z",
      "Export Hotkeys": "Ctrl/Cmd + Shift + E"
    }
    return defaultShortcuts[action] || ""
  }

  const getShortcutValue = (action: string, defaultValue: string) => {
    return customShortcuts[action] || defaultValue
  }

  const findShortcutConflict = (newShortcut: string, currentAction: string) => {
    // Get all default shortcuts
    const allShortcuts = [
      { action: "New Chat", current: "Ctrl/Cmd + K" },
      { action: "Search Chats", current: "Ctrl/Cmd + F" },
      { action: "Toggle Sidebar", current: "Ctrl/Cmd + B" },
      { action: "Settings", current: "Ctrl/Cmd + S" },
      { action: "Toggle Theme", current: "Ctrl/Cmd + D" },
      { action: "Ask GPT", current: "Ctrl/Cmd + G" },
      { action: "Downloads", current: "Ctrl/Cmd + L" },
      { action: "Hotkeys Menu", current: "Ctrl/Cmd + H" },
              { action: "Open Billing", current: "Ctrl/Cmd + Q" },
      { action: "Open Privacy", current: "Ctrl/Cmd + Y" },
              { action: "Close Dialogs", current: "Ctrl/Cmd + I" },
      { action: "Deep Thinking", current: "Ctrl/Cmd + 1" },
      { action: "Creative Ideas", current: "Ctrl/Cmd + 2" },
      { action: "Analyze", current: "Ctrl/Cmd + 3" },
      { action: "Problem Solve", current: "Ctrl/Cmd + 4" },
      { action: "Send Prompt", current: "Enter" },
      { action: "Jump to Last", current: "Ctrl/Cmd + J" },
      { action: "Jump to Top", current: "Ctrl/Cmd + T" },
      { action: "Upload Files", current: "Ctrl/Cmd + U" },
      { action: "Prompt History", current: "Ctrl/Cmd + P" },
      { action: "Billing Management", current: "Ctrl/Cmd + M" },
      { action: "Payment History", current: "Ctrl/Cmd + I" },
      { action: "Update Payment", current: "Ctrl/Cmd + O" },
      { action: "Cancel Subscription", current: "Ctrl/Cmd + X" },
      { action: "Download Invoice", current: "Ctrl/Cmd + V" },
      { action: "Privacy Settings", current: "Ctrl/Cmd + Y" },
      { action: "Data Export", current: "Ctrl/Cmd + E" },
      { action: "Delete Account", current: "Ctrl/Cmd + Delete" },
      { action: "Cookie Settings", current: "Ctrl/Cmd + C" },
      { action: "Security Settings", current: "Ctrl/Cmd + Z" },
      { action: "Export Hotkeys", current: "Ctrl/Cmd + Shift + E" }
    ]

    // Check against default shortcuts
    for (const shortcut of allShortcuts) {
      if (shortcut.action !== currentAction && shortcut.current === newShortcut) {
        return shortcut.action
      }
    }

    // Check against custom shortcuts
    for (const [action, customShortcut] of Object.entries(customShortcuts)) {
      if (action !== currentAction && customShortcut === newShortcut) {
        return action
      }
    }

    return null
  }

  const handleShortcutKeyDown = (e: React.KeyboardEvent, action: string) => {
    e.preventDefault()
    
    if (e.key === 'Enter') {
      saveShortcut(action)
    } else if (e.key === 'Escape') {
      cancelEditingShortcut()
    } else {
      // Capture keyboard input and build shortcut string
      const modifiers = []
      if (e.ctrlKey) modifiers.push('Ctrl')
      if (e.metaKey) modifiers.push('Cmd')
      if (e.shiftKey) modifiers.push('Shift')
      if (e.altKey) modifiers.push('Alt')
      
      let key = e.key
      
      // Handle special keys
      if (e.key === ' ') key = 'Space'
      else if (e.key === 'Tab') key = 'Tab'
      else if (e.key === 'Backspace') key = 'Backspace'
      else if (e.key === 'Delete') key = 'Delete'
      else if (e.key === 'ArrowUp') key = '↑'
      else if (e.key === 'ArrowDown') key = '↓'
      else if (e.key === 'ArrowLeft') key = '←'
      else if (e.key === 'ArrowRight') key = '→'
      else if (e.key === 'Home') key = 'Home'
      else if (e.key === 'End') key = 'End'
      else if (e.key === 'PageUp') key = 'PageUp'
      else if (e.key === 'PageDown') key = 'PageDown'
      else if (e.key === 'Insert') key = 'Insert'
      else if (e.key === 'F1') key = 'F1'
      else if (e.key === 'F2') key = 'F2'
      else if (e.key === 'F3') key = 'F3'
      else if (e.key === 'F4') key = 'F4'
      else if (e.key === 'F5') key = 'F5'
      else if (e.key === 'F6') key = 'F6'
      else if (e.key === 'F7') key = 'F7'
      else if (e.key === 'F8') key = 'F8'
      else if (e.key === 'F9') key = 'F9'
      else if (e.key === 'F10') key = 'F10'
      else if (e.key === 'F11') key = 'F11'
      else if (e.key === 'F12') key = 'F12'
      else if (e.key === 'Escape') key = 'Escape'
      else if (e.key === 'Enter') key = 'Enter'
      else if (e.key === 'Tab') key = 'Tab'
      else if (e.key === 'CapsLock') key = 'CapsLock'
      else if (e.key === 'NumLock') key = 'NumLock'
      else if (e.key === 'ScrollLock') key = 'ScrollLock'
      else if (e.key === 'Pause') key = 'Pause'
      else if (e.key === 'PrintScreen') key = 'PrintScreen'
      else if (e.key === 'ContextMenu') key = 'ContextMenu'
      else if (e.key === 'Meta') return // Ignore Meta key alone
      else if (e.key === 'Alt') return // Ignore Alt key alone
      else if (e.key === 'Control') return // Ignore Control key alone
      else if (e.key === 'Shift') return // Ignore Shift key alone
      else if (e.key === 'Dead') return // Ignore dead keys
      else if (e.key.length === 1) {
        // Single character keys
        key = e.key.toUpperCase()
      }
      
      // Build the shortcut string
      const shortcutString = modifiers.length > 0 ? `${modifiers.join(' + ')} + ${key}` : key
      
      // Check for conflicts
      const conflictingAction = findShortcutConflict(shortcutString, action)
      
      if (conflictingAction) {
        // Show conflict warning
        setShortcutConflict({
          shortcut: shortcutString,
          conflictingAction: conflictingAction
        })
        setEditingShortcutValue(shortcutString)
        // Don't save, just show the warning
        return
      } else {
        // Clear any previous conflict warning
        setShortcutConflict(null)
      }
      
      // Update the input value
      setEditingShortcutValue(shortcutString)
      
      // Save immediately if no conflict
      if (!findShortcutConflict(shortcutString, action)) {
        const newShortcuts = {
          ...customShortcuts,
          [action]: shortcutString
        }
        setCustomShortcuts(newShortcuts)
        localStorage.setItem('customShortcuts', JSON.stringify(newShortcuts))
      }
    }
  }

  // Helper function to render shortcut display with hover-to-edit
  const renderShortcutDisplay = (shortcut: { action: string, current: string }) => {
    const isEditing = editingShortcut === shortcut.action
    const currentValue = isEditing ? editingShortcutValue : getShortcutValue(shortcut.action, shortcut.current)
    
    return (
      <div className="relative group">
        <kbd 
          className={`px-2 py-1 text-[10px] rounded cursor-pointer transition-colors ${
            isEditing 
              ? "bg-blue-100 dark:bg-blue-900 border border-blue-500 opacity-0" 
              : "bg-gray-200 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 hover:border hover:border-blue-500"
          }`}
          title="Click or hover to edit"
          onClick={() => {
            startEditingShortcut(shortcut.action, getShortcutValue(shortcut.action, shortcut.current))
          }}
        >
          {getShortcutValue(shortcut.action, shortcut.current)}
        </kbd>
        <input
          type="text"
          className={`absolute inset-0 px-2 py-1 text-[10px] bg-blue-100 dark:bg-blue-900 border border-blue-500 rounded transition-opacity duration-200 ${
            isEditing ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          value={currentValue}
          onChange={(e) => setEditingShortcutValue(e.target.value)}
          onKeyDown={(e) => handleShortcutKeyDown(e, shortcut.action)}
          onBlur={() => saveShortcut(shortcut.action)}
          onMouseEnter={(e) => {
            e.currentTarget.focus()
            startEditingShortcut(shortcut.action, getShortcutValue(shortcut.action, shortcut.current))
          }}
          onClick={() => {
            startEditingShortcut(shortcut.action, getShortcutValue(shortcut.action, shortcut.current))
          }}
        />
      </div>
    )
  }

  return (
    <div 
      className={`min-h-screen ${isDarkMode ? "dark" : ""}`}
      onKeyDown={handleGlobalKeyDown}
      tabIndex={-1}
    >
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
            
            {/* Download Section */}
            <div className="flex flex-col items-center space-y-2 px-1 pt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDownloadSection(!showDownloadSection)}
                className="w-6 h-6 rounded-sm text-gray-900 dark:text-[#ececf1] hover:bg-gray-100 dark:hover:bg-[#565869]"
                title="Download Apps"
              >
                <Download className="w-3 h-3" />
              </Button>
            </div>
            
            {/* Ads Toggle (for all users) */}
            {appUser && (
              <div className="flex justify-center px-1 pb-1 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateUserSettings({ adsEnabled: !(appUser?.settings?.adsEnabled ?? false) })}
                  className={`w-6 h-6 rounded-sm ${
                    (appUser?.settings?.adsEnabled ?? false)
                      ? "text-gray-900 dark:text-[#ececf1] hover:bg-gray-100 dark:hover:bg-[#565869]" 
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                  title={(appUser?.settings?.adsEnabled ?? false) ? "Hide Ads" : "Show Ads"}
                >
                  {(appUser?.settings?.adsEnabled ?? false) ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </Button>
              </div>
            )}

            {/* Specialized Products (when ads are disabled) */}
            {!(appUser?.settings?.adsEnabled ?? false) && (
              <div className="flex flex-col items-center space-y-0.5 px-1">
                <ScrollArea className="w-full max-h-[calc(100vh-120px)]">
                  <div className="grid grid-cols-1 gap-0.5 w-full pb-4 justify-items-center pt-1">
                    {specializedProducts.map((product) => (
                      <Popover key={product.id}>
                        <PopoverTrigger asChild>
                          <button
                            className="w-7 h-7 rounded-sm border border-gray-200 dark:border-[#565869] hover:bg-gray-50 dark:hover:bg-[#565869] transition-colors flex items-center justify-center group focus:outline-none focus:ring-1 focus:ring-blue-500"
                            onMouseEnter={(e) => e.currentTarget.focus()}
                          >
                            <span className="text-[10px]">{product.icon}</span>
                          </button>
                        </PopoverTrigger>
                        <PopoverContent 
                          side="right" 
                          align="center"
                          className="w-56 p-3 bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869] shadow-lg cursor-pointer z-50"
                          onClick={() => handleSpecializedProductSelect(product)}
                          onOpenAutoFocus={(e) => e.preventDefault()}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{product.icon}</span>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-[#ececf1] text-sm">{product.name}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{product.description}</p>
                              </div>
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500">
                              Powered by {product.model}
                            </div>
                            {product.url && (
                              <button
                                onClick={() => handleSpecializedProductSelect(product)}
                                className="w-full text-left text-xs text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 cursor-pointer"
                              >
                                Click to visit: {product.url.replace('https://', '')}
                              </button>
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
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
              <div className="p-3 border-b border-gray-200 dark:border-[#565869] space-y-2">
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

              <ScrollArea className="flex-1 max-h-[calc(100vh-180px)]" ref={sidebarScrollRef}>
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
                                                              {appUser.isPro && <Crown className="w-4 h-4 text-gray-900 dark:text-gray-100" />}
                              <User className="w-4 h-4" />
                              <span className="truncate">{appUser.name}</span>
                              <ChevronDown className="w-3 h-3" />
                            </div>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869] p-1">
                          <div className="space-y-1">

                            {appUser && (
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-gray-900 dark:text-[#ececf1] hover:bg-gray-100 dark:hover:bg-[#565869]"
                                onClick={() => setShowSettingsDialog(true)}
                            >
                                <Settings className="w-4 h-4 mr-2" />
                                Setting
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
                      const currentHotkey = appUser?.settings?.sendHotkey || "enter"
                      if (checkHotkeyMatch(e, currentHotkey)) {
                        e.preventDefault()
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
                                Auto select AI assistant for general conversations
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
                            <div className="grid grid-cols-3 gap-1">
                              {externalModels.map((model, index) => {
                                                const isPaidModel = model.type !== "free"
                const canAccess = !isPaidModel || (appUser && appUser.isPaid)
                                
                                return (
                                  <div
                                    key={index}
                                    className={`p-1.5 rounded border ${
                                      canAccess 
                                        ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-[#565869]" 
                                        : "cursor-not-allowed opacity-60"
                                    } ${
                                      selectedModel === model.name
                                        ? model.type === "free"
                                          ? "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700"
                                          : "bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700"
                                        : "border-gray-200 dark:border-[#565869]"
                                    }`}
                                    onClick={() => {
                                      if (canAccess) {
                                        handleModelChange("external", undefined, model.name)
                                      } else {
                                        // Show upgrade prompt for paid models
                                        handleUpgradeClick(pricingPlans[1]) // Pro plan
                                      }
                                    }}
                                  >
                                    <div className="flex items-center justify-between mb-0.5">
                                      <p className="text-[10px] font-medium truncate text-gray-900 dark:text-[#ececf1]">
                                        {model.name}
                                      </p>
                                      <div className="flex items-center space-x-1">
                                        {!canAccess && isPaidModel && (
                                          <Lock className="w-2.5 h-2.5 text-gray-400" />
                                        )}
                                        <Badge className={`text-[8px] px-0.5 py-0 h-3 ${
                                          model.type === "free"
                                            ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100"
                                            : "bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100"
                                        }`}>
                                          {model.type === "free" ? "F" : "$"}
                                        </Badge>
                                      </div>
                                    </div>
                                    {model.type !== "free" && (
                                      <p className="text-[8px] text-purple-600 dark:text-purple-400 mb-0.5 truncate">
                                        {model.price}
                                      </p>
                                    )}
                                    <p className="text-[8px] text-gray-600 dark:text-gray-300 line-clamp-1">
                                      {model.description}
                                    </p>
                                    {!canAccess && isPaidModel && (
                                      <p className="text-[8px] text-red-500 dark:text-red-400 mt-0.5">
                                        Paid required
                                      </p>
                                    )}
                                  </div>
                                )
                              })}
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
          <DialogContent className="sm:max-w-lg max-h-[80vh] bg-gradient-to-br from-white to-gray-50 dark:from-[#40414f] dark:to-[#2d2d30] border-gray-200 dark:border-[#565869] shadow-2xl">
                          <DialogHeader className="pb-4">
            </DialogHeader>
                          <div className="space-y-1 py-1">
              {/* Username Section - Moved Up */}
              {isEditingProfile && (
                <div className="bg-white dark:bg-[#40414f] rounded-xl p-4 border border-gray-100 dark:border-[#565869] shadow-sm">
                  <div className="flex items-center justify-between">
                <div className="flex-1">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</Label>
                      <Input
                        id="name"
                        value={userProfileForm.name}
                        onChange={(e) => setUserProfileForm({...userProfileForm, name: e.target.value})}
                        className="mt-1 bg-white dark:bg-[#40414f] border-gray-300 dark:border-[#565869] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter username"
                      />
                </div>
                    <div className="flex flex-col space-y-1 ml-4">
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                        onClick={saveUserProfile}
                      >
                        Save
                      </Button>
                <Button
                  variant="outline"
                  size="sm"
                        className="bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869] hover:bg-gray-50 dark:hover:bg-[#565869] shadow-sm"
                        onClick={cancelEditingProfile}
                >
                        Cancel
                </Button>
              </div>
                  </div>
                </div>
              )}



              {/* 5 Organized Settings Sections - 2 Column Layout - Compact */}
              <div className="flex flex-col space-y-2">
                {/* Account Section - Outside */}
                <div className="bg-white dark:bg-[#40414f] rounded-lg p-3 border border-gray-100 dark:border-[#565869] shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm text-gray-700 dark:text-gray-300">Account</Label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Your profile & subscription</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-900 dark:text-[#ececf1]">{appUser?.email}</span>
                      <div className="w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
                          {appUser?.isPaid 
                            ? (currentPlan === "Basic" ? "B" : 
                               currentPlan === "Pro" ? "P" : 
                               currentPlan === "Enterprise" ? "E" : "$")
                            : "F"
                          }
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-6 h-6 p-0 bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700"
                        onClick={() => setShowUpgradeDialog(true)}
                      >
                        <Crown className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Settings Section */}
                <div className="bg-white dark:bg-[#40414f] rounded-lg p-3 border border-gray-100 dark:border-[#565869] shadow-sm hover:shadow-md transition-shadow">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm text-gray-700 dark:text-gray-300">Theme</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Choose your preferred theme</p>
                      </div>
                      <Select defaultValue={isDarkMode ? "dark" : "light"} onValueChange={(value) => {
                        if (value === "light" || value === "dark") {
                          setIsDarkMode(value === "dark")
                        }
                      }}>
                        <SelectTrigger className="w-32 h-7 bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]">
                          <span className="text-xs">{isDarkMode ? "Dark" : "Light"}</span>
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
                          <SelectItem value="light" className="text-xs text-gray-900 dark:text-[#ececf1]">Light</SelectItem>
                          <SelectItem value="dark" className="text-xs text-gray-900 dark:text-[#ececf1]">Dark</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                      <Label className="text-sm text-gray-700 dark:text-gray-300">Language</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Choose your preferred language</p>
                      </div>
                      <Select defaultValue="en" onValueChange={(value) => {
                        // Handle language change
                        console.log("Language changed to:", value)
                      }}>
                        <SelectTrigger className="w-32 h-7 bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]">
                          <span className="text-xs">EN</span>
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
                          <SelectItem value="en" className="text-xs text-gray-900 dark:text-[#ececf1]">English</SelectItem>
                          <SelectItem value="zh" className="text-xs text-gray-900 dark:text-[#ececf1]">中文 (Chinese)</SelectItem>
                          <SelectItem value="es" className="text-xs text-gray-900 dark:text-[#ececf1]">Español (Spanish)</SelectItem>
                          <SelectItem value="fr" className="text-xs text-gray-900 dark:text-[#ececf1]">Français (French)</SelectItem>
                          <SelectItem value="de" className="text-xs text-gray-900 dark:text-[#ececf1]">Deutsch (German)</SelectItem>
                          <SelectItem value="ja" className="text-xs text-gray-900 dark:text-[#ececf1]">日本語 (Japanese)</SelectItem>
                          <SelectItem value="ko" className="text-xs text-gray-900 dark:text-[#ececf1]">한국어 (Korean)</SelectItem>
                          <SelectItem value="pt" className="text-xs text-gray-900 dark:text-[#ececf1]">Português (Portuguese)</SelectItem>
                          <SelectItem value="ru" className="text-xs text-gray-900 dark:text-[#ececf1]">Русский (Russian)</SelectItem>
                          <SelectItem value="ar" className="text-xs text-gray-900 dark:text-[#ececf1]">العربية (Arabic)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm text-gray-700 dark:text-gray-300">Font Family</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Choose your preferred font</p>
                  </div>
                      <Select defaultValue="arial" onValueChange={(value) => {
                        // Handle font family change
                        console.log("Font family changed to:", value)
                      }}>
                        <SelectTrigger className="w-32 h-7 bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]">
                          <span className="text-xs">Arial</span>
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
                          <SelectItem value="arial" className="text-xs text-gray-900 dark:text-[#ececf1]">Arial</SelectItem>
                          <SelectItem value="helvetica" className="text-xs text-gray-900 dark:text-[#ececf1]">Helvetica</SelectItem>
                          <SelectItem value="times" className="text-xs text-gray-900 dark:text-[#ececf1]">Times New Roman</SelectItem>
                          <SelectItem value="georgia" className="text-xs text-gray-900 dark:text-[#ececf1]">Georgia</SelectItem>
                          <SelectItem value="verdana" className="text-xs text-gray-900 dark:text-[#ececf1]">Verdana</SelectItem>
                          <SelectItem value="courier" className="text-xs text-gray-900 dark:text-[#ececf1]">Courier New</SelectItem>
                        </SelectContent>
                      </Select>
                </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm text-gray-700 dark:text-gray-300">Font Size</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Choose your preferred size</p>
                    </div>
                      <Select defaultValue="14" onValueChange={(value) => {
                        // Handle font size change
                        console.log("Font size changed to:", value)
                      }}>
                        <SelectTrigger className="w-32 h-7 bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]">
                          <span className="text-xs">14px</span>
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
                          <SelectItem value="12" className="text-xs text-gray-900 dark:text-[#ececf1]">12px</SelectItem>
                          <SelectItem value="14" className="text-xs text-gray-900 dark:text-[#ececf1]">14px</SelectItem>
                          <SelectItem value="16" className="text-xs text-gray-900 dark:text-[#ececf1]">16px</SelectItem>
                          <SelectItem value="18" className="text-xs text-gray-900 dark:text-[#ececf1]">18px</SelectItem>
                          <SelectItem value="20" className="text-xs text-gray-900 dark:text-[#ececf1]">20px</SelectItem>
                          <SelectItem value="24" className="text-xs text-gray-900 dark:text-[#ececf1]">24px</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {appUser?.isPro && (
                    <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm text-gray-700 dark:text-gray-300">Ad-Free Experience</Label>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Premium feature for Pro users</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-32 h-7 bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869] hover:bg-gray-50 dark:hover:bg-[#565869]"
                      onClick={() => updateUserSettings({ adsEnabled: !(appUser?.settings?.adsEnabled ?? false) })}
                    >
                          <span className="text-xs">{appUser?.settings?.adsEnabled ?? false ? "Turn Off Ads" : "Turn On Ads"}</span>
                    </Button>
                  </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm text-gray-700 dark:text-gray-300">Hotkeys</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Customize keyboard shortcuts</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-32 h-7 bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869] hover:bg-gray-50 dark:hover:bg-[#565869]"
                        onClick={() => setShowShortcutsHelp(true)}
                      >
                        <span className="text-xs">{appUser?.settings?.shortcutsEnabled ?? true ? "Enabled" : "Disabled"}</span>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm text-gray-700 dark:text-gray-300">Billing</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Manage subscription & payments</p>
                      </div>
                    <Button
                      variant="outline"
                      size="sm"
                        className="w-32 h-7 bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869] hover:bg-gray-50 dark:hover:bg-[#565869]"
                        onClick={() => setShowBillingDialog(true)}
                    >
                        <span className="text-xs">Manage</span>
                    </Button>
                  </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm text-gray-700 dark:text-gray-300">Privacy</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Security & account protection</p>
                </div>
                  <Button
                    variant="outline"
                    size="sm"
                        className="w-32 h-7 bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869] hover:bg-gray-50 dark:hover:bg-[#565869]"
                        onClick={() => setShowPrivacyDialog(true)}
                  >
                        <span className="text-xs">Settings</span>
                  </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm text-gray-700 dark:text-gray-300">Support</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Get help & contact us</p>
                      </div>
                  <Button
                    variant="outline"
                    size="sm"
                        className="w-32 h-7 bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869] hover:bg-gray-50 dark:hover:bg-[#565869]"
                  >
                        <span className="text-xs">Contact</span>
                  </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Hotkeys Configuration Dialog */}
        <Dialog open={showShortcutsHelp} onOpenChange={setShowShortcutsHelp}>
                        <DialogContent className="sm:max-w-7xl max-h-[95vh] bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 text-gray-900 dark:text-[#ececf1]">
                <Keyboard className="w-4 h-4 text-blue-500" />
                <span className="text-lg">Customize Hotkeys</span>
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
                Configure your keyboard shortcuts for maximum productivity. Use Cmd on Mac, Ctrl on Windows/Linux.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 overflow-y-auto max-h-[80vh]">
              {/* Global Settings */}
              <div className="p-3 bg-gray-50 dark:bg-[#565869] rounded-lg border border-gray-200 dark:border-[#565869]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500">
                      <Settings className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-[#ececf1]">Global Settings</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Manage shortcuts and preferences</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 bg-gray-50 dark:bg-gray-700 rounded-lg px-2 py-1 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer h-7" onClick={() => showResetConfirmation(
                      'Reset All Hotkeys',
                      'Are you sure you want to reset ALL hotkeys to their default values? This action cannot be undone.',
                      resetToDefaults
                    )}>
                      <RefreshCw className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Reset All</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-gray-50 dark:bg-gray-700 rounded-lg px-2 py-1 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer h-7" onClick={importHotkeys}>
                      <Upload className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Import</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-gray-50 dark:bg-gray-700 rounded-lg px-2 py-1 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer h-7" onClick={exportHotkeys}>
                      <Download className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Export</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 rounded-lg px-2 py-1 border border-gray-200 dark:border-gray-600 h-7">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-500">
                        {(appUser?.settings?.shortcutsEnabled ?? true) ? (
                          <Keyboard className="w-3 h-3 text-white" />
                        ) : (
                          <X className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {(appUser?.settings?.shortcutsEnabled ?? true) ? 'Shortcuts Active' : 'Shortcuts Disabled'}
                        </span>
                      </div>
                      <Switch 
                        checked={appUser?.settings?.shortcutsEnabled ?? true}
                        onCheckedChange={(checked) => updateUserSettings({ shortcutsEnabled: checked })}
                        className="data-[state=checked]:bg-gray-600 data-[state=unchecked]:bg-gray-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Conflict Warning */}
              {shortcutConflict && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <div>
                      <p className="text-sm font-medium text-red-800 dark:text-red-200">
                        Shortcut Conflict Detected!
                      </p>
                      <p className="text-xs text-red-600 dark:text-red-300">
                        "{shortcutConflict.shortcut}" is already used by "{shortcutConflict.conflictingAction}". 
                        Please choose a different shortcut.
                      </p>
                    </div>
                  </div>
                </div>
              )}



                                              {/* Navigation & Interface Controls */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-[#ececf1] flex items-center">
                  <Navigation className="w-3 h-3 mr-1" />
                  Navigation & Interface Controls
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => showResetConfirmation(
                      'Reset Navigation Shortcuts',
                      'Are you sure you want to reset all Navigation & Interface Controls shortcuts to their default values? This action cannot be undone.',
                      resetNavigationShortcuts
                    )}
                    className="text-xs px-2 py-1 h-6 ml-2"
                  >
                    Reset
                  </Button>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  {[
                    { action: "New Chat", current: "Ctrl/Cmd + K", description: "Create a new conversation" },
                    { action: "Search Chats", current: "Ctrl/Cmd + F", description: "Focus the search bar" },
                    { action: "Toggle Sidebar", current: "Ctrl/Cmd + B", description: "Show/hide the sidebar" },
                    { action: "Settings", current: "Ctrl/Cmd + S", description: "Open settings dialog" },
                    { action: "Toggle Theme", current: "Ctrl/Cmd + D", description: "Switch light/dark mode" },
                    { action: "Ask GPT", current: "Ctrl/Cmd + G", description: "Open Ask GPT dialog" },
                    { action: "Downloads", current: "Ctrl/Cmd + L", description: "Open download section" },
                    { action: "Hotkeys Menu", current: "Ctrl/Cmd + H", description: "Open hotkeys configuration" },
                                         { action: "Open Billing", current: "Ctrl/Cmd + Q", description: "Open billing management" },
                    { action: "Open Privacy", current: "Ctrl/Cmd + Y", description: "Open privacy settings" },
                                          { action: "Close Dialogs", current: "Ctrl/Cmd + I", description: "Close any open dialog" }
                  ].map((shortcut) => (
                    <div key={shortcut.action} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-[#565869] rounded-lg">
                      <div>
                        <span className="text-xs font-medium text-gray-900 dark:text-[#ececf1]">{shortcut.action}</span>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{shortcut.description}</p>
                      </div>
                      {renderShortcutDisplay(shortcut)}
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Model Shortcuts */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-[#ececf1] flex items-center">
                  <Bot className="w-3 h-3 mr-1" />
                  AI Model Shortcuts
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => showResetConfirmation(
                      'Reset AI Model Shortcuts',
                      'Are you sure you want to reset all AI Model shortcuts to their default values? This action cannot be undone.',
                      resetAIModelShortcuts
                    )}
                    className="text-xs px-2 py-1 h-6 ml-2"
                  >
                    Reset
                  </Button>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  {[
                    { action: "Deep Thinking", current: "Ctrl/Cmd + 1", description: "Activate deep thinking mode" },
                    { action: "Creative Ideas", current: "Ctrl/Cmd + 2", description: "Generate creative ideas" },
                    { action: "Analyze", current: "Ctrl/Cmd + 3", description: "Provide detailed analysis" },
                    { action: "Problem Solve", current: "Ctrl/Cmd + 4", description: "Step-by-step problem solving" }
                  ].map((shortcut) => (
                    <div key={shortcut.action} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-[#565869] rounded-lg">
                      <div>
                        <span className="text-xs font-medium text-gray-900 dark:text-[#ececf1]">{shortcut.action}</span>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{shortcut.description}</p>
                      </div>
                      {renderShortcutDisplay(shortcut)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Prompts Management */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-[#ececf1] flex items-center">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Prompts Management
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => showResetConfirmation(
                      'Reset Prompts Management',
                      'Are you sure you want to reset all Prompts Management shortcuts to their default values? This action cannot be undone.',
                      resetPromptsShortcuts
                    )}
                    className="text-xs px-2 py-1 h-6 ml-2"
                  >
                    Reset
                  </Button>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  {[
                    { action: "Send Prompt", current: "Enter", description: "Send prompt with Enter key" },
                    { action: "Jump to Last", current: "Ctrl/Cmd + J", description: "Scroll to latest prompt" },
                    { action: "Jump to Top", current: "Ctrl/Cmd + T", description: "Scroll to chat beginning" },
                    { action: "Upload Files", current: "Ctrl/Cmd + U", description: "Open file upload dialog" },
                    { action: "Prompt History", current: "Ctrl/Cmd + P", description: "Open recent prompts" }
                  ].map((shortcut) => (
                    <div key={shortcut.action} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-[#565869] rounded-lg">
                      <div>
                        <span className="text-xs font-medium text-gray-900 dark:text-[#ececf1]">{shortcut.action}</span>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{shortcut.description}</p>
                      </div>
                      {renderShortcutDisplay(shortcut)}
                    </div>
                  ))}
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
                <Crown className="w-5 h-5 text-blue-500" />
                <span>Choose Your MornGPT Plan</span>
              </DialogTitle>
            </DialogHeader>
            
            {/* Billing Period Toggle */}
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gray-100 dark:bg-[#565869] rounded-lg p-1 flex">
                <Button
                  variant={billingPeriod === "monthly" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setBillingPeriod("monthly")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    billingPeriod === "monthly" 
                      ? "bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] shadow-sm" 
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-[#ececf1]"
                  }`}
                >
                  Monthly
                </Button>
                <Button
                  variant={billingPeriod === "annual" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setBillingPeriod("annual")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    billingPeriod === "annual" 
                      ? "bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] shadow-sm" 
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-[#ececf1]"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>Annual</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs px-2 py-0.5">
                      Save 30%
                    </Badge>
                  </div>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg flex flex-col h-full ${
                    selectedPlanInDialog?.name === plan.name
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg"
                      : "border-gray-200 dark:border-[#565869] bg-white dark:bg-[#40414f] hover:border-gray-300 dark:hover:border-[#40414f]"
                  }`}
                  onClick={() => setSelectedPlanInDialog(plan)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-500 text-white">Most Popular</Badge>
                    </div>
                  )}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-[#ececf1]">{plan.name}</h3>
                    <div className="mt-2">
                      <div className="flex items-baseline justify-center">
                        <span className="text-3xl font-bold text-gray-900 dark:text-[#ececf1]">
                          {billingPeriod === "annual" ? plan.annualPrice : plan.price}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 ml-1">
                          /{billingPeriod === "annual" ? "month" : plan.period}
                        </span>
                      </div>
                      {billingPeriod === "annual" && (
                        <div className="mt-1">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs">
                            Save 30%
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-900 dark:text-[#ececf1]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleUpgradeClick(plan)}
                    className={`w-full mt-auto ${
                      selectedPlanInDialog?.name === plan.name
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 text-white"
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    {selectedPlanInDialog?.name === plan.name ? "Selected" : `Choose ${plan.name}`}
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
              <div className="space-y-2">
                {/* Plan Summary */}
                <div className="p-3 bg-gray-50 dark:bg-[#565869] rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-[#ececf1]">{selectedPlan.name} Plan</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {billingPeriod === "annual" ? "Annual subscription" : "Monthly subscription"}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-[#ececf1]">
                        {billingPeriod === "annual" ? selectedPlan.annualPrice : selectedPlan.price}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        per {billingPeriod === "annual" ? "month" : "month"}
                      </div>
                      {billingPeriod === "annual" && (
                        <div className="text-xs text-green-600 dark:text-green-400">
                          Billed annually (Save 30%)
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-1">
                  <Label className="text-gray-900 dark:text-[#ececf1] text-sm">Payment Method</Label>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod("credit-card")}
                      className={`p-1.5 rounded-lg border-2 text-xs font-medium transition-all ${
                        selectedPaymentMethod === "credit-card"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          : "border-gray-200 dark:border-[#565869] bg-white dark:bg-[#565869] text-gray-700 dark:text-gray-300 hover:border-gray-300"
                      }`}
                    >
                      💳 Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod("paypal")}
                      className={`p-1.5 rounded-lg border-2 text-xs font-medium transition-all ${
                        selectedPaymentMethod === "paypal"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          : "border-gray-200 dark:border-[#565869] bg-white dark:bg-[#565869] text-gray-700 dark:text-gray-300 hover:border-gray-300"
                      }`}
                    >
                      💰 PayPal
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod("stripe")}
                      className={`p-1.5 rounded-lg border-2 text-xs font-medium transition-all ${
                        selectedPaymentMethod === "stripe"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          : "border-gray-200 dark:border-[#565869] bg-white dark:bg-[#565869] text-gray-700 dark:text-gray-300 hover:border-gray-300"
                      }`}
                    >
                      💳 Stripe
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod("wechat")}
                      className={`p-1.5 rounded-lg border-2 text-xs font-medium transition-all ${
                        selectedPaymentMethod === "wechat"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          : "border-gray-200 dark:border-[#565869] bg-white dark:bg-[#565869] text-gray-700 dark:text-gray-300 hover:border-gray-300"
                      }`}
                    >
                      💬 WeChat
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod("alipay")}
                      className={`p-1.5 rounded-lg border-2 text-xs font-medium transition-all ${
                        selectedPaymentMethod === "alipay"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          : "border-gray-200 dark:border-[#565869] bg-white dark:bg-[#565869] text-gray-700 dark:text-gray-300 hover:border-gray-300"
                      }`}
                    >
                      💳 Alipay
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod("usdt")}
                      className={`p-1.5 rounded-lg border-2 text-xs font-medium transition-all ${
                        selectedPaymentMethod === "usdt"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          : "border-gray-200 dark:border-[#565869] bg-white dark:bg-[#565869] text-gray-700 dark:text-gray-300 hover:border-gray-300"
                      }`}
                    >
                      ₿ USDT
                    </button>
                  </div>
                </div>

                {/* Payment Form */}
                <form onSubmit={handlePayment} className="space-y-2">
                  {selectedPaymentMethod === "credit-card" && (
                    <>
                                              <div>
                          <Label htmlFor="cardNumber" className="text-gray-900 dark:text-[#ececf1] text-sm">
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

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="expiry" className="text-gray-900 dark:text-[#ececf1] text-sm">
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
                          <Label htmlFor="cvc" className="text-gray-900 dark:text-[#ececf1] text-sm">
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
                        <Label htmlFor="billingName" className="text-gray-900 dark:text-[#ececf1] text-sm">
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

                      <div>
                        <Label htmlFor="billingAddress" className="text-gray-900 dark:text-[#ececf1] text-sm">
                          Billing Address
                        </Label>
                        <Input
                          id="billingAddress"
                          type="text"
                          placeholder="123 Main St, City, State 12345"
                          className="bg-white dark:bg-[#565869] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869]"
                          required
                        />
                      </div>
                    </>
                  )}

                  {selectedPaymentMethod === "paypal" && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        You will be redirected to PayPal to complete your payment
                      </p>
                    </div>
                  )}

                  {selectedPaymentMethod === "stripe" && (
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        Secure payment powered by Stripe
                      </p>
                    </div>
                  )}

                  {selectedPaymentMethod === "wechat" && (
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Scan QR code with WeChat to pay
                      </p>
                    </div>
                  )}

                  {selectedPaymentMethod === "alipay" && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Scan QR code with Alipay to pay
                      </p>
                    </div>
                  )}

                  {selectedPaymentMethod === "usdt" && (
                    <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                        Pay with USDT (Tether)
                      </p>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="terms" required className="rounded" />
                    <Label htmlFor="terms" className="text-xs text-gray-700 dark:text-gray-300">
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
                      Pay {billingPeriod === "annual" ? selectedPlan.annualPrice : selectedPlan.price}
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

        {/* Privacy Section Dialog */}
        <Dialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
          <DialogContent className="sm:max-w-lg bg-gradient-to-br from-white to-gray-50 dark:from-[#40414f] dark:to-[#2d2d30] border-gray-200 dark:border-[#565869] shadow-2xl">
            <DialogHeader className="pb-3 border-b border-gray-100 dark:border-[#565869]">
              <DialogTitle className="flex items-center space-x-2 text-lg font-bold text-gray-900 dark:text-[#ececf1]">
                <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <ShieldIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                <span>Privacy & Security</span>
              </DialogTitle>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Manage your account security and privacy settings
              </p>
            </DialogHeader>
            
            <div className="space-y-4 py-3">
              {/* Security Section */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-900 dark:text-[#ececf1] flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                  Account Security
                </h3>
                
                {/* Change Password */}
                <div className="bg-white dark:bg-[#40414f] rounded-lg p-3 border border-gray-100 dark:border-[#565869] shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                        <Lock className="w-4 h-4 text-white" />
                        </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900 dark:text-[#ececf1]">Password</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Last changed: 30 days ago
                        </p>
                    </div>
                    </div>
                        <Button
                          size="sm"
                          variant="outline"
                      className="bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869] hover:bg-gray-50 dark:hover:bg-[#565869] shadow-sm text-xs"
                        >
                      Update
                        </Button>
                  </div>
                      </div>

                {/* 2FA Method */}
                <div className="bg-white dark:bg-[#40414f] rounded-lg p-3 border border-gray-100 dark:border-[#565869] shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-sm">
                        <ShieldIcon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                        <p className="font-medium text-sm text-gray-900 dark:text-[#ececf1]">Two-Factor Authentication</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Status: <span className="text-orange-500 font-medium">Not enabled</span>
                        </p>
                        </div>
                        </div>
                          <Button
                      size="sm"
                            variant="outline"
                      className="bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869] hover:bg-gray-50 dark:hover:bg-[#565869] shadow-sm text-xs"
                        >
                      Enable
                        </Button>
                        </div>
                      </div>
                      </div>

              {/* Privacy Section */}
                      <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-900 dark:text-[#ececf1] flex items-center">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                  Data Privacy
                </h3>
                
                {/* Data Export */}
                <div className="bg-white dark:bg-[#40414f] rounded-lg p-3 border border-gray-100 dark:border-[#565869] shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                              </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900 dark:text-[#ececf1]">Export Data</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Download your personal data
                        </p>
                              </div>
                    </div>
                          <Button
                      size="sm"
                            variant="outline"
                      className="bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869] hover:bg-gray-50 dark:hover:bg-[#565869] shadow-sm text-xs"
                          >
                      Export
                          </Button>
                        </div>
                        </div>

                {/* Import Data */}
                <div className={`bg-white dark:bg-[#40414f] rounded-lg p-3 border border-gray-100 dark:border-[#565869] shadow-sm hover:shadow-md transition-shadow ${!appUser?.isPaid ? 'opacity-60' : ''}`}>
                        <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                                            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-sm">
                        <Download className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <p className="font-medium text-sm text-gray-900 dark:text-[#ececf1]">Import Data</p>
                        {!appUser?.isPaid && <Lock className="w-3 h-3 text-gray-400" />}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {appUser?.isPaid ? "Import your data from other platforms" : "Paid feature - Upgrade to import data"}
                        </p>
                    </div>
                          </div>
                        <Button
                      size="sm"
                          variant="outline"
                          onClick={() => {
                            if (!appUser?.isPaid) {
                              setShowPrivacyDialog(false)
                              setShowBillingDialog(true)
                            } else {
                              // Handle import data functionality for paid users
                              console.log("Import data clicked")
                            }
                          }}
                      className={`${appUser?.isPaid 
                        ? 'bg-white dark:bg-[#40414f] text-gray-900 dark:text-[#ececf1] border-gray-300 dark:border-[#565869] hover:bg-gray-50 dark:hover:bg-[#565869]' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400 border-gray-200 dark:border-gray-600 cursor-not-allowed'
                      } shadow-sm text-xs`}
                        >
                      {appUser?.isPaid ? "Import" : "Paid Only"}
                        </Button>
                        </div>
                      </div>
                    </div>

              {/* Danger Zone */}
                      <div className="space-y-3">
                <h3 className="text-base font-semibold text-red-600 dark:text-red-400 flex items-center">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                  Danger Zone
                </h3>
                
                {/* Delete Account */}
                <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-[#7f1d1d] dark:to-[#831843] rounded-lg p-3 border border-red-200 dark:border-red-800 shadow-sm">
                        <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-sm">
                        <AlertTriangle className="w-4 h-4 text-white" />
                          </div>
                      <div>
                        <p className="font-medium text-sm text-red-600 dark:text-red-400">Delete Account</p>
                        <p className="text-xs text-red-500 dark:text-red-400">
                          This action cannot be undone
                        </p>
                        </div>
                      </div>
                          <Button
                      size="sm"
                            variant="outline"
                      onClick={() => {
                        setShowPrivacyDialog(false)
                        setShowDeleteAccountDialog(true)
                      }}
                      className="text-red-600 dark:text-red-400 border-red-300 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 bg-white dark:bg-[#40414f] shadow-sm text-xs"
                    >
                      Delete
                          </Button>
                      </div>
                    </div>
            </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Billing Management Dialog */}
        <Dialog open={showBillingDialog} onOpenChange={setShowBillingDialog}>
          <DialogContent className="sm:max-w-2xl bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 text-gray-900 dark:text-[#ececf1]">
                <CreditCard className="w-5 h-5" />
                <span>Billing Management</span>
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-6 p-1">
                {/* Upgrade Plan Section */}
                <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <Crown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-[#ececf1]">
                          {appUser?.isPro ? "Upgrade Your Plan" : "Upgrade"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {appUser?.isPro ? "Explore higher tier plans" : "Unlock premium features and remove ads"}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setShowBillingDialog(false)
                        setShowUpgradeDialog(true)
                      }}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      {appUser?.isPro ? "Upgrade Plan" : "Upgrade"}
                    </Button>
                  </div>
                </div>



                {/* Payment Method */}
                <div className="p-3 bg-gray-50 dark:bg-[#40414f] rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-[#ececf1]">Payment Method</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Manage your payment information
                        </p>
                      </div>
                    </div>
                        <Button
                      size="sm"
                          variant="outline"
                  onClick={() => {
                        if (appUser?.isPro) {
                          setShowPaymentEditDialog(true)
                        } else {
                          // For free users, redirect to upgrade
                          setShowBillingDialog(false)
                          setShowUpgradeDialog(true)
                        }
                  }}
                      className="text-gray-600 dark:text-gray-400"
                >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                        </Button>
                      </div>
                  
                  {appUser?.isPro ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 p-2 bg-white dark:bg-[#565869] rounded border">
                        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                          <CreditCard className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                    </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-[#ececf1]">
                            Visa ending in 4242
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Expires 12/25
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          Default
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                        <p className="text-sm text-yellow-600 dark:text-yellow-400">
                          No payment method added
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Billing Information */}
                {appUser?.isPro && (
                  <div className="p-3 bg-gray-50 dark:bg-[#40414f] rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                        <Receipt className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-[#ececf1]">Billing Information</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Your billing details and history
                        </p>
                        </div>
                      </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Current Plan:</span>
                        <span className="text-gray-900 dark:text-[#ececf1] font-medium">
                          {currentPlan || "Pro"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Next billing date:</span>
                        <span className="text-gray-900 dark:text-[#ececf1]">March 15, 2025</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                        <span className="text-gray-900 dark:text-[#ececf1]">
                          {currentPlan === "Basic" ? "$6.99" : 
                           currentPlan === "Pro" ? "$27.99" : 
                           currentPlan === "Enterprise" ? "$69.99" : "$27.99"}/month
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Billing Cycle:</span>
                        <span className="text-gray-900 dark:text-[#ececf1]">Annual (Save 30%)</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Status:</span>
                        <Badge variant="default" className="text-xs">
                          Active
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}

                {/* Auto Renew Option - Moved to bottom */}
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#40414f] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <RefreshCw className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-[#ececf1]">Auto Renew</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Automatically renew your subscription
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={appUser?.isPro ? autoRenewEnabled : false}
                    onCheckedChange={(checked) => {
                      if (checked && !appUser?.isPro) {
                        setShowBillingDialog(false)
                        setShowUpgradeDialog(true)
                      } else if (appUser?.isPro) {
                        setAutoRenewEnabled(checked)
                        if (checked) {
                          // Calculate next billing date (30 days from now)
                          const nextDate = new Date()
                          nextDate.setDate(nextDate.getDate() + 30)
                          setNextBillingDate(nextDate.toISOString().split('T')[0])
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

                      {/* Payment Method Edit Dialog */}
                      <Dialog open={showPaymentEditDialog} onOpenChange={setShowPaymentEditDialog}>
          <DialogContent className="sm:max-w-md bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
            <DialogHeader>
                            <DialogTitle className="flex items-center space-x-2 text-gray-900 dark:text-[#ececf1]">
                              <CreditCard className="w-5 h-5" />
                              <span>Edit Payment Method</span>
              </DialogTitle>
            </DialogHeader>
                    <div className="space-y-4">
                            {/* Payment Method Options */}
                      <div className="grid grid-cols-3 gap-2">
                              <div className="flex items-center space-x-2 p-2 border border-gray-200 dark:border-[#565869] rounded-lg">
                                <input
                                  type="radio"
                                  id="card"
                                  name="paymentMethod"
                                  value="card"
                                  checked={paymentMethod.type === "card"}
                                  onChange={(e) => setPaymentMethod({...paymentMethod, type: e.target.value})}
                                  className="w-3 h-3 text-blue-600"
                                />
                                <CreditCard className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                <label htmlFor="card" className="text-xs text-gray-900 dark:text-[#ececf1]">Card</label>
                          </div>
                              
                              <div className="flex items-center space-x-2 p-2 border border-gray-200 dark:border-[#565869] rounded-lg">
                                <input
                                  type="radio"
                                  id="paypal"
                                  name="paymentMethod"
                                  value="paypal"
                                  checked={paymentMethod.type === "paypal"}
                                  onChange={(e) => setPaymentMethod({...paymentMethod, type: e.target.value})}
                                  className="w-3 h-3 text-blue-600"
                                />
                                <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">P</div>
                                <label htmlFor="paypal" className="text-xs text-gray-900 dark:text-[#ececf1]">PayPal</label>
                        </div>
                              
                              <div className="flex items-center space-x-2 p-2 border border-gray-200 dark:border-[#565869] rounded-lg">
                                <input
                                  type="radio"
                                  id="wechat"
                                  name="paymentMethod"
                                  value="wechat"
                                  checked={paymentMethod.type === "wechat"}
                                  onChange={(e) => setPaymentMethod({...paymentMethod, type: e.target.value})}
                                  className="w-3 h-3 text-blue-600"
                                />
                                <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">W</div>
                                <label htmlFor="wechat" className="text-xs text-gray-900 dark:text-[#ececf1]">WeChat</label>
                      </div>
                              
                              <div className="flex items-center space-x-2 p-2 border border-gray-200 dark:border-[#565869] rounded-lg">
                                <input
                                  type="radio"
                                  id="alipay"
                                  name="paymentMethod"
                                  value="alipay"
                                  checked={paymentMethod.type === "alipay"}
                                  onChange={(e) => setPaymentMethod({...paymentMethod, type: e.target.value})}
                                  className="w-3 h-3 text-blue-600"
                                />
                                <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">A</div>
                                <label htmlFor="alipay" className="text-xs text-gray-900 dark:text-[#ececf1]">Alipay</label>
                      </div>
                              
                              <div className="flex items-center space-x-2 p-2 border border-gray-200 dark:border-[#565869] rounded-lg">
                                <input
                                  type="radio"
                                  id="stripe"
                                  name="paymentMethod"
                                  value="stripe"
                                  checked={paymentMethod.type === "stripe"}
                                  onChange={(e) => setPaymentMethod({...paymentMethod, type: e.target.value})}
                                  className="w-3 h-3 text-blue-600"
                                />
                                <div className="w-4 h-4 bg-purple-500 rounded flex items-center justify-center text-white text-xs font-bold">S</div>
                                <label htmlFor="stripe" className="text-xs text-gray-900 dark:text-[#ececf1]">Stripe</label>
                      </div>
                              
                              <div className="flex items-center space-x-2 p-2 border border-gray-200 dark:border-[#565869] rounded-lg">
                                <input
                                  type="radio"
                                  id="usdt"
                                  name="paymentMethod"
                                  value="usdt"
                                  checked={paymentMethod.type === "usdt"}
                                  onChange={(e) => setPaymentMethod({...paymentMethod, type: e.target.value})}
                                  className="w-3 h-3 text-blue-600"
                                />
                                <div className="w-4 h-4 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">₿</div>
                                <label htmlFor="usdt" className="text-xs text-gray-900 dark:text-[#ececf1]">USDT</label>
                      </div>
                    </div>

                            {/* Card Details (if card is selected) */}
                            {paymentMethod.type === "card" && (
                      <div className="space-y-3">
                                <div>
                                  <Label htmlFor="cardNumber" className="text-gray-700 dark:text-gray-300">Card Number</Label>
                                  <Input
                                    id="cardNumber"
                                    placeholder="1234 5678 9012 3456"
                                    className="bg-white dark:bg-[#40414f] border-gray-300 dark:border-[#565869]"
                                  />
                          </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <Label htmlFor="expiry" className="text-gray-700 dark:text-gray-300">Expiry Date</Label>
                                    <Input
                                      id="expiry"
                                      placeholder="MM/YY"
                                      className="bg-white dark:bg-[#40414f] border-gray-300 dark:border-[#565869]"
                          />
                        </div>
                                  <div>
                                    <Label htmlFor="cvv" className="text-gray-700 dark:text-gray-300">CVV</Label>
                                    <Input
                                      id="cvv"
                                      placeholder="123"
                                      className="bg-white dark:bg-[#40414f] border-gray-300 dark:border-[#565869]"
                                    />
                      </div>
                    </div>
                                <div>
                                  <Label htmlFor="billingAddress" className="text-gray-700 dark:text-gray-300">Billing Address</Label>
                                  <Input
                                    id="billingAddress"
                                    placeholder="123 Main St, City, State 12345"
                                    className="bg-white dark:bg-[#40414f] border-gray-300 dark:border-[#565869]"
                                  />
                                </div>
                              </div>
                            )}

                            {/* PayPal/WeChat/Alipay specific fields */}
                            {(paymentMethod.type === "paypal" || paymentMethod.type === "wechat" || paymentMethod.type === "alipay") && (
                              <div>
                                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                                  {paymentMethod.type === "paypal" ? "PayPal Email" : 
                                   paymentMethod.type === "wechat" ? "WeChat Account" : "Alipay Account"}
                                </Label>
                                <Input
                                  id="email"
                                  placeholder={paymentMethod.type === "paypal" ? "your@email.com" : 
                                              paymentMethod.type === "wechat" ? "WeChat ID" : "Alipay ID"}
                                  className="bg-white dark:bg-[#40414f] border-gray-300 dark:border-[#565869]"
                                />
                              </div>
                            )}

                            {/* Stripe specific fields */}
                            {paymentMethod.type === "stripe" && (
                              <div className="space-y-3">
                                <div>
                                  <Label htmlFor="stripeEmail" className="text-gray-700 dark:text-gray-300">Email Address</Label>
                                  <Input
                                    id="stripeEmail"
                                    placeholder="your@email.com"
                                    className="bg-white dark:bg-[#40414f] border-gray-300 dark:border-[#565869]"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="stripeAccount" className="text-gray-700 dark:text-gray-300">Stripe Account ID</Label>
                                  <Input
                                    id="stripeAccount"
                                    placeholder="acct_1234567890"
                                    className="bg-white dark:bg-[#40414f] border-gray-300 dark:border-[#565869]"
                                  />
                                </div>
                              </div>
                            )}

                            {/* USDT specific fields */}
                            {paymentMethod.type === "usdt" && (
                              <div className="space-y-3">
                                <div>
                                  <Label htmlFor="usdtAddress" className="text-gray-700 dark:text-gray-300">USDT Wallet Address</Label>
                                  <Input
                                    id="usdtAddress"
                                    placeholder="TRC20 or ERC20 address"
                                    className="bg-white dark:bg-[#40414f] border-gray-300 dark:border-[#565869]"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="usdtNetwork" className="text-gray-700 dark:text-gray-300">Network</Label>
                                  <Select defaultValue="trc20">
                                    <SelectTrigger className="w-full bg-white dark:bg-[#40414f] border-gray-300 dark:border-[#565869]">
                                      <span>TRC20</span>
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
                                      <SelectItem value="trc20" className="text-gray-900 dark:text-[#ececf1]">TRC20</SelectItem>
                                      <SelectItem value="erc20" className="text-gray-900 dark:text-[#ececf1]">ERC20</SelectItem>
                                      <SelectItem value="bep20" className="text-gray-900 dark:text-[#ececf1]">BEP20</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                          </div>
                          <DialogFooter className="flex space-x-2">
                          <Button
                            variant="outline"
                              onClick={() => setShowPaymentEditDialog(false)}
                              className="border-gray-300 dark:border-[#565869]"
                          >
                  Cancel
                          </Button>
                        <Button
                              onClick={() => {
                                // Here you would save the payment method
                                console.log("Payment method updated:", paymentMethod)
                                setShowPaymentEditDialog(false)
                              }}
                              className="bg-blue-600 hover:bg-blue-700"
                >
                              Save Changes
                        </Button>
                          </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Font Settings Dialog */}
        <Dialog open={showFontDialog} onOpenChange={setShowFontDialog}>
          <DialogContent className="sm:max-w-md bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 text-gray-900 dark:text-[#ececf1]">
                <PaletteIcon className="w-5 h-5 text-purple-600" />
                <span>Font Settings</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-700 dark:text-gray-300">Font Family</Label>
                <Select defaultValue="default">
                  <SelectTrigger className="w-full bg-white dark:bg-[#40414f] border-gray-300 dark:border-[#565869]">
                    <span>Default</span>
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
                    <SelectItem value="default" className="text-gray-900 dark:text-[#ececf1]">Default</SelectItem>
                    <SelectItem value="arial" className="text-gray-900 dark:text-[#ececf1]">Arial</SelectItem>
                    <SelectItem value="times" className="text-gray-900 dark:text-[#ececf1]">Times New Roman</SelectItem>
                    <SelectItem value="mono" className="text-gray-900 dark:text-[#ececf1]">Monospace</SelectItem>
                    <SelectItem value="serif" className="text-gray-900 dark:text-[#ececf1]">Serif</SelectItem>
                    <SelectItem value="sans" className="text-gray-900 dark:text-[#ececf1]">Sans Serif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-700 dark:text-gray-300">Font Size</Label>
                <Select defaultValue="14">
                  <SelectTrigger className="w-full bg-white dark:bg-[#40414f] border-gray-300 dark:border-[#565869]">
                    <span>14px</span>
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
                    <SelectItem value="12" className="text-gray-900 dark:text-[#ececf1]">12px</SelectItem>
                    <SelectItem value="14" className="text-gray-900 dark:text-[#ececf1]">14px</SelectItem>
                    <SelectItem value="16" className="text-gray-900 dark:text-[#ececf1]">16px</SelectItem>
                    <SelectItem value="18" className="text-gray-900 dark:text-[#ececf1]">18px</SelectItem>
                    <SelectItem value="20" className="text-gray-900 dark:text-[#ececf1]">20px</SelectItem>
                    <SelectItem value="24" className="text-gray-900 dark:text-[#ececf1]">24px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                        <Button
                          variant="outline"
                  onClick={() => setShowFontDialog(false)}
                  className="flex-1 border-gray-300 dark:border-[#565869]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    console.log("Font settings saved")
                    setShowFontDialog(false)
                  }}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  Save
                        </Button>
                      </div>
                    </div>
          </DialogContent>
        </Dialog>

        {/* Shortcut Settings Dialog */}
        <Dialog open={showShortcutDialog} onOpenChange={setShowShortcutDialog}>
          <DialogContent className="sm:max-w-md bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 text-gray-900 dark:text-[#ececf1]">
                <Zap className="w-5 h-5 text-yellow-600" />
                <span>Keyboard Shortcuts</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#565869] rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-[#ececf1]">Send Message</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Send current message</p>
                  </div>
                  <Badge variant="outline" className="bg-white dark:bg-[#40414f]">⌘ + Enter</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#565869] rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-[#ececf1]">New Chat</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Start a new conversation</p>
                  </div>
                  <Badge variant="outline" className="bg-white dark:bg-[#40414f]">⌘ + N</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#565869] rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-[#ececf1]">Toggle Theme</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Switch between light/dark</p>
                  </div>
                  <Badge variant="outline" className="bg-white dark:bg-[#40414f]">⌘ + T</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-gray-700 dark:text-gray-300">Enable Shortcuts</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowShortcutDialog(false)}
                  className="flex-1 border-gray-300 dark:border-[#565869]"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    console.log("Shortcut settings saved")
                    setShowShortcutDialog(false)
                  }}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                >
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Download Section Dialog */}
        <Dialog open={showDownloadSection} onOpenChange={setShowDownloadSection}>
          <DialogContent className="sm:max-w-2xl max-h-screen overflow-y-auto bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 text-gray-900 dark:text-[#ececf1]">
                <Download className="w-5 h-5 text-blue-600" />
                <span>Download MornGPT</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Platform Downloads */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-[#ececf1]">Select Your Platform</h3>
                
                {/* Selected Platform Display */}
                {selectedPlatform && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          {selectedPlatform.platform.toUpperCase()}
                          {selectedPlatform.variant && ` - ${selectedPlatform.variant.toUpperCase()}`}
                        </p>
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                          Ready to download
                        </p>
                      </div>
                                       <Button 
                   size="sm" 
                   className="bg-blue-600 hover:bg-blue-700"
                   onClick={handleDownload}
                 >
                   {selectedPlatform && ['chrome', 'firefox', 'edge', 'opera', 'safari'].includes(selectedPlatform.platform) ? 'Install Now' : 'Download Now'}
                 </Button>
                    </div>
                  </div>
                )}
                
                                {/* Mobile Apps */}
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300">Mobile Apps</h4>
                  
                  <div className="p-2 bg-gray-50 dark:bg-[#565869] rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-[#ececf1]">Mobile</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">iOS & Android</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className={`text-xs h-7 px-2 ${selectedPlatform?.platform === 'ios' || selectedPlatform?.platform === 'android' ? 'bg-purple-700 border-2 border-purple-300' : 'bg-purple-600 hover:bg-purple-700'}`}
                        onClick={() => {
                          if (selectedPlatform?.platform === 'ios' || selectedPlatform?.platform === 'android') {
                            setSelectedPlatform(null)
                          } else {
                            handlePlatformSelect('ios')
                          }
                        }}
                      >
                        {selectedPlatform?.platform === 'ios' || selectedPlatform?.platform === 'android' ? 'Selected' : 'Select'}
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        iOS 14.0+ • Android 8.0+ • 45-50MB
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={`text-xs h-5 px-1 ${selectedPlatform?.platform === 'ios' ? 'bg-purple-100 border-purple-300' : ''}`}
                          onClick={() => handlePlatformSelect('ios')}
                        >
                          iOS
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={`text-xs h-5 px-1 ${selectedPlatform?.platform === 'android' ? 'bg-purple-100 border-purple-300' : ''}`}
                          onClick={() => handlePlatformSelect('android')}
                        >
                          Android
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Apps */}
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300">Desktop Apps</h4>
                  
                  {/* macOS */}
                  <div className="p-2 bg-gray-50 dark:bg-[#565869] rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <Monitor className="w-4 h-4 text-gray-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-[#ececf1]">macOS</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Desktop App</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className={`text-xs h-7 px-2 ${selectedPlatform?.platform === 'macos' ? 'bg-gray-700 border-2 border-gray-300' : 'bg-gray-600 hover:bg-gray-700'}`}
                        onClick={() => {
                          if (selectedPlatform?.platform === 'macos') {
                            setSelectedPlatform(null)
                          } else {
                            handlePlatformSelect('macos', 'intel')
                          }
                        }}
                      >
                        {selectedPlatform?.platform === 'macos' ? 'Selected' : 'Select'}
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        macOS 11.0+ • 65MB
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={`text-xs h-5 px-1 ${selectedPlatform?.platform === 'macos' && selectedPlatform?.variant === 'intel' ? 'bg-blue-100 border-blue-300' : ''}`}
                          onClick={() => handlePlatformSelect('macos', 'intel')}
                        >
                          Intel
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={`text-xs h-5 px-1 ${selectedPlatform?.platform === 'macos' && selectedPlatform?.variant === 'm' ? 'bg-blue-100 border-blue-300' : ''}`}
                          onClick={() => handlePlatformSelect('macos', 'm')}
                        >
                          M Series
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Windows */}
                  <div className="p-2 bg-gray-50 dark:bg-[#565869] rounded-lg min-w-[340px]">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <Laptop className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-[#ececf1]">Windows</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Desktop App</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className={`text-xs h-7 px-2 ${selectedPlatform?.platform === 'windows' ? 'bg-blue-700 border-2 border-blue-300' : 'bg-blue-600 hover:bg-blue-700'}`}
                        onClick={() => {
                          if (selectedPlatform?.platform === 'windows') {
                            setSelectedPlatform(null)
                          } else {
                            handlePlatformSelect('windows', 'x64')
                          }
                        }}
                      >
                        {selectedPlatform?.platform === 'windows' ? 'Selected' : 'Select'}
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Windows 10+ • 60MB
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={`text-xs h-5 px-1 ${selectedPlatform?.platform === 'windows' && selectedPlatform?.variant === 'x64' ? 'bg-blue-100 border-blue-300' : ''}`}
                          onClick={() => handlePlatformSelect('windows', 'x64')}
                        >
                          x64
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={`text-xs h-5 px-1 ${selectedPlatform?.platform === 'windows' && selectedPlatform?.variant === 'x86' ? 'bg-blue-100 border-blue-300' : ''}`}
                          onClick={() => handlePlatformSelect('windows', 'x86')}
                        >
                          x86
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={`text-xs h-5 px-1 ${selectedPlatform?.platform === 'windows' && selectedPlatform?.variant === 'arm64' ? 'bg-blue-100 border-blue-300' : ''}`}
                          onClick={() => handlePlatformSelect('windows', 'arm64')}
                        >
                          ARM64
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Linux */}
                  <div className="p-2 bg-gray-50 dark:bg-[#565869] rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <Monitor className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-[#ececf1]">Linux</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Desktop App</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className={`text-xs h-7 px-2 ${selectedPlatform?.platform === 'linux' ? 'bg-green-700 border-2 border-green-300' : 'bg-green-600 hover:bg-green-700'}`}
                        onClick={() => {
                          if (selectedPlatform?.platform === 'linux') {
                            setSelectedPlatform(null)
                          } else {
                            handlePlatformSelect('linux', 'deb')
                          }
                        }}
                      >
                        {selectedPlatform?.platform === 'linux' ? 'Selected' : 'Select'}
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Ubuntu 20.04+ • 55MB
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={`text-xs h-5 px-1 ${selectedPlatform?.platform === 'linux' && selectedPlatform?.variant === 'deb' ? 'bg-green-100 border-green-300' : ''}`}
                          onClick={() => handlePlatformSelect('linux', 'deb')}
                        >
                          .deb
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={`text-xs h-5 px-1 ${selectedPlatform?.platform === 'linux' && selectedPlatform?.variant === 'appimage' ? 'bg-green-100 border-green-300' : ''}`}
                          onClick={() => handlePlatformSelect('linux', 'appimage')}
                        >
                          AppImage
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={`text-xs h-5 px-1 ${selectedPlatform?.platform === 'linux' && selectedPlatform?.variant === 'snap' ? 'bg-green-100 border-green-300' : ''}`}
                          onClick={() => handlePlatformSelect('linux', 'snap')}
                        >
                          Snap
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={`text-xs h-5 px-1 ${selectedPlatform?.platform === 'linux' && selectedPlatform?.variant === 'flatpak' ? 'bg-green-100 border-green-300' : ''}`}
                          onClick={() => handlePlatformSelect('linux', 'flatpak')}
                        >
                          Flatpak
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={`text-xs h-5 px-1 ${selectedPlatform?.platform === 'linux' && selectedPlatform?.variant === 'aur' ? 'bg-green-100 border-green-300' : ''}`}
                          onClick={() => handlePlatformSelect('linux', 'aur')}
                        >
                          AUR
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Browser Extensions */}
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300">Browser Extensions</h4>
                  
                  <div className="p-2 bg-gray-50 dark:bg-[#565869] rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-indigo-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-[#ececf1]">Browser Extensions</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">All Major Browsers</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className={`text-xs h-7 px-2 ${selectedPlatform && ['chrome', 'firefox', 'edge', 'opera', 'safari'].includes(selectedPlatform.platform) ? 'bg-indigo-700 border-2 border-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                        onClick={() => {
                          if (selectedPlatform && ['chrome', 'firefox', 'edge', 'opera', 'safari'].includes(selectedPlatform.platform)) {
                            setSelectedPlatform(null)
                          } else {
                            handlePlatformSelect('chrome')
                          }
                        }}
                      >
                        {selectedPlatform && ['chrome', 'firefox', 'edge', 'opera', 'safari'].includes(selectedPlatform.platform) ? 'Selected' : 'Select'}
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Free • All Major Browsers
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={`text-xs h-5 px-1 ${selectedPlatform?.platform === 'chrome' ? 'bg-indigo-100 border-indigo-300' : ''}`}
                          onClick={() => handlePlatformSelect('chrome')}
                        >
                          Chrome
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={`text-xs h-5 px-1 ${selectedPlatform?.platform === 'firefox' ? 'bg-indigo-100 border-indigo-300' : ''}`}
                          onClick={() => handlePlatformSelect('firefox')}
                        >
                          Firefox
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={`text-xs h-5 px-1 ${selectedPlatform?.platform === 'edge' ? 'bg-indigo-100 border-indigo-300' : ''}`}
                          onClick={() => handlePlatformSelect('edge')}
                        >
                          Edge
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={`text-xs h-5 px-1 ${selectedPlatform?.platform === 'opera' ? 'bg-indigo-100 border-indigo-300' : ''}`}
                          onClick={() => handlePlatformSelect('opera')}
                        >
                          Opera
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={`text-xs h-5 px-1 ${selectedPlatform?.platform === 'safari' ? 'bg-indigo-100 border-indigo-300' : ''}`}
                          onClick={() => handlePlatformSelect('safari')}
                        >
                          Safari
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ads Section (for all users) */}
              {appUser && (
                <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-[#565869]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-[#ececf1]">Advertisement</h3>
                    <Switch 
                      checked={appUser?.settings?.adsEnabled ?? false} 
                      onCheckedChange={(checked) => updateUserSettings({ adsEnabled: checked })}
                    />
                  </div>
                  {(appUser?.settings?.adsEnabled ?? false) && !appUser.isPro && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Crown className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-gray-900 dark:text-[#ececf1]">Upgrade</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        Remove ads and unlock premium features
                      </p>
                      <Button size="sm" className="w-full bg-yellow-600 hover:bg-yellow-700" onClick={handleUpgradeFromAds}>
                        Upgrade Now
                      </Button>
                    </div>
                  )}
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowDownloadSection(false)}
                  className="flex-1 border-gray-300 dark:border-[#565869]"
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reset Confirmation Dialog */}
        <Dialog open={showResetConfirm} onOpenChange={setShowResetConfirm}>
          <DialogContent className="sm:max-w-md bg-white dark:bg-[#40414f] border-gray-200 dark:border-[#565869]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 text-gray-900 dark:text-[#ececf1]">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <span className="text-lg">{resetConfirmData?.title}</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {resetConfirmData?.message}
              </p>
            </div>

            <div className="flex space-x-3 pt-2">
              <Button
                variant="outline"
                onClick={handleResetCancel}
                className="flex-1 border-gray-300 dark:border-[#565869] hover:bg-gray-50 dark:hover:bg-[#565869]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleResetConfirm}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Reset
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
