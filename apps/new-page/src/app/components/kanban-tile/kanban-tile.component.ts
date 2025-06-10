import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule, CdkDropList } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddTicketDialogComponent } from './add-ticket-dialog.component';

interface Ticket {
  id: number;
  title: string;
}

interface Column {
  id: number;
  title: string;
  tickets: Ticket[];
}

@Component({
  selector: 'new-page-kanban-tile',
  templateUrl: './kanban-tile.component.html',
  styleUrls: ['./kanban-tile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class KanbanTileComponent implements OnInit {
  @Input() name = 'Kanban Board';
  @Input() editMode = false;

  @ViewChildren('ticketDropList') ticketDropLists!: QueryList<CdkDropList>;
  @ViewChildren(CdkDropList) dropLists!: QueryList<CdkDropList>;

  columns: Column[] = [
    { id: 1, title: 'Open', tickets: [] },
    { id: 2, title: 'In Progress', tickets: [] },
    { id: 3, title: 'Waiting', tickets: [] },
    { id: 4, title: 'Done', tickets: [] }
  ];

  private readonly STORAGE_KEY = 'kanban_board_data';
  newColumnTitle = '';

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadBoard();
  }

  private saveBoard(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.columns));
  }

  private loadBoard(): void {
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    if (savedData) {
      this.columns = JSON.parse(savedData);
    }
  }

  drop(event: CdkDragDrop<Ticket[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.saveBoard();
  }

  dropColumn(event: CdkDragDrop<Column[]>) {
    if (this.editMode) {
      moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
      this.saveBoard();
    }
  }

  openAddTicketDialog() {
    const dialogRef = this.dialog.open(AddTicketDialogComponent, {
      width: '300px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && typeof result === 'string') {
        const newTicket: Ticket = {
          id: Date.now(),
          title: result.trim()
        };
        if (this.columns[0]) {
          this.columns[0].tickets.push(newTicket);
          this.saveBoard();
        }
      }
    });
  }

  deleteTicket(column: Column, ticket: Ticket) {
    const index = column.tickets.indexOf(ticket);
    if (index > -1) {
      column.tickets.splice(index, 1);
      this.saveBoard();
    }
  }

  addColumn() {
    if (this.newColumnTitle.trim()) {
      const newColumn: Column = {
        id: Date.now(),
        title: this.newColumnTitle.trim(),
        tickets: []
      };
      this.columns.push(newColumn);
      this.newColumnTitle = '';
      this.saveBoard();
    }
  }

  deleteColumn(column: Column) {
    const index = this.columns.indexOf(column);
    if (index > -1) {
      this.columns.splice(index, 1);
      this.saveBoard();
    }
  }

  updateColumnTitle(column: Column, newTitle: string | Event) {
    const title = typeof newTitle === 'string' ? newTitle : (newTitle.target as HTMLInputElement).value;
    if (title.trim()) {
      column.title = title.trim();
      this.saveBoard();
    }
  }

  protected readonly HTMLInputElement = HTMLInputElement;

  getConnectedDropLists(): string[] {
    return this.columns.map(column => 'dropList-' + column.id);
  }
}
