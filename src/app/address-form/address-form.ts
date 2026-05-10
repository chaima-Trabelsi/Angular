// src/app/address-form/address-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './address-form.html',
  styleUrls: ['./address-form.css']
})
export class AddressFormComponent implements OnInit {

  // Formulaire principal
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // 1. Création du FormGroup imbriqué "adresse" dans le FormGroup principal
    this.userForm = this.fb.group({
      // Informations personnelles
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],

      // 1. FormGroup imbriqué "adresse"
      adresse: this.fb.group({
        rue: ['', [Validators.required, Validators.minLength(5)]],
        codePostal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],  // 5 chiffres
        ville: ['', [Validators.required, Validators.minLength(2)]],
        pays: ['France', [Validators.required, Validators.minLength(2)]]
      })
    });
  }

  // 3. Getter pour accéder facilement au FormGroup adresse
  get adresse(): FormGroup {
    return this.userForm.get('adresse') as FormGroup;
  }

  // Getters pour les informations personnelles
  get nom() { return this.userForm.get('nom'); }
  get prenom() { return this.userForm.get('prenom'); }
  get email() { return this.userForm.get('email'); }

  // Getters pour l'adresse
  get rue() { return this.adresse.get('rue'); }
  get codePostal() { return this.adresse.get('codePostal'); }
  get ville() { return this.adresse.get('ville'); }
  get pays() { return this.adresse.get('pays'); }

  // Marquer tous les champs comme touchés
  markFormGroupTouched(): void {
    this.userForm.markAllAsTouched();
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.userForm.reset({
      pays: 'France'  // On garde la valeur par défaut du pays
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Formulaire soumis :', this.userForm.value);
    } else {
      this.markFormGroupTouched();
    }
  }
}
