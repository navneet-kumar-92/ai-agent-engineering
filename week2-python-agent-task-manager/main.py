"""
Entry point for the AI Task Manager Agent CLI application.
"""

from agent import AI_TaskManagerAgent

def main():
    """
    Main entry point for the Task Manager Agent CLI.
    """
    agent = AI_TaskManagerAgent()
    agent.run_cli()

if __name__ == "__main__":
    main()