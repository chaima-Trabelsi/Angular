import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="text-xs font-bold uppercase px-2 py-1 rounded" [ngClass]="statusClasses">
      {{ status }}
    </span>
  `,
  styleUrls: ['./status-badge.css']
})
export class StatusBadgeComponent {
  @Input() status: string = 'En cours';

    get statusClasses(): string {
    return {
      'En attente': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      'En cours': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      'Terminé': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
    }[this.status] || 'bg-gray-100 text-gray-700';
  
  }
}
