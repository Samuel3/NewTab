import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorTilesComponent } from './calculator-tiles.component';

describe('SearchTilesComponent', () => {
  let component: CalculatorTilesComponent;
  let fixture: ComponentFixture<CalculatorTilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorTilesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
