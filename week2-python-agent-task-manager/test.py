from taskmanager import TaskManager

def test():
    task_manager = TaskManager()
    task_manager.add_task("Buy groceries")
    task_manager.add_task("Finish the report")
    task_manager.add_task("Call the plumber")
    print(task_manager.list_tasks())

if __name__ == "__main__":
    test()