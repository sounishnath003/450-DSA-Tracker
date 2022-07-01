import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.isLoading$ = this.dashboardService.loading$;
  }
}
