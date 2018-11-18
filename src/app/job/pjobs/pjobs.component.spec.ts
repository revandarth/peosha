import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PjobsComponent } from './pjobs.component';

describe('PjobsComponent', () => {
  let component: PjobsComponent;
  let fixture: ComponentFixture<PjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
