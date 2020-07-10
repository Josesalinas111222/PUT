import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionclasesactividadesComponent } from './revisionclasesactividades.component';

describe('RevisionclasesactividadesComponent', () => {
  let component: RevisionclasesactividadesComponent;
  let fixture: ComponentFixture<RevisionclasesactividadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisionclasesactividadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionclasesactividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
