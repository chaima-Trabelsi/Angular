// src/app/services/validation.service.ts
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  // 1. Méthode principale qui retourne le message d'erreur
  getErrorMessage(control: AbstractControl | null): string {
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    const errors = control.errors;

    // Ordre de priorité des erreurs (première erreur trouvée = affichée)
    if (errors['required']) {
      return 'Ce champ est requis.';
    }
    if (errors['email']) {
      return 'Veuillez saisir une adresse email valide (ex: nom@domaine.com).';
    }
    if (errors['minlength']) {
      const requiredLength = errors['minlength'].requiredLength;
      return `Ce champ doit contenir au moins ${requiredLength} caractères.`;
    }
    if (errors['maxlength']) {
      const requiredLength = errors['maxlength'].requiredLength;
      return `Ce champ ne peut pas dépasser ${requiredLength} caractères.`;
    }
    if (errors['min']) {
      const min = errors['min'].min;
      return `La valeur doit être supérieure ou égale à ${min}.`;
    }
    if (errors['max']) {
      const max = errors['max'].max;
      return `La valeur doit être inférieure ou égale à ${max}.`;
    }
    if (errors['pattern']) {
      return 'Le format saisi est invalide.';
    }

    // 2. Validations personnalisées
    if (errors['passwordStrength']) {
      const strength = errors['passwordStrength'];
      if (!strength.hasUpperCase) return '❌ Au moins une majuscule (A-Z)';
      if (!strength.hasLowerCase) return '❌ Au moins une minuscule (a-z)';
      if (!strength.hasNumber) return '❌ Au moins un chiffre (0-9)';
      if (!strength.hasSpecialChar) return '❌ Au moins un caractère spécial (!@#$%^&*)';
      if (!strength.hasMinLength) return '❌ Au moins 8 caractères';
      return 'Mot de passe trop faible.';
    }

    if (errors['mismatch']) {
      return 'Les mots de passe ne correspondent pas.';
    }

    if (errors['emailExists']) {
      return 'Cet email est déjà utilisé. Veuillez en choisir un autre.';
    }

    if (errors['minCompetences']) {
      const required = errors['minCompetences'].required;
      const actual = errors['minCompetences'].actual;
      return `Minimum ${required} compétences requises (actuellement: ${actual}).`;
    }

    return 'Champ invalide.';
  }

  // 3. Méthode pour vérifier si un contrôle a une erreur spécifique et est touché
  hasError(control: AbstractControl | null, errorType: string): boolean {
    if (!control || !control.errors || !control.touched) {
      return false;
    }
    return control.errors[errorType] !== undefined;
  }

  // Méthode utilitaire pour vérifier si un champ est invalide
  isInvalid(control: AbstractControl | null): boolean {
    return !!control && control.invalid && control.touched;
  }
}
