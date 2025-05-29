import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'new-page-calculator-tile',
  templateUrl: './calculator-tiles.component.html',
  styleUrls: ['./calculator-tiles.component.scss'],
  standalone: true,
  imports: [NgIf],
})
export class CalculatorTilesComponent {
  @Input() name = '';
  @Input() editMode = false;

  displayValue = '0';
  firstOperand: number | null = null;
  operator: string | null = null;
  waitingForSecondOperand = false;

  onDigitClick(digit: string): void {
    if (this.waitingForSecondOperand) {
      this.displayValue = digit;
      this.waitingForSecondOperand = false;
    } else {
      this.displayValue =
        this.displayValue === '0' ? digit : this.displayValue + digit;
    }
  }

  onOperatorClick(operator: string): void {
    const inputValue = parseFloat(this.displayValue);

    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.performCalculation();
      this.displayValue = String(result);
      this.firstOperand = result;
    }

    this.waitingForSecondOperand = true;
    this.operator = operator;
  }

  onEqualClick(): void {
    if (this.operator && this.firstOperand !== null) {
      const result = this.performCalculation();
      this.displayValue = String(result);
      this.firstOperand = null;
      this.operator = null;
      this.waitingForSecondOperand = false;
    }
  }

  onClearClick(): void {
    this.displayValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }

  private performCalculation(): number {
    const secondOperand = parseFloat(this.displayValue);
    if (this.operator === '+') return this.firstOperand! + secondOperand;
    if (this.operator === '-') return this.firstOperand! - secondOperand;
    if (this.operator === '*') return this.firstOperand! * secondOperand;
    if (this.operator === '/') return this.firstOperand! / secondOperand;
    return secondOperand;
  }
}
