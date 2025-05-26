import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';



import { tileConfig } from '../../model/tiles';


@Component({
  selector: 'new-page-tiles-container',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss'],
  standalone: true,
  imports: [NgForOf],
})
export class TilesComponent {
  tiles: tileConfig[] = [
    {
      id: 'bookmarks',
      name: 'bookmarks',
    },
  ];
}
