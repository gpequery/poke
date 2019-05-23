import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import {FormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {Family, Pokemon} from "../../models";

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ PokemonListComponent ,  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    component.pokemonList = [ new Pokemon('myName1', 50, new Family('fire', 'success'), null),
    new Pokemon('myName2', 50, new Family('fire', 'success'), null)];
    fixture.detectChanges();
  });

  it('should instantiate', () => {
    expect(component).toBeDefined();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should be desabled', () => {
    const divElement = fixture.debugElement.query(By.css('.form-control'));

    expect(component).toBeTruthy();
  });

  it('List created', () => {
    const divElement = fixture.debugElement.query(By.css('.form-control'));
    let nameDisplay = divElement.nativeElement.textContent.trim();

    for ( let index in component.pokemonList) {
      let namePkm = component.pokemonList[index].name;
      let lifePkm = component.pokemonList[index].life;

      expect(nameDisplay).toContain(namePkm && lifePkm);
    }

  });
});
