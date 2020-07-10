import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmcabezadoMenuComponent } from './emcabezado-menu.component';

describe('EmcabezadoMenuComponent', () => {
  let component: EmcabezadoMenuComponent;
  let fixture: ComponentFixture<EmcabezadoMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmcabezadoMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmcabezadoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
