import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCalendarioComponent } from './crear-calendario.component';

describe('CrearCalendarioComponent', () => {
  let component: CrearCalendarioComponent;
  let fixture: ComponentFixture<CrearCalendarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearCalendarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
