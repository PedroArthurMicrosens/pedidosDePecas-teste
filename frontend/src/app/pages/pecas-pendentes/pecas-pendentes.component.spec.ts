import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PecasPendentesComponent } from './pecas-pendentes.component';

describe('PecasPendentesComponent', () => {
  let component: PecasPendentesComponent;
  let fixture: ComponentFixture<PecasPendentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PecasPendentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PecasPendentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
