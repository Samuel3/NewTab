import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
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
  title: string;
  tickets: Ticket[];
}

@Component({
  selector: 'app-kanban-tile',
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
  
  columns: Column[] = [
    { title: 'Open', tickets: [] },
    { title: 'In Progress', tickets: [] },
    { title: 'Waiting', tickets: [] },
    { title: 'Done', tickets: [] }
  ];

  private readonly STORAGE_KEY = 'kanban_board_data';

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

  openAddTicketDialog() {
    const dialogRef = this.dialog.open(AddTicketDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newTicket: Ticket = {
          id: Date.now(),
          title: result
        };
        this.columns[0]?.tickets.push(newTicket);
        this.saveBoard();
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
}
