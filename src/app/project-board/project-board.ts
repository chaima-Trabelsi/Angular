import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-board.html',
  styleUrl: './project-board.css',
})
export class ProjectBoardComponent implements OnInit {
  projectId = signal<string | null>(null);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // On récupère l'ID du projet depuis la route parente si on est en route enfant
    this.projectId.set(this.route.parent?.snapshot.paramMap.get('id') || null);
  }
}
