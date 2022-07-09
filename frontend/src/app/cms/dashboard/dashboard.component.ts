import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
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
  currentSelectedQuestionTopic: Subject<Array<Problem>> = new Subject<
    Array<Problem>
  >();
  constructor(private cmsService: CmsService) {
    this.cmsService.buildAndPopulateCMSDashboard$().subscribe((data) => {
      this.data = data;
      this.currentSelectedQuestionTopic.next([...data[0].problems]);
    });
  }

  ngOnInit(): void {}

  onCurrentSelectionChange(index: number) {
    this.currentSelectedQuestionTopic.next([...this.data[index].problems]);
  }
}
