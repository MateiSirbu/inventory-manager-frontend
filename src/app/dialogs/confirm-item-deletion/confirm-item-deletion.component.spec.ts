import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmItemDeletionComponent } from './confirm-item-deletion.component';

describe('ConfirmItemDeletionComponent', () => {
  let component: ConfirmItemDeletionComponent;
  let fixture: ComponentFixture<ConfirmItemDeletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmItemDeletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmItemDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
