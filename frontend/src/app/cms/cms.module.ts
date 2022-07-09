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
import { CmsService } from './services/cms.service';
import { ProblemInfoComponent } from './dashboard/problem-info/problem-info.component';

@NgModule({
  declarations: [AuthComponent, CmsComponent, DashboardComponent, ProblemInfoComponent],
  imports: [
    CommonModule,
    CmsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
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
      useClass: JwtTokenInterceptor,
      multi: true,
    },
  ],
})
export class CmsModule {}
