import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesearchComponent } from './tablesearch.component';

describe('TablesearchComponent', () => {
  let component: TablesearchComponent;
  let fixture: ComponentFixture<TablesearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
