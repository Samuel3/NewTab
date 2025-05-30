import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilesContainerComponent } from './tiles-container.component';

describe('SearchTilesComponent', () => {
  let component: TilesContainerComponent;
  let fixture: ComponentFixture<TilesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TilesContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TilesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
