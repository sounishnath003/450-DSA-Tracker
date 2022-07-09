import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsComponent } from './cms.component';

describe('CmsComponent', () => {
  let component: CmsComponent;
  let fixture: ComponentFixture<CmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
