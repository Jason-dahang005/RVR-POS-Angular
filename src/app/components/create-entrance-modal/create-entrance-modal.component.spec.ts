import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEntranceModalComponent } from './create-entrance-modal.component';

describe('CreateEntranceModalComponent', () => {
  let component: CreateEntranceModalComponent;
  let fixture: ComponentFixture<CreateEntranceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEntranceModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEntranceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
