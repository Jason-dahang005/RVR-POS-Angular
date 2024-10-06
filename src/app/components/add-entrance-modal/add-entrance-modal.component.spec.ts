import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntranceModalComponent } from './add-entrance-modal.component';

describe('AddEntranceModalComponent', () => {
  let component: AddEntranceModalComponent;
  let fixture: ComponentFixture<AddEntranceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEntranceModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEntranceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
