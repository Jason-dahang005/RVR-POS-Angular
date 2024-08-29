import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCottageModalComponent } from './update-cottage-modal.component';

describe('UpdateCottageModalComponent', () => {
  let component: UpdateCottageModalComponent;
  let fixture: ComponentFixture<UpdateCottageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCottageModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCottageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
