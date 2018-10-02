import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelingComponent } from './canceling.component';

describe('CancelingComponent', () => {
  let component: CancelingComponent;
  let fixture: ComponentFixture<CancelingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
