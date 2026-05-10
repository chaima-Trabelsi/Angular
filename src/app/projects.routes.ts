// src/app/projects.routes.ts
import { Routes } from '@angular/router';
import { ProjectList } from './project-list/project-list';
import { ProjectDetail } from './project-detail/project-detail';
import { TaskListComponent } from './task-list/task-list';
import { ProjectBoardComponent } from './project-board/project-board';
import { Settings } from './settings/settings';
import { ContactFormComponent } from './contact-form/contact-form';
import { UserFormComponent } from './user-form/user-form';
import { SkillsFormComponent } from './skills-form/skills-form';
import { AddressFormComponent } from './address-form/address-form';
import { AddressesFormComponent } from './addresses-form/addresses-form';
import { TaskDetailComponent } from './task-detail/task-detail';
import { TaskEditComponent } from './task-edit/task-edit';
import { pendingChangesGuard } from './core/guards/pending-changes-guard';
import { DashboardComponent } from './dashboard/dashboard';
import { PROJECT_DETAIL_ROUTES } from './project-detail/project-detail.routes';
import { projectResolver } from './core/resolvers/project-resolver';

export const PROJECTS_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'projects',
    component: ProjectList
  },
  {
    path: 'projects/:id',
    component: ProjectDetail,
    resolve: { project: projectResolver },
    children: PROJECT_DETAIL_ROUTES
  },
  {
    path: 'projects/:id/tasks/:taskId',
    component: TaskDetailComponent
  },
  {
    path: 'projects/:id/tasks/:taskId/edit',
    component: TaskEditComponent,
    canDeactivate: [pendingChangesGuard]
  },
  {
    path: 'settings',
    component: Settings
  },
  {
    path: 'contact',
    component: ContactFormComponent
  },
  {
    path: 'user-profile',
    component: UserFormComponent
  },
  {
    path: 'skills',
    component: SkillsFormComponent
  },
  {
    path: 'address',
    component: AddressFormComponent
  },
  {
    path: 'addresses',
    component: AddressesFormComponent
  }
];
