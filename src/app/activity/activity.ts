import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity.html',
  styleUrls: ['./activity.css']
})
export class ActivityComponent implements OnInit {
  activities = signal([
    { id: 1, user: 'Admin', action: 'a mis à jour le statut du projet', time: 'Il y a 2 heures', icon: '📝' },
    { id: 2, user: 'Alice', action: 'a ajouté une nouvelle tâche : "Design Review"', time: 'Il y a 5 heures', icon: '➕' },
    { id: 3, user: 'Bob', action: 'a terminé la tâche : "Setup API"', time: 'Hier à 14:30', icon: '✅' },
    { id: 4, user: 'System', action: 'a généré le rapport mensuel', time: 'Il y a 2 jours', icon: '📊' }
  ]);

  constructor() {}

  ngOnInit(): void {}
}
