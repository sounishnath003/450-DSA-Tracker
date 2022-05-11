import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProgressHistoryInterface } from '../../interfaces/progress-history.interface';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.css'],
})
export class ProgressCardComponent implements OnInit {
  topics$: Observable<Array<ProgressHistoryInterface>>;
  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.topics$ = this.dashboardService.getProgress$();
  }

  ngOnInit(): void {}

  navigateToTopic(topicname: string) {
    return this.router.navigate(['topic-board'], {
      queryParams: { topicname },
      relativeTo: this.route,
    });
  }
}
