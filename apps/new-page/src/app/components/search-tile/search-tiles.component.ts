import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'new-page-search-tile',
  templateUrl: './search-tiles.component.html',
  styleUrls: ['./search-tiles.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class SearchTilesComponent implements OnInit {
  @ViewChild('search') searchElement!: ElementRef;
  @Input() name = '';
  searchQuery = '';
  valueUpdated() {
    // @ts-ignore
    chrome.search.query({disposition: 'CURRENT_TAB', text: this.searchQuery})
    console.log('Search query updated:', this.searchQuery);
  }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
  }
}
