import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTilesComponent } from './search-tiles.component';

describe('SearchTilesComponent', () => {
  let component: SearchTilesComponent;
  let fixture: ComponentFixture<SearchTilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTilesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
