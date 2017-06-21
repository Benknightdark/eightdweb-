import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampuseventmanageformComponent } from './campuseventmanageform.component';

describe('CampuseventmanageformComponent', () => {
  let component: CampuseventmanageformComponent;
  let fixture: ComponentFixture<CampuseventmanageformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampuseventmanageformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampuseventmanageformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
