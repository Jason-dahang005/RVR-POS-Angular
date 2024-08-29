import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCottageModalComponent } from './create-cottage-modal.component';

describe('CreateCottageModalComponent', () => {
  let component: CreateCottageModalComponent;
  let fixture: ComponentFixture<CreateCottageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCottageModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCottageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
