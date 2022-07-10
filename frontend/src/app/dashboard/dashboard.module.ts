import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MaterialModule } from '../material/material.module';
import { JwtTokenInterceptor } from '../shared/jwt-token.interceptor';
import { LoaderInterceptor } from '../shared/loader.interceptor';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProgressCardComponent } from './home/progress-card/progress-card.component';
import {
  ProblemInfoComponent,
  SafeHTMLPipe,
} from './problem-info/problem-info.component';
import { DashboardService } from './services/dashboard.service';
import { BackButtonDirective } from './shared/back-button.directive';
import { MarkdownToHtmlPipe } from './shared/markdown-to-html.pipe';
import { TopicBoardComponent } from './topic-board/topic-board.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    ProgressCardComponent,
    TopicBoardComponent,
    ProblemInfoComponent,
    BackButtonDirective,
    SafeHTMLPipe,
    MarkdownToHtmlPipe,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    CodemirrorModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
  ],
  providers: [
    DashboardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
