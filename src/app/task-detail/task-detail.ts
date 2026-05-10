import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectService, Project, Task } from '../services/project';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-3xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div class="p-8">
          <div class="flex items-center justify-between mb-8">
            <h1 class="text-3xl font-black text-gray-900 dark:text-white">Détails de la Tâche</h1>
            <button (click)="goBack()" class="px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition">
              ← Revenir au board
            </button>
          </div>

          @if (loading()) {
            <div class="flex justify-center py-12">
              <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          } @else if (task()) {
            <div class="space-y-6">
              <div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                <h2 class="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Titre</h2>
                <p class="text-xl font-bold text-gray-900 dark:text-white">{{ task()!.title }}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                  <h2 class="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Priorité</h2>
                  <span class="px-3 py-1 rounded-lg text-sm font-bold" 
                        [ngClass]="{
                          'bg-red-100 text-red-700': task()!.priority === 'Haute',
                          'bg-amber-100 text-amber-700': task()!.priority === 'Moyenne',
                          'bg-emerald-100 text-emerald-700': task()!.priority === 'Basse'
                        }">
                    {{ task()!.priority }}
                  </span>
                </div>
                <div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                  <h2 class="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Statut</h2>
                  <p class="font-bold text-gray-900 dark:text-white">{{ task()!.status }}</p>
                </div>
              </div>
            </div>
          } @else {
            <div class="text-center py-12 text-gray-500">Tâche non trouvée.</div>
          }
        </div>
      </div>
    </div>
  `
})
export class TaskDetailComponent implements OnInit {
  projectId = signal<string | null>(null);
  taskId = signal<string | null>(null);
  task = signal<Task | null>(null);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId.set(params.get('id'));
      this.taskId.set(params.get('taskId'));
      
      if (this.projectId() && this.taskId()) {
        this.loadTask();
      }
    });
  }

  loadTask(): void {
    this.loading.set(true);
    this.projectService.getProjectById(this.projectId()!).subscribe(project => {
      // Dans ce TP, on simule la recherche de la tâche dans le projet
      // On utilise le titre comme ID fictif ou l'index si taskId est un nombre
      const foundTask = project.tasks.find((t, index) => 
        t.title === this.taskId() || index.toString() === this.taskId()
      );
      this.task.set(foundTask || null);
      this.loading.set(false);
    });
  }

  goBack(): void {
    // Navigation programmatique demandée au point 5
    this.router.navigate(['/projects', this.projectId(), 'board']);
  }
}
