import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAddFormComponent } from './class-add-form.component';

describe('ClassAddFormComponent', () => {
  let component: ClassAddFormComponent;
  let fixture: ComponentFixture<ClassAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
