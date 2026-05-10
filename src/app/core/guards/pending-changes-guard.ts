import { CanDeactivateFn } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

export const pendingChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  // Si le composant a une méthode canDeactivate, on l'appelle
  if (component.canDeactivate && !component.canDeactivate()) {
    return window.confirm('Voulez-vous vraiment quitter ? Les modifications non sauvegardées seront perdues.');
  }
  return true;
};
