import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { JwtTokenInterceptor } from '../shared/jwt-token.interceptor';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProgressCardComponent } from './home/progress-card/progress-card.component';
import { DashboardService } from './services/dashboard.service';

@NgModule({
  declarations: [DashboardComponent, HomeComponent, ProgressCardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    DashboardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true,
    },
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
