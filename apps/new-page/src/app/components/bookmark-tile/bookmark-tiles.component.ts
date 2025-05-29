import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  order?: number;
}

@Component({
  selector: 'new-page-bookmark-tile',
  templateUrl: './bookmark-tiles.component.html',
  styleUrls: ['./bookmark-tiles.component.scss'],
  standalone: true,
  imports: [CommonModule, DragDropModule],
})
export class BookmarkTilesComponent implements OnInit {
  @Input() name = '';
  @Input() editMode = false;
  bookmarks: Bookmark[] = [];
  isEditing = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadBookmarks();
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.saveBookmarkOrder();
    }
  }

  onDrop(event: CdkDragDrop<Bookmark[]>) {
    moveItemInArray(this.bookmarks, event.previousIndex, event.currentIndex);
    this.saveBookmarkOrder();
    this.cdr.detectChanges();
  }

  private saveBookmarkOrder() {
    const bookmarkOrder = this.bookmarks.map((bookmark, index) => ({
      id: bookmark.id,
      order: index
    }));
    chrome.storage.sync.set({ bookmarkOrder }, () => {});
  }

  private loadBookmarkOrder(): Promise<{ [key: string]: number }> {
    return new Promise((resolve) => {
      chrome.storage.sync.get('bookmarkOrder', (result) => {
        const orderMap: { [key: string]: number } = {};
        if (result['bookmarkOrder']) {
          result['bookmarkOrder'].forEach((item: { id: string; order: number }) => {
            orderMap[item.id] = item.order;
          });
        }
        resolve(orderMap);
      });
    });
  }

  private loadBookmarks() {
    chrome.bookmarks.getTree(async (bookmarkTreeNodes) => {
      this.bookmarks = [];
      await this.processBookmarkNodes(bookmarkTreeNodes);
      const orderMap = await this.loadBookmarkOrder();
      // Sortiere Bookmarks nach gespeicherter Reihenfolge
      if (Object.keys(orderMap).length > 0) {
        // Erstelle ein temporäres Array mit der korrekten Reihenfolge
        const sortedBookmarks: Bookmark[] = [];
        const maxOrder = Math.max(...Object.values(orderMap));
        // Füge Bookmarks in der gespeicherten Reihenfolge hinzu
        for (let i = 0; i <= maxOrder; i++) {
          const bookmark = this.bookmarks.find(b => orderMap[b.id] === i);
          if (bookmark) {
            sortedBookmarks.push(bookmark);
          }
        }
        // Füge verbleibende Bookmarks am Ende hinzu
        this.bookmarks.forEach(bookmark => {
          if (!sortedBookmarks.includes(bookmark)) {
            sortedBookmarks.push(bookmark);
          }
        });
        this.bookmarks = sortedBookmarks;
      }
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

  private async processBookmarkNodes(nodes: chrome.bookmarks.BookmarkTreeNode[]) {
    for (const node of nodes) {
      if (node.url) {
        const bookmark: Bookmark = {
          id: node.id,
          title: node.title || 'Unbenannt',
          url: node.url,
          favicon: this.getFaviconUrl(node.url)
        };
        this.bookmarks.push(bookmark);
      }
      if (node.children) {
        await this.processBookmarkNodes(node.children);
      }
    }
  }

  moveBookmark(index: number, direction: 'up' | 'down') {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === this.bookmarks.length - 1)
    ) {
      return;
    }

    const bookmark = this.bookmarks[index];
    if (!bookmark) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    this.bookmarks.splice(index, 1);
    this.bookmarks.splice(newIndex, 0, bookmark);
    this.cdr.detectChanges();
  }

  removeBookmark(index: number) {
    this.bookmarks.splice(index, 1);
    this.saveBookmarkOrder();
    this.cdr.detectChanges();
  }

  resetOrder() {
    chrome.storage.sync.remove('bookmarkOrder', () => {
      this.loadBookmarks();
    });
  }
}
