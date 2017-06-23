import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarmodalComponent } from './calendarmodal.component';

describe('CalendarmodalComponent', () => {
  let component: CalendarmodalComponent;
  let fixture: ComponentFixture<CalendarmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
