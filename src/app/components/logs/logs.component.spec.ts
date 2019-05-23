import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsComponent } from './logs.component';
import {Family, Logs, Pokemon} from '../../models';
import {PCustomColor} from '../../directives';
import {By} from '@angular/platform-browser';

describe('LogsComponent', () => {
  let component: LogsComponent;
  let fixture: ComponentFixture<LogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsComponent , PCustomColor ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsComponent);
    component = fixture.componentInstance;
    let pokemon = new Pokemon('myName1', 50, new Family('fire', 'success'), null);
    let attackData = [50, 2];


    component.logs = [ new Logs(pokemon , 'oui', 'NON', attackData , false)
    ];

    fixture.detectChanges();
  });

  it('should instantiate', () => {
    expect(component).toBeDefined();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('logs with 1 line are created ', () => {
    const divElement = fixture.debugElement.query(By.css('.logs'));
    let logLine = divElement.nativeElement.textContent.trim();
    let namePkm = component.logs[0].pokemon.name;
    let nameAttack = component.logs[0].attackLabel;
    let damage = component.logs[0].attackData[0];
    let modifier = component.logs[0].attackData[1];
    expect(logLine).toContain(namePkm && nameAttack && damage && modifier);
  });
});
