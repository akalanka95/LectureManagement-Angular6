import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturesDetailComponent } from './lectures-detail.component';

describe('LecturesDetailComponent', () => {
  let component: LecturesDetailComponent;
  let fixture: ComponentFixture<LecturesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
