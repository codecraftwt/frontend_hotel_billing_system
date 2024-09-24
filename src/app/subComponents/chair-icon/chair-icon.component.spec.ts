import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairIconComponent } from './chair-icon.component';

describe('ChairIconComponent', () => {
  let component: ChairIconComponent;
  let fixture: ComponentFixture<ChairIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChairIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChairIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
