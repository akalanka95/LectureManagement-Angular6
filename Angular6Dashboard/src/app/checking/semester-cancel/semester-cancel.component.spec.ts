import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterCancelComponent } from './semester-cancel.component';

describe('SemesterCancelComponent', () => {
  let component: SemesterCancelComponent;
  let fixture: ComponentFixture<SemesterCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemesterCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
