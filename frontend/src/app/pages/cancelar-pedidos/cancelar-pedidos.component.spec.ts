import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarPedidosComponent } from './cancelar-pedidos.component';

describe('CancelarPedidosComponent', () => {
  let component: CancelarPedidosComponent;
  let fixture: ComponentFixture<CancelarPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelarPedidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelarPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
