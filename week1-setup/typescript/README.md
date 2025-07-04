# AI Engineering Bootcamp - Week 1

Welcome to **Week 1** of the AI Engineering Bootcamp! 🚀

## 📚 What is this project?

This is our **first week assignment** where we're setting up our development environment and getting familiar with the basics of AI integration in web applications.

## 🎯 Week 1 Goals

- ✅ Set up **TypeScript/Next.js** development environment
- ✅ Configure **AI SDK** with OpenAI integration
- ✅ Build a simple **AI poem generator** using LLM calls
- ✅ Learn component-based architecture with **ShadCN UI**
- ✅ Understand streaming responses from AI models

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN UI** - Beautiful, accessible components
- **AI SDK** - Vercel's AI integration toolkit
- **OpenAI GPT-4** - Large Language Model for poem generation

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up your OpenAI API key:**
   ```bash
   # Create .env.local file
   echo "OPENAI_API_KEY=your-api-key-here" > .env.local
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) and click "Generate Poem"!

## 📖 What you'll learn

- How to make **LLM API calls** in a web application
- **Streaming responses** for real-time AI interactions
- **Component architecture** with React and TypeScript
- **Environment variable management** for API keys
- **Modern UI development** with Tailwind and ShadCN

## 🔮 Coming in Future Weeks

- **Week 2-3**: Building **RAG (Retrieval-Augmented Generation)** systems
- **Week 4-5**: Creating **MCP (Model Context Protocol) servers**
- **Week 6+**: Advanced agent patterns and multi-step reasoning

## 🎨 Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts     # AI API endpoint
│   ├── page.tsx              # Homepage with poem generator
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # ShadCN UI components
│   └── poem-card.tsx         # Main poem generator component
└── lib/
    └── utils.ts              # Utility functions
```

## 💡 Key Features

- **Real-time streaming** - Watch poems generate word by word
- **Beautiful UI** - Professional design with ShadCN components
- **Responsive design** - Works on desktop and mobile
- **Type safety** - Full TypeScript integration
- **Modern architecture** - Next.js App Router with server components

## 🎯 Assignment Complete!

You've successfully:
- Set up a modern TypeScript/Next.js environment
- Integrated OpenAI's GPT-4 for text generation
- Built a beautiful, interactive AI application
- Learned the foundations for advanced AI agent development

Ready for Week 2? Let's build some RAG systems! 🔥

---

*Built with ❤️ for the AI Engineering Bootcamp*
