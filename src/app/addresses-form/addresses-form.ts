// src/app/addresses-form/addresses-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addresses-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addresses-form.html',
  styleUrls: ['./addresses-form.css']
})
export class AddressesFormComponent implements OnInit {

  // Formulaire principal
  addressesForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // 1. Création du FormArray avec une adresse par défaut
    this.addressesForm = this.fb.group({
      addresses: this.fb.array([this.createAddressGroup()])
    });
  }

  // 2. Crée un FormGroup pour une adresse
  createAddressGroup(): FormGroup {
    return this.fb.group({
      type: ['domicile', [Validators.required]],  // domicile, travail, autre
      rue: ['', [Validators.required, Validators.minLength(5)]],
      codePostal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      ville: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  // Getter pour accéder au FormArray
  get addresses(): FormArray {
    return this.addressesForm.get('addresses') as FormArray;
  }

  // Ajouter une adresse
  addAddress(): void {
    this.addresses.push(this.createAddressGroup());
  }

  // Supprimer une adresse à un index donné
  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  // Vérifier si le formulaire a au moins une adresse (validation personnalisée)
  hasAtLeastOneAddress(): boolean {
    return this.addresses.length > 0;
  }

  // Marquer tous les champs comme touchés
  markFormGroupTouched(): void {
    this.addressesForm.markAllAsTouched();
    this.addresses.controls.forEach(control => {
      control.markAsTouched();
    });
  }

  // Réinitialiser le formulaire (une seule adresse)
  resetForm(): void {
    this.addressesForm.reset();
    this.addresses.clear();
    this.addresses.push(this.createAddressGroup());
  }

  onSubmit(): void {
    // 3. Validation : au moins une adresse est requise
    if (!this.hasAtLeastOneAddress()) {
      alert('Au moins une adresse est requise !');
      return;
    }

    if (this.addressesForm.valid) {
      console.log('Adresses soumises :', this.addressesForm.value);
    } else {
      this.markFormGroupTouched();
    }
  }
}
