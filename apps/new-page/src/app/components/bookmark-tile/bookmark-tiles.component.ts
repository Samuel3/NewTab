import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

@Component({
  selector: 'new-page-bookmark-tile',
  templateUrl: './bookmark-tiles.component.html',
  styleUrls: ['./bookmark-tiles.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class BookmarkTilesComponent implements OnInit {
  @Input() name = '';
  @Input() editMode = false;
  bookmarks: Bookmark[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadBookmarks();
  }

  private loadBookmarks() {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      console.log('Received bookmarks:', bookmarkTreeNodes);
      this.bookmarks = [];
      this.processBookmarkNodes(bookmarkTreeNodes);
      this.cdr.detectChanges();
    });
  }

  private getFaviconUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=64`;
    } catch (e) {
      return 'assets/default-favicon.png';
    }
  }

  private processBookmarkNodes(nodes: chrome.bookmarks.BookmarkTreeNode[]) {
    nodes.forEach(node => {
      if (node.url) {
        const bookmark: Bookmark = {
          id: node.id,
          title: node.title || 'Unbenannt',
          url: node.url,
          favicon: this.getFaviconUrl(node.url)
        };
        console.log('Adding bookmark:', bookmark);
        this.bookmarks.push(bookmark);
      }
      if (node.children) {
        this.processBookmarkNodes(node.children);
      }
    });
  }
}
