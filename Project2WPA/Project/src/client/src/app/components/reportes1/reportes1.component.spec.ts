import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Reportes1Component } from './reportes1.component';

describe('Reportes1Component', () => {
  let component: Reportes1Component;
  let fixture: ComponentFixture<Reportes1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Reportes1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Reportes1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
