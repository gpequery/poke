import { TestBed } from '@angular/core/testing';

import { Pokedex.ServiceService } from './pokedex.service.service';

describe('Pokedex.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Pokedex.ServiceService = TestBed.get(Pokedex.ServiceService);
    expect(service).toBeTruthy();
  });
});
