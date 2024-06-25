import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarPecaComponent } from './alterar-peca.component';

describe('AlterarPecaComponent', () => {
  let component: AlterarPecaComponent;
  let fixture: ComponentFixture<AlterarPecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterarPecaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlterarPecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
