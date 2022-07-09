import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Problem } from '../../services/all-problems-interface';
import { CmsService } from '../../services/cms.service';

@Component({
  selector: 'app-problem-info',
  templateUrl: './problem-info.component.html',
  styleUrls: ['./problem-info.component.css'],
})
export class ProblemInfoComponent implements OnInit {
  @Input() questionTopicWithProblems!: Subject<Array<Problem>>;
  questionTopicWithProblems$!: Observable<Array<Problem>>;

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {
    this.questionTopicWithProblems$ =
      this.questionTopicWithProblems.asObservable();
  }
}
