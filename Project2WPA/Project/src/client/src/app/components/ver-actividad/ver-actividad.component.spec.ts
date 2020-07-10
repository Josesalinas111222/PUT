import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerActividadComponent } from './ver-actividad.component';

describe('VerActividadComponent', () => {
  let component: VerActividadComponent;
  let fixture: ComponentFixture<VerActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
