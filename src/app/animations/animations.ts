import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [   // quand la liste change (ajout ou suppression)
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger(80, animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })))
    ], { optional: true }),

    query(':leave', [
      animate('250ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
    ], { optional: true })
  ])
]);
