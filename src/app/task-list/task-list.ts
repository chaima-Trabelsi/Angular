import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
})
export class TaskListComponent {
  @Input() tasks: any[] = [];

  getStatusColor(status: string): string {
    switch (status) {
      case 'En attente':
        return 'border-yellow-500';
      case 'En cours':
        return 'border-blue-500';
      case 'Terminé':
        return 'border-green-500';
      default:
        return 'border-gray-500';
    }
  }
}
