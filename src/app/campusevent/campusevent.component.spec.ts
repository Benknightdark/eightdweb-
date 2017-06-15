import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampuseventComponent } from './campusevent.component';

describe('CampuseventComponent', () => {
  let component: CampuseventComponent;
  let fixture: ComponentFixture<CampuseventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampuseventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampuseventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
