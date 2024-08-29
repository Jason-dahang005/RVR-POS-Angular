import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CottageListComponent } from './cottage-list.component';

describe('CottageListComponent', () => {
  let component: CottageListComponent;
  let fixture: ComponentFixture<CottageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CottageListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CottageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
