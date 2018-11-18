import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyviewComponent } from './companyview.component';

describe('CompanyviewComponent', () => {
  let component: CompanyviewComponent;
  let fixture: ComponentFixture<CompanyviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
