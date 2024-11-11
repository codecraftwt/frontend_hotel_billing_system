import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplineAreaComponent } from './spline-area.component';

describe('SplineAreaComponent', () => {
  let component: SplineAreaComponent;
  let fixture: ComponentFixture<SplineAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplineAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplineAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
