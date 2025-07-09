"""
AI Agent which would use the tools available in the taskmanager.py 
Demonstrates OpenAI Responses API usage.
"""

import os
import json
from typing import Any, Dict, List
from openai import OpenAI
from taskmanager import TaskManager
from dotenv import load_dotenv

load_dotenv()

class AI_TaskManagerAgent:
    """
    AI Agent class that manages tasks using OpenAI Responses API tool calling capabilities
    """
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.task_manager = TaskManager()

        # Define available tools for the AI agent using taskmanager.py
        self.tools = [
            {
                "type": "function",
                "name": "add_task",
                "description": "Add a new task to the task list.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "description": "The title or description of the task to add."
                        },
                        "priority": {
                            "type": "string",
                            "enum": ["high", "medium", "low"],
                            "description": "The priority of the task. Defaults to 'medium'."
                        }
                    },
                    "required": ["title"],
                    "additionalProperties": False
                }
            },
            {
                "type": "function",
                "name": "list_tasks",
                "description": "List all current tasks, sorted by priority and completion status.",
                "parameters": {
                    "type": "object",
                    "properties": {},
                    "additionalProperties": False
                }
            },
            {
                "type": "function",
                "name": "complete_task",
                "description": "Mark a task as completed by its ID.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "task_id": {
                            "type": "integer",
                            "description": "The ID of the task to mark as completed."
                        }
                    },
                    "required": ["task_id"],
                    "additionalProperties": False
                }
            },
            {
                "type": "function",
                "name": "get_task_statistics",
                "description": "Get statistics and productivity insights about all tasks.",
                "parameters": {
                    "type": "object",
                    "properties": {},
                    "additionalProperties": False
                }
            }
        ]

        # Map function names to actual Python callables
        self.function_map = {
            "add_task": self.task_manager.add_task,
            "list_tasks": self.task_manager.list_tasks,
            "complete_task": self.task_manager.complete_task,
            "get_task_statistics": self.task_manager.get_task_statistics
        }

    def chat(self, user_input: str) -> str:
        """
        Chat with the AI agent using Responses API.
        """
        try:
            # Create system instructions for the agent
            instructions = """
            You are a helpful AI assistant that manages tasks for users. You can add tasks, list tasks, 
            mark tasks as completed, and provide productivity insights.

            You have access to the following tools:
            - add_task: Add a new task with optional priority
            - list_tasks: List all tasks sorted by priority and completion status
            - complete_task: Mark a task as completed
            - get_task_statistics: Get task statistics and encouraging messages
            
            For general conversation or questions unrelated to task management and productivity, respond directly without using tools.
            Be friendly, encouraging and helpful.
            """

            # Initialize conversation with user input
            conversation = [{"role": "user", "content": user_input}]
            
            while True:
                # Limit conversation history to last 2 messages
                conversation = conversation[-2:]
                
                # Call the Responses API
                response = self.client.responses.create(
                    model="gpt-4o-mini",
                    instructions=instructions,
                    input=conversation,  # type: ignore
                    tools=self.tools,  # type: ignore
                    store=False  # Don't store conversation state on OpenAI's side
                )
                
                # Add the response to conversation history
                conversation.extend([item.model_dump() for item in response.output])
                
                # Check if there are function calls in the response
                function_calls = [item for item in response.output if item.type == 'function_call']
                
                if function_calls:
                    # Process each function call
                    for func_call in function_calls:
                        function_name = func_call.name
                        function_args = json.loads(func_call.arguments)
                        
                        # Execute the function
                        if function_name in self.function_map:
                            try:
                                result = self.function_map[function_name](**function_args)
                                function_output = {
                                    "type": "function_call_output",
                                    "call_id": func_call.call_id,
                                    "output": str(result)
                                }
                                conversation.append(function_output)
                            except Exception as e:
                                function_output = {
                                    "type": "function_call_output", 
                                    "call_id": func_call.call_id,
                                    "output": f"Error executing function: {str(e)}"
                                }
                                conversation.append(function_output)
                        else:
                            function_output = {
                                "type": "function_call_output",
                                "call_id": func_call.call_id,
                                "output": f"Function {function_name} not found"
                            }
                            conversation.append(function_output)
                else:
                    # No function calls, return the response
                    return response.output_text or "No response generated."
                    
        except Exception as e:
            print(f"Error: {e}")
            return "An error occurred while processing your request."

    def run_cli(self):
        """
        Run the CLI for the AI Task Manager Agent.
        """
        print("Welcome to the Task Manager Agent CLI!")
        print("Type your request (or type 'quit' to exit):")
        print("="*50)   
        while True:
            user_input = input("You: ")
            if user_input.strip().lower() in ["quit", "exit", "bye"]:
                print("Goodbye! 👋")
                break
            response = self.chat(user_input)
            print("Agent:", response) 