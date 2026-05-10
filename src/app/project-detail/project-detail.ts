// project-detail.ts - Updated
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskListComponent } from '../task-list/task-list';
import { StatusBadgeComponent } from '../status-badge/status-badge';
import { FriendlyDatePipe } from '../friendly-date-pipe';
import { ProjectService, Project } from '../services/project';
import { CommentFormComponent } from '../comment-form/comment-form';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, TaskListComponent, FriendlyDatePipe, StatusBadgeComponent, RouterModule, CommentFormComponent],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})
export class ProjectDetail implements OnInit {
  project = signal<Project | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedData = data['project'];
      
      if (typeof resolvedData === 'string') {
        this.error.set(resolvedData);
        this.project.set(null);
        this.loading.set(false);
      } else {
        this.project.set(resolvedData);
        this.error.set(null);
        this.loading.set(false);
      }
    });
  }

  loadProject(id: string): void {
    // Cette méthode n'est plus appelée directement car le Resolver s'en occupe
    // Mais on peut la garder pour des rafraîchissements manuels si besoin
  }

  onTaskStatusChange(event: { task: any; newStatus: string }) {
    const currentProject = this.project();
    if (currentProject && currentProject.tasks) {
      const updatedTasks = currentProject.tasks.map(t => 
        t === event.task ? { ...t, status: event.newStatus } : t
      );
      this.project.set({ ...currentProject, tasks: updatedTasks });
    }
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }

  getProgress(): number {
    const proj = this.project();
    if (!proj?.tasks || proj.tasks.length === 0) return 0;
    const completed = proj.tasks.filter((t: any) => t.status === 'Terminé').length;
    return Math.round((completed / proj.tasks.length) * 100);
  }

  getCompletedCount(): number {
    return this.project()?.tasks?.filter((t: any) => t.status === 'Terminé').length || 0;
  }

  getTotalTasks(): number {
    return this.project()?.tasks?.length || 0;
  }
}
