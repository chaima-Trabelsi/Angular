import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectService, Project } from '../services/project';

@Component({
  selector: 'app-project-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-overview.html',
  styleUrls: ['./project-overview.css']
})
export class ProjectOverviewComponent implements OnInit {
  project = signal<Project | null>(null);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    // On récupère l'ID du projet depuis la route parente
    const projectId = this.route.parent?.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.getProjectById(projectId).subscribe(project => {
        this.project.set(project);
        this.loading.set(false);
      });
    }
  }
}
