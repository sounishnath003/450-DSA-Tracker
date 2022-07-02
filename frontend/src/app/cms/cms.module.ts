import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { AuthComponent } from './auth/auth.component';
import { CmsRoutingModule } from './cms-routing.module';
import { CmsComponent } from './cms.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CmsService } from './services/cms.service';

@NgModule({
  declarations: [AuthComponent, CmsComponent, DashboardComponent],
  imports: [
    CommonModule,
    CmsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CmsService],
})
export class CmsModule {}
