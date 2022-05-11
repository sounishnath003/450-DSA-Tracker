import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicBoardComponent } from './topic-board.component';

describe('TopicBoardComponent', () => {
  let component: TopicBoardComponent;
  let fixture: ComponentFixture<TopicBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
