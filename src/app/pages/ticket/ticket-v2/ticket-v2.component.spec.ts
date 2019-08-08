import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketV2Component } from './ticket-v2.component';

describe('TicketV2Component', () => {
  let component: TicketV2Component;
  let fixture: ComponentFixture<TicketV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
