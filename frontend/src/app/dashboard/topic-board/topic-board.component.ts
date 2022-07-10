import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Problem,
  QuestionsByTopic,
  SolvedProblem,
} from '../interfaces/questionsbytopic.interface';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-topic-board',
  templateUrl: './topic-board.component.html',
  styleUrls: ['./topic-board.component.css'],
})
export class TopicBoardComponent implements OnInit, OnDestroy {
  topicname: string;
  topicInformation: string = '';
  subscribers: Array<Subscription> = [];
  displayedColumns: string[] = [
    'SL.NO',
    'Problem',
    'Attempted By',
    'Status',
    'Score',
  ];
  problems: MatTableDataSource<Problem> = new MatTableDataSource<Problem>([]);
  totalScore: number = 0;
  @ViewChild(MatSort)
  sort!: MatSort;
  searchText: string='';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar
  ) {
    this.topicname = this.route.snapshot.queryParamMap.get('topicname') || '';
  }

  ngOnInit(): void {
    this.subscribers.push(
      this.dashboardService
        .getQuestionsByTopicname$(this.topicname)
        .subscribe((response) => {
          this.refreshAndUpdateState(response);
          this.snackBar.open(
            `Topic-Board: ${this.topicname} refreshed!`,
            'Done',
            {
              duration: 2000,
              panelClass: ['bg-gray-800'],
            }
          );
        })
    );
  }

  markProblemAsSolved(questionId: string, problemId: string) {
    const payload = { questionId, problemId };
    this.subscribers.push(
      this.dashboardService
        .markProblemAsSolved$(this.topicname, payload)
        .subscribe((response) => {
          this.refreshAndUpdateState(response);
          this.snackBar.open(
            `🎉🎉 Progress has been updated successfully!.`,
            'Done',
            {
              duration: 4000,
              panelClass: ['bg-gray-800'],
            }
          );
        })
    );
  }

  private refreshAndUpdateState(response: QuestionsByTopic) {
    this.topicname = response.questions.topicname;
    this.topicInformation = response.questions.topicInformation;
    this.problems = new MatTableDataSource<Problem>(
      this.resampleAndCombineAllProblems(
        response.questions.problems,
        response.questions.solvedProblems
      )
    );
    this.problems.sort = this.sort;
  }

  resampleAndCombineAllProblems(
    problems: Problem[],
    solvedProblems: SolvedProblem[]
  ) {
    const data = [
      ...problems,
      ...solvedProblems.map((solveProblem) => {
        return {
          solved: true,
          code: solveProblem.code || '',
          ...solveProblem.problemInformation,
        };
      }),
    ]
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      .map((value, index) => {
        return { position: index + 1, ...value };
      });
    return data;
  }

  ngOnDestroy(): void {
    this.subscribers.map((subscriber) => subscriber.unsubscribe());
  }

  generateTooltipText(solved: boolean) {
    return solved
      ? `You have already attempted the question. Now you can only modify the code solution.`
      : `Click to save if you have solved the question. This will update your progress and mark the problem as done.`;
  }
  noChange() {
    return false;
  }

  showProgressBySolution(code: string) {
    return code !== '// Upload your working solution!' ? 100 : 50;
  }

  navigateToQuestionPage(problemId: string) {
    this.router.navigate(['', 'dashboard', 'problems'], {
      queryParams: { problemId },
    });
  }

  performSorting(sortState: Sort) {
    // if (sortState.direction) {
    //   this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    // } else {
    //   this._liveAnnouncer.announce('Sorting cleared');
    // }

    const data = this.problems.data.slice();
    if (!sortState.active || sortState.direction === '') {
      this.problems.data = data;
      return;
    }

    this.problems = new MatTableDataSource<Problem>(
      this.problems.data.sort((a, b) => {
        const is_ascending = sortState.direction === 'asc';
        switch (sortState.active) {
          case 'problemTitle':
            return compare(a.problemTitle, b.problemTitle, is_ascending);
          case 'attemptedCount':
            return compare(a.attemptedCount, b.attemptedCount, is_ascending);
          default:
            0;
        }
        return 0;
      })
    );
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
