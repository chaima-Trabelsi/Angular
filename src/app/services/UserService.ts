// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Liste simulée des emails déjà existants
  private existingEmails = [
    'admin@test.com',
    'contact@test.com',
    'user@test.com',
    'jean.dupont@email.com'
  ];

  // Méthode qui vérifie si un email existe déjà
  checkEmailExists(email: string): Observable<boolean> {
    // Simulation d'un délai réseau (500ms)
    return of(this.existingEmails.includes(email)).pipe(delay(500));
  }
}
