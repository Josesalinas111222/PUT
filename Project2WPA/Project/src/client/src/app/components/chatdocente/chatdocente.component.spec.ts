import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatdocenteComponent } from './chatdocente.component';

describe('ChatdocenteComponent', () => {
  let component: ChatdocenteComponent;
  let fixture: ComponentFixture<ChatdocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatdocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatdocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
