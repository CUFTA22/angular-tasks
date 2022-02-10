import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((res) => {
      this.tasks = res;
    });
  }

  handleDeleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    });
  }

  handleToggleTask(task: Task) {
    task.reminder = !task.reminder;

    this.taskService.toggleTask(task).subscribe();
  }

  handleAddTask(task: Task) {
    this.taskService.addTask(task).subscribe((newTask) => {
      this.tasks = [...this.tasks, newTask];
    });
  }
}
