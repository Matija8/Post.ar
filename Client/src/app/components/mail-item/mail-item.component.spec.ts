import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailItemComponent } from './mail-item.component';

describe('MailItemComponent', () => {
  let component: MailItemComponent;
  let fixture: ComponentFixture<MailItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
