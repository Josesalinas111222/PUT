import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosygradosComponent } from './cursosygrados.component';

describe('CursosygradosComponent', () => {
  let component: CursosygradosComponent;
  let fixture: ComponentFixture<CursosygradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursosygradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosygradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
