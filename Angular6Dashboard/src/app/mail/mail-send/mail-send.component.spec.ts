import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSendComponent } from './mail-send.component';

describe('MailSendComponent', () => {
  let component: MailSendComponent;
  let fixture: ComponentFixture<MailSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
