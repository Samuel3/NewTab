import { Component, Input } from '@angular/core';


@Component({
  selector: 'new-page-calculator-tile',
  templateUrl: './calculator-tiles.component.html',
  styleUrls: ['./calculator-tiles.component.scss'],
  standalone: true,
  imports: [],
})
export class CalculatorTilesComponent {
  @Input() name = '';
  @Input() editMode = false;
  displayValue = '0';
}
