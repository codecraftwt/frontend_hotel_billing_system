import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCatagoriesListComponent } from './food-catagories-list.component';

describe('FoodCatagoriesListComponent', () => {
  let component: FoodCatagoriesListComponent;
  let fixture: ComponentFixture<FoodCatagoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodCatagoriesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCatagoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
