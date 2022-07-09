import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Problem, Question } from '../services/all-problems-interface';
import { CmsService } from '../services/cms.service';

export type SelectedQuestionTopicProblems = {
  topicname: string;
  problems: Array<Problem>;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  data: Array<Question> = [];
  currentSelectedQuestionTopic: BehaviorSubject<Array<Problem>> =
    new BehaviorSubject<Array<Problem>>([]);
  constructor(private cmsService: CmsService, private snackbar: MatSnackBar) {
    this.cmsService.buildAndPopulateCMSDashboard$().subscribe((data) => {
      this.data = data;
      this.currentSelectedQuestionTopic.next([...data[0].problems]);
    });
  }

  ngOnInit(): void {}

  onCurrentSelectionChange(index: number) {
    this.currentSelectedQuestionTopic.next([...this.data[index].problems]);
  }
  updateDetails(updatedProblemParams: Partial<Problem>) {
    this.cmsService
      .updateProblemDetails(updatedProblemParams)
      .subscribe((data) => {
        this.data = data;
        this.currentSelectedQuestionTopic.next([...data[0].problems]);
        this.snackbar.open(
          `${updatedProblemParams.problemTitle} has been updated with modifed information`,
          'Close',
          {
            duration: 3000,
            panelClass: ['bg-gray-300'],
          }
        );
      });
  }
}
