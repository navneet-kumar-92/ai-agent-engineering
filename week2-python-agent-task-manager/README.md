# AI Task Manager Agent

A Python-based AI agent that helps you manage tasks through natural language conversations. Built with OpenAI's Responses API and function calling capabilities.

## 🚀 Features

- **Natural Language Interface**: Chat with your task manager using plain English
- **Task Management**: Add, list, complete, and track tasks
- **Priority System**: Organize tasks by high, medium, or low priority
- **Statistics & Insights**: Get productivity statistics with encouraging messages
- **Persistent Storage**: Tasks are saved to a JSON file for persistence
- **Function Calling**: Uses OpenAI's latest Responses API with tool calling

## 📋 Available Commands

The agent can understand natural language requests like:
- "Add a new task to buy groceries with high priority"
- "Show me all my tasks"
- "Mark task 3 as completed"
- "Give me my productivity statistics"
- "What tasks do I have pending?"

## 🛠️ Requirements

- Python 3.7+
- OpenAI API key
- Required packages (install via pip):
  - `openai`
  - `python-dotenv`

## 🔧 Setup

1. **Clone or download the project**
2. **Install dependencies**:
   ```bash
   pip install openai python-dotenv
   ```

3. **Set up your OpenAI API key**:
   Create a `.env` file in the project root:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the agent**:
   ```bash
   python main.py
   ```

## 💬 Usage Examples

```
You: Add a task to finish the weekly report with high priority
Agent: Task 'finish the weekly report' added successfully with priority high.

You: Show me all my tasks
Agent: 1. 🔴 finish the weekly report ⏳
        2. 🟡 buy groceries ⏳
        3. 🟢 call the plumber ⏳

You: Complete task 1
Agent: Task 'finish the weekly report' marked as completed

You: Give me my stats
Agent: 📊 Task Statistics:
        ------------------
        Total Tasks: 3
        Completed: 1
        Completion Rate: 33.3%
        ...
```

## 🗂️ File Structure

```
week2-python-agent-task-manager/
├── main.py              # Entry point for the CLI application
├── agent.py             # Main AI agent class with OpenAI integration
├── taskmanager.py       # Task management system with JSON persistence
├── tasks.json          # Task storage file (created automatically)
├── test.py             # Simple test script
├── .env                # Environment variables (create this)
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## 🔧 Core Components

### AI_TaskManagerAgent (`agent.py`)
- Handles OpenAI API interactions
- Manages conversation flow with limited history (last 2 messages)
- Processes function calls and tool usage
- Provides CLI interface

### TaskManager (`taskmanager.py`)
- Manages task CRUD operations
- Handles JSON file persistence
- Provides task statistics and insights
- Supports priority-based sorting

### Task Data Structure
```python
{
    "id": 1,
    "title": "Buy groceries",
    "priority": "high",
    "created_at": "2024-01-01T10:00:00",
    "completed": false
}
```

## 🎯 Key Features

### Priority System
- **🔴 High**: Urgent tasks that need immediate attention
- **🟡 Medium**: Important tasks with moderate urgency
- **🟢 Low**: Tasks that can be done when time permits

### Smart Conversation Management
- Maintains context with conversation history
- Limits history to last 2 messages for efficiency
- Supports both task-related and general conversations

### Productivity Insights
- Completion rate tracking
- Priority breakdown
- Encouraging messages based on progress
- Visual task status indicators

## 🧪 Testing

Run the basic test:
```bash
python test.py
```

## 🤝 Contributing

This is a learning project for AI agent development. Feel free to:
- Add new task management features
- Improve the conversation flow
- Enhance the statistics system
- Add more sophisticated task filtering

## 📝 License

This project is for educational purposes as part of AI agent engineering learning.

## 🔍 Troubleshooting

**Common Issues:**
1. **API Key Error**: Make sure your `.env` file contains a valid OpenAI API key
2. **Permission Error**: Ensure the script has write permissions for `tasks.json`
3. **Import Error**: Install required packages with `pip install openai python-dotenv`

**To reset tasks**: Delete the `tasks.json` file and restart the agent.

## 🎓 Learning Objectives

This project demonstrates:
- OpenAI Responses API usage
- Function calling with AI agents
- Natural language processing for task management
- JSON-based data persistence
- CLI application development
- Conversation state management 