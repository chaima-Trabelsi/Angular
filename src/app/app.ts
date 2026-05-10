import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { ThemeService } from './services/theme-service';
import { NavBarComponent } from './nav-bar/nav-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, NavBarComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('project-manager');
  isDark = false;
  isRouting = signal(false);

  constructor(
    private themeService: ThemeService,
    private router: Router
  ) {
    this.isDark = this.themeService.isDarkMode();
    
    // Écoute des événements du routeur pour afficher le loader pendant le Resolve
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isRouting.set(true);
      } else if (
        event instanceof NavigationEnd || 
        event instanceof NavigationCancel || 
        event instanceof NavigationError
      ) {
        this.isRouting.set(false);
      }
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDark = this.themeService.isDarkMode();
  }
}
