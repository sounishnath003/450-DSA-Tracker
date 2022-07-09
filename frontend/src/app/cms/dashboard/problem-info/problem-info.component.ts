import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { Problem } from '../../services/all-problems-interface';
import { CmsService } from '../../services/cms.service';
import { ModifyDialogComponent } from './modify-dialog/modify-dialog.component';

@Component({
  selector: 'app-problem-info',
  templateUrl: './problem-info.component.html',
  styleUrls: ['./problem-info.component.css'],
})
export class ProblemInfoComponent implements OnInit {
  @Input() questionTopicWithProblems!: BehaviorSubject<Array<Problem>>;
  questionTopicProblems$!: Observable<Array<Problem>>;
  panelOpenState = false;
  @Output() onUpdateProblemDetails: EventEmitter<Problem> =
    new EventEmitter<Problem>();

  constructor(private cmsService: CmsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.questionTopicProblems$ = this.questionTopicWithProblems.asObservable();
  }

  openModifyDialog(problem: Problem) {
    const dialogRef = this.dialog.open(ModifyDialogComponent, {
      data: { problem },
      width: '800px',
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (!data || JSON.stringify(data) === JSON.stringify(problem)) return;
      this.onUpdateProblemDetails.emit({ ...data });
    });
  }

  formatDifficultyLevel(difficultyLevel: number) {
    return difficultyLevel === 0
      ? 'Easy'
      : difficultyLevel === 1
      ? `Medium`
      : 'Hard';
  }
}
