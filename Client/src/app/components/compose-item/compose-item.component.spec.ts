import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeItemComponent } from './compose-item.component';

describe('ComposeItemComponent', () => {
  let component: ComposeItemComponent;
  let fixture: ComponentFixture<ComposeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
