import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentTimeTableComponent } from './department-time-table.component';

describe('DepartmentTimeTableComponent', () => {
  let component: DepartmentTimeTableComponent;
  let fixture: ComponentFixture<DepartmentTimeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentTimeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
