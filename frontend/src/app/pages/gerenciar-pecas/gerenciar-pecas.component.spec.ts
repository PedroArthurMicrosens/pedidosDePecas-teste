import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarPecasComponent } from './gerenciar-pecas.component';

describe('GerenciarPecasComponent', () => {
  let component: GerenciarPecasComponent;
  let fixture: ComponentFixture<GerenciarPecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarPecasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GerenciarPecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
