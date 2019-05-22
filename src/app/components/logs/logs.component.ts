import {Component, Input} from '@angular/core';
import {Logs} from "../../models";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent {
  @Input() logs: Array<Logs>;

  constructor() { }
}
