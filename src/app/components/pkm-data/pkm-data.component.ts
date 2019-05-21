import { Component } from '@angular/core';
import {AppComponent} from '../../app.component';
import {Pokemon} from "../../models/Pokemon";

@Component({
  selector: 'app-pkm-data',
  templateUrl: './pkm-data.component.html',
  styleUrls: ['./pkm-data.component.scss']
})
export class PkmDataComponent {
  message="Test";

  constructor() { }
}
