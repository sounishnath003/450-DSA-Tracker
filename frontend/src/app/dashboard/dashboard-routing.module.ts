import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProblemInfoComponent } from './problem-info/problem-info.component';
import { TopicBoardComponent } from './topic-board/topic-board.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'topic-board',
        component: TopicBoardComponent,
        pathMatch: 'full',
      },
      {
        path: 'problems',
        component: ProblemInfoComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
