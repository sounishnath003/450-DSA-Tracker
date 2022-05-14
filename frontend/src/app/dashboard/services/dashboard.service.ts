import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, switchMap } from 'rxjs';
import { ProgressHistoryInterface } from '../interfaces/progress-history.interface';
import { QuestionsByTopic } from '../interfaces/questionsbytopic.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient, private router: Router) {}

  getProgress$(): Observable<Array<ProgressHistoryInterface>> {
    return this.http.get(`/api/progress/track`).pipe(
      catchError((err) => {
        if (err.status === 401) {
          localStorage.removeItem('accessToken');
          this.router.navigate(['', 'auth'], {
            queryParams: { redirectTo: this.router.url },
          });
        }
        return err;
      }),
      map((response: any) => {
        return [...response.data.progressHistory];
      })
    );
  }

  getQuestionsByTopicname$(topicname: string): Observable<QuestionsByTopic> {
    return this.http
      .get<QuestionsByTopic>(`/api/questions`, {
        params: { topicname },
      })
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }

  markProblemAsSolved$(
    topicname: string,
    payload: { questionId: string; problemId: string }
  ) {
    return this.http
      .post(`/api/solutions/submit`, payload)
      .pipe(switchMap(() => this.getQuestionsByTopicname$(topicname)));
  }
}
