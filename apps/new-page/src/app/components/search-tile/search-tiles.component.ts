/// <reference types="chrome"/>
import { AfterContentInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'new-page-search-tile',
  templateUrl: './search-tiles.component.html',
  styleUrls: ['./search-tiles.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class SearchTilesComponent implements AfterContentInit {
  @ViewChild('search') searchElement!: ElementRef;
  @Input() name = '';
  @Input() editMode = false;
  searchQuery = '';
  valueUpdated() {
    chrome.search.query({disposition: 'CURRENT_TAB', text: this.searchQuery})
  }

  ngAfterContentInit() {
    this.searchElement.nativeElement.focus();
  }
}
