// project-list.ts
import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { listAnimation } from '../animations/animations';
import { FormsModule } from '@angular/forms';
import { ProjectService, Project } from '../services/project';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.css'],
  animations: [listAnimation]
})
export class ProjectList implements OnInit {
  projects = signal<Project[]>([]);
  searchTerm = signal('');
  loading = signal(true);
  error = signal<string | null>(null);

  notificationMessage = signal('');
  showNotification = signal(false);

  filteredProjects = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const allProjects = this.projects();
    if (!term) return allProjects;
    return allProjects.filter(p => p.name.toLowerCase().includes(term));
  });

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading.set(true);
    this.error.set(null);
    
    console.log('Tentative de chargement des projets depuis http://localhost:3001/projects...');
    
    this.projectService.getProjects().subscribe({
      next: (data) => {
        console.log('Projets chargés avec succès :', data);
        this.projects.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur détaillée lors du chargement :', err);
        this.error.set('Impossible de se connecter au serveur. Vérifiez que json-server est lancé (npm run api).');
        this.loading.set(false);
      }
    });
  }

  showTemporaryMessage(message: string, duration: number = 3000) {
    this.notificationMessage.set(message);
    this.showNotification.set(true);
    setTimeout(() => this.showNotification.set(false), duration);
  }

  addDemoProject() {
    const demoProject: Project = {
      name: `Projet démo ${new Date().toLocaleTimeString()}`,
      description: 'Projet ajouté pour tester la connexion au serveur',
      status: 'En cours',
      showTasks: false,
      tasks: [],
      createdAt: new Date().toISOString()
    };

    this.projectService.addProject(demoProject).subscribe({
      next: (newProject) => {
        this.projects.update(all => [...all, newProject]);
        this.showTemporaryMessage('✅ Projet ajouté avec succès !');
      },
      error: (err) => console.error('Erreur ajout', err)
    });
  }

  deleteProjectById(id: string | number | undefined): void {
    if (!id) return;

    this.projectService.deleteProject(id).subscribe({
      next: () => {
        this.projects.update(all => all.filter(p => p.id !== id));
        this.showTemporaryMessage('🗑️ Projet supprimé.');
      },
      error: (err) => console.error('Erreur suppression', err)
    });
  }
}
