import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { VectorizeService } from "@/lib/vectorize";
import { z } from "zod";

// Define tools for the agent
const tools = {
  searchKnowledgeBase: {
    description: "Search the knowledge base for relevant information",
    parameters: z.object({
      query: z.string().describe("The search query to find relevant information"),
    }),
    execute: async ({ query }: { query: string }) => {
      try {
        const vectorizeService = new VectorizeService();
        const documents = await vectorizeService.retrieveDocuments(query);
        const formattedDocs = vectorizeService.formatDocumentsForContext(documents);
        return {
          success: true,
          data: formattedDocs,
          documentCount: documents.length,
        };
      } catch (error) {
        return {
          success: false,
          error: "Failed to search knowledge base",
        };
      }
    },
  },
  
  calculateMath: {
    description: "Perform mathematical calculations",
    parameters: z.object({
      expression: z.string().describe("The mathematical expression to calculate"),
    }),
    execute: async ({ expression }: { expression: string }) => {
      try {
        // Simple evaluation for basic math expressions
        // In production, you'd want to use a proper math parser
        const result = Function(`"use strict"; return (${expression})`)();
        return {
          success: true,
          expression,
          result,
        };
      } catch (error) {
        return {
          success: false,
          error: "Invalid mathematical expression",
        };
      }
    },
  },
  
  analyzeText: {
    description: "Analyze text for sentiment, keywords, or other insights",
    parameters: z.object({
      text: z.string().describe("The text to analyze"),
      analysisType: z.enum(["sentiment", "keywords", "summary"]).describe("Type of analysis to perform"),
    }),
    execute: async ({ text, analysisType }: { text: string; analysisType: string }) => {
      // Simple text analysis - in production you'd use proper NLP libraries
      const wordCount = text.split(/\s+/).length;
      const charCount = text.length;
      
      let analysis = {};
      
      if (analysisType === "sentiment") {
        const positiveWords = ["good", "great", "excellent", "amazing", "wonderful", "love", "like"];
        const negativeWords = ["bad", "terrible", "awful", "hate", "dislike", "poor"];
        
        const words = text.toLowerCase().split(/\s+/);
        const positiveCount = words.filter(word => positiveWords.includes(word)).length;
        const negativeCount = words.filter(word => negativeWords.includes(word)).length;
        
        analysis = {
          sentiment: positiveCount > negativeCount ? "positive" : 
                    negativeCount > positiveCount ? "negative" : "neutral",
          positiveScore: positiveCount,
          negativeScore: negativeCount,
        };
      } else if (analysisType === "keywords") {
        const words = text.toLowerCase().split(/\s+/);
        const wordFreq = words.reduce((acc, word) => {
          acc[word] = (acc[word] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        const topWords = Object.entries(wordFreq)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .map(([word, count]) => ({ word, count }));
          
        analysis = { topWords };
      } else if (analysisType === "summary") {
        analysis = {
          summary: text.length > 100 ? text.substring(0, 100) + "..." : text,
          wordCount,
          charCount,
        };
      }
      
      return {
        success: true,
        text,
        analysisType,
        wordCount,
        charCount,
        analysis,
      };
    },
  },

  searchWeb: {
    description: "Search the web for current information and real-time data",
    parameters: z.object({
      query: z.string().describe("The search query to find information on the web"),
      maxResults: z.number().optional().default(5).describe("Maximum number of results to return (default: 5)"),
    }),
    execute: async ({ query, maxResults = 5 }: { query: string; maxResults?: number }) => {
      try {
        // Using Serper API for web search - you can replace with your preferred search API
        const SERPER_API_KEY = process.env.SERPER_API_KEY;
        
        if (!SERPER_API_KEY) {
          return {
            success: false,
            error: "Web search API key not configured. Please set SERPER_API_KEY environment variable.",
            fallback: "Consider using the knowledge base search for available information.",
          };
        }

        const response = await fetch('https://google.serper.dev/search', {
          method: 'POST',
          headers: {
            'X-API-KEY': SERPER_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: query,
            num: Math.min(maxResults, 10), // Limit to 10 results max
          }),
        });

        if (!response.ok) {
          throw new Error(`Search API error: ${response.status}`);
        }

        const data = await response.json();
        
        // Extract relevant information from search results
        const results = data.organic?.slice(0, maxResults).map((result: any) => ({
          title: result.title,
          link: result.link,
          snippet: result.snippet,
          date: result.date,
        })) || [];

        // Also include answer box if available
        const answerBox = data.answerBox ? {
          answer: data.answerBox.answer,
          source: data.answerBox.source,
          link: data.answerBox.link,
        } : null;

        return {
          success: true,
          query,
          resultsCount: results.length,
          answerBox,
          results,
          searchTime: new Date().toISOString(),
        };
      } catch (error) {
        console.error('Web search error:', error);
        return {
          success: false,
          error: "Failed to search the web. Please try again or use knowledge base search.",
          query,
        };
      }
    },
  },
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      system: `You are a helpful AI agent that can use various tools to assist users. 
               You have access to:
               - Knowledge base search for finding relevant information from stored documents
               - Web search for current information and real-time data
               - Mathematical calculations
               - Text analysis capabilities
               
               Use these tools when appropriate to provide comprehensive and accurate responses.
               Break down complex tasks into multiple steps using the available tools.
               Always explain what you're doing and why you're using specific tools.
               
               When users ask for current information, recent events, or real-time data, use web search.
               When users ask about topics that might be in the knowledge base, try knowledge base search first.
               You can combine multiple tools in sequence to provide comprehensive answers.`,
      messages,
      tools,
      maxSteps: 5,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in agent:", error);
    return Response.json({ error: "Failed to process agent request" }, { status: 500 });
  }
}
