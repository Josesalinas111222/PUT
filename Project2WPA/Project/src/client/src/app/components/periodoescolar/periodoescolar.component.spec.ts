import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoescolarComponent } from './periodoescolar.component';

describe('PeriodoescolarComponent', () => {
  let component: PeriodoescolarComponent;
  let fixture: ComponentFixture<PeriodoescolarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodoescolarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodoescolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
