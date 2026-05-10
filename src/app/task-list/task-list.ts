import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusEmojiPipe } from '../status-emoji-pipe';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PriorityColorPipe } from '../priority-colorPipe';
import { ProjectService } from '../services/project';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, PriorityColorPipe, StatusEmojiPipe, FormsModule, RouterModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
})
export class TaskListComponent implements OnInit {
  @Input() tasks: any[] = [];
  @Input() projectId: string | number | undefined;
  @Output() changeStatus = new EventEmitter<{ task: any, newStatus: string }>();
  selectedPriority: string = 'Toutes'; // Valeur par défaut

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    // Écoute des paramètres de requête (Query Params)
    this.route.queryParamMap.subscribe(params => {
      this.currentSort = params.get('sort');
      this.currentStatusFilter = params.get('status');
    });

    // Si projectId n'est pas passé en input, on le récupère de la route parente
    if (!this.projectId) {
      const idFromRoute = this.route.parent?.snapshot.paramMap.get('id');
      if (idFromRoute) {
        this.projectId = idFromRoute;
        this.loadTasks(idFromRoute);
      }
    }
  }

  currentSort: string | null = null;
  currentStatusFilter: string | null = null;

  updateFilter(status: string | null) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { status: status },
      queryParamsHandling: 'merge'
    });
  }

  updateSort(sort: string | null) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: sort },
      queryParamsHandling: 'merge'
    });
  }

  loadTasks(id: string): void {
    this.projectService.getProjectById(id).subscribe(project => {
      this.tasks = project.tasks;
    });
  }


  get filteredTasks() {
    let result = [...this.tasks];

    // Filtre par statut (via URL)
    if (this.currentStatusFilter) {
      result = result.filter(t => t.status.toLowerCase() === this.currentStatusFilter?.toLowerCase());
    }

    // Filtre par priorité (via Select interne)
    if (this.selectedPriority !== 'Toutes') {
      result = result.filter(task => task.priority === this.selectedPriority);
    }

    // Tri (via URL)
    if (this.currentSort === 'priority') {
      const priorityOrder: { [key: string]: number } = { 'Haute': 3, 'Moyenne': 2, 'Basse': 1 };
      result.sort((a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0));
    }

    return result;
  }

  // Méthode appelée au clic sur le bouton "Changer statut"
  onChangeStatus(task: any) {
    // Exemple : bascule entre 'Terminé' et 'En cours'
    const newStatus = task.status === 'Terminé' ? 'En cours' : 'Terminé';
    this.changeStatus.emit({ task, newStatus });
  }
  getStatusColor(status: string): string {
    switch (status) {
      case 'En attente':
        return 'border-yellow-500';
      case 'En cours':
        return 'border-blue-500';
      case 'Terminé':
        return 'border-green-500';
      default:
        return 'border-gray-500';
    }
  }
}
