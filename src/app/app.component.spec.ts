import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {LogsComponent, PkmDataComponent, PokemonListComponent} from "./components";
import {FormsModule} from "@angular/forms";
import {PCustomColor} from "./directives";
import {By} from "@angular/platform-browser";
import {Player} from "./models";

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let date = new Date(2019, 0, 1, 20, 30, 40);
    let player1 = new Player('player 1');
    let player2 = new Player('player 2');

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

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should create the app', () => {
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('Test start date', () => {
        expect(component.fightService.startDate).toBeUndefined();

        component.fightService.startDate = date;
        fixture.detectChanges();

        const divElement = fixture.debugElement.query(By.css('#startDate'));
        const content = divElement.nativeElement.textContent.trim();
        expect(content).toContain('01' && '02' && '19' && '20' && '30' && '40');
    });

    it('Test end date', () => {
        expect(component.fightService.startDate).toBeUndefined();

        component.fightService.endDate = date;
        fixture.detectChanges();

        const divElement = fixture.debugElement.query(By.css('#endDate'));
        const content = divElement.nativeElement.textContent.trim();
        expect(content).toContain('01' && '02' && '19' && '20' && '30' && '40');
    });

    it('Have winner', () => {
        expect(component.fightService.startDate).toBeUndefined();
        component.fightService.winner = player1;
        fixture.detectChanges();

        const divElement = fixture.debugElement.query(By.css('#winnerPlayer'));
        let content = divElement.nativeElement.textContent.trim();

        expect(content).toContain(player1.name);

        component.fightService.winner = player2;
        fixture.detectChanges();

        content = divElement.nativeElement.textContent.trim();
        expect(content).toContain(player2.name);
    });
});
