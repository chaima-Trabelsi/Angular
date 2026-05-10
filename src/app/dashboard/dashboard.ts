// dashboard.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService, Project } from '../services/project';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  totalProjects = signal(0);
  totalTasks = signal(0);
  globalProgress = signal(0);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading.set(true);
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.totalProjects.set(projects.length);
        this.calculateTasksAndProgress(projects);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur chargement dashboard :', err);
        this.error.set('Impossible de charger les statistiques.');
        this.loading.set(false);
      }
    });
  }

  private calculateTasksAndProgress(projects: Project[]) {
    let total = 0;
    let completed = 0;
    
    projects.forEach(p => {
      if (p.tasks) {
        total += p.tasks.length;
        completed += p.tasks.filter(t => t.status === 'Terminé').length;
      }
    });

    this.totalTasks.set(total);
    this.globalProgress.set(total === 0 ? 0 : Math.round((completed / total) * 100));
  }
}
