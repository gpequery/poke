import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Pokemon} from "../../models/";

@Component({
  selector: 'app-pkm-data',
  templateUrl: './pkm-data.component.html',
  styleUrls: ['./pkm-data.component.scss']
})
export class PkmDataComponent {
  @Input() pokemon: Pokemon;

  constructor() { }
}
