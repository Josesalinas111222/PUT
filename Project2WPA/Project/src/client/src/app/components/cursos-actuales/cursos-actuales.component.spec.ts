import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosActualesComponent } from './cursos-actuales.component';

describe('CursosActualesComponent', () => {
  let component: CursosActualesComponent;
  let fixture: ComponentFixture<CursosActualesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursosActualesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosActualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
