import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      emailPrincipal: ['', [Validators.required, Validators.email]],  // Email principal
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      ville: ['', [Validators.required, Validators.minLength(2)]],
      // 1. Création du FormArray avec un email par défaut
      emails: this.fb.array([this.createEmailControl()])
    });
  }

  // 2. Méthode qui crée un nouveau FormGroup pour un email
  createEmailControl(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      type: ['perso', [Validators.required]]  // type: perso, pro, autre
    });
  }

  // 3. Getter pour accéder facilement au FormArray
  get emails(): FormArray {
    return this.userForm.get('emails') as FormArray;
  }

  // 4. Méthode pour ajouter un email
  addEmail(): void {
    this.emails.push(this.createEmailControl());
  }

  // 5. Méthode pour supprimer un email à un index donné
  removeEmail(index: number): void {
    this.emails.removeAt(index);
  }

  // Getters existants
  get nom() { return this.userForm.get('nom'); }
  get prenom() { return this.userForm.get('prenom'); }
  get emailPrincipal() { return this.userForm.get('emailPrincipal'); }
  get age() { return this.userForm.get('age'); }
  get ville() { return this.userForm.get('ville'); }

  // Méthode pour marquer tous les champs comme touchés
  markFormGroupTouched(): void {
    Object.values(this.userForm.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach(c => c.markAsTouched());
      }
    });
  }

  // Méthode pour réinitialiser le formulaire
  resetForm(): void {
    this.userForm.reset();
    // Réinitialiser le FormArray avec un seul email
    this.emails.clear();
    this.emails.push(this.createEmailControl());
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Formulaire soumis :', this.userForm.value);
    } else {
      this.markFormGroupTouched();
    }
  }
}
