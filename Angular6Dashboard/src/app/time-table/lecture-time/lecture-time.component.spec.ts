import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureTimeComponent } from './lecture-time.component';

describe('LectureTimeComponent', () => {
  let component: LectureTimeComponent;
  let fixture: ComponentFixture<LectureTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
