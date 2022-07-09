import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Problem } from 'src/app/dashboard/interfaces/questionsbytopic.interface';

@Component({
  selector: 'app-modify-dialog',
  templateUrl: './modify-dialog.component.html',
  styleUrls: ['./modify-dialog.component.css'],
})
export class ModifyDialogComponent implements OnInit {
  problemUpdateForm: FormGroup = new FormGroup({
    _id: new FormControl('', []),
    id: new FormControl('', []),
    __v: new FormControl('', []),
    problemTitle: new FormControl('', [Validators.required]),
    problemURL: new FormControl('', [Validators.required]),
    questionInformation: new FormControl('', [Validators.required]),
    difficultyLevel: new FormControl('', [Validators.required]),
    topicname: new FormControl('', [Validators.required]),
    createdAt: new FormControl('', []),
    updatedAt: new FormControl('', []),
    upvoted: new FormControl('', []),
    downvoted: new FormControl('', []),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { problem: Problem },
    private dialogRef: MatDialogRef<ModifyDialogComponent>
  ) {
    this.problemUpdateForm.setValue({ ...data.problem });
  }

  ngOnInit(): void {}

  onSubmit() {
    const {
      id,
      problemTitle,
      problemURL,
      questionInformation,
      topicname,
      difficultyLevel,
    } = this.problemUpdateForm.value;
    this.dialogRef.close({
      id,
      problemTitle,
      problemURL,
      questionInformation,
      topicname,
      difficultyLevel,
    });
  }

  close() {
    this.dialogRef.close();
  }
}
