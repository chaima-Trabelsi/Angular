// custom-validators.ts
import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from './services/UserService';

// 1. Validateur de force du mot de passe
export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';

    // Vérifications
    const hasUpperCase = /[A-Z]/.test(value);      // Au moins une majuscule
    const hasLowerCase = /[a-z]/.test(value);      // Au moins une minuscule
    const hasNumber = /[0-9]/.test(value);         // Au moins un chiffre
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value); // Caractère spécial
    const hasMinLength = value.length >= 8;        // Minimum 8 caractères

    // Si toutes les conditions sont remplies, le mot de passe est valide
    const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasMinLength;

    // Si valide, retourne null (pas d'erreur)
    if (isValid) {
      return null;
    }

    // Sinon, retourne un objet d'erreur personnalisé
    return {
      passwordStrength: {
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar,
        hasMinLength
      }
    };
  };
}

// 2. Validateur de correspondance des mots de passe
export function matchPasswordValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(passwordKey)?.value;
    const confirmPassword = formGroup.get(confirmPasswordKey)?.value;

    // Si les deux champs sont remplis et différents
    if (password && confirmPassword && password !== confirmPassword) {
      // Ajoute l'erreur sur le champ confirmPassword
      formGroup.get(confirmPasswordKey)?.setErrors({ mismatch: true });
      return { mismatch: true };
    }

    // Si les mots de passe correspondent, supprime l'erreur
    if (formGroup.get(confirmPasswordKey)?.hasError('mismatch')) {
      formGroup.get(confirmPasswordKey)?.setErrors(null);
    }

    return null;
  };}
  // 2. Validateur asynchrone pour vérifier si l'email existe déjà
export function emailExistsValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    // Si le champ est vide, on ne valide pas (laisser le validateur required faire son travail)
    if (!control.value) {
      return of(null);
    }

    // Appel au service pour vérifier si l'email existe
    return userService.checkEmailExists(control.value).pipe(
      map(exists => {
        // Si l'email existe, retourne une erreur
        return exists ? { emailExists: true } : null;
      }),
      // En cas d'erreur réseau, on considère que l'email est valide (optionnel)
      catchError(() => of(null))
    );
  };

}
