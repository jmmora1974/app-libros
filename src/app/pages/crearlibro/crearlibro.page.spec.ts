import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearlibroPage } from './crearlibro.page';

describe('CrearlibroPage', () => {
  let component: CrearlibroPage;
  let fixture: ComponentFixture<CrearlibroPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(CrearlibroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
