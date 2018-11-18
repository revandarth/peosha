import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetjobComponent } from './getjob.component';

describe('GetjobComponent', () => {
  let component: GetjobComponent;
  let fixture: ComponentFixture<GetjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
