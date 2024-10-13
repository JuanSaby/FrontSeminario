import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresAnimalComponent } from './pres-animal.component';

describe('PresAnimalComponent', () => {
  let component: PresAnimalComponent;
  let fixture: ComponentFixture<PresAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresAnimalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
