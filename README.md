# AI Agent Engineering

A comprehensive repository for learning and building AI-powered applications using modern web technologies. This project demonstrates practical implementation of AI agents with a focus on clean architecture, security, and best practices.

## 🚀 Project Overview

This repository contains hands-on projects and examples for AI agent engineering, featuring:

- **Next.js 14+** with TypeScript for robust web applications
- **AI Chat Integration** with OpenAI API
- **Modern UI Components** using Tailwind CSS and shadcn/ui
- **API Routes** for seamless AI interactions
- **Security Best Practices** with comprehensive environment protection

## 📁 Repository Structure

```
ai-agent-engineering/
├── week1-setup/          # Main Next.js AI application
│   ├── src/
│   │   ├── app/          # Next.js app router
│   │   │   ├── api/chat/ # AI chat API endpoints
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/   # Reusable UI components
│   │   │   ├── poem-card.tsx
│   │   │   └── ui/       # shadcn/ui components
│   │   └── lib/          # Utility functions
│   ├── public/           # Static assets
│   ├── package.json      # Dependencies and scripts
│   └── README.md         # Project-specific documentation
├── .gitignore           # Security-focused ignore patterns
└── README.md            # This file
```

## 🛠️ Technologies Used

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **AI Integration**: OpenAI API
- **Development**: ESLint, PostCSS, pnpm
- **Security**: Comprehensive environment variable protection

## 🔐 Security Features

This repository implements robust security measures:

- **Environment Protection**: Comprehensive `.gitignore` prevents accidental exposure of:
  - API keys (`.env*` files)
  - Configuration files with secrets
  - Certificate and key files
  - System files and build artifacts

- **Best Practices**: 
  - No hardcoded API keys
  - Secure environment variable handling
  - Proper secret management patterns

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- OpenAI API key

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/navneet-kumar-92/ai-agent-engineering.git
   cd ai-agent-engineering
   ```

2. **Navigate to the project**
   ```bash
   cd week1-setup
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your OpenAI API key to .env.local
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Features

### Current Implementation
- **AI Chat Interface**: Interactive chat with OpenAI integration
- **Poem Generation**: Creative AI-powered content generation
- **Modern UI**: Beautiful, responsive interface with shadcn/ui
- **TypeScript**: Full type safety and developer experience

### Planned Features
- Advanced AI agent workflows
- Multi-modal AI interactions
- Agent memory and context management
- Integration with additional AI providers

## 📚 Learning Resources

This repository is designed for educational purposes and includes:

- Practical AI integration examples
- Modern web development patterns
- Security best practices
- TypeScript implementation guides

## 🤝 Contributing

Contributions are welcome! Please feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Repository**: [https://github.com/navneet-kumar-92/ai-agent-engineering](https://github.com/navneet-kumar-92/ai-agent-engineering)
- **Issues**: [Report bugs or request features](https://github.com/navneet-kumar-92/ai-agent-engineering/issues)

## 📧 Contact

For questions or collaboration opportunities, please open an issue or reach out through GitHub.

---

**Note**: This repository prioritizes security and best practices. Always ensure your API keys and sensitive information are properly protected using environment variables and never committed to version control. 