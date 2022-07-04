import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  @Input() topics$!: Observable<Array<ProgressHistoryInterface>>;
  @Output() resetProgressClicked: EventEmitter<{ questionId: string }> =
    new EventEmitter<{ questionId: string }>();
  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

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
    this.resetProgressClicked.emit({ questionId });
  }
}
