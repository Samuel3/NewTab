import { Component, OnInit } from '@angular/core';
import { TilesContainerComponent } from './components/tiles-container/tiles-container.component';

@Component({
  selector: 'new-page-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [TilesContainerComponent],
  standalone: true,
})
export class AppComponent implements OnInit {
  editMode = false;

  ngOnInit() {
    // @ts-ignore
    chrome.bookmarks.getTree().then((result) => {
      console.log('Bookmarks:', result);
    });
    console.log('New Page Component Initialized');
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}
