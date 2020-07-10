import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadresComponent } from './padres.component';

describe('PadresComponent', () => {
  let component: PadresComponent;
  let fixture: ComponentFixture<PadresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
