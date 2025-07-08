# RAG Next.js TypeScript Application

A modern **Retrieval-Augmented Generation (RAG)** chat application built with Next.js, TypeScript, and powered by OpenAI's GPT models with vector-based document retrieval using Vectorize.io.

## 🚀 Features

- **AI-Powered Chat**: Interactive chat interface with GPT-4o-mini
- **Multi-Step Agent**: Advanced agent with tool-calling capabilities
- **Document Retrieval**: RAG system that retrieves relevant context from vectorized documents
- **Web Search**: Real-time web search for current information
- **Mathematical Calculations**: Built-in calculator for complex equations
- **Text Analysis**: Sentiment analysis, keyword extraction, and text summarization
- **Real-time Sources**: View document sources that inform AI responses
- **Modern UI**: Clean, responsive interface built with Tailwind CSS
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **AI/ML**: OpenAI GPT-4o-mini, AI SDK
- **Vector Database**: Vectorize.io
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 📋 Prerequisites

Before setting up this project, you'll need:

1. **Node.js** (v18 or higher)
2. **pnpm**: [Install pnpm](https://pnpm.io/installation)
3. **OpenAI API Key**: [Get one here](https://platform.openai.com/api-keys)
4. **Vectorize.io Account**: [Sign up here](https://vectorize.io)

## 🔧 Installation

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Set up environment variables**

   Create a `.env.local` file in the root directory of your project:

   ```bash
   # Create the file (from project root)
   touch .env.local
   ```

   Open the file in your editor and add the following variables:

   ```env
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key_here

   # Vectorize.io Configuration
   VECTORIZE_PIPELINE_ACCESS_TOKEN=your_vectorize_access_token_here
   VECTORIZE_ORGANIZATION_ID=your_vectorize_organization_id_here
   VECTORIZE_PIPELINE_ID=your_vectorize_pipeline_id_here

   # Web Search Configuration (Optional)
   SERPER_API_KEY=your_serper_api_key_here
   ```

   **Important**: The `.env.local` file is automatically ignored by git, keeping your API keys secure.

## 🔑 Environment Variables Setup

### OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Give your key a name (e.g., "rag-next-app")
5. Copy the generated key immediately (you won't see it again!)
6. In your `.env.local` file, replace `your_openai_api_key_here` with your actual key:
   ```env
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
   ```

### Vectorize.io Configuration

1. Sign up at [Vectorize.io](https://vectorize.io)
2. Create a new organization
3. Navigate to your organization settings
4. Create a new pipeline:
   - Choose "Document Retrieval" as the pipeline type
   - Configure your pipeline settings
   - Save the pipeline
5. Generate an access token:
   - Go to "API Tokens" in your organization settings
   - Create a new token with "Retrieval Access" permissions
   - Copy the token
6. From your Vectorize dashboard, copy these values to your `.env.local`:
   ```env
   VECTORIZE_PIPELINE_ACCESS_TOKEN=eyJhbGciOi... (your full token)
   VECTORIZE_ORGANIZATION_ID=527d9a27-c34a-4d0a-8fde-... (your org ID)
   VECTORIZE_PIPELINE_ID=aip0c318-344a-4721-a9e7-... (your pipeline ID)
   ```

### Verifying Your Setup

After adding all environment variables, your `.env.local` file should look similar to this:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx

# Vectorize.io Configuration
VECTORIZE_PIPELINE_ACCESS_TOKEN=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
VECTORIZE_ORGANIZATION_ID=527d9a27-c34a-4d0a-8fde-1129a57eb5b8
   VECTORIZE_PIPELINE_ID=aip0c318-344a-4721-a9e7-5526c96d9b49
   ```

### Serper API Key (Optional - for Web Search)

The agent includes web search functionality powered by Serper API. This is optional but enables real-time web search capabilities:

1. Sign up at [Serper.dev](https://serper.dev)
2. Navigate to your dashboard
3. Generate a new API key
4. Copy the API key and add it to your `.env.local`:
   ```env
   SERPER_API_KEY=your_serper_api_key_here
   ```

**Note**: If you don't configure the Serper API key, the agent will still work but won't be able to search the web. It will gracefully fall back to knowledge base search and other tools.

**Note**: Never commit your `.env.local` file to version control!

## 🚀 Getting Started

1. **Start the development server**

   ```bash
   pnpm dev
   ```

2. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Test the application**
   - Visit the main page to see the Next.js welcome screen
   - Go to `/vectorize` to access the RAG chat interface
   - Start asking questions about your vectorized documents

## 📁 Project Structure

```
rag-next-typescript/
├── app/
│   ├── api/
│   │   ├── agent/         # Multi-step agent API endpoint
│   │   └── chat/          # Simple chat API endpoint
│   ├── agent/             # Advanced agent interface
│   ├── vectorize/         # RAG chat interface
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── chat.tsx          # Main chat component
│   └── sources-display.tsx # Document sources display
├── lib/
│   ├── consts.ts         # Constants and loading messages
│   ├── utils.ts          # Utility functions
│   └── vectorize.ts      # Vectorize service integration
├── types/
│   ├── chat.ts           # Chat-related types
│   └── vectorize.ts      # Vectorize API types
└── .env.local           # Environment variables
```

## 🔄 How It Works

1. **User Input**: User types a question in the chat interface
2. **Document Retrieval**: The system queries Vectorize.io to find relevant documents
3. **Context Formation**: Retrieved documents are formatted as context
4. **AI Generation**: OpenAI GPT-4o-mini generates a response using the context
5. **Response Display**: The answer is shown with source documents for transparency

## 🎯 Usage

### Multi-Step Agent Interface

- Navigate to `/agent` for the advanced agent interface
- Ask complex questions that require multiple tools
- Watch the agent break down tasks into steps
- See real-time tool usage and results
- Examples:
  - "Search for the latest AI developments and analyze the sentiment"
  - "Calculate the compound interest for $1000 at 5% for 10 years, then search for investment strategies"
  - "Search my knowledge base for vectorization info, then search the web for recent updates"

### Simple Chat Interface

- Navigate to `/vectorize` for the simple RAG chat interface
- Type questions related to your vectorized documents
- View source documents that informed each AI response
- Enjoy real-time loading animations and smooth interactions

### Adding Documents

To add documents to your vector database, you'll need to use the Vectorize.io platform or API to upload and process your documents before they can be retrieved by this application.

## 🛠️ Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint

## 🔍 Troubleshooting

### Common Issues

1. **Missing Environment Variables**

   - Ensure all required environment variables are set in `.env.local`
   - Check that your API keys are valid and have proper permissions

2. **Vectorize Connection Issues**

   - Verify your Vectorize.io credentials
   - Ensure your pipeline is properly configured and has documents

3. **OpenAI API Errors**
   - Check your OpenAI API key validity
   - Ensure you have sufficient credits/quota

### Error Messages

- `Failed to retrieve documents from Vectorize` - Check Vectorize.io configuration
- `Failed to process chat` - Usually indicates OpenAI API issues

## 📖 Learn More

### Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

### AI & RAG Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Vectorize.io Documentation](https://vectorize.io/docs)
- [AI SDK Documentation](https://sdk.vercel.ai)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to a Git repository
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy automatically on every push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request
