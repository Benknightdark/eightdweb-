import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampuseventmanageComponent } from './campuseventmanage.component';

describe('CampuseventmanageComponent', () => {
  let component: CampuseventmanageComponent;
  let fixture: ComponentFixture<CampuseventmanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampuseventmanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampuseventmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
