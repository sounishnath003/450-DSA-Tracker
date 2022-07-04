import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, switchMap } from 'rxjs';
import { ProblemInformationInterface } from '../interfaces/problem-information.interface';
import { ProgressHistoryInterface } from '../interfaces/progress-history.interface';
import { QuestionsByTopic } from '../interfaces/questionsbytopic.interface';

export type VOTETYPE = 'UP' | 'DOWN';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}

  getProgress$(): Observable<{
    totalSolved: number;
    totalQuestions: number;
    progressHistory: ProgressHistoryInterface[];
  }> {
    return this.http.get(`/api/progress/track`).pipe(
      catchError((err) => {
        if (err.status === 401) {
          localStorage.removeItem('accessToken');
          this.router.navigate(['', 'auth'], {
            queryParams: { redirectTo: 'dashboard' },
          });
        }
        return err;
      }),
      map((response: any) => {
        const totalSolved = response.data.progressHistory.reduce(
          (pv: any, cv: { solveCount: any }) => {
            return pv + cv.solveCount;
          },
          0
        );
        let totalQuestions = response.data.progressHistory.reduce(
          (pv: any, cv: { totalProblems: any }) => {
            return pv + cv.totalProblems;
          },
          0
        );

        return {
          totalSolved,
          totalQuestions,
          progressHistory: [...response.data.progressHistory],
        };
      })
    );
  }

  getQuestionsByTopicname$(topicname: string): Observable<QuestionsByTopic> {
    return this.http
      .get<QuestionsByTopic>(`/api/questions`, {
        params: { topicname },
      })
      .pipe(
        catchError((err) => {
          localStorage.removeItem('accessToken');
          this.router.navigate(['', 'auth'], {
            queryParams: { redirectTo: `dashboard` },
          });
          return err;
        }),
        map((response: any) => {
          return response.data;
        })
      );
  }

  markProblemAsSolved$(
    topicname: string,
    payload: { questionId: string; problemId: string }
  ) {
    return this.http.post(`/api/solutions/submit`, payload).pipe(
      catchError((err) => {
        localStorage.removeItem('accessToken');
        this.router.navigate(['', 'auth'], {
          queryParams: { redirectTo: `dashboard` },
        });
        return err;
      }),
      switchMap(() => this.getQuestionsByTopicname$(topicname))
    );
  }

  getProblemInformation$(
    problemId: string
  ): Observable<ProblemInformationInterface[]> {
    return this.http
      .get(`/api/questions/problems/details`, {
        params: { problemId },
      })
      .pipe(
        catchError((err) => {
          localStorage.removeItem('accessToken');
          this.router.navigate(['', 'auth'], {
            queryParams: { redirectTo: `dashboard` },
          });
          return err;
        }),
        map((response: any) => {
          return response.data;
        })
      );
  }

  updateVote(problemId: string, voteType: VOTETYPE) {
    return this.http
      .post(
        `/api/questions/problems/vote-for`,
        {},
        {
          params: {
            problemId,
            voteType,
          },
        }
      )
      .pipe(
        catchError((err) => {
          localStorage.removeItem('accessToken');
          this.router.navigate(['', 'auth'], {
            queryParams: { redirectTo: `dashboard` },
          });
          return err;
        }),
        switchMap(() => this.getProblemInformation$(problemId))
      );
  }

  updateSolution(solutionId: string, problemId: string, code: string) {
    return this.http
      .patch(
        `/api/solutions/update`,
        {
          code,
        },
        { params: { solutionId } }
      )
      .pipe(
        catchError((err) => {
          localStorage.removeItem('accessToken');
          this.router.navigate(['', 'auth'], {
            queryParams: { redirectTo: `dashboard` },
          });
          return err;
        }),
        switchMap(() => this.getProblemInformation$(problemId))
      );
  }

  resetProgress$(questionId: string) {
    return this.http
      .delete(`/api/solutions/reset-progress`, {
        params: { questionId },
      })
      .pipe(
        catchError((err) => {
          localStorage.removeItem('accessToken');
          this.router.navigate(['', 'auth'], {
            queryParams: { redirectTo: `dashboard` },
          });
          return err;
        }),
        switchMap(() => this.getProgress$())
      );
  }
}
