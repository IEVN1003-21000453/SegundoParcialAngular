import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaEscuela } from './lista-escuela';

describe('ListaEscuela', () => {
  let component: ListaEscuela;
  let fixture: ComponentFixture<ListaEscuela>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEscuela],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaEscuela);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
