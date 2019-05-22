import { Injectable } from '@angular/core';
import {Attack} from "../models";

@Injectable({
  providedIn: 'root'
})
export class FightService {

  constructor() { }

    static isWeakFamly(): void {
        console.log('weak');
    }
}
