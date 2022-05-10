import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.css'],
})
export class ProgressCardComponent implements OnInit {
  topics$: Observable<any>;
  constructor(private dashboardService: DashboardService) {
    // this.topics = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    this.topics$ = this.dashboardService.getProgress$();
  }

  ngOnInit(): void {}
}
