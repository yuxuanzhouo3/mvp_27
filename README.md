# MornGPT Frontend Base Template

A modern, responsive AI chat interface built with Next.js, TypeScript, and Tailwind CSS. This serves as the foundational frontend template for MornGPT's comprehensive AI platform.

## Copyright

**Copyright © 2025 Yuxuan Zhou. All rights reserved.**

This project and its contents are protected by copyright law. Unauthorized copying, distribution, or use is strictly prohibited.

## Overview

MornGPT Frontend Base Template is designed as a scalable foundation for 17 specialized AI products, each with their own sub-categories and specialized models. The architecture supports exponential growth from 17 core products to potentially 1000+ specialized use cases based on different countries, user groups, and other factors.

### Product Architecture

**17 Core Specialized Products:**
- **Growth Advisory (A1)** - Business growth and strategy
- **Interview/Job (B1)** - Career and employment assistance
- **AI Coder (C1)** - Programming and development
- **Content Detection (D1)** - Content analysis and verification
- **Medical Advice (E1)** - Health and wellness guidance
- **Multi-GPT (H1)** - Multi-model AI orchestration
- **Housing (O1)** - Real estate and accommodation
- **Person Matching (P1)** - Relationship and networking
- **AI Teacher (Q1)** - Education and learning
- **Travel Planning (R1)** - Travel and tourism
- **Product Search (S1)** - E-commerce and shopping
- **Fashion (T1)** - Style and fashion advice
- **Food & Dining (U1)** - Culinary and dining
- **Content Generation (W1)** - Creative content creation
- **AI Protection (Z1)** - Security and privacy

**Scalable Sub-Categories:**
Each of the 17 core products can expand into multiple sub-categories:
- **Geographic Variations**: Country-specific models and content
- **Demographic Targeting**: Age groups, professions, interests
- **Industry Specialization**: Healthcare, finance, education, etc.
- **Use Case Variations**: Personal, professional, academic contexts

**Potential Scale:**
- **17 Core Products** → **100+ Sub-Categories** → **1000+ Specialized Models**
- **Factors**: Country/region, user demographics, industry verticals, use cases

**Business Model & Capacity Planning:**
- **Target User Base**: Up to 10,000 users (maximum capacity for current team)
- **Conversion Rate**: 10% to paid subscriptions (1,000 paid users)
- **Revenue per User**: $100 annually average
- **Revenue Potential**: $100,000 - $1.7M annually
- **Team Capacity**: Optimized for 10,000 users maximum (requires additional team members beyond this scale)

## Features

- 🤖 **Multi-Model AI Support**: Access to various AI models including MornGPT specialized models and external providers
- 💬 **Real-time Chat Interface**: Modern chat UI with message history and conversation management
- 🎤 **Voice Input**: Speech-to-text functionality with real-time transcription
- 📷 **Camera Input**: Capture photos and record videos directly in the chat
- 📎 **File Upload**: Support for multiple file types and formats
- 🎨 **Dark/Light Theme**: Toggle between dark and light themes
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🔍 **Smart Search**: Search through chat history and conversations
- 📚 **Chat Organization**: Organize chats by categories and folders
- ⭐ **Bookmark System**: Save and organize important messages
- ⌨️ **Keyboard Shortcuts**: Comprehensive keyboard navigation and shortcuts
- 🔐 **User Authentication**: Secure login and user management
- 💳 **Subscription Plans**: Pro features with upgrade options
- 🏗️ **Modular Architecture**: Designed for easy customization and scaling
- 📊 **Business-Ready**: Optimized for up to 10,000 users with scalable revenue model

## Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom Components
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Authentication**: Custom implementation
- **Storage**: Local Storage

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yuxuanzhouo3/mvp_27.git
cd mvp_27
```

2. Navigate to the frontend directory:
```bash
cd front
```

3. Install dependencies:
```bash
npm install --legacy-peer-deps
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
mvp_27/
├── front/                    # Next.js application
│   ├── app/                 # App router pages
│   ├── components/          # Reusable UI components
│   │   └── ui/             # Base UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── public/             # Static assets
│   └── styles/             # Global styles
└── README.md               # This file
```

## Key Components

### AI Models
- **General Model**: Multi-purpose AI assistant
- **MornGPT Models**: Specialized models for different use cases
  - Growth Advisory (A1)
  - Interview/Job (B1)
  - AI Coder (C1)
  - Content Detection (D1)
  - Medical Advice (E1)
  - Multi-GPT (H1)
  - Housing (O1)
  - Person Matching (P1)
  - AI Teacher (Q1)
  - Travel Planning (R1)
  - Product Search (S1)
  - Fashion (T1)
  - Food & Dining (U1)
  - Content Generation (W1)
  - AI Protection (Z1)

### External Models
- **Free Models**: GPT-3.5 Turbo, Claude 3 Haiku, Gemini Flash, etc.
- **Premium Models**: GPT-4 Turbo, Claude 3.5 Sonnet, Claude 3 Opus, etc.

## Features in Detail

### Chat Management
- Create new chats
- Rename chat titles
- Delete conversations
- Organize by categories
- Search through chat history

### User Experience
- Collapsible sidebar
- Resizable interface
- Keyboard shortcuts (Ctrl/Cmd + Enter to send)
- File upload support
- Message bookmarking
- Copy, share, and download responses

### Authentication
- Email/password login
- Google OAuth integration
- User profile management
- Settings customization

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env.local` file in the `front` directory:

```env
NEXT_PUBLIC_APP_NAME=MornGPT
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## Contributing

This project is copyrighted and proprietary. For collaboration or contribution inquiries, please contact the copyright holder.

## License

**Copyright © 2025 Yuxuan Zhou. All rights reserved.**

This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## Contact

For questions or support regarding this project, please contact:
- **Author**: Yuxuan Zhou
- **Email**: yuxuanzhouo3@gmail.com
- **Repository**: https://github.com/yuxuanzhouo3/mvp_27

---

*Built with ❤️ using Next.js, TypeScript, and Tailwind CSS*

*MornGPT Frontend Base Template - Foundation for 17 specialized AI products with scalable architecture for 1000+ use cases*

*Business Model: Optimized for 10,000 users with $100K-$1.7M annual revenue potential* 