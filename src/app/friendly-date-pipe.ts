import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendlyDate',
  standalone: true   // pour standalone component
})
export class FriendlyDatePipe implements PipeTransform {
  transform(value: Date | string | number | null | undefined): string {
    if (!value) return 'Date inconnue';

    const date = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const diffDays = Math.floor((today.getTime() - date.getTime()) / (1000 * 3600 * 24));

    if (date.toDateString() === today.toDateString()) {
      return 'Aujourd’hui';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Hier';
    } else if (diffDays <= 7) {
      return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    } else {
      // Format long si plus vieux
      return date.toLocaleDateString('fr-FR');
    }
  }
}
