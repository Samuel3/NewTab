import { NgForOf } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'new-page-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss'],
  standalone: true,
  imports: [NgForOf],
})
export class TilesComponent {
  @Input() name = '';
}
