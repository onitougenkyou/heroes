import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterAddFormComponent } from './monster-add-form.component';

describe('MonsterAddFormComponent', () => {
  let component: MonsterAddFormComponent;
  let fixture: ComponentFixture<MonsterAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonsterAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
