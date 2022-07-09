import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CmsService } from './services/cms.service';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css'],
})
export class CmsComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private cmsService: CmsService) {
    this.isLoading$ = this.cmsService.loading$;
  }

  ngOnInit(): void {}
}
