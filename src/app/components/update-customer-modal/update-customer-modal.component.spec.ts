import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCustomerModalComponent } from './update-customer-modal.component';

describe('UpdateCustomerModalComponent', () => {
  let component: UpdateCustomerModalComponent;
  let fixture: ComponentFixture<UpdateCustomerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCustomerModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCustomerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
