import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-ticket-dialog',
  template: `
    <h2 mat-dialog-title>Neues Ticket</h2>
    <mat-dialog-content>
      <mat-form-field class="full-width">
        <input matInput placeholder="Ticket Titel" [formControl]="titleControl">
        <mat-error *ngIf="titleControl.hasError('required')">Titel ist erforderlich</mat-error>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Abbrechen</button>
      <button mat-raised-button color="primary" [disabled]="!titleControl.valid" (click)="onSubmit()">Hinzufügen</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width {
      width: 100%;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class AddTicketDialogComponent {
  titleControl = new FormControl('', [Validators.required]);

  constructor(private dialogRef: MatDialogRef<AddTicketDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.titleControl.valid) {
      this.dialogRef.close(this.titleControl.value);
    }
  }
} 