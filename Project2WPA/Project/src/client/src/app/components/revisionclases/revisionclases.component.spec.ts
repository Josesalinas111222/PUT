import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionclasesComponent } from './revisionclases.component';

describe('RevisionclasesComponent', () => {
  let component: RevisionclasesComponent;
  let fixture: ComponentFixture<RevisionclasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisionclasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionclasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
