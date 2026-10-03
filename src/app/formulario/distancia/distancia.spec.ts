import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Distancia } from './distancia';

describe('Distancia', () => {
  let component: Distancia;
  let fixture: ComponentFixture<Distancia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Distancia],
    }).compileComponents();

    fixture = TestBed.createComponent(Distancia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
