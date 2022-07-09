import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDialogComponent } from './modify-dialog.component';

describe('ModifyDialogComponent', () => {
  let component: ModifyDialogComponent;
  let fixture: ComponentFixture<ModifyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
