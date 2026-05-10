import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProjectService, Project } from '../../services/project';
import { catchError, delay, of } from 'rxjs';

export const projectResolver: ResolveFn<Project | string> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const projectService = inject(ProjectService);
  const id = route.paramMap.get('id');

  if (!id) {
    return of('ID de projet invalide');
  }

  return projectService.getProjectById(id).pipe(
    delay(2000), // On simule une latence réseau
    catchError(err => {
      console.error('Erreur Resolver:', err);
      return of('Erreur lors du chargement du projet');
    })
  );
};
