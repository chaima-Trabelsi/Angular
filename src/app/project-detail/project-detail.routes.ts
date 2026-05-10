import { Routes } from '@angular/router';
import { ProjectOverviewComponent } from '../project-overview/project-overview';
import { ProjectBoardComponent } from '../project-board/project-board';
import { TaskListComponent } from '../task-list/task-list';
import { ActivityComponent } from '../activity/activity';

export const PROJECT_DETAIL_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    component: ProjectOverviewComponent
  },
  {
    path: 'board',
    component: ProjectBoardComponent
  },
  {
    path: 'tasks',
    component: TaskListComponent
  },
  {
    path: 'activity',
    component: ActivityComponent
  }
];
