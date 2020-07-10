import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatfamiliaComponent } from './chatfamilia.component';

describe('ChatfamiliaComponent', () => {
  let component: ChatfamiliaComponent;
  let fixture: ComponentFixture<ChatfamiliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatfamiliaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatfamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
