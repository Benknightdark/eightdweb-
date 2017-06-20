import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusphotosmanageformComponent } from './campusphotosmanageform.component';

describe('CampusphotosmanageformComponent', () => {
  let component: CampusphotosmanageformComponent;
  let fixture: ComponentFixture<CampusphotosmanageformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusphotosmanageformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusphotosmanageformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
