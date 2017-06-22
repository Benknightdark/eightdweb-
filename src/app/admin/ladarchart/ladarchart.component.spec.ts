import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadarchartComponent } from './ladarchart.component';

describe('LadarchartComponent', () => {
  let component: LadarchartComponent;
  let fixture: ComponentFixture<LadarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
