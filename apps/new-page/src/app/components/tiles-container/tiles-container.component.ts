import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';



import { tileConfig } from '../../model/tiles';
import { TilesComponent } from '../tiles/tiles.component';


@Component({
  selector: 'new-page-tiles-container',
  templateUrl: './tiles-container.component.html',
  styleUrls: ['./tiles-container.component.scss'],
  standalone: true,
  imports: [NgForOf, TilesComponent],
})
export class TilesContainerComponent {
  tiles: tileConfig[] = [
    {
      id: 'bookmarks',
      name: 'bookmarks',
    },
    {
      id: 'bookmarks',
      name: 'bookmarks',
    },
  ];
}
