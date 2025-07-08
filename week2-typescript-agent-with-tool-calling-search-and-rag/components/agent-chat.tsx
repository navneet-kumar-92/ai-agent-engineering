"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

export default function AgentChat() {
  const [isThinking, setIsThinking] = useState(false);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: "/api/agent",
    maxSteps: 5,
    onFinish: () => {
      setIsThinking(false);
    },
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    setIsThinking(true);
    handleSubmit(e);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="border-b border-gray-200 p-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">AI Agent</h1>
          <p className="text-sm text-gray-600">
            Multi-step reasoning agent with tool calling capabilities
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-white">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Welcome to the AI Agent</h2>
                <p className="text-gray-600 mb-4">
                  This agent can help you with complex tasks using multiple tools:
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">🔍 Knowledge Search</div>
                  <p className="text-xs text-gray-600 mt-1">
                    Search through the knowledge base for stored information
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">🌐 Web Search</div>
                  <p className="text-xs text-gray-600 mt-1">
                    Search the web for current information and real-time data
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">🧮 Math Calculations</div>
                  <p className="text-xs text-gray-600 mt-1">
                    Perform mathematical calculations and solve equations
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">📊 Text Analysis</div>
                  <p className="text-xs text-gray-600 mt-1">
                    Analyze text for sentiment, keywords, and insights
                  </p>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900">Try asking:</p>
                <ul className="text-xs text-blue-700 mt-1 space-y-1">
                  <li>• "Search for information about vectorization and then summarize it"</li>
                  <li>• "What are the latest developments in AI? Search the web and analyze the findings"</li>
                  <li>• "Calculate the area of a circle with radius 5, then search for real-world applications"</li>
                  <li>• "Search the web for current stock prices and analyze the market sentiment"</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`rounded-lg p-4 ${
                  message.role === "user" 
                    ? "bg-blue-500 text-white ml-auto max-w-2xl" 
                    : "bg-white border border-gray-200 mr-auto max-w-4xl"
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${
                      message.role === "user" ? "bg-blue-200" : "bg-green-500"
                    }`} />
                    <div className="text-sm font-medium capitalize">{message.role}</div>
                  </div>
                  
                  <div className="whitespace-pre-wrap text-sm mb-2">{message.content}</div>
                  
                  {/* Display tool invocations */}
                  {message.toolInvocations && message.toolInvocations.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <div className="text-xs font-medium text-gray-600">Tools Used:</div>
                      {message.toolInvocations.map((tool, index) => (
                        <div key={index} className="p-2 bg-gray-50 rounded text-xs">
                          <div className="font-medium">{tool.toolName}</div>
                          <div className="text-gray-600 mt-1">
                            {JSON.stringify(tool.args, null, 2)}
                          </div>
                          {tool.state === 'result' && 'result' in tool && (
                            <div className="mt-2 p-2 bg-white rounded border">
                              <div className="text-xs text-gray-600">Result:</div>
                              <pre className="text-xs mt-1 whitespace-pre-wrap">
                                {typeof tool.result === 'string' ? tool.result : JSON.stringify(tool.result, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Show timestamp */}
                  <div className="text-xs text-gray-500 mt-3">
                    {new Date(message.createdAt || Date.now()).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="bg-white border border-gray-200 rounded-lg p-4 mr-auto max-w-4xl">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                    <div className="text-sm text-gray-600">
                      {isThinking ? "Agent is thinking and using tools..." : "Generating response..."}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Input form */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleFormSubmit} className="flex gap-2">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask the agent to help you with a complex task..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isLoading ? "Stop" : "Send"}
            </button>
            {isLoading && (
              <button
                type="button"
                onClick={() => stop()}
                className="px-4 py-2 bg-gray-500 text-white rounded-md text-sm font-medium hover:bg-gray-600"
              >
                Stop
              </button>
            )}
          </form>
          <div className="text-xs text-gray-500 mt-2">
            The agent can use multiple tools across up to 5 steps to complete complex tasks.
          </div>
        </div>
      </div>
    </div>
  );
} 