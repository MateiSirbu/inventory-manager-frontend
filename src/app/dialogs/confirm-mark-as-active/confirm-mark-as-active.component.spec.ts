import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMarkAsActiveComponent } from './confirm-mark-as-active.component';

describe('ConfirmMarkAsActiveComponent', () => {
  let component: ConfirmMarkAsActiveComponent;
  let fixture: ComponentFixture<ConfirmMarkAsActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmMarkAsActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmMarkAsActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
