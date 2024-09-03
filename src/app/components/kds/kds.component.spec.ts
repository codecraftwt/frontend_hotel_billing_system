import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KdsComponent } from './kds.component';

describe('KdsComponent', () => {
  let component: KdsComponent;
  let fixture: ComponentFixture<KdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
