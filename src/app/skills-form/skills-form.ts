// src/app/skills-form/skills-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, ValidationErrors, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationService } from '../services/validation';
// 2. Validateur personnalisé au niveau du FormGroup
// Vérifie qu'il y a au moins 3 compétences
// 2. Validateur personnalisé au niveau du FormGroup
// Vérifie qu'il y a au moins 3 compétences
export function minCompetencesValidator(min: number) {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const skillsArray = formGroup.get('skills');

    // Vérification de sécurité : si skillsArray est null ou pas un FormArray
    if (!skillsArray || !(skillsArray instanceof FormArray)) {
      return null;
    }

    // Vérifie si au moins une compétence existe et si le nombre est insuffisant
    if (skillsArray.length > 0 && skillsArray.length < min) {
      return { minCompetences: { required: min, actual: skillsArray.length } };
    }
    return null;
  };
}
@Component({
  selector: 'app-skills-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './skills-form.html',
  styleUrls: ['./skills-form.css']
})
export class SkillsFormComponent implements OnInit {
  skillsForm!: FormGroup;

  constructor(private fb: FormBuilder,public validationService: ValidationService) {}

  ngOnInit(): void {
    // 1. Création du formulaire avec validateur personnalisé au niveau du FormGroup
    this.skillsForm = this.fb.group({
      skills: this.fb.array([this.createSkillControl()])  // 1 compétence par défaut
    }, { validators: minCompetencesValidator(3) });  // Validation : au moins 3 compétences
  }

  // Crée un FormGroup pour une compétence
  createSkillControl(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      level: [3, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  // Getter pour accéder au FormArray
  get skills(): FormArray {
    return this.skillsForm.get('skills') as FormArray;
  }

  // Ajouter une compétence
  addSkill(): void {
    this.skills.push(this.createSkillControl());
  }

  // Supprimer une compétence
  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  // Marquer tous les champs comme touchés
  markFormGroupTouched(): void {
    this.skills.controls.forEach(control => {
      control.markAsTouched();
    });
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.skillsForm.reset();
    this.skills.clear();
    this.skills.push(this.createSkillControl());
  }

  onSubmit(): void {
    if (this.skillsForm.valid) {
      console.log('Compétences soumises :', this.skillsForm.value);
    } else {
      this.markFormGroupTouched();
    }
  }
}
