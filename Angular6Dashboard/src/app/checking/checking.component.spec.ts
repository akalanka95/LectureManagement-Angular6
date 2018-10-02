import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckingComponent } from './checking.component';

describe('CheckingComponent', () => {
  let component: CheckingComponent;
  let fixture: ComponentFixture<CheckingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
