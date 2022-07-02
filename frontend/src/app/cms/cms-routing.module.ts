import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CmsComponent } from './cms.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CmsAuthGuard } from './shared/cms-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CmsComponent,
    pathMatch: 'full',
    canActivate: [CmsAuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmsRoutingModule {}
