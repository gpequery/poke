import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PCustomColor} from '../../directives';
import {PkmDataComponent} from '../';
import {Family, Pokemon} from "../../models";
import {By} from "@angular/platform-browser";

describe('PkmDataComponent', () => {
    let component: PkmDataComponent;
    let fixture: ComponentFixture<PkmDataComponent>;
    let pokemon1 = new Pokemon('myName1', 50, new Family('fire', 'success'), null);
    let pokemon2 = new Pokemon('myName2', 50, new Family('fire', 'success'), null);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PkmDataComponent, PCustomColor],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PkmDataComponent);
        component = fixture.componentInstance;
        component.pokemon = pokemon1;
        fixture.detectChanges();
    });

    it('should instantiate', () => {
        expect(component).toBeDefined();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Card have pokemon name', () => {
        // const compile = fixture.debugElement.nativeElement;
        const divElement = fixture.debugElement.query(By.css('.card-header'));
        let nameDisplay = divElement.nativeElement.textContent.trim();

        expect(nameDisplay).toEqual(pokemon1.name);

        component.pokemon = pokemon2;
        fixture.detectChanges();
        nameDisplay = divElement.nativeElement.textContent.trim();

        expect(nameDisplay).toEqual(pokemon2.name);
    });
});
