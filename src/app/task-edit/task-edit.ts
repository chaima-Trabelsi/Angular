import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanComponentDeactivate } from '../core/guards/pending-changes-guard';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">Édition de la Tâche</h1>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p class="mb-4 text-gray-600">Modifiez les informations de la tâche ci-dessous.</p>
        <div class="space-y-4">
          <input type="text" placeholder="Titre de la tâche" class="w-full p-2 border rounded" (input)="onInputChange()">
          <div class="flex gap-4">
            <button class="px-4 py-2 bg-blue-600 text-white rounded" (click)="save()">Sauvegarder</button>
            <button class="px-4 py-2 bg-gray-200 rounded" routerLink="../..">Annuler</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TaskEditComponent implements CanComponentDeactivate {
  hasUnsavedChanges = false;

  onInputChange() {
    this.hasUnsavedChanges = true;
  }

  save() {
    this.hasUnsavedChanges = false;
    alert('Tâche sauvegardée !');
  }

  canDeactivate(): boolean {
    // Retourne false s'il y a des changements non sauvegardés
    return !this.hasUnsavedChanges;
  }
}
