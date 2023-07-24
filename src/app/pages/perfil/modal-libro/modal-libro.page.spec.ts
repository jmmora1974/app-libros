import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalLibroPage } from './modal-libro.page';

describe('ModalLibroPage', () => {
  let component: ModalLibroPage;
  let fixture: ComponentFixture<ModalLibroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalLibroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
