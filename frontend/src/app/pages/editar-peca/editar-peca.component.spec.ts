import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPecaComponent } from './editar-peca.component';

describe('EditarPecaComponent', () => {
  let component: EditarPecaComponent;
  let fixture: ComponentFixture<EditarPecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPecaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarPecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
