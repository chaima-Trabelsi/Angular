import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, delay, map, of } from 'rxjs';

export function emailExistsValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    // Simulation d'un appel API avec un délai de 1s
    // On considère que "test@test.com" existe déjà
    return of(control.value).pipe(
      delay(1000),
      map(email => {
        const existingEmails = ['test@test.com', 'admin@test.com', 'user@test.com'];
        return existingEmails.includes(email.toLowerCase()) 
          ? { emailExists: true } 
          : null;
      })
    );
  };
}
