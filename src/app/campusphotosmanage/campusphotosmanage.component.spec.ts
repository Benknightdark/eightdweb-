import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusphotosmanageComponent } from './campusphotosmanage.component';

describe('CampusphotosmanageComponent', () => {
  let component: CampusphotosmanageComponent;
  let fixture: ComponentFixture<CampusphotosmanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusphotosmanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusphotosmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
