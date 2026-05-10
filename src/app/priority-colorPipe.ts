import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityColor',     // ← Ce nom doit rester "priorityColor" (sans tiret)
  standalone: true
})
export class PriorityColorPipe implements PipeTransform {

  transform(priority: string | undefined): string {
    if (!priority) return 'text-gray-600';

    const p = priority.toLowerCase().trim();

    switch (p) {
      case 'haute':
        return 'text-red-600 font-semibold';
      case 'moyenne':
        return 'text-yellow-600 font-medium';
      case 'basse':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  }
}
