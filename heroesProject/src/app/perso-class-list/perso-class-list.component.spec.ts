import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoClassListComponent } from './perso-class-list.component';

describe('PersoClassListComponent', () => {
  let component: PersoClassListComponent;
  let fixture: ComponentFixture<PersoClassListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersoClassListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersoClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
