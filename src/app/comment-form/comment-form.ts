import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShowErrorDirective } from '../directives/show-error';
import { emailExistsValidator } from '../core/validators/email-exists';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ShowErrorDirective],
  template: `
    <div class="mt-12 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
      <h3 class="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <span>💬</span> Laisser un commentaire
      </h3>

      <form [formGroup]="commentForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Auteur -->
          <div class="space-y-2">
            <label class="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Nom d'auteur</label>
            <input type="text" formControlName="author" placeholder="Votre nom..."
                   class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none">
            <p *appShowError="commentForm.get('author'); errorType: 'required'" class="text-xs text-red-500 font-medium ml-1">
              ⚠️ Le nom est obligatoire.
            </p>
          </div>

          <!-- Email -->
          <div class="space-y-2">
            <label class="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email</label>
            <div class="relative">
              <input type="email" formControlName="email" placeholder="votre@email.com"
                     class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none">
              
              <!-- Spinner pendant la validation asynchrone -->
              <div *ngIf="commentForm.get('email')?.pending" class="absolute right-3 top-3.5">
                <div class="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
              </div>
            </div>
            
            <p *appShowError="commentForm.get('email'); errorType: 'required'" class="text-xs text-red-500 font-medium ml-1">
              ⚠️ L'email est obligatoire.
            </p>
            <p *appShowError="commentForm.get('email'); errorType: 'email'" class="text-xs text-red-500 font-medium ml-1">
              ⚠️ Format d'email invalide.
            </p>
            <p *appShowError="commentForm.get('email'); errorType: 'emailExists'" class="text-xs text-red-500 font-medium ml-1">
              ⚠️ Cet email est déjà utilisé ou banni.
            </p>
          </div>
        </div>

        <!-- Contenu -->
        <div class="space-y-2">
          <label class="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Votre message</label>
          <textarea formControlName="content" rows="4" placeholder="Votre commentaire (min. 10 caractères)..."
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"></textarea>
          <p *appShowError="commentForm.get('content'); errorType: 'minlength'" class="text-xs text-red-500 font-medium ml-1">
            ⚠️ Le message doit faire au moins 10 caractères.
          </p>
        </div>

        <!-- Bouton -->
        <button type="submit" [disabled]="commentForm.invalid || commentForm.pending"
                class="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all">
          Ajouter le commentaire 🚀
        </button>
      </form>
    </div>
  `
})
export class CommentFormComponent implements OnInit {
  commentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      author: ['', Validators.required],
      email: ['', 
        [Validators.required, Validators.email], 
        [emailExistsValidator()] // Validateur asynchrone
      ],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      console.log('Commentaire soumis :', this.commentForm.value);
      alert('Merci pour votre commentaire !');
      this.commentForm.reset();
    }
  }
}
