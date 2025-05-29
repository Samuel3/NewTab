import { NgForOf, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';

import { tileConfig, TileType } from '../../model/tiles';
import { BookmarkTilesComponent } from '../bookmark-tile/bookmark-tiles.component';
import { CalculatorTilesComponent } from '../calculator-tile/calculator-tiles.component';
import { SearchTilesComponent } from '../search-tile/search-tiles.component';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'new-page-tiles-container',
  templateUrl: './tiles-container.component.html',
  styleUrls: ['./tiles-container.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    SearchTilesComponent,
    BookmarkTilesComponent,
    CalculatorTilesComponent,
    NgIf,
    DragDropModule,
  ],
})
export class TilesContainerComponent implements OnInit {
  @Input() editMode = false;
  
  tiles: tileConfig[] = [
    {
      id: '0',
      name: 'bookmarks',
      tileType: TileType.Bookmarks,
    },
    {
      id: '1',
      name: 'search',
      tileType: TileType.Search,
    },
    {
      id: '2',
      name: 'calculator',
      tileType: TileType.Calculator,
    },
  ];
  protected readonly TileType = TileType;

  constructor(private configService: ConfigService) {}

  async ngOnInit() {
    const savedConfig = await this.configService.loadTilesConfig();
    if (savedConfig) {
      this.tiles = savedConfig;
    }
  }

  async onDrop(event: CdkDragDrop<tileConfig[]>) {
    moveItemInArray(this.tiles, event.previousIndex, event.currentIndex);
    await this.configService.saveTilesConfig(this.tiles);
  }
}
