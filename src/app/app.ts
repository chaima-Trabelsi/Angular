import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectList } from './project-list/project-list';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [ProjectList,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('project-manager');
}
