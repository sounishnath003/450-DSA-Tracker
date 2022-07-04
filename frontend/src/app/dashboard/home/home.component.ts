import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, tap } from 'rxjs';
import { ProgressHistoryInterface } from '../interfaces/progress-history.interface';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  totalSolved: string = '0';
  progressHistory: Observable<Array<ProgressHistoryInterface>> =
    new Observable();
  constructor(
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.progressHistory = this.dashboardService.getProgress$().pipe(
      tap((o) => (this.totalSolved = `${o.totalSolved} / ${o.totalQuestions}`)),
      map((ob) => ob.progressHistory)
    );
  }

  resetProgress({ questionId }: { questionId: string }) {
    this.progressHistory = this.dashboardService
      .resetProgress$(questionId)
      .pipe(
        tap((resp: any) => {
          this.totalSolved = `${resp.totalSolved} / ${resp.totalQuestions}`;
          this.snackBar.open(
            'Progress has been cleared successfully.',
            'Close',
            {
              duration: 3000,
              panelClass: ['bg-gray-800'],
            }
          );
        }),
        map((o) => o.progressHistory)
      );
  }

  getUserInitials() {
    return `${localStorage.getItem('userInitials')}`;
  }
  logout() {
    localStorage.clear();
    window.location.replace('/');
  }
}
