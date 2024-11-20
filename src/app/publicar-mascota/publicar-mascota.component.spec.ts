import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarMascotaComponent } from './publicar-mascota.component';

describe('PublicarMascotaComponent', () => {
  let component: PublicarMascotaComponent;
  let fixture: ComponentFixture<PublicarMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicarMascotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicarMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
