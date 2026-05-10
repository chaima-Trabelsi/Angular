import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private handlers: { [key: string]: { handle: DetachedRouteHandle, timestamp: number } } = {};
  private readonly CACHE_TTL = 300000; // 5 minutes en millisecondes

  // 1. Détermine si on doit stocker la route (détacher le composant)
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // On ne stocke que la liste des tâches
    return route.routeConfig?.path === 'tasks';
  }

  // 2. Stocke le composant détaché
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    if (handle) {
      const url = this.getRouteUrl(route);
      this.handlers[url] = {
        handle,
        timestamp: Date.now()
      };
    }
  }

  // 3. Détermine si on doit restaurer un composant depuis le cache
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const url = this.getRouteUrl(route);
    const cached = this.handlers[url];

    if (cached) {
      // Vérification du délai (si plus vieux que 5 min, on ne restaure pas)
      if (Date.now() - cached.timestamp > this.CACHE_TTL) {
        delete this.handlers[url];
        return false;
      }
      return true;
    }
    return false;
  }

  // 4. Récupère le composant depuis le cache
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const url = this.getRouteUrl(route);
    return this.handlers[url]?.handle || null;
  }

  // 5. Détermine si la route doit être réutilisée
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }

  private getRouteUrl(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
      .map(it => it.url.map(segment => segment.path).join('/'))
      .join('/')
      .replace(/\/+/g, '/');
  }
}
