import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestInitationComponent } from './request-initation.component';

describe('RequestInitationComponent', () => {
  let component: RequestInitationComponent;
  let fixture: ComponentFixture<RequestInitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestInitationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestInitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
