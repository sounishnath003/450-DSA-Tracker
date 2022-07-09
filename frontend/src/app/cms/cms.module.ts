import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { JwtTokenInterceptor } from '../shared/jwt-token.interceptor';
import { AuthComponent } from './auth/auth.component';
import { CmsRoutingModule } from './cms-routing.module';
import { CmsComponent } from './cms.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModifyDialogComponent } from './dashboard/problem-info/modify-dialog/modify-dialog.component';
import { ProblemInfoComponent } from './dashboard/problem-info/problem-info.component';
import { CmsService } from './services/cms.service';
import { LoaderInterceptor } from './shared/loader.interceptor';
import {
  MarkdownToHtmlPipe,
  SafeHTMLPipe,
} from './shared/markdown-to-html.pipe';

@NgModule({
  declarations: [
    AuthComponent,
    CmsComponent,
    DashboardComponent,
    ProblemInfoComponent,
    MarkdownToHtmlPipe,
    SafeHTMLPipe,
    ModifyDialogComponent,
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CmsService,
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
})
export class CmsModule {}
