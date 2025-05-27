import { Component, Input } from '@angular/core';


@Component({
  selector: 'new-page-bookmark-tile',
  templateUrl: './bookmark-tiles.component.html',
  styleUrls: ['./bookmark-tiles.component.scss'],
  standalone: true,
  imports: [],
})
export class BookmarkTilesComponent {
  @Input() name = '';
}
