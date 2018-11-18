import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfessionalDialogComponent } from './add-professional-dialog.component';

describe('AddProfessionalDialogComponent', () => {
  let component: AddProfessionalDialogComponent;
  let fixture: ComponentFixture<AddProfessionalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProfessionalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfessionalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
