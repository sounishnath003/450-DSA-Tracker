import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
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
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.topics$ = this.dashboardService.getProgress$();
  }

  ngOnInit(): void {
    this.snackBar.open(
      `🎉👨🏻‍💻 AppState has been refreshed successfully!.`,
      'Done',
      {
        duration: 2000,
        panelClass: ['bg-gray-800'],
      }
    );
  }

  navigateToTopic(topicname: string) {
    return this.router.navigate(['topic-board'], {
      queryParams: { topicname },
      relativeTo: this.route,
    });
  }

  resetProgress(questionId: string) {
    this.topics$ = this.dashboardService.resetProgress$(questionId).pipe(
      tap((resp: any) => {
        this.snackBar.open('Progress has been cleared successfully.', 'Close', {
          duration: 3000,
          panelClass: ['bg-gray-800'],
        });
      })
    );
  }
}
