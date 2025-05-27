import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkTilesComponent } from './bookmark-tiles.component';

describe('SearchTilesComponent', () => {
  let component: BookmarkTilesComponent;
  let fixture: ComponentFixture<BookmarkTilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkTilesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
