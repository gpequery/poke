import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {LogsComponent, PkmDataComponent, PokemonListComponent} from "./components";
import {FormsModule} from "@angular/forms";
import {PCustomColor} from "./directives";
import {By} from "@angular/platform-browser";
import {FightService} from "./services";
import {Family, Player, Pokemon} from "./models";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        PokemonListComponent,
        PkmDataComponent,
        LogsComponent,
        PCustomColor
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Test beginin hour', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    let fightService = new FightService();
    fightService.run();
    console.log(fightService.startDate);
    fixture.detectChanges();
    const divElement = fixture.debugElement.query(By.css('#beginHour'));
    let hourLine = divElement.nativeElement.textContent.trim();
    console.log(hourLine);

    expect(app).toBeTruthy();
  });

  it('Have winner', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    let fightService = new FightService();

    // @ts-ignore
    fightService.winner = new Player('Player1', [new Pokemon('pkm1', 4, new Family('fire', 'success'), null),
      new Pokemon('pkm1', 4, new Family('fire', 'success'), null),
      new Pokemon('pkm1', 4, new Family('fire', 'success'), null),
    ]) ;

    fixture.detectChanges();
    const divElement = fixture.debugElement.query(By.css('#winnerPlayer'));
    console.log(divElement);
    //let winnerText = divElement.nativeElement.textContent.trim();
    console.log(fightService.winner);

    expect(app).toBeTruthy();
  });

  it('Test end hour', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    let fightService = new FightService();
    fightService.isEnd();
    console.log(fightService.endDate);
    fixture.detectChanges();
    const divElement = fixture.debugElement.query(By.css('#endHour'));
    let hourLine = divElement.nativeElement.textContent.trim();
    console.log(hourLine);

    expect(app).toBeTruthy();
  });





});
