import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusphotosComponent } from './campusphotos.component';

describe('CampusphotosComponent', () => {
  let component: CampusphotosComponent;
  let fixture: ComponentFixture<CampusphotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusphotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusphotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
