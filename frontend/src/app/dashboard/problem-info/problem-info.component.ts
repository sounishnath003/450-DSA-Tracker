import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ProblemInformationInterface } from '../interfaces/problem-information.interface';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-problem-info',
  templateUrl: './problem-info.component.html',
  styleUrls: ['./problem-info.component.css'],
})
export class ProblemInfoComponent implements OnInit {
  problemInformation$!: Observable<ProblemInformationInterface[]>;
  code!: string;
  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const problemId: string =
      this.route.snapshot.queryParamMap.get('problemId') || '';
    this.problemInformation$ = this.dashboardService
      .getProblemInformation$(problemId)
      .pipe(
        tap((data) => {
          this.code = data[0].code;
        })
      );
  }
  showDifficultyLevel(level: string) {
    if (+level === 0) return 'Easy';
    else if (+level === 1) return 'Medium';
    else if (+level === 2) return 'Hard';
    else return 'N/A';
  }
  setBackColor(level: string) {
    const type = this.showDifficultyLevel(level);
    if (type === 'Easy') {
      return { 'bg-green-200': true, 'text-green-700': true };
    }
    if (type === 'Medium') {
      return { 'bg-orange-200': true, 'text-orange-700': true };
    }
    return { 'bg-red-200': true, 'text-red-700': true };
  }

  updateCode(code: string) {
    this.code = code;
  }
  onCodeSubmit() {
    window.alert(this.code);
  }
}
