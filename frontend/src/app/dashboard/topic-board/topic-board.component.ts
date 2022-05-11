import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Problem,
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
  displayedColumns: string[] = ['SL.NO', 'Problem', 'Attempted By', 'Status'];
  problems: Array<Problem> = [];

  constructor(
    private route: ActivatedRoute,
    private dashboard: DashboardService
  ) {
    this.topicname = this.route.snapshot.queryParamMap.get('topicname') || '';
  }

  ngOnInit(): void {
    this.subscribers.push(
      this.dashboard
        .getQuestionsByTopicname$(this.topicname)
        .subscribe((response) => {
          this.topicname = response.questions.topicname;
          this.topicInformation = response.questions.topicInformation;
          this.problems = this.resampleAndCombineAllProblems(
            response.questions.problems,
            response.questions.solvedProblems
          );
        })
    );
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
          attemptedBy: ((Math.random() % 5000) + 1000).toFixed(),
          ...solveProblem.problemInformation[0],
        };
      }),
    ]
      .sort(
        (a, b) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
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
      : `Check if you have attempted the question`;
  }
  noChange() {
    return false;
  }
}
