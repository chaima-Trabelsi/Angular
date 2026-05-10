import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-todo-list',
    imports: [CommonModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  todolist = [                                    // ← Exemple de données
    { title: 'Tâche 1', completed: true },
    { title: 'Tâche 2', completed: false }
  ];
  message: string = '';

  showBilan() {
    const completedCount = this.todolist.filter(t => t.completed).length;
    this.message = `Total: ${this.todolist.length}, Complétées: ${completedCount}`;
  }
}
