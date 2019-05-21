import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PkmDataComponent } from './pkm-data.component';

describe('PkmDataComponent', () => {
  let component: PkmDataComponent;
  let fixture: ComponentFixture<PkmDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PkmDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PkmDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
