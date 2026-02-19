import { Component } from '@angular/core';
import {TaskListComponent } from '../task-list/task-list';
@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [TaskListComponent],
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.css'] // ou styleUrl si Angular 17+ avec syntaxe unique
})
export class ProjectList {
  projects = [
    {
      name: 'Projet 1',
      description: 'Description 1',
      status: 'En cours',
      showTasks: false,
      tasks: [
        { title: 'Tâche 1', priority: 'Haute', status: 'En attente' },
        { title: 'Tâche 2', priority: 'Moyenne', status: 'En cours' }
      ]
    },
    {
      name: 'Projet 2',
      description: 'Description 2',
      status: 'Terminé',
      showTasks: false,
      tasks: [{ title: 'Tâche 1', priority: 'Basse', status: 'Terminé' }]
    }
  ];

  // Fonction pour basculer l'affichage des tâches
  toggleProject(project: any) {
  project.showTasks = !project.showTasks;
}

}
