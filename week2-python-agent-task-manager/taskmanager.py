'''
Simple task management system for an AI agent.

This module provides a simple task management system for an AI agent.

It allows the agent to create, view, and manage tasks.

It also provides a simple interface for the agent to interact with the task manager.

'''

import json
import os
from datetime import datetime
from typing import List, Dict, Any
from dataclasses import dataclass, asdict

@dataclass
class Task:
    id: int
    title: str
    priority: str
    created_at: datetime
    completed: bool 

class TaskManager:
    """
    A Task Management system that stores tasks in a JSON file.
    Provides methods to add, view, complete and provide tasks statistics.
    """
    
    def __init__(self, task_file: str = "tasks.json") -> None:
        self.task_file = task_file
        self.tasks = self.load_tasks()

    def load_tasks(self) -> List[Dict]:
        """
        Loads tasks from the task file.
        """
        if not os.path.exists(self.task_file):
            return []

        with open(self.task_file, "r") as f:
            return json.load(f) 

    def save_tasks(self) -> None:
        """
        Saves tasks to the task file.
        """
        with open(self.task_file, "w") as f:
            json.dump(self.tasks, f, indent=4)

    def add_task(self, title: str, priority: str = "medium") -> str:
        """
        Adds a new task to the task list with an auto generated unique ID.
        """
        new_task = Task(
            id = len(self.tasks) + 1,
            title = title,
            priority = priority,
            created_at = datetime.now().isoformat(), #type: ignore
            completed = False,
        )
        self.tasks.append(asdict(new_task))
        self.save_tasks()

        return f"Task {title} added successfully with priority {priority}."

    def list_tasks(self) -> str:
        """
        Returns a nicely formattedlist of tasks that are sorted by priority and completion status.
        """
        
        if not self.tasks:
            return f"No tasks found."
        
        # Sort tasks by priority (high > medium > low) and completion status
        priority_order = {"high": 0, "medium": 1, "low": 2}
        sorted_tasks = sorted(self.tasks, 
                            key=lambda x: (x["completed"], priority_order[x["priority"]]))
        
        result = ""
        for task in sorted_tasks:
            # Map priorities to emojis
            priority_emoji = {
                "high": "🔴",
                "medium": "🟡",
                "low": "🟢"
            }
            status = "✅" if task["completed"] else "⏳"
            result += f"{task['id']}. {priority_emoji[task['priority']]} {task['title']} {status}\n"
        
        return result


    def complete_task(self, task_id: int) -> str:
        for task in self.tasks:
            if task["id"] == task_id:
                if not task["completed"]:
                    task["completed"] = True
                    self.save_tasks()
                return f"Task '{task['title']}' marked as completed"
        return f"Task with ID {task_id} not found"

    #provide task statistics
    def get_task_statistics(self) -> str:
        """
        Calculate and return productivity statistics with encouraging messages
        """
        if not self.tasks:
            return "No tasks available for statistics"
            
        # Calculate basic statistics
        total_tasks = len(self.tasks)
        completed_tasks = sum(1 for task in self.tasks if task["completed"])
        completion_rate = (completed_tasks / total_tasks) * 100 if total_tasks > 0 else 0
        
        # Count tasks by priority
        priority_counts = {
            "high": sum(1 for task in self.tasks if task["priority"] == "high"),
            "medium": sum(1 for task in self.tasks if task["priority"] == "medium"),
            "low": sum(1 for task in self.tasks if task["priority"] == "low")
        }
        
        # Generate encouraging message based on completion rate
        if completion_rate == 100:
            message = "🏆 You've completed all your tasks! You're a rockstar!"
        elif completion_rate >= 80:
            message = "🌟 Outstanding progress! You're crushing it!"
        elif completion_rate >= 50:
            message = "💪 Great job! Keep up the momentum!" 
        else:
            message = "🎯 You're making progress! Every task completed is a step forward!"

        # Format statistics string
        stats = f"""
        📊 Task Statistics:
        ------------------
        Total Tasks: {total_tasks}
        Completed: {completed_tasks}
        Completion Rate: {completion_rate:.1f}%

        Priority Breakdown:
        🔴 High: {priority_counts['high']}
        🟡 Medium: {priority_counts['medium']}
        🟢 Low: {priority_counts['low']}

        {message}
        """
        return stats
