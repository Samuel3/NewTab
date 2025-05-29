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

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

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
      }
    });
  }

  deleteTicket(column: Column, ticket: Ticket) {
    const index = column.tickets.indexOf(ticket);
    if (index > -1) {
      column.tickets.splice(index, 1);
    }
  }
}
