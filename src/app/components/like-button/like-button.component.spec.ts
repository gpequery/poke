import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeButtonComponent } from './like-button.component';

describe('LikeButtonComponent', () => {
  let component: LikeButtonComponent;
  let fixture: ComponentFixture<LikeButtonComponent>;
  let view;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikeButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    view = fixture.elementRef.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should print 0', () => {
    expect(view.innerHTML).toContain('0 like');
  });

  it('should print 1', () => {
    component.nbLikes = 1;
    fixture.detectChanges();

    expect(view.innerHTML).toContain('1 like');
  });

  it('should print 2 with plurial', () => {
    component.nbLikes = 2;
    fixture.detectChanges();

    expect(view.innerHTML).toContain('2 likes');
  });
});
