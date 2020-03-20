import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadURLComponent } from './bad-url.component';

describe('BadURLComponent', () => {
  let component: BadURLComponent;
  let fixture: ComponentFixture<BadURLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadURLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadURLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
